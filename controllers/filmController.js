const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Получить все фильмы
exports.getAllFilms = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    try {
        const films = await models.film.findAll({
            limit: parseInt(limit),
            offset: offset,
        });
        res.status(200).json(films);
    } catch (error) {
        console.error("Error fetching films:", error);
        res.status(500).json({
            message: "An error occurred while fetching films",
        });
    }
};

// Получить фильм по ID
exports.getFilmById = async (req, res) => {
    const { id } = req.params;
    try {
        const film = await models.film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: "Film not found" });
        }
        res.status(200).json(film);
    } catch (error) {
        console.error("Error fetching film by ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching the film",
        });
    }
};

// Создать новый фильм
exports.createFilm = async (req, res) => {
    const {
        title,
        description,
        release_year,
        language_id,
        original_language_id,
        rental_duration,
        rental_rate,
        length,
        replacement_cost,
        rating,
        special_features,
    } = req.body;
    try {
        const film = await models.film.create({
            title,
            description,
            release_year,
            language_id,
            original_language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
        });
        res.status(201).json(film);
    } catch (error) {
        console.error("Error creating film:", error);
        res.status(500).json({
            message: "An error occurred while creating the film",
        });
    }
};

// Обновить фильм по ID
exports.updateFilm = async (req, res) => {
    const { id } = req.params;
    const {
        title,
        description,
        release_year,
        language_id,
        original_language_id,
        rental_duration,
        rental_rate,
        length,
        replacement_cost,
        rating,
        special_features,
    } = req.body;
    try {
        const film = await models.film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: "Film not found" });
        }
        await film.update({
            title,
            description,
            release_year,
            language_id,
            original_language_id,
            rental_duration,
            rental_rate,
            length,
            replacement_cost,
            rating,
            special_features,
        });
        res.status(200).json(film);
    } catch (error) {
        console.error("Error updating film:", error);
        res.status(500).json({
            message: "An error occurred while updating the film",
        });
    }
};

// Удалить фильм по ID
exports.deleteFilm = async (req, res) => {
    const { id } = req.params;
    try {
        const film = await models.film.findByPk(id);
        if (!film) {
            return res.status(404).json({ message: "Film not found" });
        }
        await film.destroy();
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting film:", error);
        res.status(500).json({
            message: "An error occurred while deleting the film",
        });
    }
};

// Поиск фильмов по названию
exports.searchFilmsByTitle = async (req, res) => {
    const { title } = req.params;
    try {
        const films = await models.film.findAll({
            where: {
                title: {
                    [Sequelize.Op.iLike]: `%${title}%`, // Поиск без учета регистра
                },
            },
        });
        res.status(200).json(films);
    } catch (error) {
        console.error("Error searching films by title:", error);
        res.status(500).json({
            message: "An error occurred while searching for films",
        });
    }
};

// Получить количество фильмов
exports.getFilmCount = async (req, res) => {
    try {
        const count = await models.film.count(); // Используем метод count() Sequelize
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting film count:", error);
        res.status(500).json({
            message: "An error occurred while getting the film count",
        });
    }
};

// Поиск фильмов по языку
exports.getFilmsByLanguageId = async (req, res) => {
    const { language_id } = req.params;
    try {
        const films = await models.film.findAll({
            where: { language_id },
        });
        res.status(200).json(films);
    } catch (error) {
        console.error("Error fetching films by language ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching films by language ID",
        });
    }
};

// Поиск фильмов по категории
exports.getFilmsByCategoryId = async (req, res) => {
    const { category_id } = req.params;
    try {
        const films = await models.film_category.findAll({
            where: { category_id },
            include: [{ model: models.film, as: "film" }],
        });
        res.status(200).json(films);
    } catch (error) {
        console.error("Error fetching films by category ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching films by category ID",
        });
    }
};
