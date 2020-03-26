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
    const form = formidable({
      encoding: "utf-8",
      multiples: true,
      uploadDir: "./client/public/uploads/",
      keepExtensions: true,
      maxFileSize: 4 * 1024 * 1024 // (4MB)
    });

    let productTitle = null;
    let authorNumber = null;

    form
      .on("error", function(err) {
        if (err) {
          console.log("an error has occured with form upload");
          console.log(err);
          req.resume();
        }
      })

      .on("field", function(field, value) {
        if (field === "title") productTitle = value;
        if (field === "authorNumber") authorNumber = value.substr(1);

        //console.log("title", productTitle);
        //console.log("number", authorNumber);
      })

      .on("file", function(name, file) {
        let newPath = path.join(__dirname, "../../", form.uploadDir, authorNumber, productTitle);
        
        if (
          !fs.existsSync(newPath, function(err) {
            if (err) throw err;
          })
        )
          fs.mkdirSync(newPath, { recursive: true });

        let desiredPath = path.join(newPath, file.name);
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

      let { title, description, price, category, tags, authorNumber } = fields;
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
      User.findOneAndUpdate(filter, { $push: update }, { new: true }, function(
        err,
        doc
      ) {
        if (err) console.log("error", err);
        //console.log("doc", doc);
      });

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
        console.log("typeProductsData", typeof(myProductsData))
        res.status(200).send(myProductsData);
      });
    });
  },

  updateProduct(req, res) {
    const { id } = req.query;

    const { pictures, title, description, price, category, tags } = req.body;

    Product.findById(id).exec((err, product) => {
      if (err) console.log("Error updateProduct: ", err);
      product.pictures = pictures ;
      product.title = title;
      product.description = description;
      product.price = price;
      product.category = category;
      product.tags = tags;

      product.save();
      res.status(200).json({ product });
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
