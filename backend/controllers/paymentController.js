const express = require('express');
const multer = require('multer');
const cloudinary = require('../library/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const connection = require('../library/databaseConfig');

const router = express.Router();
// Konfigurasi penyimpanan Multer menggunakan Cloudinary

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'WeddingGram/bukti_transfer', // Nama folder di Cloudinary (dalam format "folder_induk/nama_folder")
        format: async(req, file) => {
            // Mengizinkan format .png dan .jpg
            if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
                return 'jpg';
            }
            // Mengembalikan null untuk format tidak valid
            return null;
        },
        public_id: (req, file) => Date.now() + '-' + file.originalname // Nama file unik
    }
});

const upload = multer({ storage: storage });

module.exports = {


    // Fungsi untuk memulai transaksi
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

    // Fungsi untuk mengupdate pembayaran
    updatePembayaran(kode_pembayaran, kode_customer, metode_pembayaran, status_pembayaran, bukti_transfer) {
        return new Promise((resolve, reject) => {
            const updateQuery = `
                UPDATE tbl_pembayaran 
                SET metode_pembayaran = ?, status_pembayaran = ?, bukti_transfer = ? 
                WHERE kode_pembayaran = ? AND kode_customer = ?
            `;
            connection.query(updateQuery, [metode_pembayaran, status_pembayaran, bukti_transfer, kode_pembayaran, kode_customer], (err, result) => {
                if (err) {
                    console.error('Error executing update pembayaran query: ' + err);
                    return reject('Error executing update pembayaran query');
                }
                console.log('Updated tbl_pembayaran:', result);
                resolve();
            });
        });
    },

    // Fungsi untuk melakukan commit transaksi
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

    // Fungsi untuk melakukan rollback transaksi
    rollbackTransaction() {
        return new Promise((resolve) => {
            connection.rollback(() => {
                console.log('Transaction rolled back');
                resolve();
            });
        });
    },

    async payment(req, res) {
        const { metode_pembayaran, kode_pembayaran } = req.body;
        const bukti_transfer = req.file ? req.file.path : null;

        // Cek apakah kode_customer tersedia dalam sesi
        const kode_customer = req.user ? req.user.kode_customer : null;

        // Pastikan kode_customer tersedia dalam sesi
        if (!kode_customer) {
            console.error('Kode customer tidak ditemukan di sesi');
            return res.status(401).send('Unauthorized');
        }
        if (metode_pembayaran === 'Transfer' && !bukti_transfer) {
            console.error('Bukti transfer perlu diisi untuk metode pembayaran Transfer');
            return res.status(400).send('Bukti transfer perlu diisi untuk metode pembayaran Transfer');
        }
        // Tentukan status_pembayaran
        const status_pembayaran = 'Pengecekan oleh admin';

        try {
            // Mulai transaksi
            await module.exports.beginTransaction();

            // Update informasi pembayaran ke tbl_pembayaran
            await module.exports.updatePembayaran(kode_pembayaran, kode_customer, metode_pembayaran, status_pembayaran, bukti_transfer);

            // Commit transaksi
            await module.exports.commitTransaction();

            res.status(200).send('Payment updated successfully');
        } catch (err) {
            console.error('Error during payment update:', err);
            await module.exports.rollbackTransaction();
            res.status(500).send('Error updating payment');
        }
    }
};