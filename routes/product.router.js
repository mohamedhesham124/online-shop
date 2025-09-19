const router = require('express').Router();

const productController = require('../controllers/product.controller');

router.get('/product/:id', productController.getProduct);

module.exports = router;