const db = require("../config/database");
const { Sequelize } = require("sequelize");
const initModels = require("../models/init-models");
const models = initModels(db);

// Получить все film_actor
exports.getAllFilmActors = async (req, res) => {
    try {
        const filmActors = await models.film_actor.findAll();
        res.status(200).json(filmActors);
    } catch (error) {
        console.error("Error fetching film actors:", error);
        res.status(500).json({
            message: "An error occurred while fetching film actors",
        });
    }
};

// Получить film_actor по ID
exports.getFilmActorById = async (req, res) => {
    const { id } = req.params;
    try {
        const filmActor = await models.film_actor.findByPk(id);
        if (!filmActor) {
            return res.status(404).json({ message: "Film actor not found" });
        }
        res.status(200).json(filmActor);
    } catch (error) {
        console.error("Error fetching film actor by ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching the film actor",
        });
    }
};

// Создать новый film_actor
exports.createFilmActor = async (req, res) => {
    const { film_id, actor_id } = req.body;
    try {
        const filmActor = await models.film_actor.create({ film_id, actor_id });
        res.status(201).json(filmActor);
    } catch (error) {
        console.error("Error creating film actor:", error);
        res.status(500).json({
            message: "An error occurred while creating the film actor",
        });
    }
};

// Обновить film_actor по ID
exports.updateFilmActor = async (req, res) => {
    const { id } = req.params;
    const { film_id, actor_id } = req.body;
    try {
        const filmActor = await models.film_actor.findByPk(id);
        if (!filmActor) {
            return res.status(404).json({ message: "Film actor not found" });
        }
        await filmActor.update({ film_id, actor_id });
        res.status(200).json(filmActor);
    } catch (error) {
        console.error("Error updating film actor:", error);
        res.status(500).json({
            message: "An error occurred while updating the film actor",
        });
    }
};

// Удалить film_actor по ID
exports.deleteFilmActor = async (req, res) => {
    const { id } = req.params;
    try {
        const filmActor = await models.film_actor.findByPk(id);
        if (!filmActor) {
            return res.status(404).json({ message: "Film actor not found" });
        }
        await filmActor.destroy();
        res.status(204).json();
    } catch (error) {
        console.error("Error deleting film actor:", error);
        res.status(500).json({
            message: "An error occurred while deleting the film actor",
        });
    }
};

// Получить фильмы по ID актера.
exports.getFilmsByActorId = async (req, res) => {
    const { actor_id } = req.params;
    try {
        const films = await models.film_actor.findAll({
            where: { actor_id },
            include: [{ model: models.film, as: "film" }], // Включаем информацию о фильмах
        });
        res.status(200).json(films);
    } catch (error) {
        console.error("Error fetching films by actor ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching films by actor ID",
        });
    }
};

// Получить актеров по ID фильма.
exports.getActorsByFilmId = async (req, res) => {
    const { film_id } = req.params; // Получаем film_id из параметров маршрута
    try {
        const actors = await models.film_actor.findAll({
            where: { film_id }, // Фильтруем по film_id
            include: [{ model: models.actor, as: "actor" }], // Включаем информацию об актерах
        });

        // Если актеры не найдены, возвращаем пустой массив
        if (actors.length === 0) {
            return res.status(200).json([]);
        }

        // Возвращаем найденные записи
        res.status(200).json(actors);
    } catch (error) {
        console.error("Error fetching actors by film ID:", error);
        res.status(500).json({
            message: "An error occurred while fetching actors by film ID",
        });
    }
};
