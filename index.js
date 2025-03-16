const express = require("express");
const app = express();
const sequelize = require("./config/database"); // Импортируем sequelize
const categoryRoutes = require("./routes/categoryRoutes");

// Middleware для парсинга JSON
app.use(express.json());

// Подключаем маршруты
app.use("", categoryRoutes);

// Порт, на котором будет работать сервер
const PORT = process.env.PORT || 3000;

// Синхронизация базы данных и запуск сервера
sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Unable to sync database:", error);
    });
