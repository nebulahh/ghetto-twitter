const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
  tweet: {
    type: String,
    required: true,
    trim: true
  },
  likeCount: {
    type: Number,
    required: false,
  },
  likes: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('tweets', TodoSchema)
