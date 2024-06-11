import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TablePayment = () => {
  return (
    <div className="col">
      <div className="tabel-admin">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id="header">Kode Pembayaran</th>
              <th id="header">Metode Customer</th>
              <th id="header">Metode Pembayaran</th>
              <th id="header">Status Pembayaran</th>
              <th id="header">Bukti Transfer</th>
              <th id="header">Admin</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TablePayment;
