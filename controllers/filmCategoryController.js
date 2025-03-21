const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Получить все связи между фильмами и категориями.
exports.getAllFilmCategories = async (req, res) => {
    try {
        const filmCategories = await models.film_category.findAll();
        res.status(200).json(filmCategories);
    } catch (error) {
        console.error(
            "Error retrieving film and category relationships:",
            error
        );
        res.status(500).json({
            message:
                "An error occurred while retrieving film and category relationships",
        });
    }
};

// Получить связь между фильмом и категорией по ID
exports.getFilmCategoryById = async (req, res) => {
    try {
        const { film_id, category_id } = req.params;
        const filmCategory = await models.film_category.findOne({
            where: { film_id, category_id },
        });
        if (filmCategory) {
            res.status(200).json(filmCategory);
        } else {
            res.status(404).json({
                message: "The film and category relationship was not found.",
            });
        }
    } catch (error) {
        console.error("Error retrieving film and category relationship", error);
        res.status(500).json({
            message:
                "An error occurred while retrieving the film and category relationship.",
        });
    }
};

// Создать новую связь между фильмом и категорией.
exports.createFilmCategory = async (req, res) => {
    try {
        const { film_id, category_id } = req.body;
        const newFilmCategory = await models.film_category.create({
            film_id,
            category_id,
        });
        res.status(201).json(newFilmCategory);
    } catch (error) {
        console.error("Error creating film and category relationship", error);
        res.status(500).json({
            message:
                "An error occurred while creating the film and category relationship",
        });
    }
};

// Обновить связь между фильмом и категорией по ID
exports.updateFilmCategory = async (req, res) => {
    try {
        const { film_id, category_id } = req.params;
        const [updated] = await models.film_category.update(req.body, {
            where: { film_id, category_id },
        });
        if (updated) {
            const updatedFilmCategory = await models.film_category.findOne({
                where: { film_id, category_id },
            });
            res.status(200).json(updatedFilmCategory);
        } else {
            res.status(404).json({
                message: "Film and category relationship not found",
            });
        }
    } catch (error) {
        console.error("Error updating film and category relationship:", error);
        res.status(500).json({
            message:
                "An error occurred while updating film and category relationship",
        });
    }
};

// Удалить связь между фильмом и категорией по ID
exports.deleteFilmCategory = async (req, res) => {
    try {
        const { film_id, category_id } = req.params;
        const deleted = await models.film_category.destroy({
            where: { film_id, category_id },
        });
        if (deleted) {
            res.status(204).json({
                message: "Film and category relationship deleted",
            });
        } else {
            res.status(404).json({
                message: "Film and category relationship not found",
            });
        }
    } catch (error) {
        console.error("Error deleting film and category relationship:", error);
        res.status(500).json({
            message:
                "An error occurred while deleting film and category relationship",
        });
    }
};

// Получить категорию по ID фильма.
exports.getCategoriesByFilmId = async (req, res) => {
    try {
        const { film_id } = req.params;
        const categories = await models.film_category.findAll({
            where: { film_id },
            include: [{ model: models.category, as: "category" }],
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error retrieving categories by film ID:", error);
        res.status(500).json({
            message: "An error occurred while retrieving categories by film ID",
        });
    }
};

// Получить фильмы по ID категории.
exports.getFilmsByCategoryId = async (req, res) => {
    const { category_id } = req.params;

    try {
        const films = await models.film_category.findAll({
            where: { category_id },
            include: [{ model: models.film, as: "film" }], // Включаем информацию о фильмах
        });
        // Если актеры не найдены, возвращаем пустой массив
        if (films.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(films);
    } catch (error) {
        console.error("Error fetching films by category ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching films by category ID",
        });
    }
};
