const router = require("express").Router(),
    passport = require('../../passport');

// Matches "api/login"
router.route("/").post(
    passport.authenticate('local', { failureRedirect: '/login'}), (req, res) => {
        res.redirect('/');
    }
)