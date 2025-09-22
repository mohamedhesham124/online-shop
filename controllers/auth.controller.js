const userModel = require('../models/user.model');
const validationResult = require('express-validator').validationResult;

exports.getSignup = (req, res, next) => {
    //render ejs
    res.render("signup", {
        valErrors: req.flash('valErrors')
    })
};

exports.postSignup = (req, res, next) => {
    let errors=validationResult(req)
    if(errors.isEmpty()) {
        userModel.createNewUser(req.body.username,req.body.email,req.body.password)
        .then(() => {
            res.redirect('/login')
        }).catch((err) => {
            console.log(err)
            res.redirect('/signup')
        })
    }
    else {
        //console.log(errors.array())
        req.flash('valErrors',errors.array())
        res.redirect('/signup')
    }
};

exports.getLogin = (req, res, next) => {
    //render ejs
    res.render("login",{
        authError: req.flash('authError'),
        loginErrors: req.flash('loginErrors')
    })
};

exports.postLogin = (req, res, next) => {
    let errors=validationResult(req)
    if(errors.isEmpty()) {
        userModel.login(req.body.email,req.body.password)
        .then((id) => {
            req.session.userId = id
            res.redirect('/')
        }).catch((err) => {
            //console.log(err)
            req.flash('authError',err)
            res.redirect('/login')
        })
    }
    else {
        console.log(errors.array())
        req.flash('loginErrors',errors.array())
        res.redirect('/login')
    }
};

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/login')
    })
};
