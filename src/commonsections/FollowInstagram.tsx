"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'

import insta1 from "@assets/images/instagram/ins1_1.jpg"
import insta2 from "@assets/images/instagram/ins1_2.jpg"
import insta4 from "@assets/images/instagram/ins1_4.jpg"
import insta5 from "@assets/images/instagram/ins1_5.jpg"
import insta6 from "@assets/images/instagram/ins1_6.jpg"
import insta8 from "@assets/images/instagram/ins1_8.jpg"
import insta13 from "@assets/images/instagram/ins1_13.jpg"
import insta14 from "@assets/images/instagram/ins1_14.jpg"


import 'flickity/css/flickity.css';

const FollowInstagram = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.insta-slider', {
                cellAlign: 'left',
                imagesLoaded: 0,
                wrapAround: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: true,
                groupCells: '100%',
                dragThreshold: 5,
                percentPosition: true,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <section>
                <Container fluid>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4">
                                <div>
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span>@ Follow us on Instagram</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Row className='insta-slider' dir="ltr">
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta14} alt="Insta14Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-01 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-03 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-04 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>2</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-05 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-06 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-07 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta2} alt="Insta2Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta13} alt="Insta13Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
        </React.Fragment>
    )
}

export default FollowInstagram