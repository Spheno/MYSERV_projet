const express = require("express");
const router = express.Router();

const upload = require("./uploads/libUploads");

router.get("/", upload.getProductPictures);

router.post("/product", upload.createProduct);

router.put("/product/edit/:id", upload.updateProduct);

router.delete("/deleteProduct", upload.deleteProduct);

module.exports = router;
