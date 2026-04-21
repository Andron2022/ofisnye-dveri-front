"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link';

import slider1 from "@assets/images/slide/slider-01.jpg"
import slider2 from "@assets/images/slide/slider-02.jpg"
import slider3 from "@assets/images/slide/slider-03.jpg"

import 'flickity/css/flickity.css';

const HomeSection = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: false,
                cellAlign: 'center',
                imagesLoaded: false,
                lazyLoad: false,
                freeScroll: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: false,
                pageDots: true,
                contain: true,
                adaptiveHeight: true,
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

    return (
        <React.Fragment>
            <div className="kalles-home-section type_slideshow type_carousel" dir='ltr'>
                <div className="slideshow">
                    {/* first slide */}
                    <div
                        className="slideshow__slide w-100"
                        style={{ backgroundImage: `url(${slider1.src})` }}
                    >
                        <Container>
                            <Row>
                                <Col lg={7}>
                                    <div data-aos="fade-right" data-aos-delay="300">
                                        <h4 className="fs-18 fw-medium">SUMMER 2020</h4>
                                        <h1 className="display-4 fw-semibold mb-3">New Arrival Collection</h1>
                                        <Link
                                            className="btn btn-dark rounded-0 min-w-150 text-white"
                                            href="/shop-filter-sidebar"
                                        >
                                            Explore Now
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* second slide */}
                    <div
                        className="slideshow__slide w-100"
                        style={{ backgroundImage: `url(${slider2.src})` }}
                    >
                        <Container>
                            <Row className="justify-content-end">
                                <Col lg={6}>
                                    <div className="text-end" data-aos="fade-right" data-aos-delay="300">
                                        <h4 className="fs-18 fw-medium">NEW SEASON</h4>
                                        <h3 className="display-4 fw-semibold mb-3">Lookbook Collection</h3>
                                        <Link
                                            className="btn btn-dark rounded-0 min-w-150 text-white"
                                            href="/shop-filter-sidebar"
                                        >
                                            Explore Now
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                    {/* third slide */}
                    <div
                        className="slideshow__slide w-100"
                        style={{ backgroundImage: `url(${slider3.src})` }}
                    >
                        <Container>
                            <Row>
                                <Col lg={6}>
                                    <div data-aos="fade-right" data-aos-delay="300">
                                        <h4 className="fs-18 fw-medium">SUMMER SALE</h4>
                                        <h1 className="display-4 fw-semibold mb-3">Save up to 70%</h1>
                                        <Link
                                            className="btn btn-dark rounded-0 min-w-150"
                                            href="/shop-filter-sidebar"
                                        >
                                            Explore Now
                                        </Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default HomeSection