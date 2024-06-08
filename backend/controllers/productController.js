var express = require('express');
var router = express.Router();

// Import Database
var connection = require('../library/databaseConfig');



module.exports = {
    // Get All Jasa
    getAllProduct(req, res, next) {
        // Query
        connection.query('SELECT * FROM tbl_product', function(err, rows) {
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
    },

    // Get Jasa By Kode_Jasa
    getProductById(req, res, next) {
        let kode_product = req.params.kode_product;
        // Query
        connection.query('SELECT * FROM tbl_product WHERE kode_product = "P-000' + kode_product + '"', function(err, rows) {
            if (err) {
                res.send('error', err);
                res.json({
                    data: ''
                });
            } else {
                res.json({
                    data: rows
                });
            };
        });
    }
}