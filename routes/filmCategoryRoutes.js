const express = require("express");
const router = express.Router();
const filmCategoryController = require("../controllers/filmCategoryController");

// Получить все связи фильмов и категорий
router.get("/film_categories", filmCategoryController.getAllFilmCategories);

// Получить связь фильма и категории по ID
router.get(
    "/film_categories/:film_id/:category_id",
    filmCategoryController.getFilmCategoryById
);

// Создать новую связь фильма и категории
router.post("/film_categories", filmCategoryController.createFilmCategory);

// Обновить связь фильма и категории по ID
router.put(
    "/film_categories/:film_id/:category_id",
    filmCategoryController.updateFilmCategory
);

// Удалить связь фильма и категории по ID
router.delete(
    "/film_categories/:film_id/:category_id",
    filmCategoryController.deleteFilmCategory
);

// Получить фильмы по ID категории
router.get(
    "/film_categories/category/:category_id",
    filmCategoryController.getFilmsByCategoryId
);

// Получить категории по ID фильма
router.get(
    "/film_categories/film/:film_id",
    filmCategoryController.getCategoriesByFilmId
);

module.exports = router;
