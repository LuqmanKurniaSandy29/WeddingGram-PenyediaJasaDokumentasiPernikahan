import React from "react";
import { Button, Col, Row } from "react-bootstrap";

const CheckOrder = () => {
  return (
    <div>
      <div className="m-auto p-4 mb-3" style={{ width: "90%", backgroundColor: "#fff" }}>
        <h3 className="mb-4 text-center">Cek Status Pemesanan</h3>
        <Row style={{ backgroundColor: "#B9B6B6" }} className="text-left mb-xs-5 p-2" lg={5} md={5} sm={2} xs={2}>
          <Col>
            <div>
              <h5 className="font-weight- normal">Paket</h5>
              <p className="font-weight-lighter">Wedding FAVORITE</p>
            </div>
          </Col>
          <Col>
            <div>
              <h5 className="font-weight- normal">Alamat</h5>
              <p className="font-weight-lighter">jl.gili trawangan VII</p>
            </div>
          </Col>
          <Col>
            <div>
              <h5 className="font-weight- normal">Deskripsi Tempat</h5>
              <p className="font-weight-lighter">Gedung A lantai 3</p>
            </div>
          </Col>
          <Col>
            <div>
              <h5 className="font-weight- normal">Tanggal</h5>
              <p className="font-weight-lighter">01-20-2024</p>
            </div>
          </Col>
          <Col>
            <div>
              <Button className="mt-2 p-lg-2 p-1 mr-lg-2 disabled">Status</Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CheckOrder;
