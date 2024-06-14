const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connection = require('../library/databaseConfig');

const SECRET_KEY = 'weddinggramkey'; // Ensure this key is consistent
const invalidatedTokens = []; // Array to store invalidated tokens



module.exports = {
    checkUser(table, username) {
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
    },

    async userLogin(req, res) {
        const { username, password } = req.body;

        try {
            // Check in Admin Table
            const admin = await module.exports.checkUser('tbl_admin', username);
            if (admin) {
                const match = await bcrypt.compare(password, admin.password);
                if (match) {
                    const token = jwt.sign({
                        kode_admin: admin.kode_admin,
                        name: admin.nama_admin,
                        username: admin.username,
                        userType: 'admin'
                    }, SECRET_KEY, { expiresIn: '1h' });

                    return res.status(200).json({
                        message: 'Logged In As Admin',
                        userType: 'admin',
                        token: token
                    });
                } else {
                    return res.status(400).send('Username atau password mungkin salah');
                }
            }

            // Check in Customer Table
            const customer = await module.exports.checkUser('tbl_customer', username);
            if (customer) {
                const match = await bcrypt.compare(password, customer.password);
                if (match) {
                    const token = jwt.sign({
                        kode_customer: customer.kode_customer,
                        name: customer.nama_customer,
                        username: customer.username,
                        alamat: customer.alamat,
                        email: customer.email,
                        no_hp: customer.no_hp,
                        url_profileImg: customer.url_profileImg,
                        userType: 'customer'
                    }, SECRET_KEY, { expiresIn: '1h' });

                    return res.status(200).json({
                        message: 'Logged In As Customer',
                        userType: 'customer',
                        token: token
                    });
                } else {
                    return res.status(400).send('Username atau password mungkin salah');
                }
            }

            // If user not found
            return res.status(404).send('User Tidak Ditemukan');
        } catch (error) {
            console.error('Error during login:', error);
            return res.status(500).send('Server Error');
        }
    },

    verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).send('Unauthorized: Tidak Memiliki Token');

        const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
        if (!token) return res.status(401).send('Unauthorized: Terdapat Kesalahan pada Token');

        // Check if the token is invalidated
        if (invalidatedTokens.includes(token)) {
            return res.status(401).send('Unauthorized: Login terlebih Dahulu');
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) return res.status(401).send('Unauthorized: Terdapat Kesalahan pada Token');

            req.user = decoded;
            next();
        });
    },

    logout(req, res) {
        // Clear JWT token (if stored in client-side)
        res.clearCookie('jwt'); // Assuming the token is stored as a cookie

        // Get the token from the request headers
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            // Check if the token exists and push it to the invalidatedTokens array
            if (token) {
                invalidatedTokens.push(token);
            }
        }

        res.status(200).send('Log Out Berhasil');
    },

    getProfile(req, res) {
        return res.status(200).json({
            message: 'Profile Information',
            user: req.user
        });
    }
};