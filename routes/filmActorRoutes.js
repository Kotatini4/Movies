const express = require("express");
const router = express.Router();
const filmActorController = require("../controllers/filmActorController"); // Убедитесь, что путь правильный

// Маршруты для film_actor
router.get("/film_actors", filmActorController.getAllFilmActors);
router.get("/film_actors/:id", filmActorController.getFilmActorById);
router.post("/film_actors", filmActorController.createFilmActor);
router.put("/film_actors/:id", filmActorController.updateFilmActor);
router.delete("/film_actors/:id", filmActorController.deleteFilmActor);

// Маршрут для получения фильмов по actor_id
router.get(
    "/film_actors/actor/:actor_id",
    filmActorController.getFilmsByActorId
);

// Маршрут для получения актеров по film_id
router.get("/film_actors/film/:film_id", filmActorController.getActorsByFilmId);

module.exports = router;
