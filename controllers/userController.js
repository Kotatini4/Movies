const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Получить всех пользователей
exports.getAllUsers = async (req, res) => {
    try {
        const users = await models.user.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            message: "An error occurred while fetching users",
        });
    }
};

// Получить пользователя по ID
exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await models.user.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user by ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching the user",
        });
    }
};

// Создать нового пользователя
exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await models.user.create({ username, password });
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "An error occurred while creating the user",
        });
    }
};

// Обновить пользователя по ID
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    try {
        const user = await models.user.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.update({ username, password });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({
            message: "An error occurred while updating the user",
        });
    }
};

// Удалить пользователя по ID
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await models.user.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({
            message: "An error occurred while deleting the user",
        });
    }
};
