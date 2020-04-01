/*
    Contiendra les fonctions de :
      - connexion, de création de compte et de déconnexion,
      - d'ajout/modification/suppression de produit,
      - d'ajout/suppresion d'un produit au panier,
*/
const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const passwordHash = require("password-hash");
const formidable = require("formidable");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

module.exports = {
  async signup(req, res) {
    const {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
      codeParrain
    } = req.body;
    if (!firstname || !lastname || !password) {
      //Le cas où les paramètres ne serait pas saisis ou nuls
      return res.status(400).json({
        text: "Les champs ne sont pas tous saisis."
      });
    }
    if (!email) {
      return res.status(400).json({
        text: "Veuillez renseignez un email valide."
      });
    }
    if (!phoneNumber) {
      return res.status(400).json({
        text: "Veuillez renseignez un numéro de téléphone."
      });
    }

    // Création d'un objet user, dans lequel on hash le mot de passe
    const user = {
      firstname,
      lastname,
      email,
      phoneNumber,
      password: passwordHash.generate(password),
      codeParrain
    };

    /* if codeParrain.valid -> inscription ok SINON erreur code */

    // On check en base si l'utilisateur existe déjà selon son email et numéro de téléphone
    try {
      const findUser = await User.findOne({ email, phoneNumber });
      if (findUser) {
        console.log("Utilisateur existe déjà");
        return res.status(409).json({
          text: "L'utilisateur existe déjà. Veuillez vous connectez."
        });
      }
    } catch (error) {
      console.log("error findOne (lib.js): " + error);
    }

    try {
      // Sauvegarde de l'utilisateur en base
      const userData = new User(user);
      let userObject = await userData.save();
      console.log("userObject (lib.js): " + userObject);

      // assigne l'user à la session
      req.session.user = userData;
      req.session.save();

      return res.status(200).json({
        text: "Good job: User saved successfully! :)",
        token: userData.getToken(),
        session: JSON.stringify(req.session.user)
      });
    } catch (error) {
      console.log("error user save (lib.js): " + error);
    }
  },

  async login(req, res) {
    const { phoneNumber, password } = req.body;
    if (!phoneNumber || !password) {
      // Si phoneNumber ou bien le password ne serait pas saisi ou nul
      return res.status(400).json({
        text: "Un des paramètres est manquant !"
      });
    }
    try {
      // On check si l'utilisateur existe en base
      const findUser = await User.findOne({ phoneNumber });
      if (!findUser) {
        console.log("L'utilisateur n'existe pas");
        return res.status(401).json({
          text: "L'utilisateur n'existe pas"
        });
      }
      if (!findUser.authenticate(password)) {
        console.log("Mot de passe incorrect");
        return res.status(401).json({
          text: "Mot de passe incorrect"
        });
      }

      // assigne l'user à la session
      req.session.user = findUser;
      req.session.save();

      console.log("Connexion réussie !");

      return res.status(200).json({
        token: findUser.getToken(),
        session: JSON.stringify(req.session.user),
        text: "Authentification réussie !"
      });
    } catch (error) {
      console.log("error login (lib.js): " + error);
    }
  },

  logout(req, res) {
    req.session.destroy();
    res.status(200).json({ message: "Logout Successfully!" });
  },

  addToCart(req, res) {},

  removeFromCart(req, res) {},

  createProduct(req, res) {
    let productTitle,
      productDesc,
      productPrice,
      productCategory,
      authorNb = "";
    let productTags = [];
    let productPics = null;

    const form = formidable({
      encoding: "utf-8",
      multiples: true,
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024 // (4MB)
    });

    form.parse(req, function(err, fields, files) {
      if (err) console.log("error parsing", err);

      let { title, description, price, category, tags, authorNumber } = fields;
      let { pictures } = files;

      productTitle = title;
      productDesc = description;
      productPrice = price;
      productCategory = category;
      productTags = tags;
      authorNb = authorNumber.slice(1);

      productPics = pictures;
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

    form.on("end", function(err, fields, files) {
      if (err) throw err;

      let newPath = path.join(
        __dirname,
        "../../client/public/uploads/",
        authorNb,
        productTitle, '/'
      );
      console.log("new path", newPath);

      if (
        !fs.existsSync(newPath, function(err) {
          if (err) throw err;
        })
      )
        fs.mkdirSync(newPath, { recursive: true });

      console.log("end number", authorNb);
      console.log("end title", productTitle);
      console.log("end desc", productDesc);
      console.log("end price", productPrice);
      console.log("end category", productCategory);
      console.log("end tags", productTags);

      /* Copie des fichiers uploadés depuis le dossier temporaire
      au dossier public/upload/{authorNumber}/{productTitle} */
      console.log("Nb files to upload", this.openedFiles.length);
      for (let i = 0; i < this.openedFiles.length; i++) {
        let tempPath = this.openedFiles[i].path;
        let fileName = this.openedFiles[i].name;

        console.log("temp path", tempPath);
        console.log("file name", fileName);
        this.openedFiles[i].path = path.join("uploads", authorNb, productTitle, fileName)

        fse.move(tempPath, newPath + fileName, { overwrite: true }, function(
          err
        ) {
          if (err) console.error(err);

          console.log("success!");
        });
      }

      /* Config to insert in database */
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

      let newProduct = new Product({
        pictures: productPics,
        title: productTitle,
        description: productDesc,
        price: productPrice,
        category: productCategory,
        tags: productTags,
        authorNumber: authorNb
      });

      // saving the new product in Product table
      try {
        newProduct.save();
      } catch (error) {
        console.log(error);
      }

      // saving the new product in the User table (field myProducts)
      let filter = { phoneNumber: "+" + authorNb };
      let update = { myProducts: newProduct };
      User.findOneAndUpdate(filter, { $push: update }, { new: true }, function(
        err,
        doc
      ) {
        if (err) console.log("error", err);
        console.log("doc", doc);
      });
      /* end of database processing */

      res.status(200).json({ product: newProduct });
    });
  },

  getMyProducts(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(401).json({
        text: "Numéro de téléphone non reconnu."
      });
    }

    User.findOne({ phoneNumber: phoneNumber }, "myProducts", function(
      err,
      user
    ) {
      if (err) console.log("Error getMyProducts ids", err);

      //console.log("return ids from getMyProducts", user.myProducts);
      Product.find({ _id: { $in: user.myProducts } }, function(
        err,
        myProductsData
      ) {
        if (err) console.log("Error getMyProducts data", err);

        //console.log("return from getMyProducts data", myProductsData);
        res.status(200).send(myProductsData);
      });
    });
  },

  updateProduct(req, res) {
    const { id } = req.params;

    const form = formidable({
      encoding: "utf-8",
      multiples: true,
      uploadDir: "./client/public/uploads/",
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024 // (4MB)
    });

    let oldProductTitle = "";
    let productTitle = "";
    let authorNumber = "";

    form
      .on("error", function(err) {
        if (err) {
          console.log("an error has occured with form upload");
          console.log(err);
          req.resume();
        }
      })

      .on("field", function(field, value) {
        if (field === "oldTitle") oldProductTitle = value;
        if (field === "title") productTitle = value;
        if (field === "authorNumber") authorNumber = value.substr(1);

        let pathToRename = path.join(
          __dirname,
          "../../",
          form.uploadDir,
          authorNumber,
          oldProductTitle
        );

        let pathToUpload = path.join(
          __dirname,
          "../../",
          form.uploadDir,
          authorNumber,
          productTitle
        );

        if (oldProductTitle && productTitle && authorNumber) {
          console.log("Gonna empty", pathToRename);
          fse.emptyDirSync(pathToRename);
          if (pathToUpload !== pathToRename) {
            console.log("Renaming to", pathToUpload);
            fs.renameSync(pathToRename, pathToUpload);
          } else {
            console.log(
              "Not renaming cause the title hasn't changed!",
              pathToUpload
            );
          }
        }
      })

      .on("file", function(name, file) {
        console.log("pathToUpload", pathToUpload);

        let desiredPath = path.join(pathToUpload, file.name);
        console.log("desiredPath", desiredPath);

        fs.rename(file.path, desiredPath, function(err) {
          if (err) {
            throw err;
          } else {
            console.log("Successfully renamed the file!", file.path);
          }
        });

        file.path = path.join("uploads", authorNumber, productTitle, file.name);
      })

      .on("progress", function(bytesReceived, bytesExpected) {
        var percent = ((bytesReceived / bytesExpected) * 100) | 0;
        console.log("Uploading: %" + percent + "\r");
      });

    form.parse(req, (err, fields, files) => {
      if (err) {
        throw err;
      }

      let { title, description, price, category, tags } = fields;
      let { pictures } = files;

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

      Product.findById(id).exec((err, product) => {
        if (err) console.log("Error updateProduct: ", err);
        product.pictures = pictures;
        product.title = title;
        product.description = description;
        product.price = price;
        product.category = category;
        product.tags = tags;

        product.save();
        res.status(200).json({ product });
      });
    });
  },

  deleteProduct(req, res) {
    const { id } = req.params;

    Product.deleteOne({ _id: id }).exec((err, product) => {
      if (err) console.log("Delete One Error: ", err);
      res.status(200).json({ product });
    });
  }
};
