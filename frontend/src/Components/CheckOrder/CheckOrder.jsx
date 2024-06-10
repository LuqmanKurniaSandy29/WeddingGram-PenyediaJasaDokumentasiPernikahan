import React from "react";
import { Table } from "react-bootstrap";

const CheckOrder = () => {
  const orderValues = ["Wedding Favorite", "Jl. Indah Bersamamu No.29", "30-12-2024", "Disetujui"];

  return (
    <div>
      <div className="m-5 p-5 bg-light rounded">
        <h3 className="my-3 text-center">Cek Status Pemesanan</h3>
        <Table striped bordered hover>
          <thead style={{ backgroundColor: "#B9B6B6" }}>
            <tr className="text-center">
              <th>Paket</th>
              <th>Alamat</th>
              <th>Tanggal Acara</th>
              <th>Status Pesanan</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              {orderValues.map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CheckOrder;
