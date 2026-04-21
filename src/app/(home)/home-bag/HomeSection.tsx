"use client";
import React,{useEffect,useRef} from "react";
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap';
import slide1 from "@assets/images/home-bags/main-slide-01.jpg"
import slide2 from "@assets/images/home-bags/main-slide-02.jpg"
import Link from 'next/link';
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
            <div className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-bags">
                <div className="slideshow">
                    <div className="slideshow__slide">
                        <Image src={slide1} alt="Slide1Img" className="position-absolute w-100 h-100 object-fit-cover" />
                        <Container className="position-relative">
                            <Row className="justify-content-end">
                                <Col lg={6}>
                                    <div className="content text-end">
                                        <h5 className="text-white fs-18 fw-medium">MEMBERS GET</h5>
                                        <h1 className="display-3 fw-bold text-white mb-1">20% OFF</h1>
                                        <h1 className="fs-50 fw-bold text-white mb-3">ONE FULL PRICE ITEM</h1>
                                        <Link href="/shop" className="btn text-white btn-custom-white-red btn_icon_true fw-medium min-w-150 rounded-0 py-3 px-5 text-uppercase fs-17">Register
                                            Now</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container> 
                    </div>
                    <div className="slideshow__slide">
                        <Image src={slide2} alt="Slide2Img" className="position-absolute w-100 h-100 object-fit-cover" />
                        <Container className="position-relative">
                            <Row className="justify-content-end">
                                <Col lg={6}>
                                    <div className="content">
                                        <h5 className="text-white fs-18 fw-medium">WE ARE KALLES</h5>
                                        <h1 className="display-3 fw-bold text-white mb-4">No Matter What Lifestyle You Live</h1>
                                        <Link href="/shop" className="btn text-white btn-custom-white-red btn_icon_true fw-medium min-w-150 rounded-0 py-3 px-5 text-uppercase fs-17">Learn
                                            More </Link>
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