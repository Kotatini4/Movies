const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Get all film and category relationships
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

// Get film and category relationship by ID
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

// Create a new film and category relationship
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

// Update film and category relationship by ID
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

// Delete film and category relationship by ID
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

exports.getFilmsByCategoryId = async (req, res) => {
    try {
        const { category_id } = req.params;
        const categoryId = parseInt(category_id, 10);

        // Проверка, что categoryId является числом
        if (isNaN(categoryId)) {
            return res.status(400).json({ message: "Invalid category ID." });
        }

        // Получаем параметры пагинации из запроса
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;

        // Выполняем запрос с пагинацией
        const films = await models.film_category.findAll({
            where: { category_id: categoryId },
            include: [{ model: models.film, as: "film" }],
            limit: parseInt(limit), // Количество записей на странице
            offset: parseInt(offset), // Смещение для пагинации
        });

        // Если фильмы не найдены, вернуть 404
        if (films.length === 0) {
            return res
                .status(404)
                .json({ message: "No films found for this category." });
        }

        // Возвращаем найденные фильмы
        res.status(200).json(films);
    } catch (error) {
        console.error("Error retrieving films by category ID:", error);
        res.status(500).json({
            message: "An error occurred while retrieving films.",
        });
    }
};

// Get categories by film ID
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
