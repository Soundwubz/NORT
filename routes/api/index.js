const router = require("express").Router(),
     userRoutes = require("./user"),
     loginRoutes = require("./login"),
     logoutRoutes = require('./logout'),
     gameRoutes = require('./game');

// Book routes
router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/game", gameRoutes);


module.exports = router;
