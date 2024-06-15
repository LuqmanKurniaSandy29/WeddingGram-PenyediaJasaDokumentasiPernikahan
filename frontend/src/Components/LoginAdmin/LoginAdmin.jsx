import React, { useState } from "react";
import { Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../Login/Login.css';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', {
                username,
                password
            });

            const { token } = response.data;

            // Show success notification
            Swal.fire({
                title: 'Login Berhasil!',
                text: 'Selamat datang kembali.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/admin"; // Redirect to homepage
                }
            });

            // Store the token in localStorage
            localStorage.setItem('token', token);
        } catch (error) {
            // Show error notification
            Swal.fire({
                title: 'Login Gagal',
                text: error.response.data.message || 'Terjadi kesalahan. Silakan coba lagi.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <Container fluid className="login-template d-flex justify-content-center align-items-center vh-100 bg-color">
            <Row>
                <Col xs={12} md={6} lg={4}>
                    <div className="p-5 rounded bg-light shadow" style={{ height: 'max-content', width:'max-content' }}>
                        <Form onSubmit={handleLogin}>
                            <h3 className="text-center my-3 fw-bold">Login Admin</h3>
                            <Form.Group className="my-3">
                                <Form.Label htmlFor="username" className="fw-bold">Username</Form.Label>
                                <Form.Control 
                                    type="text" 
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
                                    placeholder="Masukkan Password" 
                                    className="form-control-login"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                />
                            </Form.Group>
                            <div className="text-center my-3">
                                <button type="submit" className="custom-button py-2 px-3 fw-semibold">
                                    Login
                                </button>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginAdmin;
