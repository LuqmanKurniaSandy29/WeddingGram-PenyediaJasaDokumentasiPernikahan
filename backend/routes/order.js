// order.js
const express = require('express');
const router = express.Router();
const connection = require('../library/databaseConfig');

// Fungsi untuk menghasilkan kode order acak
function generateKodeOrder() {
    return 'ORD' + Math.random().toString(36).substr(2, 9); // Contoh sederhana, bisa disesuaikan
}

// Fungsi untuk menghasilkan kode pembayaran acak
function generateKodePembayaran() {
    return 'PB' + Math.random().toString(36).substr(2, 9); // Contoh sederhana, bisa disesuaikan
}

function beginTransaction() {
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
}

function insertPembayaran(kode_pembayaran, kode_customer) {
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
}

function insertOrder(kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya, status_order) {
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
}

function commitTransaction() {
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
}

function rollbackTransaction() {
    return new Promise((resolve) => {
        connection.rollback(() => {
            console.log('Transaction rolled back');
            resolve();
        });
    });
}

function logTableState(tableName) {
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
}
router.post('/', async(req, res) => {
    const { kode_product, tanggal_acara, total_biaya } = req.body;

    // Cek apakah kode_customer tersedia dalam sesi
    const kode_customer = req.session.user ? req.session.user.kode_customer : null;

    // Pastikan kode_customer tersedia dalam sesi
    if (!kode_customer) {
        console.error('Kode customer tidak ditemukan di sesi');
        return res.status(401).send('Unauthorized');
    }

    // Generate kode_pembayaran
    const kode_pembayaran = generateKodePembayaran();

    // Generate kode_order
    const kode_order = generateKodeOrder();

    try {
        // Mulai transaksi
        await beginTransaction();

        // Simpan informasi pembayaran ke tbl_pembayaran
        await insertPembayaran(kode_pembayaran, kode_customer);

        // Ensure pembayaran is committed before proceeding
        await commitTransaction();
        console.log('Pembayaran committed successfully');

        // Log the current state of tbl_pembayaran
        await logTableState('tbl_pembayaran');

        // Start a new transaction for the order
        await beginTransaction();

        // Simpan informasi order ke tbl_order
        await insertOrder(kode_order, kode_customer, kode_product, kode_pembayaran, tanggal_acara, total_biaya);

        // Commit transaksi
        await commitTransaction();

        res.status(200).send('Order created successfully');
    } catch (err) {
        console.error('Error during order creation:', err);
        await rollbackTransaction();
        res.status(500).send('Error creating order');
    }
});



module.exports = router;