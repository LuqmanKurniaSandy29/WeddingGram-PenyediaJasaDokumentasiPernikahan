const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../controllers/authController');
const authController = require('../controllers/authController');

router.get('/', verifyToken, adminController.getAllAdmins);
router.post('/register', verifyToken, adminController.registerAdmin);
router.get('/listpayment', verifyToken, adminController.listAllPayments);
router.post('/listpayment/confirm', verifyToken, adminController.confirmPayment);
module.exports = router;