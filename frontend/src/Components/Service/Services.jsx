import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Modal } from "react-bootstrap";
import Swal from 'sweetalert2'; // Import SweetAlert2
import "../Service/Services.css";
import picture1 from "../../Asset/picture 1.jpg";
import picture2 from "../../Asset/picture 2.jpg";
import picture4 from "../../Asset/picture 4.jpg";
import picture6 from "../../Asset/picture 6.jpg";
import AuthContext from "../../Context/AuthContext"; // Import AuthContext

const Service = () => {
    const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to check if the user is authenticated
    const [modalShow, setModalShow] = useState({});

    const handleClose = (index) => setModalShow(prevState => ({ ...prevState, [index]: false }));
    const handleShow = (index) => setModalShow(prevState => ({ ...prevState, [index]: true }));

    const handleOrderClick = () => {
        if (isAuthenticated) {
            window.location.href = "/order";
        } else {
            Swal.fire({
                title: 'Login Terlebih Dahulu',
                text: 'Anda harus login terlebih dahulu untuk melakukan order.',
                icon: 'warning',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = "/";
                }
            });
        }
    };

    const packages = [
        {
            title: "Paket Wedding Favorite",
            price: "Rp. 4.000.000",
            image: picture1,
            details: [
                "1 Fotografer",
                "1 Videografer",
                "Maks 12 Jam Kerja",
                "DVD File Master Foto High Resolution (Softcopy Semua File)",
                "DVD File Video Edit Full Acara (HD)",
                "1 Album Kolase 20×30 (20 Halaman)",
                "Bonus 1 Foto Cetak 60×40 cm + Bingkai Minimalis"
            ]
        },
        {
            title: "Paket Wedding Exclusive",
            price: "Rp. 5.000.000",
            image: picture2,
            details: [
                "2 Fotografer",
                "1 Videografer",
                "1 Crew",
                "Maks 12 Jam Kerja",
                "Set Studio Mini di Lokasi Wedding",
                "DVD File Master Foto High Resolution (Softcopy Semua File)",
                "File Video Edit Full Acara (HD)",
                "1 Album Kolase 20×30 (20 Halaman)",
                "Bonus 1 Foto Cetak 40×60 cm + Bingkai Minimalis"
            ]
        },
        {
            title: "Paket Wedding Glamour",
            price: "Rp. 6.000.000",
            image: picture4,
            details: [
                "2 Fotografer dan 2 Videografer (1 Crew)",
                "Set Studio Mini di Lokasi Wedding",
                "DVD File Master Foto High Resolution",
                "DVD File Video Edit Full Acara (HD)",
                "1 Album Kolase 20×30 (20 Halaman)",
                "Bonus 2 Foto Cetak 12R + Bingkai"
            ]
        },
        {
            title: "Paket Wedding Gold",
            price: "Rp. 7.000.000",
            image: picture6,
            details: [
                "2 Fotografer dan 2 Videografer (1 Crew)",
                "Gratis Prewedding Studio",
                "Set Studio Mini di Lokasi Wedding",
                "Cinematic Video Highlight",
                "DVD File Master Foto High Resolution",
                "DVD File Video Edit Full Acara (HD)",
                "1 Album Kolase 20×30 (20 Halaman)",
                "Bonus 2 Foto Cetak 40×60 cm + Bingkai Minimalis"
            ]
        }
    ];

    return (
        <div>
            <section className='bg-custom py-5' id='services'>
                <Container className='py-3 mt-5'>
                    <h2 className="services-heading text-center text-light fw-bold">Our Services</h2>
                    <p className="services-description text-center text-light my-4">
                    WeddingGram adalah penyedia dokumentasi profesional yang memastikan setiap momen istimewa dalam pernikahan Anda tertangkap dengan sempurna. Dari fotografi hingga videografi, kami berkomitmen untuk mengabadikan kenangan Anda dengan kualitas terbaik, sehingga setiap detil dari hari bahagia Anda akan tetap hidup selamanya.
                    </p>
                    <Row>
                        {packages.map((pkg, index) => (
                            <Col lg={3} md={6} sm={12} className='px-2 justify-content-around text-center' key={index}>
                                <Card style={{ width: '18rem' }} className='mx-auto my-3 shadow'>
                                    <Card.Img variant="top" src={pkg.image} />
                                    <Card.Body>
                                        <Card.Title>{pkg.title}</Card.Title>
                                        <Card.Text className='fw-bold'>
                                            {pkg.price}
                                        </Card.Text>
                                        <button
                                            className="detail-button py-2 px-3 mr-4 fw-semibold"
                                            onClick={() => handleShow(index)}
                                        >
                                            Detail Paket
                                        </button>
                                        <Modal
                                            show={modalShow[index]}
                                            onHide={() => handleClose(index)}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                                <Modal.Title>Detail {pkg.title}</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <ul className='unstyled'>
                                                    {pkg.details.map((detail, idx) => (
                                                        <li key={idx}>{detail}</li>
                                                    ))}
                                                </ul>
                                            </Modal.Body>
                                        </Modal>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="text-center mt-4">
                        <p className="text-light">Jangan lewatkan kesempatan emas ini! Klik tombol di bawah untuk segera memesan. Dapatkan penawaran terbaik dan layanan prima hanya dengan satu klik. Pesan sekarang dan nikmati pengalaman luar biasa bersama kami! Klik tombol di bawah dan nikmati semua keuntungan ini!</p>
                        <button
                            className="order-button py-2 px-3 fw-semibold"
                            onClick={handleOrderClick}
                        >
                            Order
                        </button>
                    </div>
                </Container>
            </section>
        </div>
    );
};

export default Service;
