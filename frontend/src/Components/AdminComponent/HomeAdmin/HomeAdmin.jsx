import React from "react";
import { Card } from "react-bootstrap";

const HomeAdmin = () => {
  return (
    <div id="home-admin">
      <div className="home-row1-admin">
        <Card id="card1" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-graph-up card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Pesanan</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Pesanan bulan ini :</Card.Subtitle>
              <Card.Text>
                <button>20 terlaksana</button>
                <button style={{ marginLeft: "10px" }}>3 akan terlaksana </button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="home-row1-admin">
        <Card id="card2" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-bank card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Pendapatan</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Pendapatan bulan ini :</Card.Subtitle>
              <Card.Text>
                <button>Rp. 0,00</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
      <div className="home-row1-admin">
        <Card id="card4" className="card-admin">
          <Card.Body className="card-body-flex">
            <i className="ms-3 bi bi-file-person-fill card-icon-admin"></i>
            <div className="content-admin">
              <Card.Title>Admin</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Total Admin</Card.Subtitle>
              <Card.Text>
                <button>2</button>
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default HomeAdmin;
