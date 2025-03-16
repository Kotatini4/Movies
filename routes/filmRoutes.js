const express = require("express");
const router = express.Router();
const filmController = require("../controllers/filmController");

// Маршрут для получения количества фильмов
router.get("/film/count", filmController.getFilmCount);

// Поиск фильмов по названию
router.get("/film/search/:title", filmController.searchFilmsByTitle);

// Получить все фильмы
router.get("/film", filmController.getAllFilms);

// Получить фильм по ID
router.get("/film/:id", filmController.getFilmById);

// Создать новый фильм
router.post("/film", filmController.createFilm);

// Обновить фильм по ID
router.put("/film/:id", filmController.updateFilm);

// Удалить фильм по ID
router.delete("/film/:id", filmController.deleteFilm);

module.exports = router;
