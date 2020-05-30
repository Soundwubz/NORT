const express = require("express"),
 routes = require("./routes"),
 app = express(),
 bodyParser = require("body-parser"),
 path = require('path'),
 session = require('express-session'),
 passport = require('passport'),
 mongoose = require('mongoose'),
 cors = require('cors'),
 PORT = process.env.PORT || 3001;

 require('dotenv').config();
 require('./passport');

let corsOpt;
if(PORT === 3001) {
  corsOpt = {origin: true}
} else {
  corsOpt = {origin: false}
}
// Define middleware here
app.use(cors(corsOpt));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: "tron", resave: false, saveUninitialized: false, maxAge: 24 * 60 * 60 * 1000 }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('client/build'));
// app.get('*', function(req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Add routes, both API and view
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nort", { useFindAndModify: false });

// Start the API server
app.listen(PORT, function() {
  console.log(`allow-origin: ${corsOpt.origin}`);
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

