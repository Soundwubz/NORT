const router = require("express").Router(),
     userRoutes = require("./user"),
     loginRoutes = require("./login"),
     logoutRoutes = require('./logout');

// Book routes
router.use("/user", userRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);


module.exports = router;
