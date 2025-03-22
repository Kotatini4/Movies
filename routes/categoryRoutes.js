const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const auth = require("../middleware/authMiddleware");

//поиск по названию категории, не зависимо от регистра
router.get(
    "/categories/search/:name",
    categoryController.searchCategoriesByName
);

// GET count of categories
router.get("/categories/count", categoryController.getCategoryCount);

// GET all categories
router.get("/categories", categoryController.getAllCategories);

// GET category by ID
router.get("/categories/:id", categoryController.getCategoryById);

// POST create new category
router.post("/categories", auth, categoryController.createCategory);

// PUT update category by ID
router.put("/categories/:id", auth, categoryController.updateCategory);

// DELETE category by ID
router.delete("/categories/:id", auth, categoryController.deleteCategory);

module.exports = router;
