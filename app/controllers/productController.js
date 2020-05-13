const express = require("express");
const router = express.Router();

const product = require("../controllers/products/libProducts");

router.get("/", product.getAllProducts);
router.get("/id", product.getProductByID);
router.get("/onSale", product.getProductsOnSale);
router.get("/getProductComments", product.getProductComments);

router.post("/addProductComment", product.addProductComment)

router.delete("/deleteProductComment", product.deleteProductComment)

module.exports = router;
