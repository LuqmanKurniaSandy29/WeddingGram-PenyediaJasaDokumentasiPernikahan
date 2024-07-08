const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const connection = require('../library/databaseConfig');

module.exports = {
    generateKodeOrder() {
        return 'ORD' + Math.random().toString(36).substr(2, 9);
    },

    generateKodePembayaran() {
        return 'PB' + Math.random().toString(36).substr(2, 9);
    },

    beginTransaction() {
        return new Promise((resolve, reject) => {
            connection.beginTransaction(err => {
                if (err) {
                    console.error('Error starting transaction: ' + err);
                    return reject('Error starting transaction');
                }
                console.log('Transaction started');
                resolve();
            });
        });
    },

    insertPembayaran(kode_pembayaran, kode_customer) {
        return new Promise((resolve, reject) => {
            const pembayaranQuery = `INSERT INTO tbl_pembayaran (kode_pembayaran, kode_customer) VALUES (?, ?)`;
            connection.query(pembayaranQuery, [kode_pembayaran, kode_customer], (err, result) => {
                if (err) {
                    console.error('Error executing pembayaran query: ' + err);
                    return reject('Error executing pembayaran query');
                }
                console.log('Inserted into tbl_pembayaran:', result);
                resolve();
            });
        });
    },

    insertOrder(kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya) {
        return new Promise((resolve, reject) => {
            const tanggal_order = new Date();
            const orderQuery = `
                INSERT INTO tbl_order (kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, status_order, tanggal_order) 
                VALUES (?, ?, ?, ?, ?, ?, 'Menunggu Pembayaran', ?)`;
            connection.query(orderQuery, [kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, tanggal_order], (err, result) => {
                if (err) {
                    console.error('Error executing order query: ' + err);
                    return reject('Error executing order query');
                }
                console.log('Inserted into tbl_order:', result);
                resolve();
            });
        });
    },

    commitTransaction() {
        return new Promise((resolve, reject) => {
            connection.commit(err => {
                if (err) {
                    console.error('Error committing transaction: ' + err);
                    return reject('Error committing transaction');
                }
                console.log('Transaction committed');
                resolve();
            });
        });
    },

    rollbackTransaction() {
        return new Promise((resolve) => {
            connection.rollback(() => {
                console.log('Transaction rolled back');
                resolve();
            });
        });
    },

    logTableState(tableName) {
        return new Promise((resolve, reject) => {
            const query = `SELECT * FROM ${tableName}`;
            connection.query(query, (err, results) => {
                if (err) {
                    console.error(`Error querying ${tableName}:`, err);
                    return reject(`Error querying ${tableName}`);
                }
                console.log(`Current state of ${tableName}:`, results);
                resolve();
            });
        });
    },

    async order(req, res) {
        const { kode_product, tanggal_acara, total_biaya } = req.body;

        // Cek apakah kode_customer tersedia dalam JWT
        const kode_customer = req.user.kode_customer;

        // Pastikan kode_customer tersedia dalam JWT
        if (!kode_customer) {
            console.error('Kode customer tidak ditemukan di token');
            return res.status(401).send('Unauthorized');
        }

        // Generate kode_pembayaran
        const kode_pembayaran = module.exports.generateKodePembayaran();

        // Generate kode_order
        const kode_order = module.exports.generateKodeOrder();

        try {
            // Mulai transaksi
            await module.exports.beginTransaction();

            // Simpan informasi pembayaran ke tbl_pembayaran
            await module.exports.insertPembayaran(kode_pembayaran, kode_customer);

            // Ensure pembayaran is committed before proceeding
            await module.exports.commitTransaction();
            console.log('Pembayaran committed successfully');

            // Log the current state of tbl_pembayaran
            await module.exports.logTableState('tbl_pembayaran');

            // Start a new transaction for the order
            await module.exports.beginTransaction();

            // Simpan informasi order ke tbl_order
            await module.exports.insertOrder(kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya);

            // Commit transaksi
            await module.exports.commitTransaction();

            res.status(200).json({ message: 'Order created successfully', kode_pembayaran });
        } catch (err) {
            console.error('Error during order creation:', err);
            await module.exports.rollbackTransaction();
            res.status(500).send('Error creating order');
        }
    },

    async updateOrderStatus() {
        const currentDate = new Date();

        return new Promise((resolve, reject) => {
            const query = `
                UPDATE tbl_order 
                SET status_order = 'Selesai'
                WHERE tanggal_acara < ? AND status_order = 'Di Proses'
            `;

            connection.query(query, [currentDate], (err, result) => {
                if (err) {
                    console.error('Error updating order status:', err);
                    return reject('Error updating order status');
                }
                console.log('Updated order status:', result);
                resolve(result);
            });
        });
    },

    // Function to initialize the cron job
    initOrderStatusUpdater() {
        cron.schedule('*/5 * * * *', async () => {
            // This will run every 5 minutes
            try {
                console.log('Running order status update task...');
                await module.exports.updateOrderStatus();
                console.log('Order status update task completed.');
            } catch (error) {
                console.error('Error in order status update task:', error);
            }
        });
    }
};

// Immediately initialize the cron job
module.exports.initOrderStatusUpdater();