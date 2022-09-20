const Tweets = require('../models/Tweets')

module.exports = {
  getTweets: async (req, res) => {
    console.log(req.user)
    try {
      const tweet = await Tweets.find({})
      // const itemsLeft = await Tweets.countDocuments({ userId: req.user.id, completed: false })
      // console.log('val = ', tweet)
      res.render('tweets.ejs', { tweets: tweet })

      // , left: itemsLeft, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getProfile: async (req, res) => {
    console.log(req.user)
    try {
      const tweet = await Tweets.find({})
      res.render('profile.ejs', { tweets: tweet })

      // , left: itemsLeft, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  createTweets: async (req, res) => {
    try {
      console.log(req.body)
      await Tweets.create({ tweet: req.body.tweet, likeCount: 0, userId: req.user.id })
      console.log('Tweet has been added!')
      res.redirect('/tweets')
    } catch (err) {
      console.log(err)
    }
  },
  likeTweet: async (req, res) => {
    try {
      await Tweets.findOneAndUpdate({ _id: req.body.todoIdFromJSFile }, {
        $inc: {
          likeCount: 1
        }
      })
      console.log('tweet liked')
      res.json('Tweet liked')
    } catch (err) {
      console.log(err)
    }
  },
  markIncomplete: async (req, res) => {
    try {
      await Tweets.findOneAndUpdate({ _id: req.body.TweetIdFromJSFile }, {
        completed: false
      })
      console.log('Marked Incomplete')
      res.json('Marked Incomplete')
    } catch (err) {
      console.log(err)
    }
  },
  deleteTweets: async (req, res) => {
    console.log(req.body.tweetIdFromJSFile)
    try {
      await Tweets.findOneAndDelete({ _id: req.body.tweetIdFromJSFile })
      console.log('Deleted Tweets')
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  }
}