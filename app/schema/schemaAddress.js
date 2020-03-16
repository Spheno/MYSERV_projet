const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  zipcode: { type: Number, required: true }
});

module.exports = mongoose.model("Address", addressSchema);
