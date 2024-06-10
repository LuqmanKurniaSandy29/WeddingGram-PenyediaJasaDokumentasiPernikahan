import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TableOrder = () => {
  return (
    <div className="col">
      <div className="tabel">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id="header">Kode Order</th>
              <th id="header">Kode Product</th>
              <th id="header">Metode Customer</th>
              <th id="header">Kode Pembayaran</th>
              <th id="header">Tanggal Acara</th>
              <th id="header">Tanggal Order</th>
              <th id="header">Total Biaya</th>
              <th id="header">Status Order</th>
            </tr>
          </thead>
          <tbody className="tbody">
            <tr>
              <td></td>
              <td></td>
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
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default TableOrder;
