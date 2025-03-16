const express = require("express");
const app = express();
const sequelize = require("./config/database"); // Импортируем sequelize
const categoryRoutes = require("./routes/categoryRoutes");
const actorRoutes = require("./routes/actorRoutes");
//const filmActorRoutes = require("./routes/film_actorRoutes");
//const filmCategoryRoutes = require("./routes/film_categoryRoutes");
const filmRoutes = require("./routes/filmRoutes");

// Middleware для парсинга JSON
app.use(express.json());

// Подключаем маршруты
app.use("/api", categoryRoutes);
app.use("/api", actorRoutes);
//app.use("/api", filmActorRoutes);
//app.use("/api", filmCategoryRoutes);
app.use("/api", filmRoutes);

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

// Базовая обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});
