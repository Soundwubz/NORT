var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

var db = require('./models');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    db.User.findOne({
        where: {
            id: id
        }
    })
    .then(user => {        
        done(null, user);
    })
    .catch(err => {
        done(err);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
    }
));



module.exports = {
    passport: passport
}