import React, { useState, useEffect, useCallback } from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

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
    <div id="home-admin">
      <div className="home-row1-admin">
        <Card id="card1" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-graph-up card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Pesanan</Card.Title>
              <Card.Text>
                <button className="me-3">{orders.terlaksana} Terlaksana</button>
                <button style={{ marginTop: "10px" }}>{orders.akanTerlaksana} Akan Terlaksana</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="home-row1-admin">
        <Card id="card2" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-bank card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Pendapatan</Card.Title>
              <Card.Text>
                <button>Rp. {orders.pendapatan.toLocaleString('id-ID')}</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="home-row1-admin">
        <Card id="card4" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-file-person-fill card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Admin</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Total Admin</Card.Subtitle>
              <Card.Text>
                <button>{adminCount}</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomeAdmin;
