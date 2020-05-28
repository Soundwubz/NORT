const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

const topTime = new Schema({
    userId: {type: String, required: true},
    difficulty: {type: String, required: true},
    time: {type: Number, required: true}
});

const TopTime = mongoose.model("TopTime", topTime);

module.exports = TopTime;