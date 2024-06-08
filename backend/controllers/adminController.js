const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = require('../library/databaseConfig');


module.exports = {
    updatePaymentStatus(kode_pembayaran, kode_admin) {
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
    },
    getAllAdmins(req, res, next) {
        connection.query('SELECT * FROM tbl_admin', function(err, rows) {
            if (err) {
                res.send('error', err);
                res.json({
                    data: ''
                });
            } else {
                res.json({
                    data: rows
                });
            }
        });
    },
    async registerAdmin(req, res) {
        try {
            let { nama_admin, username, password } = req.body;

            if (!nama_admin || !username || !password) {
                return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const formData = {
                nama_admin: nama_admin,
                username: username,
                password: hashedPassword
            };

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
    },
    listAllPayments(req, res, next) {
        connection.query('SELECT * FROM tbl_pembayaran', function(err, rows) {
            if (err) {
                res.send('error', err);
                res.json({
                    data: ''
                });
            } else {
                res.json({
                    data: rows
                });
            }
        });
    },
    async confirmPayment(req, res) {
        const { kode_pembayaran } = req.body;
        const kode_admin = req.user ? req.user.kode_admin : null;

        if (!kode_admin) {
            console.error('Admin not logged in');
            return res.status(401).send('Unauthorized');
        }

        try {
            await module.exports.updatePaymentStatus(kode_pembayaran, kode_admin);
            res.status(200).send('Payment confirmed successfully');
        } catch (err) {
            console.error('Error during payment confirmation:', err);
            res.status(500).send('Error confirming payment');
        }
    }
}