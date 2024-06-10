import React from "react";
import ProfilePict from "../../Asset/picture 1.jpg";
import { Button, Col, Container, Form, FormGroup, Row } from "react-bootstrap";

const EditProfile = () => {
  const customButtonStyleSubmit = {
    backgroundColor: "#D5A351", // Menggunakan warna yang Anda inginkan
    borderColor: "white", // Sesuaikan jika diperlukan
    color: "black",
    width: "90px",
  };

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
    <div style={{ backgroundColor: "#D5A351" }} className="p-lg-5 p-5">
      <Container fluid className=" p-1 p-lg-2 pt-3 bg-light mb-3">
        <h3 className="mb-4 text-center">Profile</h3>
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="text-left m-auto justify-content-around" style={{ width: "70%" }}>
            <Col lg={4} md={6} sm={12}>
              <img className="mb-1" style={{ height: "200px", width: "180px" }} src={ProfilePict} alt="foto profile" />
              <FormGroup className="mb-3" as={Row}>
                <Form.Control column lg="1" type="file" />
              </FormGroup>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Nama</Form.Label>
                <Form.Control type="text" placeholder="Ahmad jihaduddin salim" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Jenis Kelamin</Form.Label>
                <Form.Control type="text" placeholder="Laki-Laki" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Alamat</Form.Label>
                <Form.Control type="text" placeholder="JL.Karangrejo Sawah VII 23a" />
              </Form.Group>
            </Col>
            <Col lg={4} md={3} sm={6}>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">No.telp</Form.Label>
                <Form.Control type="text" placeholder="081-04397" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="ControlInputName">
                <Form.Label className="fw-bold">Email</Form.Label>
                <Form.Control type="text" placeholder="ahmad@gmail.com" />
              </Form.Group>
              <div className="mb-5 text-center">
                <Button type="submit" style={customButtonStyleSubmit}>
                  Submit
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EditProfile;
