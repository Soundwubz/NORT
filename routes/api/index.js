const router = require("express").Router(),
     userRoutes = require("./user"),
     loginRoutes = require("./user");

// Book routes
router.use("/user", userRoutes);
router.use("/login", loginRoutes);

module.exports = router;
