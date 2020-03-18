const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  idProduct: { type: Schema.Types.ObjectId, index: true },
  imagePath: { type: String },
  title: { type: String, required: true },
  pictures: [],
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  tags: [],
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
