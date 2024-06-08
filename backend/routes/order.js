// order.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

router.post('/', authController.verifyToken, orderController.order);

module.exports = router;