import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gambar from "../../../Asset/user.webp";
import Dropdown from "react-bootstrap/Dropdown";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Dashboard({ onMenuClick, activeMenu }) {
  return (
    <div className="container-fluid">
      <div className="row-admin">
        <div className="side">
          <img className="logo-admin" src={gambar} alt="Gambar" />
          <h5 className="custom-text-admin">Selamat Datang "Nama"</h5>
          <hr className="text-secondary" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item text-white my-1">
              <a href="#home" className={`nav-link text-white small ${activeMenu === "home" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("home")}>
                <i className="ms-3 bi bi-house"></i>
                <span className="ms-2">Dashboard</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#order" className={`nav-link text-white small ${activeMenu === "order" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("order")}>
                <i className="ms-3 bi bi-basket2"></i>
                <span className="ms-2 text">Order</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#payment" className={`nav-link text-white small ${activeMenu === "payment" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("payment")}>
                <i className="ms-3 bi bi-cash-coin"></i>
                <span className="ms-2">Payment</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#user" className={`nav-link text-white small ${activeMenu === "user" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("user")}>
                <i className="ms-3 bi bi-person"></i>
                <span className="ms-2">User</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown-admin">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <i className="ms-3 bi bi-person circle"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Edit Profil</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Tambah Admin</Dropdown.Item>
              <Dropdown.Item href="#/action-3">LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
