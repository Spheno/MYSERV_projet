var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }], // list of products
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true }, // shipping address
  source: String,
  amount: Number,
  currency: String
});

module.exports = mongoose.model("Order", orderSchema);
