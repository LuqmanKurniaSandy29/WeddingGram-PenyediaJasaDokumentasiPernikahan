// library/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;

// Load environment variables from .env file
require('dotenv').config();

// Konfigurasi Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;