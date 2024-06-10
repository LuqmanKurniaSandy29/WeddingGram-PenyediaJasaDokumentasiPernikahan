import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import "react-datepicker/dist/react-datepicker.css";
import './Order.css';

// Register locale
registerLocale('id', id);

const Order = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [packageSelected, setPackageSelected] = useState("");
    const [showPackageError, setShowPackageError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        let valid = true;
        if (!packageSelected) {
            setShowPackageError(true);
            valid = false;
        } else {
            setShowPackageError(false);
        }

        if (valid) {
            // Proceed to payment or further processing
            window.location.href = "/payment";
        }
    };

    return (
        <>
            <section className="d-flex justify-content-center align-items-center bg-color">
                <Container className="custom-container p-5 bg-light rounded m-5 shadow">
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="px-5">
                            <h2 className="text-center fw-bold">Order</h2>
                            <Col md={4} className="p-2">
                                <Form.Group className="mb-3" controlId="ControlInputName">
                                    <Form.Label className="fw-bold">Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Nama" readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ControlInputAddress">
                                    <Form.Label className="fw-bold">Alamat</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Alamat" readOnly />
                                </Form.Group>
                            </Col>
                            <Col md={4} className="p-2">
                                <Form.Group className="mb-3" controlId="ControlInputTelp">
                                    <Form.Label className="fw-bold">No.Telepon</Form.Label>
                                    <Form.Control type="text" placeholder="08***********" readOnly style={{ width: "100%" }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Paket</Form.Label>
                                    <Form.Select 
                                        aria-label="Default select example" 
                                        required
                                        onChange={(e) => setPackageSelected(e.target.value)}
                                    >
                                        <option value="">Pilih paket Anda</option>
                                        <option value="1">Paket Favorite</option>
                                        <option value="2">Paket Exvlusive</option>
                                        <option value="3">Paket Glamour</option>
                                        <option value="4">Paket Gold</option>
                                    </Form.Select>
                                    {showPackageError && (
                                        <div className="text-danger" style={{ fontSize: "small" }}>Pilih paket terlebih dahulu</div>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col lg={4} className="py-2 px-2">
                                <Form.Group className="mb-3" controlId="ControlInputDate">
                                    <Form.Label className="fw-bold">Tanggal</Form.Label>
                                    <div className="custom-datepicker-wrapper">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="dd/MM/yyyy"
                                            locale="id"
                                            className="custom-datepicker form-control"
                                        />
                                    </div>
                                </Form.Group>
                                <h6 className="fw-bold">Total</h6>
                                <p className="fw-bold my-4">Rp.5.000.000</p>
                            </Col>
                        </Row>
                        <Row className="px-5">
                            <Col md={12}>
                                <button type="submit" className="custom-button">
                                    Pesan
                                </button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </section>
        </>
    );
};

export default Order;
