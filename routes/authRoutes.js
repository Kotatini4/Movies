const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

// Регистрация пользователя
router.post("/register", authController.register);

// Логин пользователя
router.post("/login", authController.login);

module.exports = router;
