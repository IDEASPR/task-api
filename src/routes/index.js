const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const userRoutes = require("./userRoutes");

// Define a named route for the home endpoint
router.get("/home", homeController.home);

router.use("/users", userRoutes);

module.exports = router;
