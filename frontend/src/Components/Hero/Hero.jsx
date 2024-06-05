import React from "react";
import "../../App.css";
import LogoHero from "../../Asset/picture 10.jpg";
import { Container, Row, Col } from "react-bootstrap";
import "../Hero/Hero.css"

const Hero = () => {
  const buttonStyle = {
    backgroundColor: '#FFF7E6',
    border: 'none',
    padding: '10px 20px',
    boxShadow: '0 2px 4px #000',
    borderRadius: '2px',
    color: '#D5A351',
    width: '150px',
  };

  const hoverStyle = {
    backgroundColor: '#FFF',
    boxShadow: '0 3px 5px #000',
  };

  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <section className="bg-color py-5">
      <Container>
      <Row className="text-left my-3 justify-content-lg-between p-lg-4">
        <Col lg={8} md={6} className="align-content-center">
          <h2 className="text-light">WeddingGram</h2>
          <p className="font-weight-bold text-light">Momen Spesial Anda, Abadi Bersama Kami</p>
          <p className="text-justify text-light">Selamat datang di WeddingGram, sahabat setia Anda dalam mengabadikan momen indah pernikahan. Kami hadir untuk memastikan setiap detik kebahagiaan Anda terekam dengan sempurna. Dengan layanan fotografi dan videografi profesional, kami berkomitmen untuk menangkap setiap senyuman, air mata kebahagiaan, dan momen istimewa di hari pernikahan Anda.</p>
          <div className="align-items-center py-lg-3 d-flex">
            <a href="#contact">
              <button className="py-2 px-3 mr-4 fw-semibold"
                style={isHovered ? { ...buttonStyle, ...hoverStyle } : buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                  Get Started
              </button>
            </a>
            <h6 className="mx-2 my-3 mr-4 text-light">OR</h6>
            <a href="#service" className="anchor-hero text-light">Explore</a>
          </div>
        </Col>
        <Col lg={4} md={6} sm={12} xs={12} className="text-center">
          <img style={{ width: "300px" }} className="rounded-pill" src={LogoHero} alt="Wedding" />
        </Col>
      </Row>
    </Container>
    </section>
  );
};

export default Hero;
