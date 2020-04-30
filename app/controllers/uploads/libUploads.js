const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const multer = require("multer"); // utilisé par createProduct
const formidable = require("formidable"); // utilisé par updateProduct

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    var { authorNumber, title } = req.body;
    authorNumber = authorNumber.slice(1);
    const uploadDir = path.join(
      __dirname,
      "../../client/public/uploads/",
      authorNumber,
      title
    );

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var fileFilter = (req, file, cb) => {
  // allow images only
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error("Only image are allowed."), false);
  }

  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { files: 3, fileSize: 4 * 1024 * 1024 }
}).array("pictures");

module.exports = {
  createProduct(req, res) {
    upload(req, res, async err => {
      var {
        authorNumber,
        title,
        description,
        price,
        category,
        tags
      } = req.body;

      var pictures = req.files;
      tags = tags.split(",");

      if (err) {
        console.log("Error uploading files", err);
      }

      try {
        const productAlreadyExists = await Product.findOne({
          authorNumber,
          title
        });
        if (productAlreadyExists) {
          console.log("Produit existe déjà");
          return res.status(409).json({
            text: "Vous avez déjà crée ce produit."
          });
        }
      } catch (error) {
        console.log(error);
      }

      pictures.map(picture => {
        picture.path = path.join(
          "uploads",
          authorNumber.slice(1),
          title,
          picture.filename
        );
      });

      /* Config to insert in database */
      if (!title || title.length === 0) {
        return res.status(401).json({
          text: "Votre produit n'a pas de nom."
        });
      }

      price = price * 1; // conversion string -> number
      if (!price || isNaN(price) || typeof price != "number" || price <= 0) {
        return res.status(401).json({
          typePrice: typeof price,
          text: "Votre produit n'a pas de prix ou n'est pas supérieur à 0."
        });
      }

      let newProduct = new Product({
        pictures,
        title,
        description,
        price,
        category,
        tags,
        authorNumber
      });

      // saving the new product in Product table
      try {
        newProduct.save();
      } catch (error) {
        console.log(error);
      }

      // saving the new product in the User table (field myProducts)
      let filter = { phoneNumber: authorNumber };
      let update = { myProducts: newProduct };

      try {
        User.findOneAndUpdate(
          filter,
          { $push: update },
          { new: true },
          function(err, doc) {
            if (err) return res.status(500).json(err);

            res.json({ product: newProduct });
          }
        );
        /* end of database processing */
      } catch (error) {
        console.log(error);
      }
    });
  },

  updateProduct(req, res) {
    const { id } = req.params;

    let oldProductTitle,
      productTitle,
      productDesc,
      productPrice,
      productCategory,
      authorNb = "";
    let productTags = [];
    let productPics = null;
    let existentPics = null;

    const form = formidable({
      encoding: "utf-8",
      multiples: true,
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024 // (4MB)
    });

    form.parse(req, function(err, fields, files) {
      if (err) console.log("error parsing", err);

      if (fields.pictures)
        console.log("fields pictures", JSON.parse(fields.pictures));
      let noImageUploaded = Object.keys(files).length === 0;
      let pictures = {};

      let {
        oldTitle,
        title,
        description,
        price,
        category,
        tags,
        authorNumber
      } = fields;

      if (noImageUploaded) {
        // si pas d'upload d'image alors le formulaire envoie un object Object qui passe dans fields
        pictures = JSON.parse(fields.pictures);
      } else {
        ({ pictures } = files);
      }

      oldProductTitle = oldTitle;
      productTitle = title;
      productDesc = description;
      productPrice = price;
      productCategory = category;
      productTags = tags.split(",");
      authorNb = authorNumber.slice(1);

      if (noImageUploaded) existentPics = pictures;
      else productPics = pictures;
    });

    form.on("error", function(err) {
      if (err) {
        console.log("an error has occured with form upload");
        console.log(err);
      }
    });

    form.on("progress", function(bytesReceived, bytesExpected) {
      var percent = ((bytesReceived / bytesExpected) * 100) | 0;
      console.log("Uploading: %" + percent + "\r");
    });

    form.on("end", function(err) {
      if (err) {
        throw err;
      }

      let oldPath = path.join(
        __dirname,
        "../../client/public/uploads/",
        authorNb,
        oldProductTitle,
        "/"
      );

      let newPath = path.join(
        __dirname,
        "../../client/public/uploads/",
        authorNb,
        productTitle,
        "/"
      );

      console.log("pathToRename", oldPath);
      console.log("pathToUpload", newPath);
      var noNewImage = true;

      if (!productPics || productPics === undefined) {
        console.log("No new image to upload");
        if (productTitle !== oldProductTitle) {
          console.log("New title detected", productTitle);
          console.log("Renaming directory...");
          fs.renameSync(oldPath, newPath);
        }
      } else {
        noNewImage = false;
        console.log("New image(s) added! Processing...");
        if (productTitle !== oldProductTitle) {
          console.log("Creating new dir", newPath);
          fse.ensureDirSync(newPath);
          console.log("Removing old dir", oldPath);
          fse.removeSync(oldPath);
        } else {
          console.log("Not renaming cause the title hasn't changed!", newPath);

          console.log("Emptying dir", oldPath);
          fse.emptyDirSync(oldPath);
        }
      }

      /* Copie des fichiers uploadés depuis le dossier temporaire
      au dossier public/upload/{authorNumber}/{productTitle} */
      console.log("Nb files to upload", this.openedFiles.length);
      for (let i = 0; i < this.openedFiles.length; i++) {
        let tempPath = this.openedFiles[i].path;
        let fileName = this.openedFiles[i].name;

        console.log("temp path", tempPath);
        console.log("file name", fileName);
        this.openedFiles[i].path = path.join(
          "uploads",
          authorNb,
          productTitle,
          fileName
        );

        fse.move(tempPath, newPath + fileName, { overwrite: true }, function(
          err
        ) {
          if (err) console.error(err);

          console.log("success!");
        });
      }

      /* Config update de la base de données */
      if (!productTitle || productTitle.length === 0) {
        return res.status(401).json({
          text: "Votre produit n'a pas de nom."
        });
      }

      productPrice = productPrice * 1; // conversion string -> number

      if (
        !productPrice ||
        isNaN(productPrice) ||
        typeof productPrice != "number" ||
        productPrice <= 0
      ) {
        return res.status(401).json({
          typePrice: typeof productPrice,
          text: "Votre produit n'a pas de prix ou n'est pas supérieur à 0."
        });
      }

      Product.findById(id).exec((err, product) => {
        if (err) console.log("Error updateProduct: ", err);
        // s'il y a une nouvelle image, on ajoute la nouvelle image
        if (!noNewImage) product.pictures = productPics;
        // s'il n'y a pas de nouvelle image et que le titre a changé, on change le path des images déjà présentes
        if (noNewImage && productTitle != oldProductTitle) {
          console.log("Updating files path...");
          existentPics.map(pic => {
            pic.path = path.join(
              "uploads",
              authorNb,
              productTitle,
              pic.filename
            );
          });

          product.pictures = existentPics;
        }
        product.title = productTitle;
        product.description = productDesc;
        product.price = productPrice;
        product.category = productCategory;
        product.tags = productTags;

        product.save();
        res.status(200).json({ product });
      });
    });
  },

  deleteProduct(req, res) {
    const { productID, phoneNumber, title } = req.query;

    const uploadDir = path.join(
      __dirname,
      "../../client/public/uploads/",
      phoneNumber.slice(1),
      title
    );

    Product.deleteOne({ _id: productID }).exec((err, product) => {
      if (err) console.log("Delete One Error: ", err);
      console.log("product", product);

      User.updateMany(
        {},
        {
          $pull: {
            myProducts: productID,
            cart: productID,
            favorites: productID,
            sold: productID
          }
        },
        (err, user) => {
          if (err) throw err;

          console.log("uploadDir", uploadDir)
          fse.removeSync(uploadDir)
          res.status(200).json({ product, user });
        }
      );
    });
  },

  // on récupère les images d'un produit
  getProductPictures(req, res) {
    const { phoneNumber, productTitle } = req.query;

    if (!phoneNumber) {
      return res.status(401).json({
        text: "Numéro de téléphone non reconnu."
      });
    }

    if (!productTitle) {
      return res.status(401).json({
        text: "Nom du produit non reconnu."
      });
    }

    const uploadDir = path.join(
      __dirname,
      "../../client/public/uploads/",
      phoneNumber,
      productTitle
    );

    const imgPath = path.join("uploads", phoneNumber, productTitle);

    console.log("uploadDir", uploadDir);
    const productFiles = [];

    fs.readdir(uploadDir, function(err, files) {
      if (err) {
        return res.status(401).json({
          text: "Impossible d'accéder au répertoire." + err
        });
      }

      files.forEach(function(file) {
        productFiles.push(file);
      });

      res.status(200).send({ name: productFiles, path: imgPath });
    });
  }
};
