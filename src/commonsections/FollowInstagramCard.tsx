"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'

import insta1 from "@assets/images/instagram/ins1_1.jpg"
import insta2 from "@assets/images/instagram/ins1_2.jpg"
import insta4 from "@assets/images/instagram/ins1_4.jpg"
import insta5 from "@assets/images/instagram/ins1_5.jpg"
import insta6 from "@assets/images/instagram/ins1_6.jpg"
import insta8 from "@assets/images/instagram/ins1_8.jpg"
import insta13 from "@assets/images/instagram/ins1_13.jpg"
import insta14 from "@assets/images/instagram/ins1_14.jpg"


import 'flickity/css/flickity.css';

const FollowInstagramCard = () => {

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
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    return (
        <React.Fragment>
            <section>
                <Container fluid>
                    <div className="position-relative">
                        <div className="follow-insta-card text-center">
                            <p className="fs-16 font-secondary fst-italic mb-1">Find us on Instagram</p>
                            <h4 className="fs-18">@THE4STUDIO</h4>
                        </div>
                        <Row className='insta-slider' dir="ltr">
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta14} alt="Insta14Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta2} alt="Insta2Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col lg={2} md={3} sm={6}>
                                <div className="insta-card position-relative">
                                    <Image src={insta13} alt="Insta13Img" className="img-fluid" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default FollowInstagramCard