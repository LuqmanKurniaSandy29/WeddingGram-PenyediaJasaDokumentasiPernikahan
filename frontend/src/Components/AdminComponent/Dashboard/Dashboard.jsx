import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import gambar from "../../../Asset/user.webp";
import Dropdown from "react-bootstrap/Dropdown";
import "./Dashboard.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import AuthContext from "../../../Context/AuthContext";

function NotFound() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <h1>404 Page Not Found</h1>
    </div>
  );
}

function Dashboard({ onMenuClick, activeMenu }) {
  const { logout } = useContext(AuthContext); // Menggunakan AuthContext untuk logout
  const [profileData, setProfileData] = useState(null); // State untuk menyimpan data profil
  const [loading, setLoading] = useState(true); // State untuk mengelola status loading
  const [error, setError] = useState(null); // State untuk menyimpan pesan error

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Mendapatkan token dari localStorage
        if (!token) {
          throw new Error('Token tidak ditemukan');
        }

        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}` // Mengirimkan token dalam headers request
          }
        });

        // Mengatur data profil ke dalam state dari response.data.user
        setProfileData(response.data.user);
        setLoading(false); // Menghentikan status loading setelah request selesai
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message || 'Error fetching profile data');

        if (error.response && error.response.status === 401) {
          logout(); // Memanggil fungsi logout dari AuthContext
          window.location.href = "/loginadmin"; // Redirect ke halaman login
        }
        setLoading(false); // Menghentikan status loading setelah request selesai
      }
    };

    fetchProfile(); // Panggil fungsi fetchProfile saat komponen di-mount

    // Check if profileUpdated is true and update profile
    const profileUpdated = localStorage.getItem('profileUpdated');
    if (profileUpdated === 'true') {
      localStorage.removeItem('profileUpdated'); // Hapus indikator setelah digunakan
      fetchProfile(); // Lakukan fetch ulang data profil
    }
  }, [logout]); // Menambahkan dependency logout agar useEffect dapat digunakan dengan baik

  const handleLogout = () => {
    logout(); // Memanggil fungsi logout dari AuthContext
    window.location.href = "/loginadmin"; // Redirect ke halaman login setelah logout
  };

  // Kondisi ketika sedang loading data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !profileData) {
    return <NotFound />;
  }

  return (
      <div className="row-admin vh-100">
        <div className="side">
          <div className="text-center">
          <img className="logo-admin" src={gambar} alt="Gambar" />
          <h5>Selamat Datang</h5>
          <h4>{profileData.name || 'N/A'}</h4>
          <hr className="text-secondary" />
          </div>
          <div className="text-left">
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
                <span className="ms-2 text">Data Order</span>
              </a>
            </li>
            <li className="nav-item text-white my-1">
              <a href="#payment" className={`nav-link text-white small ${activeMenu === "payment" ? "active" : ""}`} aria-current="page" onClick={() => onMenuClick("payment")}>
                <i className="ms-3 bi bi-cash-coin"></i>
                <span className="ms-2">Confirm Payment</span>
              </a>
            </li>
          </ul>
          <div className="dropdown-admin">
          <Dropdown>
            <Dropdown.Toggle className="custom-dropdown-toggle" id="dropdown-basic">
              <i className="mx-1 bi bi-person-circle"></i> Admin Menu
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/addadmin">Register Admin</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>LogOut</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
          </div>
        </div>
      </div>
  );
}

export default Dashboard;
