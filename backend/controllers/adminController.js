const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const connection = require('../library/databaseConfig');


module.exports = {
    async updatePaymentStatus(kode_pembayaran, kode_admin) {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) {
                    console.error('Error starting transaction: ' + err);
                    return reject('Error starting transaction');
                }
                console.log('Transaction started');

                // Update status pembayaran
                const updatePaymentQuery = `
                    UPDATE tbl_pembayaran 
                    SET status_pembayaran = 'Terbayar', kode_admin = ? 
                    WHERE kode_pembayaran = ?
                `;
                connection.query(updatePaymentQuery, [kode_admin, kode_pembayaran], (err, result) => {
                    if (err) {
                        console.error('Error executing update payment status query: ' + err);
                        return connection.rollback(() => {
                            console.error('Transaction rolled back due to payment status update error');
                            return reject('Error updating payment status');
                        });
                    }
                    console.log('Updated payment status:', result);

                    // Update status order
                    const updateOrderQuery = `
                        UPDATE tbl_order 
                        SET status_order = 'Di Proses' 
                        WHERE kode_pembayaran = ?
                    `;
                    connection.query(updateOrderQuery, [kode_pembayaran], (err, result) => {
                        if (err) {
                            console.error('Error executing update order status query: ' + err);
                            return connection.rollback(() => {
                                console.error('Transaction rolled back due to order status update error');
                                return reject('Error updating order status');
                            });
                        }
                        console.log('Updated order status:', result);

                        // Commit transaction
                        connection.commit(err => {
                            if (err) {
                                console.error('Error committing transaction: ' + err);
                                return connection.rollback(() => {
                                    console.error('Transaction rolled back due to commit error');
                                    return reject('Error committing transaction');
                                });
                            }
                            console.log('Transaction committed');
                            resolve();
                        });
                    });
                });
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

    getAllOrders(req, res, next) {
        connection.query('SELECT * FROM tbl_order', function(err, rows) {
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

    async generateKodeAdmin() {
        return new Promise((resolve, reject) => {
            const query = "SELECT MAX(kode_admin) as maxKode FROM tbl_admin";
            connection.query(query, (err, result) => {
                if (err) {
                    console.error('Error fetching max kode_admin:', err);
                    return reject('Error fetching max kode_admin');
                }
                const maxKode = result[0].maxKode;
                let newKode = 'A-0001'; // default value if no data exists
                if (maxKode) {
                    const number = parseInt(maxKode.split('-')[1]) + 1;
                    newKode = `A-${number.toString().padStart(4, '0')}`;
                }
                resolve(newKode);
            });
        });
    },

    async registerAdmin(req, res) {
        try {
            let { nama_admin, username, password } = req.body;

            if (!nama_admin || !username || !password) {
                return res.json({ pesan: 'Mohon Pastikan Seluruh Form Telah Terisi!' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const kode_admin = await module.exports.generateKodeAdmin();

            const formData = {
                kode_admin: kode_admin,
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
        connection.query('SELECT * FROM tbl_pembayaran WHERE status_pembayaran = "Pengecekan Oleh Admin"', function(err, rows) {
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
        const kode_pembayaran = req.body.kode_pembayaran;
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