const express = require("express"),
 routes = require("./routes"),
 app = express(),
 bodyParser = require("body-parser"),
 session = require('express-session'),
 passport = require('passport'),
 mongoose = require('mongoose'),
 cors = require('cors'),
 PORT = process.env.PORT || 3001;

require('./passport')

// Define middleware here
app.use(cors({origin: true}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "cats", maxAge: 24 * 60 * 60 * 1000 }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nort");

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
