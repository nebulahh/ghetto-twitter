const express = require('express')
const router = express.Router()
const tweetsController = require('../controllers/tweets') 
const { ensureAuth } = require('../middleware/auth')

router.get("/:id", ensureAuth, tweetsController.getTweet);

router.put('/likeTweet', tweetsController.likeTweet)

router.delete('/deleteTweet', tweetsController.deleteTweets)

module.exports = router