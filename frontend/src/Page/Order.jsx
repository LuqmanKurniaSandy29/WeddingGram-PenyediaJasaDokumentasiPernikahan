import React, { useState } from "react";
import "../App.css";
import Navigasi from "../Components/Navbar/Navigasi";
import { Container, Row, Col, Button } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";

// Register locale
registerLocale('id', id);

const Order = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <Navigasi />
            <section className="bg-color ">
                <Container className="align-item-center justify-content-center p-5">
                    <Row className="p-5 bg-light m-5 rounded">
                        <Col md={4} className="p-2">
                        <Form>
                            <Form.Group className="mb-3" controlId="ControlInputName">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan Nama" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ControlInputAddress">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control type="text" placeholder="Masukkan Alamat" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="ControlTextareaDetailLocation">
                                <Form.Label>Deskripsi Tempat</Form.Label>
                                <Form.Control as="textarea" placeholder="Masukkan Deskripsi Tempat" rows={3} />
                            </Form.Group>
                        </Form>
                        </Col>
                        <Col md={4} className="p-2">
                            <Form>
                                <Form.Group className="mb-3" controlId="ControlInputTelp">
                                    <Form.Label>No.Telepon</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan No. Telepon" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ControlInputDate">
                                    <Form.Label>Tanggal</Form.Label>
                                    <Form.Control
                                        as={DatePicker}
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        locale="id"
                                    
                                    />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={4} className="py-2 px-2 ">
                            <h6>Total</h6>
                            <p className="font-weight-bold">Rp. Akeh Pokok'e</p>
                            <Button style={{ backgroundColor: "#D5A351", border: "none", padding:"3px 40px" }} href="/payment">Payment</Button>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default Order;
