const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const app = express();
const homeRouter=require('./routes/home.router')
const productRouter=require('./routes/product.router')
const authRouter=require('./routes/auth.router')
const cartRouter=require('./routes/cart.router')
const orderRouter=require('./routes/order.router')
const adminRouter=require('./routes/admin.router')

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'images')));
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/online-shop',
    collection: 'sessions'
});

app.use(session({
    secret: 'this is my secret secret to hash express sessions .....',
    saveUninitialized: false,
    resave: false,
    store: STORE,
}));

app.set('view engine', 'ejs');
app.set('views', 'views'); // default

//error handling
app.get("/error", (req, res, next) => {
    res.status(500)
    res.render("error.ejs", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
    });
});

app.get("/not-admin", (req, res, next) => {
    res.status(403)
    res.render("not-admin.ejs", {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin
    });
});

app.use((error, req, res, next) => {
    res.redirect("/error");
});

app.use(homeRouter)
app.use(productRouter)
app.use(authRouter)
app.use(cartRouter)
app.use(orderRouter)
app.use(adminRouter)

app.listen(3000, () => {
    console.log('server listen on port 3000');
});
