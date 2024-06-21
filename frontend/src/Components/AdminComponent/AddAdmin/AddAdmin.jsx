import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';


const AddAdmin = () => {
    const [namaAdmin, setNamaAdmin] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Validasi input
            if (!namaAdmin.trim() || !username.trim() || !password.trim()) {
                throw new Error('Semua field harus diisi');
            }

            // Ambil token dari local storage
            const token = localStorage.getItem('token');

            // Periksa apakah token tersedia
            if (!token) {
                throw new Error('Anda perlu login untuk menambahkan admin');
            }

            // Konfigurasi axios dengan header Authorization
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            // Kirim permintaan ke server dengan nama_admin
            const response = await axios.post('http://localhost:3001/admin/register', {
                nama_admin: namaAdmin,
                username: username,
                password: password // Pastikan ini sesuai dengan apa yang diharapkan oleh backend
            }, config);

            // Check response status
            if (response.status === 200) {
                // Show success notification
                Swal.fire({
                    title: 'Admin berhasil ditambahkan!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        // No need to call login function or redirect
                        // Just reset the form fields
                        setNamaAdmin('');
                        setUsername('');
                        setPassword('');
                    }
                });
            } else {
                throw new Error('Gagal menambahkan admin');
            }
        } catch (error) {
            let errorMessage = 'Terjadi kesalahan. Silakan coba lagi.';
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            // Show error notification
            Swal.fire({
                title: 'Gagal menambahkan admin',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div>
            <Container fluid className="login-template d-flex justify-content-center align-items-center vh-100 bg-color">
                <Row className="justify-content-center">
                    <Col>
                        <div className="p-5 rounded bg-light shadow" style={{ height: 'max-content' }}>
                            <Form onSubmit={handleSubmit}>
                                <h3 className="text-center my-3">Register Admin</h3>
                                <Form.Group className="my-3">
                                    <Form.Label htmlFor="namaAdmin" className="fw-bold">Nama Admin</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="namaAdmin"
                                        placeholder="Masukkan Nama Admin"
                                        className="form-control-login"
                                        value={namaAdmin}
                                        onChange={(e) => setNamaAdmin(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Label htmlFor="username" className="fw-bold">Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="username"
                                        placeholder="Masukkan Username"
                                        className="form-control-login"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="my-3">
                                    <Form.Label htmlFor="password" className="fw-bold">Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        placeholder="Masukkan Password"
                                        className="form-control-login"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <div className="text-center my-3">
                                    <button type="submit" className="custom-button py-2 px-3 fw-semibold">
                                        Register Admin
                                    </button>
                                    <p className='my-3'>
                                        <a href="/admin">kembali ke dashboard</a>
                                    </p>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default AddAdmin;
