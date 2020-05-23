const mongoose = require("mongoose"),
    bcrypt = require('bcryptjs'),
    salt = bcrypt.genSaltSync(8),
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
        return bcrypt.hashSync(plainTextPassword, 10)
    }
};

// pre-hooks for save method
userSchema.pre('save', function (next) { 
    if (!this.password) { 
        console.log('models/user.js ===> NO PASSWORD')
        next() 
    } else { 
        console.log('models/user.js hashPassword in pre save');
        this.password = this.hashPassword(this.password)
        next()
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;