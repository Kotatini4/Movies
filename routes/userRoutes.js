const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

// Получить всех пользователей
router.get("/user", userController.getAllUsers);

// Получить пользователя по ID
router.get("/user/:id", userController.getUserById);

// Создать нового пользователя
// router.post("/user", userController.createUser);

// Обновить пользователя по ID
router.put("/user/:id", auth, userController.updateUser);

// Удалить пользователя по ID
router.delete("/user/:id", auth, userController.deleteUser);

module.exports = router;
