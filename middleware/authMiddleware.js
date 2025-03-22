// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    // Извлекаем токен из заголовка Authorization
    const token = req.header("Authorization")?.replace("Bearer ", "");

    // Если токен отсутствует, возвращаем ошибку 401
    if (!token) {
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    }

    try {
        // Проверяем токен с помощью секретного ключа
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Сохраняем идентификатор пользователя в объекте запроса
        req.userId = decoded.userId;

        // Передаем управление следующему middleware или контроллеру
        next();
    } catch (error) {
        // Если токен невалиден, возвращаем ошибку 400
        res.status(400).json({ message: "Invalid token." });
    }
};
