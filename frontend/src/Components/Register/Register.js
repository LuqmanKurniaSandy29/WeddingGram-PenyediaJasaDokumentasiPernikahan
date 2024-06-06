import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div id="form" className="template d-flex justify-content-center align-item-center vh-100 bg-color">
      <Container className="p-5 rounded m-auto bg-light" style={{ height:'max-content', width:"60%" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 m-auto">
            <h4 className="text-center mb-4">Registrasi</h4>
            <Col lg={6} >
             <div style={{width:"100%"}} className="m-auto">
             <Form.Group controlId="validationCustom01">
                <Form.Label className="mt-1">Nama</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan nama anda" />
                <Form.Control.Feedback type="invalid">Mohon masukan anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Email</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan alamat email anda" />
                <Form.Control.Feedback type="invalid">Tolong masukan alamat email anda</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Username</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan password baru" />
                <Form.Control.Feedback type="invalid">Tolong masukkan password</Form.Control.Feedback>
            </Form.Group>
             </div>
            </Col>
            <Col lg={6}>
              <div style={{width:"100%"}} className="m-auto">
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Alamat</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan alamat anda" />
                <Form.Control.Feedback type="invalid">Tolong masukkan alamat anda</Form.Control.Feedback>
              </Form.Group>  
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">Password</Form.Label>
                <Form.Control required type="text" placeholder="Masukkan konfirmasi password" />
                <Form.Control.Feedback type="invalid">Tolong masukkan konfirmasi password</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom02">
                <Form.Label className="mt-1">No Telephone</Form.Label>
                <Form.Control required type="number" placeholder="Masukkan nomor telephone anda" />
                <Form.Control.Feedback type="invalid">Tolong masukkan nomor telephone anda</Form.Control.Feedback>
              </Form.Group>
              </div>
            </Col>
          </Row>
          <div className="d-grid text-center my-3"> 
              <Button style={{ backgroundColor: "#D5A351", border: "none", padding:"7px 60px" }} href="/register">Register</Button>
          </div>
          <p className="text-center">
              Sudah memiliki akun? <a href="/login">Login</a>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
