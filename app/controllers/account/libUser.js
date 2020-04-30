/*
    Contiendra les fonctions de :
      - connexion, de création de compte et de déconnexion,
      - d'ajout/modification/suppression de produit,
      - d'ajout/suppresion d'un produit au panier,
*/
const User = require("../../schema/schemaUser");
const Product = require("../../schema/schemaProduct");
const bcrypt = require("bcrypt");
const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");

const SALT_ROUNDS = 10;

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

    let hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Création d'un objet user, dans lequel on hash le mot de passe
    const user = {
      firstname,
      lastname,
      email,
      phoneNumber,
      password: hashedPassword,
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
      if (!bcrypt.compareSync(password, findUser.password)) {
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

  getUser(req, res) {
    const { id, phoneNumber } = req.query;
    let search = null;

    if (id) search = id;
    else if (phoneNumber) search = phoneNumber;
    else res.status(401).json({ text: "No id or phoneNumber provided" });

    if (id) {
      User.findById(search, "-password").exec((err, user) => {
        if (err) throw err;

        res.status(200).json({ user });
      });
    } else {
      User.findOne({ phoneNumber: search }, "-password").exec((err, user) => {
        if (err) throw err;

        res.status(200).json({ user });
      });
    }
  },

  editUser(req, res) {
    const { id, firstName, lastName, oldPassword, password } = req.body;

    User.findById(id).exec((err, user) => {
      if (err) throw err;

      if (!bcrypt.compareSync(oldPassword, user.password)) {
        console.log("Ancien mot de passe incorrect");
        return res.status(401).json({
          text: "Ancien mot de passe incorrect"
        });
      }

      if (firstName) user.firstname = firstName;
      if (lastName) user.lastname = lastName;
      if (password) {
        console.log(password);
        user.password = bcrypt.hashSync(password, SALT_ROUNDS);
      }

      user.save();
      res.status(200).json({ user });
    });
  },

  getMyCart(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber)
      res.status(401).json({ text: "No specified phone number" });

    if (phoneNumber && phoneNumber.charAt(0) !== "+")
      res
        .status(401)
        .json({ text: "Specified phone number must begin with character +" });

    User.findOne({ phoneNumber: phoneNumber }, "cart", function(err, cart) {
      if (err) console.log("Error getMyCart", err);

      if (cart) {
        res.status(200).send(cart.cart);
      } else {
        res.status(401).json({
          text: "Nothing in cart."
        });
      }
    });
  },

  addToCart(req, res) {
    const { productID, buyerPhoneNumber } = req.body;

    if (!productID)
      return res.status(401).json({ text: "No product ID given." });
    if (!buyerPhoneNumber)
      return res.status(401).json({ text: "No buyer phone number given." });
    if (buyerPhoneNumber.charAt(0) !== "+")
      return res
        .status(401)
        .json({ text: "Specified phone number must begin with character +" });

    Product.findOne({ _id: productID }, function(err, product) {
      if (err) console.log("Error addToCart ids", err);

      //console.log("return product from addToCart", product);
      product.save();

      // saving the new product in the User table (field myProducts)
      let filter = { phoneNumber: buyerPhoneNumber };
      let update = {
        $addToSet: { cart: product }
      };

      User.findOneAndUpdate(filter, update, function(err, doc) {
        if (err) console.log("error", err);
        console.log("doc", doc);
      });
      /* end of database processing */

      //console.log("return from addToCart data", buyerUser);
      res.status(200).send({ product });
    });
  },

  removeFromCart(req, res) {
    const { productID, phoneNumber } = req.query;
    console.log("req query", req.query);

    if (!phoneNumber)
      res.status(401).json({ text: "No specified phone number." });
    if (phoneNumber.charAt(0) !== "+")
      res
        .status(401)
        .json({ text: "Specified phone number must begin with '+'." });
    if (!productID) res.status(401).json({ text: "No product ID given." });

    let condition = { phoneNumber: phoneNumber };
    let removeFilter = {
      $pull: {
        cart: productID
      }
    };

    User.updateOne(condition, removeFilter, function(err, user) {
      if (err) console.log("Error removeFromCart", err);

      res.status(200).send("Product removed from cart!");
    });
  },

  getMyFavs(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber)
      res.status(401).json({ text: "No specified phone number" });
    if (phoneNumber.charAt(0) !== "+")
      res
        .status(401)
        .json({ text: "Specified phone number must begin with character +" });

    User.findOne({ phoneNumber: phoneNumber }, "favorites", function(
      err,
      favs
    ) {
      if (err) console.log("Error getMyFavs", err);

      if (favs) {
        res.status(200).send(favs.favorites);
      } else {
        res.status(401).json({
          text: "Nothing in favs."
        });
      }
    });
  },

  addToFavs(req, res) {
    const { productID, favPhoneNumber } = req.body;

    if (!productID)
      return res.status(401).json({ text: "No product ID given." });
    if (!favPhoneNumber)
      return res.status(401).json({ text: "No phone number given." });
    if (favPhoneNumber.charAt(0) !== "+")
      return res
        .status(401)
        .json({ text: "Specified phone number must begin with character +" });

    Product.findOne({ _id: productID }, function(err, product) {
      if (err) console.log("Error addToCart ids", err);

      //console.log("return product from addToFavs", product);

      // saving the new product in the User table (field favorites)
      let filter = { phoneNumber: favPhoneNumber };
      let update = {
        $addToSet: { favorites: product }
      };

      User.findOneAndUpdate(filter, update, function(err, doc) {
        if (err) console.log("error", err);
        console.log("doc", doc);
      });
      /* end of database processing */

      res.status(200).send({ product });
    });
  },

  removeFromFavs(req, res) {
    const { phoneNumber, productID } = req.query;

    if (!phoneNumber)
      res.status(401).json({ text: "No specified phone number." });
    if (phoneNumber.charAt(0) !== "+")
      res
        .status(401)
        .json({ text: "Specified phone number must begin with '+'." });
    if (!productID) res.status(401).json({ text: "No product ID given." });

    let condition = { phoneNumber: phoneNumber };
    let removeFilter = {
      $pull: {
        favorites: productID
      }
    };

    User.updateOne(condition, removeFilter, function(err, user) {
      if (err) console.log("Error removeFromFavs", err);

      res.status(200).send("Product removed from favorites!");
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

  getMyProductsSold(req, res) {
    const { phoneNumber } = req.query;

    if (!phoneNumber) {
      return res.status(401).json({
        text: "Numéro de téléphone non reconnu."
      });
    }

    User.findOne({ phoneNumber: phoneNumber }, "sold", function(err, user) {
      if (err) console.log("Error getMySoldProducts ids", err);

      console.log("return ids from getMyProducts", user);

      if (user.sold.length === 0) {
        res.status(200).send({ sold: user.sold, text: "No products sold." });
      } else {
        /*
          TODO: parcourir les ID des produits vendus et récupérer les produits.
        */
      }
    });
  },

  deleteProduct(req, res) {
    const { productID } = req.query;

    Product.deleteOne({ _id: productID }).exec((err, product) => {
      if (err) console.log("Delete One Error: ", err);

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

          res.status(200).json({ product, user });
        }
      );
    });
  }
};
