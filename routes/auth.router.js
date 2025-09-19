const router = require('express').Router();
const bodyParser = require('body-parser');

const authController = require('../controllers/auth.controller');

// signup
router.get('/signup', authController.getSignup);
router.post('/signup', bodyParser.urlencoded({extended : true}), authController.postSignup);

//login
router.get('/login', authController.getLogin);
router.post('/login', bodyParser.urlencoded({extended : true}), authController.postLogin);

//logout
router.all('/logout', authController.logout);

module.exports = router;