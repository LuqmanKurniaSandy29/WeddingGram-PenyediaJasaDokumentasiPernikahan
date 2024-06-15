import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2 untuk menampilkan notifikasi
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import "../EditProfile/EditProfile.css";

const EditProfile = () => {
  // State untuk menyimpan data formulir
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    alamat: "",
    no_hp: "",
    email: "",
    imgProfile: null,
    url_profileImg: "",
  });

  // State untuk mengelola status loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect untuk mengambil data profil saat komponen dimuat
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Mendapatkan token dari localStorage
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan');

        // Mengirim permintaan GET ke endpoint untuk mengambil data profil
        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        // Mengatur data yang diterima ke dalam state formData
        const { name, username, alamat, no_hp, email, url_profileImg } = response.data.user;
        setFormData({ name, username, alamat, no_hp, email, imgProfile: null, url_profileImg });
        setLoading(false); // Menghentikan status loading setelah data diterima
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message || 'Error fetching profile data'); // Mengatur pesan error jika terjadi kesalahan
        setLoading(false); // Menghentikan status loading setelah terjadi kesalahan
      }
    };

    fetchProfileData();
  }, []);

  // Fungsi untuk menangani perubahan input teks
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Fungsi untuk menangani perubahan input file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      imgProfile: file,
      url_profileImg: URL.createObjectURL(file),
    }));
  };

  // Fungsi untuk menangani submit formulir
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');

      // Mengatur data form ke dalam FormData untuk mengirim file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('alamat', formData.alamat);
      formDataToSend.append('no_hp', formData.no_hp);
      formDataToSend.append('email', formData.email);
      if (formData.imgProfile) {
        formDataToSend.append('imgProfile', formData.imgProfile);
      }

      // Mengirim permintaan PUT ke endpoint untuk memperbarui profil
      const response = await axios.put('http://localhost:3001/customer/editprofile', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      // Log respons dari server untuk debugging
      console.log('Server response:', response);

      // Memperbarui formData dengan url_profileImg yang baru
      setFormData(prevData => ({
        ...prevData,
        url_profileImg: formDataToSend.get('imgProfile') ? URL.createObjectURL(formDataToSend.get('imgProfile')) : prevData.url_profileImg,
      }));

      // Menampilkan notifikasi sukses
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        window.location.href = "/profile"; // Redirect ke halaman profil setelah berhasil
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Server Response Data:', error.response.data);
      }
      // Menampilkan notifikasi error
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to update profile.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Kondisi saat sedang loading data
  if (loading) {
    return <p>Loading...</p>;
  }

  // Kondisi saat terjadi error
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-lg-5 p-5 bg-color">
      <Container fluid className="p-5 bg-light rounded">
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="text-left m-auto justify-content-around" style={{ width: "70%" }}>
            <h3 className="my-2">Edit Profile</h3>
            <Col lg={4} md={6} sm={12}>
              <img
                className="mx-1 my-2 rounded"
                style={{ height: "200px", width: "180px" }}
                src={formData.url_profileImg ? formData.url_profileImg : "default-image-url.jpg"}
                alt="foto profile"
              />
              <FormGroup className="my-2" as={Row}>
                <Col lg={12} className="my-1">
                  <Form.Control type="file" name="imgProfile" onChange={handleFileChange} />
                </Col>
              </FormGroup>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Nama</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nama"
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputUsername">
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputAddress">
                <Form.Label className="fw-bold">Alamat</Form.Label>
                <Form.Control
                  type="text"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Alamat"
                />
              </Form.Group>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputPhone">
                <Form.Label className="fw-bold">No.Telp</Form.Label>
                <Form.Control
                  type="text"
                  name="no_hp"
                  value={formData.no_hp}
                  onChange={handleChange}
                  placeholder="No.Telp"
                />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputEmail">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <div>
                <button type="submit" className="custom-button-edit-profile text-light my-4">
                  Simpan Perubahan
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;
