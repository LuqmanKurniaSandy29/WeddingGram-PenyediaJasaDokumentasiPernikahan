import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

const TableOrder = () => {
  const [orders, setOrders] = useState([]);

  const packageNames = {
    "P-0001": "Paket Favorite",
    "P-0002": "Paket Exclusive",
    "P-0003": "Paket Glamour",
    "P-0004": "Paket Gold",
  };

  const getOrders = useCallback(async () => {
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

      console.log('Response data:', response.data.data); // Debugging line
      setOrders(response.data.data);

    } catch (error) {
      console.error("Error fetching data:", error);
      handleAuthError(error);
    }
  }, []); // Empty dependency array because getOrders doesn't rely on any props or state

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
        text: 'Terjadi kesalahan saat mengambil data pembayaran',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="col py-5 px-3">
      <div className="tabel-admin" style={{ maxHeight: '700px', minWidth: '1000px', overflowY: 'auto', overflowX: 'auto' }}>
        <Table striped bordered hover className="py-5">
          <thead>
            <tr>
              <th id="header">Kode Order</th>
              <th id="header">Nama Paket</th>
              <th id="header">Kode Customer</th>
              <th id="header">Kode Pembayaran</th>
              <th id="header">Tanggal Acara</th>
              <th id="header">Tanggal Order</th>
              <th id="header">Total Biaya</th>
              <th id="header">Status Order</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map(order => (
                <tr key={order.kode_order}>
                  <td>{order.kode_order}</td>
                  <td>{packageNames[order.kode_product] || order.kode_product}</td>
                  <td>{order.kode_customer}</td>
                  <td>{order.kode_pembayaran}</td>
                  <td>{formatDate(order.tanggal_acara)}</td>
                  <td>{formatDate(order.tanggal_order)}</td>
                  <td>{formatCurrency(order.total_biaya)}</td>
                  <td>{order.status_order}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">Tidak ada data pembayaran</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableOrder;
