const express = require("express");
const router = express.Router();
const filmController = require("../controllers/userController");

// Получить всех пользователей
router.get("/user", userController.getAllUsers);

// Получить пользователя по ID
router.get("/user/:id", userController.getUserById);

// Создать нового пользователя
router.post("/user", userController.createUser);

// Обновить пользователя по ID
router.put("/user/:id", userController.updateUser);

// Удалить пользователя по ID
router.delete("/user/:id", userController.deleteUser);

// Поиск пользователей по имени
router.get("/user/search/:username", userController.searchUsersByUsername);

// Получить количество пользователей
router.get("/user/count", userController.getUserCount);

module.exports = router;

module.exports = router;
