"use client";
import React, { useEffect, useRef, useState } from "react";
import { Row, Col } from 'react-bootstrap';
import ProductModal from "@src/commonsections/ProductModal";
import AddToCardModal from "@src/commonsections/AddToCardModal";
import RelatedPortfolio from '@app/(single-portfolio)/single-portfolio-with-instagram-shop/RelatedPortfolio'
import OtherInfo from "@src/commonsections/OtherInfo";
import Image from "next/image";
import Link from "next/link";
import insta1 from "@assets/images/instagram/ins1_1.jpg"
import insta2 from "@assets/images/instagram/ins1_2.jpg"
import insta4 from "@assets/images/instagram/ins1_4.jpg"
import insta5 from "@assets/images/instagram/ins1_5.jpg"
import insta6 from "@assets/images/instagram/ins1_6.jpg"
import insta8 from "@assets/images/instagram/ins1_8.jpg"
import insta13 from "@assets/images/instagram/ins1_13.jpg"
import insta14 from "@assets/images/instagram/ins1_14.jpg"

import 'flickity/css/flickity.css';
const ShopLook = () => {


    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.insta-slider', {
                cellAlign: 'left',
                imagesLoaded: 0,
                wrapAround: false,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: 1,
                adaptiveHeight: 1,
                groupCells: '100%',
                dragThreshold: 5,
                percentPosition: 1,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
    }, []);


    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <div className="py-3">
                        <div className="d-flex justify-content-center mb-5">
                            <h3 className="section-title position-relative">
                                Shop The Look
                            </h3>
                        </div>

                        <Row className="insta-slider">
                            <Col md={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta14} alt="Insta14Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-01 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-03 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-04 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>2</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-05 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-06 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-07 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta2} alt="Insta2Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                            <Col lg={3} className="col-6">
                                <div className="insta-card position-relative">
                                    <Image src={insta13} alt="Insta13Img" className="img-fluid" />
                                    <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                </div>
                            </Col>
                        </Row>

                        <OtherInfo />
                        <RelatedPortfolio />
                    </div>
                </div>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default ShopLook