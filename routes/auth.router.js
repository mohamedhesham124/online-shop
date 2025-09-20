const router = require('express').Router();
const bodyParser = require('body-parser');
const check = require('express-validator').check;

const authController = require('../controllers/auth.controller');

// signup
router.get('/signup', authController.getSignup);
router.post(
    "/signup",
    bodyParser.urlencoded({extended: true}),
    check("username").not().isEmpty(),
    check("email").not().isEmpty().isEmail(),
    check("password").isLength({min: 6, max:30}),
    check("confirmPassword").custom((value, {req}) => {
        if (value === req.body.password) return true;
        else throw 'passwords dont equal';
    }),
    authController.postSignup
);

//login
router.get('/login', authController.getLogin);
router.post('/login', bodyParser.urlencoded({extended : true}), authController.postLogin);

//logout
router.all('/logout', authController.logout);


module.exports = router;
