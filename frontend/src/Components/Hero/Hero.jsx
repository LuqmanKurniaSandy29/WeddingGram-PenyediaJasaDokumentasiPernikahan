import React from "react";
import "../../App.css";
import LogoHero from "../../Asset/picture 10.jpg";
import { Container, Row, Col } from "react-bootstrap";
import "../Hero/Hero.css"

const Hero = () => {
  
  return (
    <section className="bg-color py-3" id="home">
      <Container>
      <Row className="text-left mt-4 justify-content-lg-between p-lg-4">
        <Col lg={8} md={6} className="align-content-center">
          <h2 className="text-light">WeddingGram</h2>
          <h5 className="fw-semibold text-light mb-3">Momen Spesial Anda, Abadi Bersama Kami</h5>
          <p className="text-justify text-light">Selamat datang di WeddingGram, sahabat setia Anda dalam mengabadikan momen indah pernikahan. Kami hadir untuk memastikan setiap detik kebahagiaan Anda terekam dengan sempurna. Dengan layanan fotografi dan videografi profesional, kami berkomitmen untuk menangkap setiap senyuman, air mata kebahagiaan, dan momen istimewa di hari pernikahan Anda.</p>
          <div className="align-items-center py-lg-3 d-flex">
            <a href="#about">
              <button className="custom-hero-button py-2 px-3  me-4 fw-semibold">
                Get Started
              </button>
            </a>
            <h6 className="mx-2 my-3 me-4 text-light">OR</h6>
            <a href="#services" className="anchor-hero text-light">Explore</a>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} xs={12} className="text-center">
          <img style={{ width: "300px" }} src={LogoHero} alt="Wedding" className="border-image my-5" />
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default Hero;
