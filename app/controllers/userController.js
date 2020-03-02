/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /user */
const express = require("express");
const account = require("./account/libUser.js");
var router = express.Router();

router.post("/login", account.login);
router.post("/signup", account.signup);

router.get("/", account.readUserData);
router.get("/logout", account.logout);

module.exports = router;

