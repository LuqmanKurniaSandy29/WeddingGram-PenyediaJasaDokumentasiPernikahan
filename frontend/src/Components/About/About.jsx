import React from "react";
import "../About/About.css";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {

    return (
        <section id="about" className="py-5">
            <Container className="mt-3">
                <Row className="align-items-center justify-content-center text-left mx-2">
                    <Col lg={5} md={12} sm={12} xs={12}>
                        <h2 className="about-heading fw-bold my-3">About Us</h2>
                        <p className="about-description text-justify my-4">
                            WeddingGram adalah penyedia dokumentasi terkhusus untuk memastikan momen-momen istimewa dalam pernikahan Anda tertangkap dengan sempurna. Dari fotografi hingga videografi, kami hadir untuk membuat kenangan Anda abadi.
                        </p>
                        <a href="#contact">
                            <button className="custom-button py-2 px-3 fw-semibold">
                                Contact Us
                            </button>
                        </a>
                    </Col>
                    <Col lg={7}>
                        <Row className="align-items-center justify-content-center">
                            <Col lg={6}>
                                <Card className="my-3 custom-card-about">
                                    <Card.Header className="text-center custom-card-header-about">Kualitas dan Profesionalisme</Card.Header>
                                    <Card.Body className="-about-description-about">Kami memiliki tim fotografer dan videografer berpengalaman siap mengabadikan momen penting dengan hasil berkualitas tinggi.</Card.Body>
                                </Card>
                            </Col>
                            <Col lg={6}>
                                <Card className="my-5 custom-card-about">
                                    <Card.Header className="text-center custom-card-header-about">Beragam Pilihan Paket</Card.Header>
                                    <Card.Body className="custom-card-description-about">Kami menawarkan paket-paket yang bervariasi, mulai dari paket ekonomis hingga layanan lengkap dengan prewedding dan aerial photography.</Card.Body>
                                </Card>
                                <Card className="my-5 custom-card-about">
                                    <Card.Header className="text-center custom-card-header-about">Layanan Lengkap</Card.Header>
                                    <Card.Body className="custom-card-description-about">Setiap paket mencakup fasilitas seperti studio mini, album kolase, dan bonus cetakan foto dengan bingkai minimalis, memberikan nilai lebih untuk setiap pelanggan.</Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>                            
        </section>
    )
}

export default About;
