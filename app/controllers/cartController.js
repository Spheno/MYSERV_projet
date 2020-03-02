/* C'est ici que l'ensemble des routes et des fonctions associées seront placées pour l'api /cart */
const express = require("express");
const cart = require("./cart/libCart.js");
var router = express.Router();

/*
router.post("/add", cart.add);
router.post("/remove", cart.remove);
*/

module.exports = router;