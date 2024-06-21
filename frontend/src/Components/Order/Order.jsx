import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import axios from "axios";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import "./Order.css";

// Register locale
registerLocale("id", id);

const Order = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [packageSelected, setPackageSelected] = useState("");
  const [showPackageError, setShowPackageError] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [hargaProduct, setHargaProduct] = useState(0); // State untuk harga paket
  const [packageName, setPackageName] = useState(""); // State untuk nama paket

  useEffect(() => {
    // Fetch customer profile data when component mounts
    fetchCustomerProfile();
  }, []);

  const fetchCustomerProfile = async () => {
    try {
      // Fetch customer profile from API
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get("http://localhost:3001/auth/profile", { headers });

      // Update state with customer profile data
      setCustomerName(response.data.user.name || "");
      setCustomerAddress(response.data.user.alamat || "");
      setCustomerPhone(response.data.user.no_hp || "");
    } catch (error) {
      console.error("Error fetching customer profile:", error);
      // Handle error if needed
    }
  };

  const handlePackageChange = (e) => {
    const selectedPackage = e.target.value;
    setPackageSelected(selectedPackage);

    // Define harga berdasarkan pilihan paket
    const hargaPaket = {
      "P-0001": 4000000, // Harga Paket Favorite
      "P-0002": 5000000, // Harga Paket Exclusive
      "P-0003": 6000000, // Harga Paket Glamour
      "P-0004": 7000000, // Harga Paket Gold
    };

    // Define nama berdasarkan pilihan paket
    const namaPaket = {
      "P-0001": "Paket Favorite",
      "P-0002": "Paket Exclusive",
      "P-0003": "Paket Glamour",
      "P-0004": "Paket Gold",
    };

    // Set harga produk dan nama paket berdasarkan pilihan paket yang dipilih
    setHargaProduct(hargaPaket[selectedPackage]);
    setPackageName(namaPaket[selectedPackage]);
  };

  const isDateValid = (date) => {
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setDate(currentDate.getDate() + 7); // 7 days from current date
    return date >= minDate;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!isDateValid(startDate)) {
      Swal.fire({
        icon: "error",
        title: "Tanggal tidak valid",
        text: "Mohon pilih tanggal acara lebih dari seminggu setelah pemesanan.",
      });
      return;
    }

    let valid = true;
    if (!packageSelected) {
      setShowPackageError(true);
      valid = false;
    } else {
      setShowPackageError(false);
    }

    if (valid) {
      try {
        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        };

        // Make POST request to place order
        const response = await axios.post(
          "http://localhost:3001/order",
          {
            kode_product: packageSelected,
            tanggal_acara: startDate,
            total_biaya: hargaProduct, // Gunakan harga yang telah di-set
          },
          { headers }
        );

        // Check response status and handle accordingly
        if (response.status === 200) {
          // Save order details to localStorage
          localStorage.setItem(
            "orderDetails",
            JSON.stringify({
              package: packageName,
              date: startDate,
              total: hargaProduct,
              kode_pembayaran: response.data.kode_pembayaran, // Simpan kode_pembayaran dari response
            })
          );

          // Show success message using Sweet Alert
          Swal.fire({
            icon: "success",
            title: "Pesanan Berhasil!",
            text: "Silakan lanjutkan dengan pembayaran.",
          }).then(() => {
            // Redirect to payment page
            window.location.href = "/payment";
          });
        } else {
          throw new Error("Failed to process order");
        }
      } catch (error) {
        console.error("Error:", error);
        // Show error message using Sweet Alert
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Gagal melakukan pesanan. Silakan coba lagi.",
        });
      }
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
                  <Form.Control type="text" placeholder="Masukkan Nama" value={customerName} readOnly />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ControlInputAddress">
                  <Form.Label className="fw-bold">Alamat</Form.Label>
                  <Form.Control type="text" placeholder="Masukkan Alamat" value={customerAddress} readOnly />
                </Form.Group>
              </Col>
              <Col md={4} className="p-2">
                <Form.Group className="mb-3" controlId="ControlInputTelp">
                  <Form.Label className="fw-bold">No.Telepon</Form.Label>
                  <Form.Control type="text" placeholder="08***********" value={customerPhone} readOnly style={{ width: "100%" }} />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="fw-bold">Paket</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    required
                    value={packageSelected}
                    onChange={handlePackageChange} // Memanggil fungsi saat pilihan paket berubah
                  >
                    <option value="">Pilih paket Anda</option>
                    <option value="P-0001">Paket Favorite</option>
                    <option value="P-0002">Paket Exclusive</option>
                    <option value="P-0003">Paket Glamour</option>
                    <option value="P-0004">Paket Gold</option>
                  </Form.Select>
                  {showPackageError && (
                    <div className="text-danger" style={{ fontSize: "small" }}>
                      Pilih paket terlebih dahulu
                    </div>
                  )}
                </Form.Group>
              </Col>
              <Col lg={4} className="py-2 px-2">
                <Form.Group className="mb-3" controlId="ControlInputDate">
                  <Form.Label className="fw-bold">Tanggal</Form.Label>
                  <div className="custom-datepicker-wrapper">
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="dd/MM/yyyy" locale="id" className="custom-datepicker form-control" />
                  </div>
                </Form.Group>
                <h6 className="fw-bold">Total</h6>
                <p className="fw-bold my-3">{`Rp.${hargaProduct.toLocaleString("id")}`}</p>
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
