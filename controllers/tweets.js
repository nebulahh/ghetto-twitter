const Tweets = require('../models/Tweets')
const Comment = require("../models/Comment");

module.exports = {
  getTweets: async (req, res) => {
    console.log(req.user)
    try {
      const tweet = await Tweets.find({})
      console.log(tweet);
      // const itemsLeft = await Tweets.countDocuments({ userId: req.user.id, completed: false })
      // console.log('val = ', tweet)
      res.render('tweets.ejs', { tweets: tweet, user: req.user.userName })
      // , left: itemsLeft, user: req.user })
    } catch (err) {
      console.log(err)
    }
  },
  getTweet: async (req, res) => {
    try {
      const post = await Tweets.findById(req.params.id); //.id is the variable from the route
      console.log(post);
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("post.ejs", { post: post, user: req.user.userName, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  getProfile: async (req, res) => {
    console.log(req.user)
    try {
      const tweet = await Tweets.find({})
      res.render('profile.ejs', { tweets: tweet, user: req.user.userName })

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
    console.log(req.body.todoIdFromJSFile)
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
  deleteTweets: async (req, res) => {
    console.log(req.body.tweetIdFromJSFile)
    try {
      await Tweets.findOneAndDelete({ _id: req.body.tweetIdFromJSFile })
      console.log('Deleted Tweets')
      // res.redirect('/tweets')
      
      
      res.redirect(303, "/tweets");
      // location.reload(); 
      // window.location.reload();
      // res.render('tweets.ejs', { tweets: tweet, user: req.user.userName })
      res.json('Deleted It')
    } catch (err) {
      console.log(err)
    }
  }
}