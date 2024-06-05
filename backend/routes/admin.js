var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cloudinary = require('../library/cloudinaryConfig');
// Import Database
var connection = require('../library/databaseConfig');

function updatePaymentStatus(kode_pembayaran, kode_admin) {
    return new Promise((resolve, reject) => {
        const updateQuery = `
            UPDATE tbl_pembayaran 
            SET status_pembayaran = 'Terbayar', kode_admin = ? 
            WHERE kode_pembayaran = ?
        `;
        connection.query(updateQuery, [kode_admin, kode_pembayaran], (err, result) => {
            if (err) {
                console.error('Error executing update payment status query: ' + err);
                return reject('Error updating payment status');
            }
            console.log('Updated payment status:', result);
            resolve();
        });
    });
}

// Get All Admin
router.get('/', function(req, res, next) {
    // Query
    connection.query('SELECT * FROM tbl_admin', function(err, rows) {
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

// Create New Admin (REGISTER)
router.post('/register', async(req, res) => {
    try {
        let { nama_admin, username, password } = req.body;

        // Check if all required fields are filled
        if (!nama_admin || !username || !password) {
            return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the formData object with the hashed password
        const formData = {
            nama_admin: nama_admin,
            username: username,
            password: hashedPassword
        };

        // Insert Query Register
        connection.query('INSERT INTO tbl_admin SET ?', formData, (err, result) => {
            if (err) {
                console.error('Error inserting data:', err);
                return res.json({ pesan: 'Data Gagal Disimpan' });
            } else {
                return res.send('Data Berhasil Disimpan!');
            }
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ error: 'Failed To Register Admin' });
    }
});
router.get('/listpayment', function(req, res, next) {
    // Query
    connection.query('SELECT * FROM tbl_pembayaran', function(err, rows) {
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
router.post('/listpayment/confirm', async(req, res) => {
    const { kode_pembayaran } = req.body;

    // Get admin code from session
    const kode_admin = req.session.user ? req.session.user.kode_admin : null;

    if (!kode_admin) {
        console.error('Admin not logged in');
        return res.status(401).send('Unauthorized');
    }

    try {
        // Update payment status and admin code
        await updatePaymentStatus(kode_pembayaran, kode_admin);

        res.status(200).send('Payment confirmed successfully');
    } catch (err) {
        console.error('Error during payment confirmation:', err);
        res.status(500).send('Error confirming payment');
    }
});
module.exports = router;