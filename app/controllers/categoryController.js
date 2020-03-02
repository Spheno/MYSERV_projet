const express = require("express");
const router = express.Router();

const category = require("../controllers/categories/libCategories");

router.get("/", category.getAllCategories);
router.get("/:category", category.getCategory);

module.exports = router;
