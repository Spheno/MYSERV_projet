const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  imagePath: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: {type: String, required: true},
  tags: {type: Array}
});

module.exports = mongoose.model("Product", schema);
