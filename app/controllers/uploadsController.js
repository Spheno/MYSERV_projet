const express = require("express");
const router = express.Router();

const upload = require("./uploads/libUploads");

router.get("/", upload.getProductPictures);

module.exports = router;
