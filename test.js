const db = require("./config/database");
const { Sequelize } = require("sequelize");
const initModels = require("./models/init-models");
const models = initModels(db);

(async () => {
    try {
        // Подключаемся к базе данных
        await db.authenticate();
        console.log(
            "Connection to the database has been established successfully."
        );

        // Выполняем тестовый запрос
        const films = await models.film_category.findAll({
            where: { category_id: 1 }, // Ищем записи с category_id = 1
            include: [{ model: models.film, as: "film" }], // Включаем связанную модель film
        });

        // Логирование результата
        console.log(
            "Films with category ID 1:",
            JSON.stringify(films, null, 2)
        );
    } catch (error) {
        // Логирование ошибок
        console.error("Error during test:", error);
    } finally {
        // Закрываем соединение с базой данных
        await db.close();
        console.log("Database connection closed.");
    }
})();
