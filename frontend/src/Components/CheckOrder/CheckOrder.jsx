import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const packageNames = {
  "P-0001": "Paket Favorite",
  "P-0002": "Paket Exclusive",
  "P-0003": "Paket Glamour",
  "P-0004": "Paket Gold",
};

const CheckOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get("http://localhost:3001/customer/custOrder", { headers });

        console.log("Response from API:", response.data);

        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="m-5 p-5 bg-light rounded">
        <h3 className="my-3 text-center">Cek Status Pemesanan</h3>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead style={{ backgroundColor: "#B9B6B6" }}>
                <tr className="text-center">
                  <th>Nama Paket</th>
                  <th>Tanggal Acara</th>
                  <th>Tanggal Order</th>
                  <th>Total Biaya</th>
                  <th>Status Order</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <tr key={index}>
                      <td>{packageNames[order.kode_product] || order.kode_product}</td>
                      <td>{new Date(order.tanggal_acara).toLocaleDateString()}</td>
                      <td>{new Date(order.tanggal_order).toLocaleDateString()}</td>
                      <td>{order.total_biaya.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</td>
                      <td>{order.status_order}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No orders found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOrder;
