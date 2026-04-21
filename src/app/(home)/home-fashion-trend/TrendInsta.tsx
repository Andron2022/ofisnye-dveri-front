"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import inst1 from "@assets/images/home-fashion-trend/inst-01.jpg"
import inst2 from "@assets/images/home-fashion-trend/inst-02.jpg"
import inst3 from "@assets/images/home-fashion-trend/inst-03.jpg"
import inst4 from "@assets/images/home-fashion-trend/inst-04.jpg"
import inst5 from "@assets/images/home-fashion-trend/inst-05.jpg"
import inst6 from "@assets/images/home-fashion-trend/inst-06.jpg"
import inst7 from "@assets/images/home-fashion-trend/inst-07.jpg"
import inst8 from "@assets/images/home-fashion-trend/inst-08.jpg"

import 'flickity/css/flickity.css';

const TrendData = [
    { id: 1, pic: inst1 },
    { id: 2, pic: inst2 },
    { id: 3, pic: inst3 },
    { id: 4, pic: inst3 },
    { id: 5, pic: inst4 },
    { id: 6, pic: inst5 },
    { id: 7, pic: inst6 },
    { id: 8, pic: inst7 },
    { id: 8, pic: inst8 },
]

const TrendInsta = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.trending', {
                cellAlign: 'left',
                imagesLoaded: false,
                groupCells: "100%",
                wrapAround: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: true,
                dragThreshold: 5,
                percentPosition: true,
                rightToLeft: false,
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
            <section className="home-fashion-trend-insta">
                <Container fluid>
                    <Row className="justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4">
                                <h3 className="position-relative title_9 d-inline-block fs-30">
                                    <span>#kalles template</span>
                                </h3>
                            </div>
                        </div>
                    </Row>
                    <Row className='trending'>
                        {TrendData.map((item:any,index:number) => (
                            <Col lg={2} md={3} sm={6} key={index}>
                                <div className="insta-card position-relative">
                                    <Image src={item.pic} alt="ItemImg" className="img-fluid" />
                                    <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                        <i className="facl facl-instagram fs-28"></i>
                                    </Link>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default TrendInsta