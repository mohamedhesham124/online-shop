const userModel = require('../models/user.model');
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req, res, next) => {
    //render ejs
    res.render("signup")
};

exports.postSignup = (req, res, next) => {
    //return console.log(validationResult(req).array())
    
    userModel.createNewUser(req.body.username,req.body.email,req.body.password)
    .then(() => {
        res.redirect('/login')
    }).catch((err) => {
        console.log(err)
        res.redirect('/signup')
    })
};

exports.getLogin = (req, res, next) => {
    //render ejs
    res.render("login",{
        authError: req.flash('authError')[0]
    })
};

exports.postLogin = (req, res, next) => {
    userModel.login(req.body.email,req.body.password)
    .then((id) => {
        req.session.userId = id
        res.redirect('/')
    }).catch((err) => {
        //console.log(err)
        req.flash('authError',err)
        res.redirect('/login')
    })
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })

};
