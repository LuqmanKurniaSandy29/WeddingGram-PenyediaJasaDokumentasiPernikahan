import React from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TableUser = () => {
  return (
    <div className="col">
      <div className="tabel-admin">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th id="header">ID</th>
              <th id="header">Nama Customer</th>
              <th id="header">Username</th>
              <th id="header">Password</th>
              <th id="header">Alamat</th>
              <th id="header">Email</th>
              <th id="header">No Telephone</th>
              <th id="header">URL</th>
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

export default TableUser;
