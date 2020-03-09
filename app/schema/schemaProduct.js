const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  idProduct: { type: Schema.Types.ObjectId, index: true },
  image: { data: Buffer, contentType: String },
  imagePath: { type: String },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: [],
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
