import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import "../EditProfile/EditProfile.css";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "", 
    alamat: "",
    no_hp: "",
    email: "",
    url_profileImg: "",
    newProfileImg: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token tidak ditemukan');

        const response = await axios.get('http://localhost:3001/auth/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const { name, alamat, no_hp, email, url_profileImg } = response.data.user;
        setFormData({ name, alamat, no_hp, email, url_profileImg, newProfileImg: null });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message || 'Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      newProfileImg: file,
      url_profileImg: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
  
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token tidak ditemukan');
  
      const formDataToSend = new FormData();
      formDataToSend.append('nama_customer', formData.name); 
      formDataToSend.append('alamat', formData.alamat);
      formDataToSend.append('no_hp', formData.no_hp);
      formDataToSend.append('email', formData.email);
      if (formData.newProfileImg) {
        formDataToSend.append('url_profileImg', formData.newProfileImg);
      }
  
      const response = await axios.put('http://localhost:3001/customer/editprofile', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Server response:', response.data);
  
      // Assuming the server sends a new JWT token in response
      const newToken = response.data.token;
      if (newToken) {
        localStorage.setItem('token', newToken);
      }
  
      Swal.fire({
        title: 'Success!',
        text: 'Profile updated successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then(() => {
        localStorage.setItem('profileUpdated', 'true');
        window.location.href = "/profile"; 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Gagal Update update profile.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
                  <Form.Control type="file" name="url_profileImg" onChange={handleFileChange} />
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
