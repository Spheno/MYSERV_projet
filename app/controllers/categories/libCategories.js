/*
    Contiendra les fonctions de :,
      - de récupération de toutes les catégories;
      - de récupération d'une catégorie.
*/
const Category = require("../../schema/schemaCategory");
const Product = require("../../schema/schemaProduct");

module.exports = {
  getAllCategories(req, res, next) {
    Category.find()
      .distinct("title")
      .exec(function(err, categories) {
        if (err) return console.log(err);
        res.status(200).json(categories);
      });
  },

  //display all products in a specific Category
  getCategory(req, res, next) {
    Category.findOne({ title: req.params.category }, function(err, category) {
      if (err) return console.log(err);
      Product.find({ category: category.title }, function(err, products) {
        if (err) return console.log(err);
        res.status(200).json(products);
      });
    });
  }
};