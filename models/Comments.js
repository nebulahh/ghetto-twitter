const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post", //here we are referencing our "User" model from our User schema
  },
  createdBy: {
    type: String,
    ref: "User",
  },
  createdById: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("comments", CommentSchema);
