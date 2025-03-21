const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Получить всех актеров.
exports.getAllActors = async (req, res) => {
    try {
        const actors = await models.actor.findAll();
        res.status(200).json(actors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching actors",
        });
    }
};

// Создать нового актера.
exports.createActor = async (req, res) => {
    const { first_name, last_name } = req.body;
    try {
        const actor = await models.actor.create({ first_name, last_name });
        res.status(201).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while creating an actor",
        });
    }
};

// Получить информацию об актере по ID
exports.getActorById = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await models.actor.findByPk(id);
        if (!actor) {
            return res
                .status(404)
                .json({ message: `Actor with ID ${id} not found` });
        }
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while fetching actor information",
        });
    }
};

// Обновить информацию об актере.
exports.updateActor = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    try {
        const actor = await models.actor.findByPk(id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }
        await actor.update({ first_name, last_name });
        res.status(200).json(actor);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating actor",
        });
    }
};

// Удалить актера.
exports.deleteActor = async (req, res) => {
    const { id } = req.params;
    try {
        const actor = await models.actor.findByPk(id);
        if (!actor) {
            return res.status(404).json({ message: "Actor not found" });
        }
        await actor.destroy();
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while deleting actor",
        });
    }
};

// Получить общее количество актеров.
exports.getActorCount = async (req, res) => {
    try {
        const count = await models.actor.count();
        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting actor count:", error);
        res.status(500).json({
            message: "An error occurred while getting actor count",
        });
    }
};

// Ваши функции контроллера
exports.searchActorsByName = async (req, res) => {
    const { name } = req.params;
    try {
        const actors = await models.actor.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { first_name: { [Sequelize.Op.iLike]: `%${name}%` } },
                    { last_name: { [Sequelize.Op.iLike]: `%${name}%` } },
                ],
            },
        });
        res.status(200).json(actors);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while searching for actors",
        });
    }
};
