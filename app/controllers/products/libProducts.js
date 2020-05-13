/*
    Contiendra les fonctions de :,
      - de récupération de tous les produits;
      - de récupération d'un produit.
*/
const Product = require("../../schema/schemaProduct");
const Comment = require("../../schema/schemaComment");

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
  },

  async addProductComment(req, res) {
    const { author, ratings, content, productID } = req.body;

    const newComment = {
      author,
      ratings,
      content
    };

    try {
      const commentData = new Comment(newComment);
      let commentObject = await commentData.save();
      console.log("commentObject (lib.js): " + commentObject);

      Product.findById(productID, function(err, product) {
        if (err) console.log(err);

        product.reviews.push(commentObject._id);
        product.save();
      });

      return res.status(200).json({
        text: "Good job: Comment saved successfully! :)"
      });
    } catch (error) {
      console.log("error comment save (lib.js): " + error);
    }
  },

  async getProductComments(req, res) {
    const { productID } = req.query;

    if (!productID) {
      return res.status(401).json({ text: "product ID not found." });
    }

    let data = [];
    const product = await Product.findById(productID);
    if (!product) return res.status(401).json({ text: "product not found." });

    const promises = product.reviews.map(async reviewID => {
      const review = await Comment.findById(reviewID);

      console.log("review", review);

      if(review) data.push(review);
    });

    await Promise.all(promises)
    return res.status(200).json({ reviews: data });
  },

  async deleteProductComment(req, res) {
    const { reviewID, productID } = req.query;
    console.log("req query", req.query);

    if (!reviewID)
      res.status(401).json({ text: "No specified review ID." });

    if (!productID) res.status(401).json({ text: "No product ID given." });

    let condition = { _id: productID };
    let removeFilter = {
      $pull: {
        reviews: reviewID
      }
    };

    await Comment.findOneAndDelete({ _id: reviewID})

    await Product.updateOne(condition, removeFilter, function(err, product) {
      if (err) console.log("Error remove product comment", err);

      res.status(200).send("Comment removed!");
    });
  },
};
