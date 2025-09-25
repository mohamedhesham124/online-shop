const { validationResult } = require('express-validator');
const productsModel = require('../models/product.model');

exports.getHome = (req, res, next) => {
    //get products
    //render ejs
    let category = req.query.category
    let promiseExcuter
    if (category && category !== 'all') {
        promiseExcuter=productsModel.getProductsByCategory(category)
    }
    else {
        promiseExcuter=productsModel.getAllProducts()
    }
    promiseExcuter.then((products) => {
        res.render('index', {
            products: products,
            isUser: req.session.userId,
            validationErrors: req.flash('validationErrors')[0]
        });
    })
};
