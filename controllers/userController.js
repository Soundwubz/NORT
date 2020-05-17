const db = require("../models");

module.exports = {
    getUser: function(req, res) {
        if (req.user) {
            res.json({ user: req.user })
        } else {
            res.json({ user: null })
        }
    },
    findAll: function(req, res) {
        db.User
          .findAll()
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findByName: function(req, res) {
        const {username, password} = req.body;
        db.User
            .findOne({username: username})
            .then(user => res.json(user))
            .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
}