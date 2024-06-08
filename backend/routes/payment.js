const express = require('express');
const multer = require('multer');
const cloudinary = require('../library/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');
const router = express.Router();
// Konfigurasi penyimpanan Multer menggunakan Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'WeddingGram/bukti_transfer', // Nama folder di Cloudinary (dalam format "folder_induk/nama_folder")
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

router.post('/', authController.verifyToken, upload.single('bukti_transfer'), paymentController.payment);


module.exports = router;