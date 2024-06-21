import React, { useState, useEffect, useCallback } from "react";
import { Table } from "react-bootstrap";
import axios from 'axios';
import Swal from 'sweetalert2';

const TablePayment = () => {
  const [payments, setPayments] = useState([]);

  const getPayments = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('User not authenticated');
      }

      const response = await axios.get('http://localhost:3001/admin/listpayment', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      handleAuthError(error);
    }
  }, []);

  useEffect(() => {
    getPayments();
  }, [getPayments]);

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
        window.location.href = "/login";
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

  const handleConfirmPayment = async (kode_pembayaran) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      const response = await axios.post(`http://localhost:3001/admin/listpayment/confirm`, {
        kode_pembayaran
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Server response:', response.data);

      // Update status pembayaran di state
      const updatedPayments = payments.map(payment => {
        if (payment.kode_pembayaran === kode_pembayaran) {
          return {
            ...payment,
            status_pembayaran: 'Terbayar'
          };
        }
        return payment;
      });

      setPayments(updatedPayments);

      Swal.fire({
        title: 'Success!',
        text: 'Payment updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Error updating payment:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update payment.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="col">
      <div className="tabel-admin">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id="header">Kode Pembayaran</th>
              <th id="header">Kode Customer</th>
              <th id="header">Metode Pembayaran</th>
              <th id="header">Status Pembayaran</th>
              <th id="header">Bukti Transfer</th>
              <th id="header">Kode Admin</th>
              <th id="header">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(payments) && payments.length > 0 ? (
              payments.map(payment => (
                <tr key={payment.kode_pembayaran}>
                  <td>{payment.kode_pembayaran}</td>
                  <td>{payment.kode_customer}</td>
                  <td>{payment.metode_pembayaran}</td>
                  <td>{payment.status_pembayaran}</td>
                  <td><a href={payment.bukti_transfer} target="_blank" rel="noopener noreferrer">Lihat Bukti</a></td>
                  <td>{payment.kode_admin}</td>
                  <td>
                    <button 
                      className="custom-button my-3"
                      onClick={() => handleConfirmPayment(payment.kode_pembayaran)}>
                      Konfirmasi Pembayaran
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Tidak ada data pembayaran yang perlu dikonfirmasi</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablePayment;
