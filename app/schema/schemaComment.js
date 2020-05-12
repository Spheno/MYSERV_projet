const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: { type: String, required: true },
  ratings: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Comment", commentSchema);
