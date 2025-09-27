const orderModel = require('../models/order.model')
const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;

exports.getVerify = (req, res, next) => {
    const { productName, productId, amount, totalPrice } = req.query;
    res.render("verify", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        productName,
        productId,
        amount,
        totalPrice,
        pageTitle: 'Verifying your order'
    })
};

exports.postOrder = (req, res, next) => {
    orderModel.addNewItem({
        productName: req.body.productName,
        totalPrice: req.body.totalPrice,
        amount: req.body.amount,
        productId: req.body.productId,
        userId: req.session.userId,
        timestamp: Date.now(),
        address: req.body.address,
        status: "pending",
    }).then(() => {
        return cartModel.deleteItemOrder(req.body.productId);
    }).then(() => {
        res.redirect('/order');
    })
    .catch(err => {
        next(err)
    });
};

exports.getOrder = (req, res, next) => {
    orderModel.getOrdersByUser(req.session.userId).then(orders => {
        res.render('order', {
            orders: orders,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin,
            pageTitle: 'Order'
        });
    }).catch(err => next(err));
};