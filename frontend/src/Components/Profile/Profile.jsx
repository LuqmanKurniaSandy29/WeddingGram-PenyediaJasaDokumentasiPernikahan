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
        <h3 className="mb-4">Profile</h3>
        <Row className="text-left m-auto justify-content-around" style={{ width: "70%" }}>
          <Col sm={5}>
            <div className="mb-4">
              <h5 className="font-weight- normal">Nama</h5>
              <h6 className="font-weight-lighter">ahmajihaduddin salim</h6>
            </div>
            <div className="mb-4">
              <h5 className="font-weight- normal">Jenis Kelamin</h5>
              <h6 className="font-weight-lighter">Laki-Laki</h6>
            </div>
            <div className="mb-4">
              <h5 className="font-weight- normal">Alamat</h5>
              <h6 className="font-weight-lighter">JL.Karangrejo Sawah VII 23a</h6>
            </div>
          </Col>
          <Col sm={5}>
            <div className="mb-4">
              <h5 className="font-weight- normal">No.Telp</h5>
              <h6 className="font-weight-lighter">+62 8150 7771 30</h6>
            </div>
            <div className="mb-5">
              <h5 className="font-weight- normal">Email</h5>
              <h6 className="font-weight-lighter">ahmad@gmail.com</h6>
            </div>
            <div className="mb-4 text-center">
              <Button style={customButtonStyleEdit} href="#edit">
                Edit
              </Button>
            </div>
          </Col>
        </Row>
        <h3 className="mb-4">Cek Status Pemesanan</h3>
        <div className="mb-3">
          <Row className="text-left m-auto p-2 mb-3" lg={5} md={5} sm={2} xs={1} style={{ width: "90%", backgroundColor: "#DFD6D6" }}>
            <Col>
              <div>
                <h5 className="font-weight- normal">Paket</h5>
                <h6 className="font-weight-lighter">Wedding FAVORITE</h6>
              </div>
            </Col>
            <Col>
              <div>
                <h5 className="font-weight- normal">Alamat</h5>
                <h6 className="font-weight-lighter">jl.gili trawangan VII</h6>
              </div>
            </Col>
            <Col>
              <div>
                <h5 className="font-weight- normal">Deskripsi Tempat</h5>
                <h6 className="font-weight-lighter">Gedung A lantai 3</h6>
              </div>
            </Col>
            <Col>
              <div>
                <h5 className="font-weight- normal">Tanggal</h5>
                <h6 className="font-weight-lighter">01-20-2024</h6>
              </div>
            </Col>
            <Col>
              <div>
                <Button className="mt-2 p-lg-2 p-1 mr-lg-2 disabled">Status</Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
