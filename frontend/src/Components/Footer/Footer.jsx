import React from "react";
import { Col, Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import "../Footer/Footer.css";
import facebook from "../../Asset/Icon/facebook.svg";
import instagram from "../../Asset/Icon/instagram.svg";
import twitter from "../../Asset/Icon/twitter.svg";
import gmail from "../../Asset/Icon/gmail.svg";

const Footer = () => {
  const handleFacebookClick = () => {
    window.location.href = 'https://web.facebook.com/';
  }

  const handleInstagramClick = () => {
    window.location.href = 'https://www.instagram.com/';
  }

  const handleTwitterClick = () => {
    window.location.href = 'https://twitter.com';
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:luqmankurniasandy@gmail.com';
  }
  return (
    <div>
      <div bg="light" variant="light">
        <Container className="d-flex align-item-center justify-content-center">
          <div style={{ width: "100%" }}>
            <Row className="my-5">
              <Col lg={4} md={6} sm={6} className="ps-5">
                <h5 className="text-left fw-bold">About Us</h5>
                <p className="text-justify" style={{ maxWidth: "95%" }}>
                  WeddingGram, lahir Mei 2024, terinspirasi dari keinginan para pasangan untuk mengabadikan pernikahan dengan cara unik dan personal. Menjadi penyedia dokumentasi pernikahan terdepan di Indonesia, WeddingGram menawarkan jasa foto, video, dan berbagai layanan pendukung lainnya dengan kualitas terbaik dan harga terjangkau. Lebih dari sekedar foto dan video, WeddingGram ingin menceritakan kisah cinta Anda melalui dokumentasi pernikahan yang istimewa dan tak terlupakan. Percayakan momen spesial Anda kepada WeddingGram, dan ciptakan kenangan indah yang abadi.
                </p>
              </Col>
              <Col lg={3} md={6} sm={6} className="text-left ps-5">
                <h5 className="fw-bold">Our Product</h5>
                <ul className="list-unstyled">
                  <a href="/#services" className="anchor-product"><li>Paket Weeding Favorite</li></a>
                  <a href="/#services" className="anchor-product"><li>Paket Weeding Exclusive</li></a>
                  <a href="/#services" className="anchor-product"><li>Paket Weeding Glamor</li></a>
                  <a href="/#services" className="anchor-product"><li>Paket Weeding Gold</li></a>
                </ul>
              </Col>
              <Col lg={3} md={6} sm={6} className="ps-5">
                <h5 className="text-left fw-bold">Why Should We?</h5>
                <p className="text-justify" style={{ maxWidth: "100%" }}>
                WeddingGram adalah pilihan tepat untuk mengabadikan momen istimewa pernikahan Anda. Dengan tim profesional berpengalaman, peralatan canggih, layanan personal, komitmen kualitas, dan harga terjangkau, WeddingGram siap mewujudkan dokumentasi pernikahan yang sesuai dengan karakter dan keinginan Anda. Percayakan momen spesial Anda kepada WeddingGram, dan ciptakan kenangan indah yang abadi.
                </p>
              </Col>
              <Col lg={2} md={6} sm={6} className="text-left ps-5">
                <h5 className="fw-bold">Our SNS</h5>
                <ul className="list-unstyled">
                  <li onClick={handleFacebookClick} style={{ cursor: 'pointer' }} ><img src={ facebook } alt="facebook-icon" /> Facebook</li>
                  <li onClick={handleInstagramClick} style={{ cursor: 'pointer' }} ><img src={ instagram } alt="instagram-icon" /> Instagram</li>
                  <li onClick={handleTwitterClick} style={{ cursor: 'pointer' }} ><img src={ twitter } alt="twitter-icon" /> Twitter</li>
                  <li onClick={handleEmailClick} style={{ cursor: 'pointer' }} ><img src={ gmail } alt="gmail-icon" style={{ width:"25px" }} className="mx-1" /> E-mail</li>
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="custom-bg text-center py-4">
        <Container>
          <p>Copyright &copy; 2024 WeddingGram | Powered by Gamelab Indonesia | Capstone Project</p>
        </Container>
      </div>
    </div>
  );
};

export default Footer;
