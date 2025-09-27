const cartModel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult;

exports.getCart = (req, res, next) => {
    cartModel.getItemsByUser(req.session.userId).then(items => {
        res.render('cart', {
            items: items,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')[0]
        });
    }).catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel.addNewItem({
            name: req.body.name,
            price: req.body.price,
            amount: req.body.amount,
            productId: req.body.productId,
            userId: req.session.userId,
            timestamp: Date.now()
        }).then(() => {
            res.redirect('/cart');
        }).catch(err => {
            console.log(err);
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect(req.body.redirectTo);
    }
};

exports.postSave = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        cartModel
            .editItem(req.body.cartId, {
                amount: req.body.amount,
                timestamp: Date.now()
            })
            .then(() => res.redirect("/cart"))
            .catch(err => console.log(err));
    } else {
        req.flash("validationErrors", validationResult(req).array());
        res.redirect("/cart");
    }
};

exports.postDelete = (req, res, next) => {
    cartModel
        .deleteItem(req.body.cartId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
};

exports.postDeleteOrder = (req, res, next) => {
    cartModel
        .deleteItemOrder(req.body.productId)
        .then(() => console.log("ok"))
        .catch(err => console.log(err));
};

exports.postDeleteAll = (req, res, next) => {
    cartModel
        .deleteAllItems(req.session.userId)
        .then(() => res.redirect("/cart"))
        .catch(err => console.log(err));
};
