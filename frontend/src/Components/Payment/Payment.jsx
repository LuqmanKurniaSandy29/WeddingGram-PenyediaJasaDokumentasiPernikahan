import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";
import qrisPayment from "../../Asset/qris.jpg";

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
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [orderDetails, setOrderDetails] = useState({});

  useEffect(() => {
    fetchCustomerProfile();
    fetchOrderDetails();
  }, []);

  const fetchCustomerProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3001/auth/profile", { headers });

      setCustomerName(response.data.user.name || "");
      setCustomerAddress(response.data.user.alamat || "");
      setCustomerPhone(response.data.user.no_hp || "");
    } catch (error) {
      console.error("Error fetching customer profile:", error);
    }
  };

  const fetchOrderDetails = () => {
    const storedOrderDetails = localStorage.getItem("orderDetails");
    if (storedOrderDetails) {
      const parsedOrderDetails = JSON.parse(storedOrderDetails);
      console.log("Fetched order details from localStorage:", parsedOrderDetails);
      setOrderDetails(parsedOrderDetails);
    } else {
      console.log("No order details found in localStorage");
    }
  };

  const handlePaymentMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setPaymentMethod(selectedMethod);
    if (selectedMethod === "transfer") {
      Swal.fire({
        title: "Scan QRIS untuk Pembayaran",
        text: "Silakan scan QRIS berikut untuk melakukan pembayaran.",
        imageUrl: qrisPayment, // Ubah dengan URL atau path lokal gambar QRIS kamu
        imageAlt: "QRIS",
        confirmButtonText: "OK",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formData = new FormData();
    formData.append("kode_pembayaran", orderDetails.kode_pembayaran);
    formData.append("metode_pembayaran", paymentMethod);

    if (paymentMethod === "transfer") {
      const bukti_transfer = event.target.elements.bukti_transfer.files[0];
      formData.append("bukti_transfer", bukti_transfer);
    }

    // Logging formData entries
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const response = await axios.post("http://localhost:3001/payment", formData, { headers });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Pembayaran Berhasil!",
          text: "Terima kasih telah melakukan pembayaran.",
        }).then(() => {
          window.location.href = "/profile";
        });
      } else {
        throw new Error("Failed to process payment");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal melakukan pembayaran. Silakan coba lagi.",
      });
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center bg-color">
      <CustomContainerPayment className="p-5 bg-light rounded m-auto shadow" style={{ height: "max-content" }}>
        <Row className="px-5">
          <h2 className="text-center fw-bold mb-3">Payment</h2>
          <Col lg={3} md={6} sm={6} xs={12} className="p-2">
            <Form>
              <Form.Group className="mb-4" controlId="ControlInputName">
                <Form.Label className="mb-3 fw-bold">Nama</Form.Label>
                <p className="fw-normal">{customerName}</p>
              </Form.Group>
              <Form.Group className="mb-4" controlId="ControlInputAddress">
                <Form.Label className="mb-3 fw-bold">Alamat</Form.Label>
                <p className="fw-normal">{customerAddress}</p>
              </Form.Group>
            </Form>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} className="p-2">
            <Form>
              <Form.Group className="mb-4" controlId="ControlInputTelp">
                <Form.Label className="mb-3 fw-bold">No.Telepon</Form.Label>
                <p className="fw-normal">{customerPhone}</p>
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3 fw-bold">Paket</Form.Label>
                <p className="fw-normal">{orderDetails.package}</p>
              </Form.Group>
            </Form>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} className="py-2 px-2">
            <Form.Group className="mb-4" controlId="ControlInputDate">
              <Form.Label className="mb-3 fw-bold">Tanggal</Form.Label>
              <p className="fw-normal">{orderDetails.date ? new Date(orderDetails.date).toLocaleDateString("id-ID") : ""}</p>
            </Form.Group>
            <h6 className="fw-bold mb-3">Total</h6>
            <p className="fw-normal">{`Rp.${orderDetails.total?.toLocaleString("id")}`}</p>
          </Col>
          <Col lg={3} md={6} sm={6} xs={12} className="py-2 px-2">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="ControlInputDate">
                <Form.Label className="mb-3 fw-bold">Pilih Metode Pembayaran</Form.Label>
                <div className="d-flex">
                  <Form.Check className="mx-2" type="radio" name="paymentMethod" value="transfer" label="Transfer" checked={paymentMethod === "transfer"} onChange={handlePaymentMethodChange} />
                  <Form.Check className="mx-2" type="radio" name="paymentMethod" value="cod" label="COD" checked={paymentMethod === "cod"} onChange={handlePaymentMethodChange} />
                </div>
              </Form.Group>
              {paymentMethod === "transfer" && (
                <Form.Group controlId="bukti_transfer">
                  <Form.Label className="mb-3 fw-bold">Upload Bukti Transfer</Form.Label>
                  <Form.Control type="file" />
                </Form.Group>
              )}
              <CustomButtonPayment type="submit" className="mt-3">
                Bayar
              </CustomButtonPayment>
            </Form>
          </Col>
        </Row>
      </CustomContainerPayment>
    </section>
  );
};

export default Payment;
