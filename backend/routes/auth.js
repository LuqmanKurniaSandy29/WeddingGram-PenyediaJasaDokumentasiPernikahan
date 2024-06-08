const express = require('express');
const authController = require('../controllers/authController'); // Import auth controller

const router = express.Router();

router.post('/login', authController.userLogin);
router.get('/profile', authController.verifyToken, authController.getProfile);
router.get('/logout', authController.verifyToken, authController.logout);

module.exports = router;