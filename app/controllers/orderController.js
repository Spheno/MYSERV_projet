const express = require("express");
const router = express.Router();

const order = require("./orders/libOrder.js");

router.get("/myOrders", order.getMyOrders);

module.exports = router;