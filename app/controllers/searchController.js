const express = require("express");
const router = express.Router();

const search = require("../controllers/search/libSearch");

router.get("/byUser", search.searchByUser)
router.get("/byProduct", search.searchByProduct)
router.get("/byTag", search.searchByTag)

module.exports = router;