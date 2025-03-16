const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Get all movie categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await models.category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching movie categories",
        });
    }
};

// Create a new movie category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await models.category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating a movie category",
        });
    }
};

// Get movie category information by ID
exports.getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await models.category.findByPk(id);
        if (!category) {
            return res
                .status(404)
                .json({ message: `Movie category with ${id} not found` });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message:
                "An error occurred while fetching movie category information",
        });
    }
};

// Update movie category information
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const category = await models.category.findByPk(id);
        if (!category) {
            return res
                .status(404)
                .json({ message: "Movie category not found" });
        }
        await category.update({ name });
        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating movie category",
        });
    }
};

// Delete a movie category
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await models.category.findByPk(id);
        if (!category) {
            return res
                .status(404)
                .json({ message: "Movie category not found" });
        }
        await category.destroy();
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting movie category",
        });
    }
};

exports.getCategoryCount = async (req, res) => {
    try {
        // Используем метод count() Sequelize для подсчёта количества записей
        const count = await models.category.count();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting category count:", error);
        res.status(500).json({
            message: "An error occurred while getting category count",
        });
    }
};

//
exports.searchCategoriesByName = async (req, res) => {
    const { name } = req.params; // Используем req.params
    try {
        const categories = await models.category.findAll({
            where: {
                name: {
                    [Sequelize.Op.iLike]: `%${name}%`,
                },
            },
        });
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while searching for categories",
        });
    }
};
