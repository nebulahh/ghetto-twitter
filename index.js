const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const methodOverride = require("method-override");
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const tweetRoutes = require('./routes/tweets')
const postRoutes = require('./routes/post')
const commentRoutes = require("./routes/comments");

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))

//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/tweets', tweetRoutes)
app.use('/getTweet', postRoutes)
app.use("/comment", commentRoutes);


 
app.listen(process.env.PORT, ()=>{
    console.log(`Server is running ${process.env.PORT}, you better catch it!`)
})    