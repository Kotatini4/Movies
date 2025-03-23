const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database");
const initModels = require("../models/init-models");
const models = initModels(db);

// Регистрация пользователя
exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await models.user.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const user = await models.user.create({
            username,
            password,
        });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

// Логин пользователя
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await models.user.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Используйте метод comparePassword для сравнения паролей
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user.user_id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Выводим токен в консоль
        console.log("Generated token:", token);

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};
