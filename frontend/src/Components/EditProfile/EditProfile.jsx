import React from "react";
import ProfilePict from "../../Asset/picture 1.jpg";
import { Col, Container, Form, FormGroup, Row } from "react-bootstrap";
import "../EditProfile/EditProfile.css";

const EditProfile = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    let valid = true;

    if (valid) {
      // Proceed to payment or further processing
      window.location.href = "/profile";
    }
  };

  return (
    <div className="p-lg-5 p-5 bg-color">
      <Container fluid className="p-5 bg-light rounded">
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="text-left m-auto justify-content-around" style={{ width: "70%" }}>
          <h3 className="my-2">Edit Profile</h3>
            <Col lg={4} md={6} sm={12}>
              <img className="mx-1 my-2 rounded" style={{ height: "200px", width: "180px" }} src={ProfilePict} alt="foto profile" />
              <FormGroup className="my-2" as={Row}>
                <Col lg={12} className="my-1">
                  <Form.Control type="file" />
                </Col>
              </FormGroup>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Nama</Form.Label>
                <Form.Control type="text" placeholder="Dimas Adi Nugraha" />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputUsername">
                <Form.Label className="fw-bold">Username</Form.Label>
                <Form.Control type="text" placeholder="dimasan" />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputAddress">
                <Form.Label className="fw-bold">Alamat</Form.Label>
                <Form.Control type="text" placeholder="Jl. Indah Bersamamu No.29" />
              </Form.Group>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputPhone">
                <Form.Label className="fw-bold">No.Telp</Form.Label>
                <Form.Control type="text" placeholder="081-04397" />
              </Form.Group>
              <Form.Group className="my-3" controlId="ControlInputEmail">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control type="text" placeholder="ahmad@gmail.com" />
              </Form.Group>
              <div>
                <a href="/editprofile">
                  <button type="submit" className="custom-button-edit-profile text-light my-4">
                    Simpan Perubahan
                  </button>
                </a>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;
