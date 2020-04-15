var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var soldSchema = new Schema({
  productsSold: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // list of products
  address: { type: Schema.Types.ObjectId, ref: "Address", required: true } // address of shipment
});

module.exports = mongoose.model("Sold", soldSchema);
