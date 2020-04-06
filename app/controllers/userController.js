/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const express = require("express");
const router = express.Router();

const account = require("./account/libUser.js");

router.post("/login", account.login);
router.post("/signup", account.signup);
router.post("/", account.editUser);
router.post("/addToCart", account.addToCart);
router.post("/product", account.createProduct);

router.put("/product/edit/:id", account.updateProduct);

router.delete("/removeFromCart", account.removeFromCart);
router.delete("/product/delete/:id", account.deleteProduct);

router.get("/logout", account.logout);
router.get("/", account.getUser);
router.get("/myProducts", account.getMyProducts);

module.exports = router;
