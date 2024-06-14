let mysql = require('mysql');

// Koneksi Database
let connection = mysql.createConnection({
    host: 'educalab.id',
    user: 'fKhuBKBZuFIG2GwZ',
    password: 'GHf8KDMfxfZNj2lS',
    database: '5fbQdJMpXEk60HrU',
    port: 3307
});

// Cek Koneksi Database
connection.connect(function(err) {
    if (!!err) {
        console.log(err);
    } else {
        console.log('Terkoneksi Dengan Database !')
    }
});

module.exports = connection;