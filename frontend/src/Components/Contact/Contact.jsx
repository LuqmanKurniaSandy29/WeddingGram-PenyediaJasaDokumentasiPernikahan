import React from "react";
import {Container, Row, Col, Form } from "react-bootstrap";
import "../Contact/Contact.css"

const Contact = () => {

  const buttonStyle = {
    backgroundColor: '#D5A351',
    border: 'none',
    padding: '10px 20px',
    boxShadow: '0 2px 4px #000',
    borderRadius: '2px',
    color: '#FFF',
    width: '150px',
  };

  const hoverStyle = {
    backgroundColor: '#F3BB62',
    boxShadow: '0 3px 5px #000',
  };

  const [isHovered, setIsHovered] = React.useState(false);

  // const onSubmit = async (event) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);

  //   formData.append("access_key", "7b23f0c2-3a8e-4b7c-a068-0b6b05eecf92");

  //   const object = Object.fromEntries(formData);
  //   const json = JSON.stringify(object);

  //   const res = await fetch("https://api.web3forms.com/submit", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     body: json,
  //   }).then((res) => res.json());

  //   if (res.success) {
  //     console.log("Success", res);
  //   }
  // };
  return (
    <Container style={{ width: "90%" }} className="mb-5 text-center">
      <h2 className="mt-5">Contact Us</h2>
      <p className="mb-5 text-center">Tim kami selalu siap membantu Anda dengan senang hati. Kami selalu berusaha untuk meningkatkan layanan kami dan menghargai masukan Anda. Bagikan pertanyaan, saran, atau pengalaman Anda dengan layanan kami. Kami siap membantu dan memastikan Anda mendapatkan yang terbaik.</p>
      <Row md={2} sm={1} xs={1}>
        <Col lg={5}>
          <iframe
            title="Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15830.556639931609!2d112.72370872064306!3d-7.281833598326571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbe95b2a510d%3A0xf0bc9eb955886115!2sDR.%20Soetomo%2C%20Kec.%20Tegalsari%2C%20Surabaya%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1717117366350!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            className="border-map"
          ></iframe>
        </Col>
        <Col lg={7}>
          <Form /*onSubmit={onSubmit}*/>
            <Form.Group as={Row} className="mb-2" controlId="formPlaintextNama">
              <Form.Label column sm="12" className="text-left">
                Nama
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" placeholder="Masukkan Nama" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPlaintextemail">
              <Form.Label column sm="12" className="text-left">
                Email
              </Form.Label>
              <Col sm="12">
                <Form.Control type="email" placeholder="Masukkan Email" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPlaintextMessage">
              <Form.Label column sm="12" className="text-left">
                Pesan
              </Form.Label>
              <Col sm="12">
                <Form.Control as="textarea" rows={3} placeholder="Masukkan Pesan" />
              </Col>
            </Form.Group>
            <Col sm="12"  as={Row} className="mb-2">
              <button type="submit" className="px-5 my-2"
                style={isHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                  Kirim
              </button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
