"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'

import insta1 from "@assets/images/home-flower/instagram-01.png"
import insta2 from "@assets/images/home-flower/instagram-02.png"
import insta4 from "@assets/images/home-flower/instagram-04.jpg"
import insta5 from "@assets/images/home-flower/instagram-05.jpg"
import insta6 from "@assets/images/home-flower/instagram-06.png"
import insta7 from "@assets/images/home-flower/instagram-07.jpg"
import insta8 from "@assets/images/home-flower/instagram-08.jpg"

import 'flickity/css/flickity.css';

const FollowInstagram = () => {

    const flickityRef: any = useRef<Flickity | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.followon_insta', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: false,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: true,
                dragThreshold: 5,
                percentPosition: true,
                groupCells: "100%",
                rightToLeft: false
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
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-4">
                                <div>
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span>@ Follow us on Instagram</span>
                                    </h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className='followon_insta'>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta7} alt="Insta7Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta2} alt="Insta2Img" className="img-fluid" />
                            </div>
                        </Col>
                        <Col lg={2} md={3} sm={6}>
                            <div className="insta-card position-relative">
                                <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default FollowInstagram