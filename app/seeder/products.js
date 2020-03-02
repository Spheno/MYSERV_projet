const express = require("express");
const router = express.Router();
const faker = require("faker");
const Product = require("../schema/schemaProduct");
const Category = require("../schema/schemaCategory");

router.get("/", function(req, res, next) {
  const categories = [
    "Baby",
    "Movies",
    "Shoes",
    "Books",
    "Electronics",
    "Computers",
    "Kids"
  ];
  for (let i = 0; i < 20; i++) {
    let product = new Product({
      imagePath:
        "https://images-na.ssl-images-amazon.com/images/I/4196ru-rkjL.jpg",
      title: faker.commerce.productName(),
      description: faker.lorem.paragraph(),
      price: faker.commerce.price(),
      category: categories[Math.floor(Math.random() * categories.length)],
      tags: faker.commerce.productMaterial()
    });

    product.save();
  }
  for (let i = 0; i < categories.length; i++) {
    let cat = new Category({
      title: categories[i]
    });
    cat.save();
  }
  res.redirect("/");
});

module.exports = router;
