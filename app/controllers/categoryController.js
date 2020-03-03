const express = require("express");
const router = express.Router();

const category = require("../controllers/categories/libCategories");

router.get("/", category.getAllCategories);
router.get("/:idCategory", category.getCategory);

module.exports = router;
