const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

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

  var { authorNumber, title } = req.body;
  authorNumber = authorNumber.slice(1);
  const uploadDir = path.join(
    __dirname,
    "../../client/public/uploads/",
    authorNumber,
    title
  );

  if (fs.existsSync(uploadDir)) {
    fs.readdir(uploadDir, (error, files) => {
      if (error) console.log(error);

      let totalFiles = files.length;
      if (totalFiles > 0) cb(null, false);
    });
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
