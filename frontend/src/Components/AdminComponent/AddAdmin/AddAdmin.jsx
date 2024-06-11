import React from 'react'
import { Form, Container, Row, Col } from 'react-bootstrap';
import "../AddAdmin/AddAdmin.css"

const AddAdmin = () => {
  return (
    <div>
      <Container fluid className="login-template d-flex justify-content-center align-items-center vh-100 bg-color">
            <Row className="justify-content-center">
                <Col>
                    <div className="p-5 rounded bg-light shadow" style={{ height: 'max-content' }}>
                        <Form>
                            <h3 className="text-center my-3">Add Admin</h3>
                            <Form.Group className="my-3">
                                <Form.Label htmlFor="username" className="fw-bold">Nama</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan Nama" className="form-control-login" />
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label htmlFor="username" className="fw-bold">Username</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan Username" className="form-control-login" />
                            </Form.Group>
                            <Form.Group className="my-3">
                                <Form.Label htmlFor="password" className="fw-bold">Password</Form.Label>
                                <Form.Control type="password" placeholder="Masukkan Password" className="form-control-login" />
                            </Form.Group>
                            <div className="d-grid text-center my-3"> 
                                <a href="/LoginAdmin">
                                    <button className="custom-button py-2 px-3 fw-semibold">
                                        Add Admin
                                    </button>
                                </a>
                            </div>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default AddAdmin
