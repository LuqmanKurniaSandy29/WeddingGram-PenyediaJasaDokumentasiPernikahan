const express = require('express');
const router = express.Router();
const connection = require('../library/databaseConfig');



module.exports = {
    generateKodeOrder() {
        return 'ORD' + Math.random().toString(36).substr(2, 9); // Contoh sederhana, bisa disesuaikan
    },

    // Fungsi untuk menghasilkan kode pembayaran acak
    generateKodePembayaran() {
        return 'PB' + Math.random().toString(36).substr(2, 9); // Contoh sederhana, bisa disesuaikan
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

    insertOrder(kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, status_order) {
        return new Promise((resolve, reject) => {
            const orderQuery = `INSERT INTO tbl_order (kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, status_order) VALUES (?, ?, ?, ?, ?, ?, 'Menunggu Pembayaran')`;
            connection.query(orderQuery, [kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, status_order], (err, result) => {
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

            res.status(200).send('Order created successfully');
        } catch (err) {
            console.error('Error during order creation:', err);
            await module.exports.rollbackTransaction();
            res.status(500).send('Error creating order');
        }
    }
}