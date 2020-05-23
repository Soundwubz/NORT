const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods = {
    checkPassword: function (password) {
        return bcrypt.compareSync(password, this.password)
    },
    hashPassword: plainTextPassword => {
        return bcrypt.hashSync(plainTextPassword, 8)
    }
};

const User = mongoose.model("User", userSchema);

module.exports = User;