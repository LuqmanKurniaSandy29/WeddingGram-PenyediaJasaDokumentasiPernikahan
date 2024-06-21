import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "../Profile/Profile.css";
import { Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../Context/AuthContext"; // Import AuthContext

const NotFound = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <h1>404 Page Not Found</h1>
  </div>
);

const Profile = () => {
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
        // Mengatur pesan error jika terjadi kesalahan
        console.error('Error fetching profile data:', error);
        setError(error.message || 'Error fetching profile data');

        // Handle error khusus, misalnya redirect ke halaman login jika tidak authorized
        if (error.response && error.response.status === 401) {
          logout(); // Memanggil fungsi logout dari AuthContext
          window.location.href = "/login"; // Redirect ke halaman login
        }
        setLoading(false); // Menghentikan status loading setelah request selesai
      }
    };

    fetchProfile(); // Panggil fungsi fetchProfile saat komponen Profile di-mount

    // Check if profileUpdated is true and update profile
    const profileUpdated = localStorage.getItem('profileUpdated');
    if (profileUpdated === 'true') {
      localStorage.removeItem('profileUpdated'); // Hapus indikator setelah digunakan
      fetchProfile(); // Lakukan fetch ulang data profil
    }

  }, [logout]); // Menambahkan dependency logout agar useEffect dapat digunakan dengan baik

  const handleLogout = () => {
    logout(); // Memanggil fungsi logout dari AuthContext
    window.location.href = "/login"; // Redirect ke halaman login setelah logout
  };

  // Kondisi ketika sedang loading data
  if (loading) {
    return <p>Loading...</p>; // Menampilkan pesan loading
  }

  // Kondisi ketika terjadi error saat fetching data atau token tidak ditemukan
  if (error || !profileData) {
    return <NotFound />; // Menampilkan halaman 404
  }

  // Log profileData untuk memastikan datanya benar
  // console.log('Profile Data in render:', profileData);

  // Tampilkan JSON profileData untuk debugging
  return (
    <div className="p-lg-5 p-5 bg-color">
      <Container fluid className="p-5 bg-light rounded shadow">
        <Row className="text-left m-auto justify-content-around" style={{ width: "80%" }}>
          <h3 className="my-3">Profile</h3>
          <Col lg={4} md={6} sm={12}>
            {/* Menampilkan gambar profil */}
            {profileData && (
              <img
                className="mb-4 rounded"
                style={{ height: "200px", width: "180px" }}
                src={profileData.url_profileImg || 'default-image-url.jpg'} // Pastikan gambar profil ada
                alt="foto profile"
              />
            )}
          </Col>
          <Col lg={4} md={3} sm={6}>
            {profileData && (
              <>
                <div className="mb-4">
                  <h6 className="fw-bold">Nama</h6>
                  <p className="font-weight-lighter">{profileData.name || 'N/A'}</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold">Username</h6>
                  <p className="font-weight-lighter">{profileData.username || 'N/A'}</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold">Alamat</h6>
                  <p className="font-weight-lighter">{profileData.alamat || 'N/A'}</p>
                </div>
              </>
            )}
          </Col>
          <Col lg={4} md={3} sm={6}>
            {profileData && (
              <>
                <div className="mb-4">
                  <h6 className="fw-bold">No.Telp</h6>
                  <p className="font-weight-lighter">{profileData.no_hp || 'N/A'}</p>
                </div>
                <div className="mb-4">
                  <h6 className="fw-bold">Email</h6>
                  <p className="font-weight-lighter">{profileData.email || 'N/A'}</p>
                </div>
              </>
            )}
          </Col>
          <Col lg={12} md={12} sm={12}>
            <div>
              {/* Tombol untuk mengubah profil */}
              <a href="/editprofile">
                <button className="custom-button my-3">
                  Ubah Profil
                </button>
              </a>
            </div>
            <div>
              {/* Tombol untuk logout */}
              <button className="logout-button my-3" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
