import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gambar from "../../../Asset/user.webp";
import Dropdown from "react-bootstrap/Dropdown";

function Dashboard({ onMenuClick, activeMenu }) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="side">
          <img src={gambar} alt="Gambar" />
          <h5 className="custom-text">Selamat Datang "Nama"</h5>
          <hr className="text-secondary" />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item text-white my-1">
              <a href="#" className={`nav-link text-white small ${activeMenu === "home" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("home")}>
                <i className="bi bi-house"></i>
                <span className="ms-2">Dashboard</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#" className={`nav-link text-white small ${activeMenu === "order" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("order")}>
                <i className="bi bi-basket2"></i>
                <span className="ms-2 text">Order</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#" className={`nav-link text-white small ${activeMenu === "payment" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("payment")}>
                <i className="bi bi-cash-coin"></i>
                <span className="ms-2">Payment</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#" className={`nav-link text-white small ${activeMenu === "user" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("user")}>
                <i className="bi bi-person"></i>
                <span className="ms-2">User</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <i className="bi bi-person circle"></i>
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
