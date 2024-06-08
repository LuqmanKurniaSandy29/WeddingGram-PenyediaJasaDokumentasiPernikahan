var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cloudinary = require('../library/cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure as needed
var connection = require('../library/databaseConfig');
const { verifyToken } = require('../controllers/authController');
// Get All Customer
module.exports = {
    getAllCustomer(req, res, next) {
        connection.query('SELECT * FROM tbl_customer', function(err, rows) {
            if (err) {
                res.send('error', err);
                res.json({ data: '' });
            } else {
                res.json({ data: rows });
            }
        });
    },

    async createCustomer(req, res) {
        try {
            const { nama_customer, username, password, alamat, email, no_hp } = req.body;

            if (!nama_customer || !username || !password || !alamat || !email || !no_hp) {
                return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const formData = {
                nama_customer: nama_customer,
                username: username,
                password: hashedPassword,
                alamat: alamat,
                email: email,
                no_hp: no_hp
            };

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
    },

    getOrderUser(req, res) {
        const kode_customer = req.user ? req.user.kode_customer : null;

        if (!kode_customer) {
            console.error('Kode customer tidak ditemukan di sesi');
            return res.status(401).json({ error: 'Unauthorized' });
        }

        connection.query('SELECT * FROM tbl_order WHERE kode_customer = ?', [kode_customer], function(err, rows) {
            if (err) {
                console.error('Error fetching orders:', err);
                return res.status(500).json({ error: 'Failed to fetch orders' });
            } else {
                res.json({ data: rows });
            }
        });
    },

    async editCustomerProfile(req, res) {
        try {
            const { nama_customer, alamat, email, no_hp } = req.body;
            const file = req.file;

            const kode_customer = req.user ? req.user.kode_customer : null;
            if (!kode_customer) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            let url_profileImg = '';
            if (file) {
                const result = await cloudinary.uploader.upload(file.path);
                url_profileImg = result.secure_url;
            }

            const updateData = { nama_customer, alamat, email, no_hp };
            if (url_profileImg) {
                updateData.url_profileImg = url_profileImg;
            }

            connection.query('UPDATE tbl_customer SET ? WHERE kode_customer = ?', [updateData, kode_customer], function(err, result) {
                if (err) {
                    console.error('Error updating data:', err);
                    return res.json({ pesan: 'Data Gagal Diperbarui' });
                } else {
                    return res.send('Data Berhasil Diperbarui!');
                }
            });
        } catch (error) {
            console.error('Error during profile update:', error);
            return res.status(500).json({ error: 'Failed To Update Profile' });
        }
    }
};