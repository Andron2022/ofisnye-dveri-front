"use client";
import React, { useEffect, useRef} from 'react'
import { Col, Row } from 'react-bootstrap'
import slide1 from "@assets/images/home-lingerie/slide-01.jpg"
import slide2 from "@assets/images/home-lingerie/slide-02.jpg"
import Image from 'next/image'
import Link from 'next/link'
import 'flickity/css/flickity.css';

const HomeSection = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: 0,
                cellAlign: 'center',
                imagesLoaded: 0,
                lazyLoad: 0,
                freeScroll: 0,
                wrapAround: true,
                autoPlay: 0,
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

    const data = [
        { id: 1, pic: slide1, title: "Smart Clothing For Any Situation", desc: "Kalles’s Beachwear Etiquette 2020", btn: "Explore Collection" },
        { id: 2, pic: slide2, title: "Latest Arrivals Collection on 50% Off", desc: "Natural Febric Is 100% Unrefined", btn: "Discover More" }
    ];

    return (
        <React.Fragment>
            <section className="kalles-home-section type_slideshow type_carousel kalles-bags kalles-medical overflow-hidden">
                <div className="slideshow">

                    {data.map((item) => (
                        <div className="slideshow__slide" key={item.id}>
                            <Image src={item.pic} alt="ItemImg" className="position-absolute w-100 h-100" />
                            <div className="container position-relative">
                                <Row className="justify-content-end">
                                    <Col lg={6}>
                                        <div className="content text-center text-md-start">
                                            <h5 className="fw-medium fs-18 mb-2">{item.title}</h5>
                                            <h1 className="display-3 fw-normal font-futura mb-4">{item.desc}</h1>
                                            <Link className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">{item.btn}</Link>
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