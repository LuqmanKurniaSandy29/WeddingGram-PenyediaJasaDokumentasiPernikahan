import React, { useState } from "react";
import {Container, Row, Col, Form }from "react-bootstrap";
import "../Register/Register.css"

function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
 
    setValidated(true);
  };

  return (
    <div id="form" className="template d-flex justify-content-center align-item-center vh-100 bg-color">
      <Container className="p-5 rounded m-auto bg-light shadow" style={{ height:'max-content', width:"60%" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 m-auto">
            <h4 className="text-center mb-4">Registrasi</h4>
            <Col lg={6} >
             <div style={{width:"100%"}} className="m-auto">
             <Form.Group controlId="validationCustom01">
                <Form.Label className="mt-1">Nama</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan nama Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukan nama Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Email</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan alamat email Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukan alamat email Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Username</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan username Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukkan username</Form.Control.Feedback>
            </Form.Group>
             </div>
            </Col>
            <Col lg={6}>
              <div style={{width:"100%"}} className="m-auto">
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Alamat</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan alamat Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukkan alamat Anda</Form.Control.Feedback>
              </Form.Group>  
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Password</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan password Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukkan password Anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">No Telepon</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan nomor telepon Anda" />
                <Form.Control.Feedback type="invalid">Mohon masukkan nomor telepon Anda</Form.Control.Feedback>
              </Form.Group>
              </div>
            </Col>
          </Row>
          <div className="d-grid text-center my-3 align-item-center justify-content-center"> 
            <a href="/register">
                <button className="custom-button py-2 px-3 fw-semibold">
                  Registrasi
                </button>
            </a>
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
