const router = require("express").Router();
const db = require('../../models');

// Matches "api/login"
router.route("/").post(
    (req, res, next) => {
        const {username, password} = req.body;
        if (!username) {
            return res.send({
                success: false,
                message: 'Error: Username cannot be blank.'
            });
        }
        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }
        db.User.findOne({username}, (err, user) => {
            if (err) {
                return res.send({
                  success: false,
                  message: 'Error: server error',
                  error: err
                });
            }
            if(user !== null) {
                if(!user.checkPassword(password)) {
                    return res.send({
                        success: false,
                        message: 'Error: Invalid Password',
                        inputPassword: password,
                        checkPass: user.checkPassword(password)
                    });
                }
                // Correct User Found
                const userSession = new db.UserSession();
                userSession.userId = user._id;
                userSession.save((err, doc) => {
                    if(err) {
                        return res.send({
                            success: false,
                            message: 'Error: server error',
                            error: err
                        });
                    }
                    return res.send({
                        success: true,
                        message: 'Valid sign in',
                        token: doc._id
                    })
                })
            } else {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Username'
                });
            }
        })
    }
);

module.exports = router;