const express = require("express");
const router = express.Router();
const filmActorController = require("../controllers/filmActorController");
const auth = require("../middleware/authMiddleware");

// Получить все связи фильмов и актеров.
router.get("/film_actors", filmActorController.getAllFilmActors);

// Получить связь фильма и актера по ID.
router.get("/film_actors/:id", filmActorController.getFilmActorById);

// Создать новую связь фильма и актера.
router.post("/film_actors", auth, filmActorController.createFilmActor);

// Обновить связь фильма и актера по ID
router.put("/film_actors/:id", auth, filmActorController.updateFilmActor);

// Удалить связь фильма и актера по ID.
router.delete("/film_actors/:id", auth, filmActorController.deleteFilmActor);

// Маршрут для получения фильмов по actor_id
router.get(
    "/film_actors/actor/:actor_id",
    filmActorController.getFilmsByActorId
);

// Маршрут для получения актеров по film_id
router.get("/film_actors/film/:film_id", filmActorController.getActorsByFilmId);

module.exports = router;
