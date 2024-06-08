var express = require('express');
var router = express.Router();
const multer = require('multer');
const customerController = require('../controllers/customerController');
const cloudinary = require('../library/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { verifyToken } = require('../controllers/authController');
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'WeddingGram/url_profileImg', // Nama folder di Cloudinary (dalam format "folder_induk/nama_folder")
        format: async(req, file) => {
            // Mengizinkan format .png dan .jpg
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                return 'jpg';
            }
            // Mengembalikan null untuk format tidak valid
            return null;
        },
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nama file unik
    }
});

const upload = multer({ storage: storage });

router.get('/', customerController.getAllCustomer);
router.post('/register', customerController.createCustomer);
router.get('/custOrder', verifyToken, customerController.getOrderUser);
router.put('/editprofile', verifyToken, upload.single('url_profileImg'), customerController.editCustomerProfile);
module.exports = router;