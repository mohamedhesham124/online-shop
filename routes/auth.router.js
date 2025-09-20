const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const authController = require('../controllers/auth.controller');

// signup
router.get('/signup', authController.getSignup);
router.post(
    "/signup",
    bodyParser.urlencoded({extended: true}),
    check("username").not().isEmpty().withMessage('Usename is required'),
    check("email").not().isEmpty().withMessage('Email is required')
    .isEmail().withMessage('It is not form of an email'),
    check("password").isLength({min: 6, max:30}).withMessage('Invalid length'),
    check("confirmPassword").custom((value, {req}) => {
        if (value === req.body.password) return true;
        else throw 'passwords dont equal';
    }).withMessage('Passwords are not match'),
    authController.postSignup
);

//login
router.get('/login', authController.getLogin);
router.post('/login', bodyParser.urlencoded({extended : true}), authController.postLogin);

//logout
router.all('/logout', authController.logout);


module.exports = router;

