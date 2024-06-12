// -------- Importing Library ------------
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cloudinary = require('./library/cloudinaryConfig');
var cors = require('cors');
// ------- Importing Routes ---------
var indexRoutes = require('./routes/index');
// Pemanggilan Routes Jasa.js
var productRoutes = require('./routes/product');
// Pemanggilan Routes customer.js
var customerRoutes = require('./routes/customer');
// Pemanggilan Routes admin.js
var adminRoutes = require('./routes/admin');
// Pemanggilan Routes Login.js
var authRoutes = require('./routes/auth');
// Pemanggilan Routes order.js
var orderRoutes = require('./routes/order');
// Pemanggilan Routes payment.js
var paymentRoutes = require('./routes/payment');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// ---------- Use Routes --------------
app.use('/', indexRoutes);
app.use('/product', productRoutes);
app.use('/customer', customerRoutes);
app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/order', orderRoutes);
app.use('/payment', paymentRoutes);

// Port Configuration
var PORT = 3001; // Change this to the desired port number

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
module.exports = app;