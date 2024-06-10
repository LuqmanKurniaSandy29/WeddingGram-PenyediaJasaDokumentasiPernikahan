import React from "react";
import { Card } from "react-bootstrap";

const HomeAdmin = () => {
  return (
    <div id="home">
      <div className="bar">
        <span>WeddingGram</span>
      </div>
      <div className="home-row1">
        <Card id="card1" className="card">
          <Card.Body className="card-body-flex">
            <i className="bi bi-graph-up card-icon"></i>
            <div className="content">
              <Card.Title>Pesanan</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Pesanan bulan ini :</Card.Subtitle>
              <Card.Text>
                <button>20 terlaksana</button>
                <button style={{ marginLeft: "10px" }}>3 akan terlaksana </button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>

        <Card id="card2" className="card">
          <Card.Body className="card-body-flex">
            <i className="bi bi-bank card-icon"></i>
            <div className="content">
              <Card.Title>Pendapatan</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Pendapatan bulan ini :</Card.Subtitle>
              <Card.Text>
                <button>Rp. 0,00</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>

      <div className="home-row1">
        <Card id="card3" className="card">
          <Card.Body className="card-body-flex">
            <i className="bi bi-file-person-fill card-icon"></i>
            <div className="content">
              <Card.Title>Pegawai</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Total Pegawai</Card.Subtitle>
              <Card.Text>
                <button style={{ marginLeft: "10px" }}>2 Fotografer</button>
                <button style={{ marginLeft: "10px" }}>1 Videografer</button>
                <button style={{ marginLeft: "10px", marginTop: "10px" }}>1 crew</button>
                <button style={{ marginLeft: "10px" }}>3 admin</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>

        <Card id="card4" className="card">
          <Card.Body className="card-body-flex">
            <i className="bi bi-card-image card-icon"></i>
            <div className="content">
              <Card.Title>Product</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Total Product</Card.Subtitle>
              <Card.Text>
                <button>4 Produk</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomeAdmin;
