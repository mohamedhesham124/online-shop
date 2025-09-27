const productsModel = require('../models/product.model');

exports.getProduct = (req, res, next) => {
    //get products
    //render ejs
    let id = req.params.id
    productsModel.getProductById(id).then((product) => {
        res.render('product', {
            product: product,
            isUser: req.session.userId,
            isAdmin: req.session.isAdmin
        });
    })
};