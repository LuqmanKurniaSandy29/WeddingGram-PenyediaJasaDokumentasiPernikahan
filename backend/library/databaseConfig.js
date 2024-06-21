let mysql = require('mysql');

// Koneksi Database
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'weddinggram'
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