"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import slide1 from "@assets/images/home-cosmetics/main-slide-01.jpg"
import slide2 from "@assets/images/home-cosmetics/main-slide-02.jpg"
import slide3 from "@assets/images/home-cosmetics/main-slide-03.jpg"

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

    const slide = [
        { id: 1, pic: slide1, new: "NEW PRODUCT", desc1: "Free Cleanser", desc2: "Goodness" },
        { id: 2, pic: slide3, new: "NEW COLLECTION", desc1: "Green Tea", desc2: "Serum" },
        { id: 3, pic: slide2, new: "NEW COLLECTION", desc1: "UV Protection Cream" },
    ];

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.blog-arrow', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: false,
                groupCells: "100%",
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
            <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-cosmetics overflow-hidden">
                <div className="slideshow">
                    {slide.map((item) => (
                        <div className="slideshow__slide" key={item.id}>
                            <Image src={item.pic} alt="ItemImg" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={4} className="offset-md-1">
                                        <div className="content">
                                            <h5 className="text-uppercase fs-13 text-lima ls-normal">{item.new}</h5>
                                            {item.desc2 ?
                                                <h1 className="fs-55 font-playfair fw-semibold text-lima mb-3">{item.desc1} <br />
                                                    {item.desc2}</h1>
                                                :
                                                <h1 className="fs-55 font-playfair fw-semibold text-white mb-3">{item.desc1}</h1>
                                            }
                                            <Link className="btn btn-cosmetics d-inline-flex align-items-center justify-content-center rounded-0 text-uppercase  text-lima" href="/shop">Shop Now</Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </React.Fragment>
    )
}
export default HomeSection