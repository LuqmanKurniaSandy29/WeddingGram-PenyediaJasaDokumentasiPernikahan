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
    <div id="form">
      <Container className="content">
        <Button id="registrasi">Register</Button>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>Nama</Form.Label>
              <Form.Control required type="text" placeholder="Masukkan nama anda" />
              <Form.Control.Feedback type="invalid">Mohon masukan anda</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Alamat</Form.Label>
              <Form.Control required type="text" placeholder="Masukkan alamat anda" />
              <Form.Control.Feedback type="invalid">Tolong masukkan alamat anda</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="text" placeholder="Masukkan alamat email anda" />
              <Form.Control.Feedback type="invalid">Tolong masukan alamat email anda</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Username</Form.Label>
              <Form.Control required type="text" placeholder="Masukkan password baru" />
              <Form.Control.Feedback type="invalid">Tolong masukkan password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>Password</Form.Label>
              <Form.Control required type="text" placeholder="Masukkan konfirmasi password" />
              <Form.Control.Feedback type="invalid">Tolong masukkan konfirmasi password</Form.Control.Feedback>
            </Form.Group>

            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>No Telephone</Form.Label>
              <Form.Control required type="number" placeholder="Masukkan nomor telephone anda" />
              <Form.Control.Feedback type="invalid">Tolong masukkan nomor telephone anda</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" id="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Register;
