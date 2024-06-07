import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

// Register locale
registerLocale('id', id);

// Styled components
const CustomContainer = styled(Container)`
    max-width: 800px;
`;

const CustomButton = styled.button`
    background-color: #D5A351;
    border: none;
    padding: 7px 20px;
    box-shadow: 0 2px 4px #000;
    border-radius: 2px;
    color: #FFF;
    width: 150px;
    &:hover {
        background-color: #F3BB62;
        box-shadow: 0 3px 5px #000;
    }
`;

const CustomDatePicker = styled(DatePicker)`
    width: 100%;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #CED4DA;
`;

const CustomDatePickerWrapper = styled.div`
    .react-datepicker {
        border: 1px solid #CED4DA;
        border-radius: 4px;
        background-color: #FFF;
        z-index: 1000;
    }
    .react-datepicker__header {
        background-color: #D5A351;
        border-bottom: 1px solid #CED4DA;
        color: #FFF;
    }
    .react-datepicker__day-name {
        color: #000;
        font-size: 12px; 
    }
    .react-datepicker__day {
        color: black;
    }
    .react-datepicker__day--selected {
        background-color: #D5A351;
        color: white;
    }
    .react-datepicker__day--keyboard-selected {
        background-color: #F3BB62;
        color: #FFF;
    }
`;

const Order = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <>
            <section className="d-flex justify-content-center align-items-center bg-color vh-100">
                <CustomContainer className="p-5 bg-light rounded m-auto">
                    <Row className="px-5">
                        <h2 className="text-center fw-bold">Order</h2>
                        <Col md={4} className="p-2">
                            <Form>
                                <Form.Group className="mb-3" controlId="ControlInputName">
                                    <Form.Label className="fw-bold">Nama</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Nama" readOnly />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="ControlInputAddress">
                                    <Form.Label className="fw-bold">Alamat</Form.Label>
                                    <Form.Control type="text" placeholder="Masukkan Alamat" readOnly />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col md={4} className="p-2">
                            <Form>
                                <Form.Group className="mb-3" controlId="ControlInputTelp">
                                    <Form.Label className="fw-bold">No.Telepon</Form.Label>
                                    <Form.Control type="text" placeholder="08***********" readOnly style={{ width: "100%" }} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className="fw-bold">Paket</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>Pilih paket Anda</option>
                                        <option value="1">Paket Favorite</option>
                                        <option value="2">Paket Exvlusive</option>
                                        <option value="3">Paket Glamour</option>
                                        <option value="4">paket Gold</option>
                                    </Form.Select>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col lg={4} className="py-2 px-2">
                            <Form.Group className="mb-3" controlId="ControlInputDate">
                                <Form.Label className="fw-bold">Tanggal</Form.Label>
                                <CustomDatePickerWrapper>
                                    <CustomDatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        locale="id"
                                        className="form-control"
                                    />
                                </CustomDatePickerWrapper>
                            </Form.Group>
                            <h6 className="fw-bold">Total</h6>
                            <p className="fw-bold my-4">Rp. -</p>
                        </Col>
                    </Row>
                    <Row className="px-5">
                        <Col md={12}>
                            <a href="/payment">
                                <CustomButton>
                                    Pesan
                                </CustomButton>
                            </a>
                        </Col>
                    </Row>
                </CustomContainer>
            </section>
        </>
    );
};

export default Order;
