const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  imagePath: { type: String },
  title: { type: String, required: true },
  pictures: [],
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  tags: [],
  sold: { type: Boolean, default: false },
  authorNumber: { type: String, required: true },

  // commentaires/reviews du produit
  reviews: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
