"use client";
import React, { useEffect, useRef } from 'react'
import { Col } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import slide1 from "@assets/images/home-sport/slide-01.jpg"
import slide2 from "@assets/images/home-sport/slide-02.jpg"
import slide3 from "@assets/images/home-sport/slide-03.jpg"

import 'flickity/css/flickity.css';

const MainSlide = () => {

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
        <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-sport-home overflow-hidden" dir="ltr">
            <div className="slideshow">
                <div className="slideshow__slide">
                    <Image src={slide1} alt="Slide1Img" className="position-absolute w-100 h-100 object-fit-cover" />
                    <div className="container position-relative">
                        <div className="row">
                            <Col lg={8}>
                                <div className="content">
                                    <h5 className="fw-medium fs-20 text-white text-uppercase font-raleway">PUSH HADER/RUN FASTER
                                        & GO FURTHER</h5>
                                    <h1 className="fs-60 fw-bold font-montserrat text-white mb-4">TRAINING’S CLOTHING <br />
                                        LOOKBOOK</h1>
                                    <div className="d-sm-flex align-items-center gap-2">
                                        <Link className="btn btn-orange rounded-0 text-white min-w-150 min-h-45 text-uppercase d-inline-flex align-items-center justify-content-center fw-semibold" href="/shop">Shop Now</Link>
                                        <button className="mt-1 mt-sm-0 btn btn-outline-light text-white rounded-0 min-w-150 min-h-45 d-inline-flex text-uppercase align-items-center justify-content-center fw-semibold border border-2 border-light bg-transparent">VIEW THE LOOK</button>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </div>
                </div>
                <div className="slideshow__slide">
                    <Image src={slide2} alt="Slide2Img" className="position-absolute w-100 h-100 object-fit-cover" />
                    <div className="container position-relative">
                        <div className="row">
                            <Col lg={8}>
                                <div className="content">
                                    <h5 className="fw-medium fs-20 text-white text-uppercase font-raleway">TRANSFORM YOUR LIFE
                                        TODAY</h5>
                                    <h1 className="fs-60 fw-bold font-montserrat text-white mb-4">LOSE FAT, GET FIT <br /> HAVE
                                        FUN!</h1>
                                    <div className="d-flex align-items-center gap-2">
                                        <Link className="btn btn-orange rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold text-white" href="/shop">Explore Now</Link>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </div>
                </div>
                <div className="slideshow__slide">
                    <Image src={slide3} alt="Slide3Img" className="position-absolute w-100 h-100 object-fit-cover" />
                    <div className="container position-relative">
                        <div className="row">
                            <Col lg={8}>
                                <div className="content">
                                    <h5 className="fw-medium fs-20 text-white text-uppercase font-raleway">NEW ARRIVALS</h5>
                                    <h1 className="fs-60 fw-bold font-montserrat text-white mb-4">MEN’S CLOTHING <br /> &
                                        ACCESSORIES</h1>
                                    <div className="d-sm-flex align-items-center gap-2">
                                        <Link className="btn btn-orange rounded-0 text-white min-w-150 min-h-45 text-uppercase d-inline-flex align-items-center justify-content-center fw-semibold" href="/shop">Shop Now</Link>
                                        <button className="mt-1 mt-sm-0 btn btn-outline-light text-white rounded-0 min-w-150 min-h-45 d-inline-flex text-uppercase align-items-center justify-content-center fw-semibold border border-2 border-light bg-transparent">Explore Now</button>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default MainSlide