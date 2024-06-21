var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var cloudinary = require('../library/cloudinaryConfig');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure as needed
var connection = require('../library/databaseConfig');
const { verifyToken } = require('../controllers/authController');
const SECRET_KEY = 'weddinggramkey';

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

    async generateCustomerCode() {
        return new Promise((resolve, reject) => {
            // Query to get the latest kode_customer
            const query = `SELECT kode_customer FROM tbl_customer ORDER BY kode_customer DESC LIMIT 1`;
            connection.query(query, (err, results) => {
                if (err) {
                    console.error('Error fetching latest kode_customer:', err);
                    return reject('Error fetching latest kode_customer');
                }

                let newCode;
                if (results.length > 0) {
                    // Extract the numeric part from the latest kode_customer and increment it
                    const latestCode = results[0].kode_customer;
                    const numericPart = parseInt(latestCode.split('-')[1]);
                    const newNumericPart = numericPart + 1;

                    // Format the new kode_customer
                    newCode = `C-${newNumericPart.toString().padStart(4, '0')}`;
                } else {
                    // If no kode_customer exists, start with C-0001
                    newCode = 'C-0001';
                }
                resolve(newCode);
            });
        });
    },
    async createCustomer(req, res) {
        try {
            const { nama_customer, username, password, alamat, email, no_hp } = req.body;
            const url_profileImg = 'https://res.cloudinary.com/did9dikb2/image/upload/v1717838097/WeddingGram/url_profileImg/ouswgp3a0jwofrs1qjaw.jpg';

            if (!nama_customer || !username || !password || !alamat || !email || !no_hp) {
                return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Generate kode_customer
            const kode_customer = await module.exports.generateCustomerCode();

            const formData = {
                kode_customer: kode_customer,
                nama_customer: nama_customer,
                username: username,
                password: hashedPassword,
                alamat: alamat,
                email: email,
                no_hp: no_hp,
                url_profileImg: url_profileImg
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
              return res.status(500).json({ pesan: 'Data Gagal Diperbarui' });
            } else {
              // Generate new token with updated profile information
              const updatedToken = jwt.sign({
                kode_customer: kode_customer,
                name: nama_customer, // Ubah 'nama_customer' menjadi 'name'
                username: req.user.username,
                alamat: alamat,
                email: email,
                no_hp: no_hp,
                url_profileImg: url_profileImg || req.user.url_profileImg,
                userType: 'customer'
              }, SECRET_KEY, { expiresIn: '1h' });
      
              return res.status(200).json({
                message: 'Data Berhasil Diperbarui!',
                token: updatedToken // Kirim token yang telah diperbarui kembali ke frontend
              });
            }
          });
        } catch (error) {
          console.error('Error during profile update:', error);
          return res.status(500).json({ error: 'Failed To Update Profile' });
        }
      }      
};