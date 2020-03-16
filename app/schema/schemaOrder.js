var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  paymentId: { type: String, required: true }
});

module.exports = mongoose.model("Order", orderSchema);
