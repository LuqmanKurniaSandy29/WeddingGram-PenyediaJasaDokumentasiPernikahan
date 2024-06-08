import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import "../Contact/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nama, email, pesan } = form;

    if (!nama || !email || !pesan) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Mohon untuk mengisi semua kolom input!',
      });
      return;
    }

    emailjs.send('service_ykdx29m', 'template_q6bzg6l', form, 'UY3FHm26HbtjSTJiE')
      .then((result) => {
        Swal.fire({
          icon: 'success',
          title: 'Terkirim!',
          text: 'Pesan Anda telah berhasil dikirim.',
        });
        setForm({ nama: '', email: '', pesan: '' }); // Hapus form
      }, (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Terjadi kesalahan, pesan tidak terkirim.',
        });
      });
  };

  return (
    <section id="contact" className="py-5">
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
        <Col lg={7} className="text-start">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-2" controlId="formPlaintextNama">
              <Form.Label column sm="12">
                Nama
              </Form.Label>
              <Col sm="12">
                <Form.Control type="text" name="nama" placeholder="Masukkan Nama" value={form.nama} onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPlaintextemail">
              <Form.Label column sm="12">
                Email
              </Form.Label>
              <Col sm="12">
                <Form.Control type="email" name="email" placeholder="Masukkan Email" value={form.email} onChange={handleChange} />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-2" controlId="formPlaintextMessage">
              <Form.Label column sm="12">
                Pesan
              </Form.Label>
              <Col sm="12">
                <Form.Control as="textarea" name="pesan" rows={3} placeholder="Masukkan Pesan" value={form.pesan} onChange={handleChange} />
              </Col>
            </Form.Group>
            <Col sm="12" as={Row} className="mb-2">
              <button type="submit" className="custom-button px-5 my-2 mx-3 fw-semibold">
                Kirim
              </button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default Contact;
