import React, { useState, useEffect, useCallback } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import './HomeAdmin.css'; // Import the custom CSS

const HomeAdmin = () => {
  const [orders, setOrders] = useState({
    terlaksana: 0,
    akanTerlaksana: 0,
    pendapatan: 0
  });
  const [adminCount, setAdminCount] = useState(0);

  const fetchOrders = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get('http://localhost:3001/admin/listorder', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = response.data.data;

      let terlaksana = 0;
      let akanTerlaksana = 0;
      let pendapatan = 0;

      data.forEach(order => {
        if (order.status_order === "Selesai") {
          terlaksana++;
          pendapatan += parseFloat(order.total_biaya); 
        } else if (order.status_order === "Di Proses" || order.status_order === "Menunggu Pembayaran") {
          akanTerlaksana++;
        }
      });

      setOrders({
        terlaksana,
        akanTerlaksana,
        pendapatan
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      handleAuthError(error);
    }
  }, []);

  const fetchAdminProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get('http://localhost:3001/admin', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const adminData = response.data.data;

      setAdminCount(adminData.length);
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      handleAuthError(error);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    fetchAdminProfile();
  }, [fetchOrders, fetchAdminProfile]);

  const handleAuthError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        title: 'Otorisasi Gagal',
        text: 'Sesi Anda telah berakhir. Silakan login kembali.',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('customerData');
        window.location.href = "/loginadmin";
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Terjadi kesalahan saat mengambil data',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Container id="home-admin" className="my-4">
      <Row className="justify-content-left mb-4">
        <Col lg={6} md={6} sm={12} className="mb-4">
          <Card className="card-admin">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div className="content-admin text-left">
                <Card.Title>
                  <i className="bi bi-box-seam"></i> Pesanan
                </Card.Title>
                <Card.Text>
                  {orders.terlaksana} Terlaksana
                </Card.Text>
                <Card.Text>
                  {orders.akanTerlaksana} Akan Terlaksana
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} className="mb-4">
          <Card className="card-admin">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div className="content-admin text-left">
                <Card.Title>
                  <i className="bi bi-currency-dollar"></i> Pendapatan
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Total Pendapatan</Card.Subtitle>
                <Card.Text>
                  Rp. {orders.pendapatan.toLocaleString('id-ID')}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} md={6} sm={12} className="mb-4">
          <Card className="card-admin">
            <Card.Body className="d-flex flex-column justify-content-center align-items-center">
              <div className="content-admin text-left">
                <Card.Title>
                  <i className="bi bi-people"></i> Admin
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Total Admin</Card.Subtitle>
                <Card.Text>
                  {adminCount}
                </Card.Text>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeAdmin;
