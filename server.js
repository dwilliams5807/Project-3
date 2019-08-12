/* eslint-disable no-undef */
//require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require("./routes");

// var passport = require("passport");
// var session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);
// // For Passport
// app.use(session({ secret: "keyboard cat",resave: true, saveUninitialized:true})); // session secret
 
// app.use(passport.initialize());
 
// app.use(passport.session()); // persistent login sessions



// Routes
// app.use('/users', require('./apiauthentication/routes/users'));


var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}
//Connect to Mongoose:
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/PoliticalRace");

// Starting the server, syncing our models ------------------------------------/
  app.listen(PORT, function (err) {
    if (!err) {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    }
    else{console.log(err, "Something went wrong with the possport db update");}
  });
// });

module.exports = app;
