/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const express = require("express");
const router = express.Router();

const account = require("./account/libUser.js");

router.post("/login", account.login);
router.post("/signup", account.signup);
router.post("/", account.editUser);
router.post("/addToCart", account.addToCart);
router.post("/addToFavs", account.addToFavs);
router.post("/addProfileComment", account.addProfileComment)
router.post("/addShippingAddress", account.addShippingAddress)
router.post("/orderProducts", account.orderProducts);

router.delete("/removeFromCart", account.removeFromCart);
router.delete("/removeFromFavs", account.removeFromFavs);
router.delete("/deleteProfileComment", account.deleteProfileComment)
router.delete("/deleteShippingAddress", account.deleteShippingAddress)

router.get("/logout", account.logout);
router.get("/", account.getUser);
router.get("/myProducts", account.getMyProducts);
router.get("/myProductsSold", account.getMyProductsSold);
router.get("/myCart", account.getMyCart);
router.get("/myFavs", account.getMyFavs);
router.get("/getProfileComments", account.getProfileComments);
router.get("/getShippingAddress", account.getShippingAddress)

module.exports = router;
