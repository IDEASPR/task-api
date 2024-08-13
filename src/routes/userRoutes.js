// src/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Define CRUD routes for User resource
router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
