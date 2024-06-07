import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";

// Styled components
const CustomContainerPayment = styled(Container)`
  max-width: 1000px;
`;

const CustomButtonPayment = styled.button`
  background-color: #d5a351;
  border: none;
  padding: 7px 20px;
  box-shadow: 0 2px 4px #000;
  border-radius: 2px;
  color: #fff;
  width: 150px;
  &:hover {
    background-color: #f3bb62;
    box-shadow: 0 3px 5px #000;
  }
`;

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <>
      <section className="d-flex justify-content-center align-items-center bg-color">
        <CustomContainerPayment className="p-5 bg-light rounded m-auto" style={{ height: "max-content" }}>
          <Row className="px-5">
            <h2 className="text-center fw-bold mb-3">Payment</h2>
            <Col lg={3} md={6} sm={6} xs={12} className="p-2">
              <Form>
                <Form.Group className="mb-4" controlId="ControlInputName">
                  <Form.Label className="mb-3 fw-bold">Nama</Form.Label>
                  <p className="fw-normal">Dani Bandara Saputra</p>
                </Form.Group>
                <Form.Group className="mb-4" controlId="ControlInputAddress">
                  <Form.Label className="mb-3 fw-bold">Alamat</Form.Label>
                  <p className="fw-normal">JL.pawitra penanggungan VII</p>
                </Form.Group>
              </Form>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="p-2">
              <Form>
                <Form.Group className="mb-4" controlId="ControlInputTelp">
                  <Form.Label className="mb-3 fw-bold">No.Telepon</Form.Label>
                  <p className="fw-normal">08109347263</p>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="mb-3 fw-bold">Paket</Form.Label>
                  <p className="fw-normal">Paket Exvlusive</p>
                </Form.Group>
              </Form>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="py-2 px-2">
              <Form.Group className="mb-4" controlId="ControlInputDate">
                <Form.Label className="mb-3 fw-bold">Tanggal</Form.Label>
                <p className="fw-normal">12-12-24</p>
              </Form.Group>
              <h6 className="fw-bold mb-4">Total</h6>
              <p className="fw-normal">Rp.5.000.000</p>
            </Col>
            <Col lg={3} md={6} sm={6} xs={12} className="py-2 px-2">
              <Form.Group className="mb-4" controlId="ControlInputDate">
                <Form.Label className="mb-3 fw-bold">Pilih Metode Pembayaran</Form.Label>
                <div className="d-flex">
                  <Form.Check className="mx-2" type="radio" name="paymentMethod" value="transfer" label="Transfer" checked={paymentMethod === "transfer"} onChange={handlePaymentMethodChange} />
                  <Form.Check className="mx-2" type="radio" name="paymentMethod" value="cash" label="Cash" checked={paymentMethod === "cash"} onChange={handlePaymentMethodChange} />
                </div>
              </Form.Group>
              {paymentMethod !== "cash" && (
                <Form.Group className="mb-4" controlId="ControlInputDate">
                  <Form.Label className="mb-3 fw-bold">Upload bukti tf</Form.Label>
                  <Col lg="12" md="8" sm="11">
                    <Form.Control type="file" />
                  </Col>
                </Form.Group>
              )}
              {paymentMethod === "cash" && (
                <Form.Group className="mb-4" controlId="ControlInputDate">
                  <Form.Label className="fw-bold">Upload bukti tf</Form.Label>
                  <p className="fw-normal my-2">*Hanya berlaku saat tf</p>
                </Form.Group>
              )}
            </Col>
          </Row>
          <Row className="px-5 mt-3">
            <Col md={12}>
              <a href="/">
                <CustomButtonPayment>Bayar</CustomButtonPayment>
              </a>
            </Col>
          </Row>
        </CustomContainerPayment>
      </section>
    </>
  );
};

export default Payment;
