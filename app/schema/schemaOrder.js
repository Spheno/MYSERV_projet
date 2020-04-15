var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  cart: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // list of products
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true }, // address of shipment
  paymentId: { type: String, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
