"use client";
import React, { useEffect, useRef } from 'react'
import {  Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import slide1 from "@assets/images/home-medical/slide-01.jpg"
import slide2 from "@assets/images/home-medical/slide-02.png"
import slide3 from "@assets/images/home-medical/slide-03.png"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';

const HomeSection=()=>{


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


    return(
        <React.Fragment>
            <section className="kalles-home-section type_slideshow type_carousel kalles-medical overflow-hidden">
                    <div className="slideshow" >
                        {/* first slide */}
                        <div className="slideshow__slide">
                            <Image src={slide1} alt="Slide1Img" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={4}>
                                        <div className="content">
                                            <h5 className="text-danger-emphasis fw-medium fs-22">3M 6000 Series</h5>
                                            <h1 className="fs-45 fw-semibold mb-3 ">Search Lab <br /> N95 Face Mask</h1>
                                            <p className="d-none d-lg-block">respiratory protection against certain non oil based particles. </p>
                                            <Link href="/shop">
                                                <div className="btn btn-primary text-white rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    Explore Now</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* second slide */}
                        <div className="slideshow__slide">
                            <Image src={slide2} alt="Slide2Img" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={4}>
                                        <div className="content">
                                            <h5 className="text-danger-emphasis fw-medium fs-22">Price just <strong>$14</strong>
                                            </h5>
                                            <h1 className="fs-45 fw-semibold mb-3">Botanical Hand <br /> Sanitizer Gel</h1>
                                            <p className="fs-16 text-muted d-none d-lg-block ">Soft and non-irritating, does not hurt the skin, has a
                                                water retention and hydration function</p>
                                            <Link href="/shop">
                                                <div className="btn btn-primary text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    Buy Now</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* third slide */}
                        <div className="slideshow__slide">
                            <Image src={slide3} alt="Slide3Img" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={4}>
                                        <div className="content">
                                            <h5 className="text-danger-emphasis fw-medium fs-22">Only <strong>$1000</strong></h5>
                                            <p className="fs-22 mb-2">Fast Reading Digital</p>
                                            <h1 className="fs-45 fw-semibold mb-3">for Ear & Forehead</h1>
                                            <p className="fs-16 text-muted d-none d-lg-block">In 3 seconds, you&apos;ll get the exact number of your body&apos;s
                                                temperature. Suitable for both baby & adult</p>
                                            <Link href="/shop">
                                                <div className="btn text-white btn-primary rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    $29 - Buy Now</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default HomeSection