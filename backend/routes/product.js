var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.get('/', authController.userLogin, productController.getAllProduct);
router.post('/:kode_product', authController.userLogin, productController.getProductById);
module.exports = router;