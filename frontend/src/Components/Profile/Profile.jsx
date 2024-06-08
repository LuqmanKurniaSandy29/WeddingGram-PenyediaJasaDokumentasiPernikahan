import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Profile = () => {
  const customButtonStyleEdit = {
    backgroundColor: "#D5A351", // Menggunakan warna yang Anda inginkan
    borderColor: "white", // Sesuaikan jika diperlukan
    color: "black",
    width: "90px",
  };

  return (
    <div style={{ backgroundColor: "#D5A351" }} className="p-lg-5 p-5">
      <Container fluid className=" p-1 p-lg-2 pt-3 bg-light mb-3">
        <h3 className="mb-4 text-center">Profile</h3>
        <Row className="text-left m-auto justify-content-around" style={{ width: "70%" }}>
          <Col sm={5}>
            <div className="mb-4">
              <h6 className="fw-bold">Nama</h6>
              <p className="font-weight-lighter">ahmajihaduddin salim</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Jenis Kelamin</h6>
              <p className="font-weight-lighter">Laki-Laki</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Alamat</h6>
              <p className="font-weight-lighter">JL.Karangrejo Sawah VII 23a</p>
            </div>
          </Col>
          <Col sm={5}>
            <div className="mb-4">
              <h6 className="fw-bold">No.Telp</h6>
              <p className="font-weight-lighter">+62 8150 7771 30</p>
            </div>
            <div className="mb-4">
              <h6 className="fw-bold">Email</h6>
              <p className="font-weight-lighter">ahmad@gmail.com</p>
            </div>
            <div className="mb-4 text-center">
              <Button style={customButtonStyleEdit} href="/editprofile">
                Edit
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;
