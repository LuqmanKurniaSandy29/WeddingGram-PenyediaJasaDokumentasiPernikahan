import React from "react";
import "../FAQ/FAQ.css";
import { Container, Row, Col, Accordion } from "react-bootstrap";

function FAQ() {
    const faqList = [
        {
            id: 1,
            question: "Apa saja paket layanan yang tersedia di WeddingGram?",
            answer: "WeddingGram menawarkan empat paket layanan: Favorite, Exclusive, Glamour, dan Gold."
        },
        {
            id: 2,
            question: "Apa perbedaan antara setiap paket?",
            answer: "Setiap paket memiliki perbedaan dalam jumlah fotografer, videografer, crew, durasi kerja, jenis bonus, dan fitur tambahan seperti set studio mini dan prewedding studio."
        },
        {
            id: 3,
            question: "Berapa harga setiap paket layanan?",
            answer: "Harga paket layanan WeddingGram bervariasi, mulai dari Rp. 3.589.000 hingga Rp. 9.097.000."
        },
        {
            id: 4,
            question: "Apa yang termasuk dalam setiap paket?",
            answer: "Setiap paket termasuk layanan fotografi, videografi, DVD file master foto high resolution, DVD file video edit full acara (HD), serta bonus seperti album kolase dan foto cetak dengan bingkai."
        },
        {
            id: 5,
            question: "Bagaimana cara memesan layanan WeddingGram?",
            answer: "Anda dapat memesan layanan WeddingGram melalui situs web resmi atau dengan menghubungi tim layanan pelanggan mereka."
        }
    ];

    return (
        <section className="bg-color py-3" id="faq">
            <Container>
                <Row className="my-5 mx-2">
                    <Col lg={5} md={12} sm={12} xs={12}>
                        <h2 className="FAQ-heading fw-bold text-light my-3">Frequently Asked Questions</h2>
                        <p className="FAQ-description text-light text-justify my-4">Temukan beragam jawaban untuk pertanyaan umum yang mungkin Anda miliki mengenai layanan kami, dan dapatkan pemahaman mendalam tentang apa yang membuat WeddingGram menjadi pilihan utama dalam dokumentasi pernikahan Anda.</p>
                    </Col>
                    <Col lg={7} md={12} sm={12} xs={12} className="px-2">
                        <Accordion>
                            {faqList.map((faq) => (
                                <Accordion.Item eventKey={faq.id.toString()} key={faq.id} className="custom-card-faq mb-3">
                                    <Accordion.Header>
                                        {faq.question}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {faq.answer}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default FAQ;
