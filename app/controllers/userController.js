/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const express = require("express");
const router = express.Router();

const account = require("./account/libUser.js");

router.post("/login", account.login);
router.post("/signup", account.signup);
router.post("/addToCart", account.addToCart);
router.post("/product", account.createProduct);

router.put("/product/:id", account.updateProduct);

router.delete("/removeFromCart", account.removeFromCart);
router.delete("/product/:id", account.deleteProduct);

router.get("/logout", account.logout);
router.get("/myProducts", account.getMyProducts);

module.exports = router;
