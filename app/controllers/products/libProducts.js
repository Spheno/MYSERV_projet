/*
    Contiendra les fonctions de :,
      - de récupération de tous les produits;
      - de récupération d'un produit.
*/
const Product = require("../../schema/schemaProduct");

module.exports = {
  getAllProducts(req, res, next) {
    Product.find().exec(function(err, products) {
      if (err) return console.log(err);

      res.status(200).json(products);
    });
  },

  getProductByID(req, res) {
    const { id } = req.query;

    Product.findOne({ _id: id }, function(err, product) {
      if (err) console.log("Error getProductByID id", err);

      res.status(200).send(product);
    });
  },

  // the products that are still on sale and not published by the user
  getProductsOnSale(req, res) {
    const { phoneNumber } = req.query;
    Product.find({ authorNumber: { $ne: phoneNumber }, sold: false }).exec(function(err, products) {
      if(err) return console.log(err);

      res.status(200).json(products);
    })
  }
};
