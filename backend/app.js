var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Import Session
const session = require('express-session');
// Import Cloudinary
var cloudinary = require('./library/cloudinaryConfig');
var indexRouter = require('./routes/index');
// Pemanggilan Routes Jasa.js
var productRouter = require('./routes/product');
// Pemanggilan Routes customer.js
var customerRouter = require('./routes/customer');
// Pemanggilan Routes admin.js
var adminRouter = require('./routes/admin');
// Pemanggilan Routes Login.js
var loginRouter = require('./routes/login');
// Pemanggilan Routes order.js
var orderRouter = require('./routes/order');
// Pemanggilan Routes payment.js
var paymentRouter = require('./routes/payment');

var app = express();
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// Tambah productRouter
app.use('/product', productRouter);
app.use('/customer', customerRouter);
app.use('/admin', adminRouter);
app.use('/auth', loginRouter);
app.use('/order', orderRouter);
app.use('/payment', paymentRouter);

module.exports = app;