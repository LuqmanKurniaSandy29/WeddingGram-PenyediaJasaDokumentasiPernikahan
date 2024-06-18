var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.get('/', authController.verifyToken, productController.getAllProduct);
router.get('/:kode_product', productController.getProductById);
module.exports = router;