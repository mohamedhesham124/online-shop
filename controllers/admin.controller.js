const productModel = require('../models/product.model')
const validationResult = require('express-validator').validationResult;

exports.getAdd = (req, res, next) => {
    res.render("add-product", {
        validationErrors: req.flash("validationErrors"),
        isUser: true,
        isAdmin: true,
        pageTitle: 'Add Product'
    });
};

exports.postAdd = (req, res, next) => {
    if (validationResult(req).isEmpty()) {
        productModel.addNewProduct({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename,
        }).then(() => {
            res.redirect('/');
        }).catch(err => {
            next(err);
        });
    } else {
        req.flash('validationErrors', validationResult(req).array());
        res.redirect('/admin/add');
    }
};