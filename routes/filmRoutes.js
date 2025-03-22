const express = require("express");
const router = express.Router();
const filmController = require("../controllers/filmController");
const auth = require("../middleware/authMiddleware");

// Маршрут для получения количества фильмов
router.get("/film/count", filmController.getFilmCount);

// Поиск фильмов по названию
router.get("/film/search/:title", filmController.searchFilmsByTitle);

// Получить все фильмы
router.get("/film", filmController.getAllFilms);

// Получить фильм по ID
router.get("/film/:id", filmController.getFilmById);

// Создать новый фильм
router.post("/film", auth, filmController.createFilm);

// Обновить фильм по ID
router.put("/film/:id", auth, filmController.updateFilm);

// Удалить фильм по ID
router.delete("/film/:id", auth, filmController.deleteFilm);

// Поиск фильмов по языку
router.get("/film/language/:language_id", filmController.getFilmsByLanguageId);

// Поиск фильмов по категории
router.get("/film/category/:category_id", filmController.getFilmsByCategoryId);

module.exports = router;
