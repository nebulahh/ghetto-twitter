const express = require('express')
const router = express.Router()
const tweetsController = require('../controllers/tweets') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, tweetsController.getTweets)

router.get('/getProfile', tweetsController.getProfile)

router.post('/createTweets', tweetsController.createTweets)

router.put('/likeTweet', tweetsController.likeTweet)

router.put('/markIncomplete', tweetsController.markIncomplete)

router.delete('/deleteTweet', tweetsController.deleteTweets)

module.exports = router