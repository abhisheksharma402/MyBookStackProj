var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var app = express();


var indexRouter = require('./routes/index');
var booksRoute = require('./routes/books');
var usersRoute = require('./routes/users');
var signupRoute = require('./routes/signup');
var signinRoute = require('./routes/signin');
var signoutRoute = require('./routes/signout');
var checkoutRoute = require('./routes/checkout');
var orderRoute = require('./routes/order');



app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'CATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
    credentials: true
}));




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('keyboard_cat'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/books', booksRoute);
app.use('/api/users', usersRoute);
app.use('/api/signup', signupRoute);
app.use('/api/signin', signinRoute);
app.use('/api/signout', signoutRoute);
app.use('/api/checkout', checkoutRoute);
app.use('/api/order', orderRoute);


module.exports = app;
