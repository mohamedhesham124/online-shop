const router = require("express").Router();
const bodyParser = require("body-parser");
const check = require("express-validator").check;

const authGuard = require('./guards/auth.guard');
const orderController = require('../controllers/order.controller');
const cartController = require('../controllers/cart.controller');

router.get(
    "/verify",
    authGuard.isAuth,
    orderController.getVerify
);

router.get(
    "/order",
    authGuard.isAuth,
    orderController.getOrder
);

router.post(
    "/order",
    authGuard.isAuth,
    bodyParser.urlencoded({extended: true}),
    orderController.postOrder,
);

module.exports = router;