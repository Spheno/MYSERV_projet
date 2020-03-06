/*
    Contiendra les fonctions de :,
      - de récupération de tous les produits;
      - de récupération d'un produit.
*/
const Product = require("../../schema/schemaProduct");

module.exports = {
  getAllProducts(req, res, next) {
    Product.find()
      .exec(function(err, products) {
        if (err) return console.log(err);
        res.status(200).json(products);
      });
  },

  getProduct(req, res, next) {
    const { id } = req.params;
    Product.findById(id).exec((err, product) => {
      if (err) return console.log("error getProductByID: ", err);

      console.log("success getProductByID!");
      res.status(200).json({ product });
    });
  }
};
