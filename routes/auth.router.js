const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;
const authGuard = require('./guards/auth.guard')

const authController = require('../controllers/auth.controller');

// signup
router.get('/signup',authGuard.notAuth, authController.getSignup);
router.post(
    "/signup",
    bodyParser.urlencoded({extended: true}),
    check("username").not().isEmpty().withMessage('Usename is required'),
    check("email").not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('It is not form of an email'),
    check("password").isLength({min: 3, max:30}).withMessage('Invalid length'),
    check("confirmPassword").custom((value, {req}) => {
        if (value === req.body.password) return true;
        else throw 'passwords dont equal';
    }).withMessage('Passwords are not match'),
    authController.postSignup
);

//login
router.get('/login',authGuard.notAuth, authController.getLogin);
router.post('/login',
    bodyParser.urlencoded({extended : true}),
    check("email").not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('It is not form of an email'),
    check("password").isLength({min: 3, max:30}).withMessage('Invalid length'),
    authController.postLogin);

//logout
router.all('/logout',authGuard.isAuth, authController.logout);

module.exports = router;
