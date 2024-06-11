import React from "react";
import ProfilePict from "../../Asset/picture 1.jpg";
import "../Profile/Profile.css";
import { Col, Container, Row } from "react-bootstrap";

const Profile = () => {

  return (
    <div className="p-lg-5 p-5 bg-color">
      <Container fluid className="p-5 bg-light rounded shadow">
        <Row className="text-left m-auto justify-content-around" style={{ width: "80%" }}>
        <h3 className="my-3">Profile</h3>
          <Col lg={4} md={6} sm={12}>
            <img className="mb-4 rounded" style={{ height: "200px", width: "180px" }} src={ProfilePict} alt="foto profile" />
          </Col>
          <Col lg={4} md={3} sm={6}>
            <div className="mb-4">
              <h6 className="fw-bold">Nama</h6>
              <p className="font-weight-lighter">Dimas Adi Nugraha</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Username</h6>
              <p className="font-weight-lighter">dimasan</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Alamat</h6>
              <p className="font-weight-lighter">Jl. Indah Bersamamu No.29</p>
            </div>
          </Col>
          <Col lg={4} md={3} sm={6}>
            <div className="mb-4">
              <h6 className="fw-bold">No.Telp</h6>
              <p className="font-weight-lighter">085232045537</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Email</h6>
              <p className="font-weight-lighter">ahmad@gmail.com</p>
            </div>
            <div>
              <a href="/editprofile">
                <button className="custom-button my-3">
                  Ubah Profil
                </button>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
