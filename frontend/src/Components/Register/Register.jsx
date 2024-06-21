import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import "../Register/Register.css";

function Register() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nama_customer: "",
    alamat: "",
    no_hp: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/customer/register", formData);
      Swal.fire({
        icon: "success",
        title: "Registrasi Berhasil",
        text: "Anda telah berhasil mendaftar!",
      });
      setFormData({
        username: "",
        password: "",
        nama_customer: "",
        alamat: "",
        no_hp: "",
        email: "",
      });
      setValidated(false);
      console.log(response.data); // Tangani respon sesuai kebutuhan
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registrasi Gagal",
        text: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
      });
      console.error(error); // Tangani kesalahan sesuai kebutuhan
    }
  };

  return (
    <div id="form" className="template d-flex justify-content-center align-item-center vh-100 bg-color">
      <Container className="p-5 rounded m-auto bg-light shadow" style={{ height: 'max-content', width: "60%" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 m-auto">
            <h4 className="text-center mb-4">Registrasi</h4>
            <Col lg={6}>
              <div style={{ width: "100%" }} className="m-auto">
                <Form.Group controlId="validationCustom01">
                  <Form.Label className="mt-1 fw-bold">Nama</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Masukkan nama Anda"
                    name="nama_customer"
                    value={formData.nama_customer}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukan nama Anda</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom03">
                  <Form.Label className="mt-1 fw-bold">Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Masukkan username Anda"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukkan username</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom02">
                  <Form.Label className="mt-1 fw-bold">Email</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Masukkan alamat email Anda"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukan alamat email Anda</Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
            <Col lg={6}>
              <div style={{ width: "100%" }} className="m-auto">
                <Form.Group controlId="validationCustom04">
                  <Form.Label className="mt-1 fw-bold">Alamat</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Masukkan alamat Anda"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukkan alamat Anda</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom05">
                  <Form.Label className="mt-1 fw-bold">No Telepon</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="Masukkan nomor telepon Anda"
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukkan nomor telepon Anda</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationCustom06">
                  <Form.Label className="mt-1 fw-bold">Password</Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="Masukkan password Anda"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-control-regist"
                  />
                  <Form.Control.Feedback type="invalid">Mohon masukkan password Anda</Form.Control.Feedback>
                </Form.Group>
              </div>
            </Col>
          </Row>
          <div className="d-grid text-center my-3 align-item-center justify-content-center">
            <button type="submit" className="custom-button py-2 px-3 fw-semibold">
              Registrasi
            </button>
          </div>
          <p className="text-center">
            Sudah memiliki akun? <a href="/login">Login</a>
          </p>
        </Form>
      </Container>
    </div>
  );
}
 
export default Register;
