var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cloudinary = require('../library/cloudinaryConfig');
// Import Database
var connection = require('../library/databaseConfig');

// Get All Customer
router.get('/', function(req, res, next) {
    // Query
    connection.query('SELECT * FROM tbl_customer', function(err, rows) {
        if (err) {
            res.send('error', err);
            res.json({
                data: ''
            });
        } else {
            // Menampilkan Hasil Query
            res.json({
                data: rows
            });
        }
    });
});

// Create New Customer (REGISTER)
router.post('/register', async(req, res) => {
    try {
        const { nama_customer, username, password, alamat, email, no_hp } = req.body;

        // Mengecek Semua Field Terisi
        if (!nama_customer || !username || !password || !alamat || !email || !no_hp) {
            return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
        }

        // Hashing password sebelum disimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Buat variabel pembantu formData
        const formData = {
            nama_customer: nama_customer,
            username: username,
            password: hashedPassword,
            alamat: alamat,
            email: email,
            no_hp: no_hp
        };

        // Insert Query Register
        connection.query('INSERT INTO tbl_customer SET ?', formData, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.json({ pesan: 'Data Gagal Disimpan' });
            } else {
                return res.send('Data Berhasil Disimpan!');
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Failed To Register Customer' });
    }
});

module.exports = router;