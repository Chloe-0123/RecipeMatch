const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("express-flash");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const mainroutes = require('./routes/main')



require('dotenv').config()
const PORT = process.env.PORT || 3001;
const axios = require('axios')
const app = express();
app.use(cors());

require("./config/passport")(passport);

// Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Logging
app.use(logger("dev"));

// Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Use flash messages for errors, info, ect...
app.use(flash());

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
  
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
      console.log("listening for requests");
  })
})

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/', mainroutes)


app.get('/api/recipes', async (req, res) => {
    try {
        const { ingredients } = req.query;
        const apiKey = '1978a1bb91a74a599f875577b2e96804';
        const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&apiKey=${apiKey}`;
        const response = await axios.get(apiUrl);
        res.json(response.data);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
});


app.get('/api/ingredients', async (req, res) => {
  try {
    console.log('went thru')
    const { ingredient } = req.query
    console.log(ingredient)
    const apiKey = '1978a1bb91a74a599f875577b2e96804';
    const apiUrl = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=${apiKey}&query=${ingredient}&number=5`
    const response = await axios.get(apiUrl)
    res.json(response.data)
    console.log(response.data)
  } catch (error) {
    console.error(error);
        res.status(500).json({ message: 'Server error while loading autocomplete ingredients' });
  }
})
