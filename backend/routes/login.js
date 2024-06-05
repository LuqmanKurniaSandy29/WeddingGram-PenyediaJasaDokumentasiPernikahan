const express = require('express');
const bcrypt = require('bcrypt');
const connection = require('../library/databaseConfig');

const router = express.Router();

const checkUser = (table, username) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE username = ?`, [username], (err, result) => {
            if (err) {
                reject(err);
            } else {
                console.log(`User found in ${table}:`, result[0]); // Log the result
                resolve(result.length > 0 ? result[0] : null);
            }
        });
    });
};

router.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        // Check in Admin Table
        const admin = await checkUser('tbl_admin', username);
        if (admin) {
            const match = await bcrypt.compare(password, admin.password);
            if (match) {
                req.session.user = {
                    kode_admin: admin.kode_admin,
                    name: admin.nama_admin,
                    username: admin.username,
                    userType: 'admin'
                };
                return res.status(200).json({
                    message: 'Logged In As Admin',
                    userType: 'admin',
                    user: req.session.user
                });
            } else {
                return res.status(400).send('Incorrect Password');
            }
        }

        // Check in Customer Table
        const customer = await checkUser('tbl_customer', username);
        if (customer) {
            const match = await bcrypt.compare(password, customer.password);
            if (match) {
                req.session.user = {
                    kode_customer: customer.kode_customer,
                    name: customer.nama_customer,
                    username: customer.username,
                    alamat: customer.alamat,
                    email: customer.email,
                    no_hp: customer.no_hp,
                    userType: 'customer'
                };
                return res.status(200).json({
                    message: 'Logged In As Customer',
                    userType: 'customer',
                    user: req.session.user
                });
            } else {
                return res.status(400).send('Incorrect Password');
            }
        }

        // If user not found
        return res.status(404).send('User Not Found');
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send('Server Error');
    }
});

router.get('/profile', (req, res) => {
    if (req.session.user) {
        // Jika pengguna sudah login, kembalikan informasi profil
        return res.status(200).json({
            message: 'Profile Information',
            user: req.session.user
        });
    } else {
        // Jika pengguna belum login, kembalikan pesan kesalahan
        return res.status(401).send('Unauthorized');
    }
});
module.exports = router;