const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Получить всех пользователей
router.get("/user", userController.getAllUsers);

// Получить пользователя по ID
router.get("/user/:id", userController.getUserById);

// Создать нового пользователя
// router.post("/user", userController.createUser);

// Обновить пользователя по ID
router.put("/user/:id", userController.updateUser);

// Удалить пользователя по ID
router.delete("/user/:id", userController.deleteUser);

module.exports = router;
