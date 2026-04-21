"use client";
import React, { useEffect, useRef } from 'react'
import { Col} from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link'

import slide1 from "@assets/images/home-glasses/slide-01.jpg"
import slide2 from "@assets/images/home-glasses/slide-02.jpg"
import slide3 from "@assets/images/home-glasses/slide-03.jpg"

import 'flickity/css/flickity.css';

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
             <section className="kalles-home-section type_slideshow type_carousel kalles-medical overflow-hidden kalles-glasses-home">
                    <div className="slideshow">
                        <div className="slideshow__slide">
                            <Image src={slide1} alt="Slide1Img" className="position-absolute start-0 end-0 top-0 w-100 h-100 object-fit-cover" priority/>
                            <div className="container position-relative">
                                <div className="row justify-content-center">
                                    <Col lg={8}>
                                        <div className="content text-start text-sm-center">
                                            <h1 className="summer-tag fw-semibold mb-3 text-white font-montserrat">SUMMER CLEARANCE</h1>
                                            <h6 className="fs-24 text-white fw-medium mb-4">Code Z7922G8 to Get 25% OFF!</h6>
                                            <div className="d-sm-flex justify-content-center gap-2">
                                                <Link className="btn btn-mustard text-white rounded-0 min-w-150 text-uppercase d-inline-flex align-items-center justify-content-center" href="/shop">Shop Now</Link>
                                                <Link className="btn btn-outline-mustard mt-2 mt-sm-0 text-white rounded-0 min-w-150 text-uppercase d-inline-flex align-items-center justify-content-center" href="/shop">VIEW PROMOTION</Link>
                                            </div>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <div className="slideshow__slide">
                            <div className="bg-overlay"></div>
                            <Image src={slide2} alt="Slide2Img" className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100 object-fit-cover" priority/>
                            <div className="container position-relative">
                                <div className="row justify-content-center">
                                    <Col lg={7}>
                                        <div className="content text-center">
                                            <h1 className="fs-60 fw-semibold mb-3 text-white font-montserrat">MEN’S SUNGLASSES <br />
                                                LookBook</h1>
                                            <p className="fs-14 text-white fw-normal mb-4">Brighten up your day and keep the rays at bay
                                                with our collection of women’s sunglasses you’ll want to book a holiday just to wear
                                                them.</p>
                                            <Link className="btn btn-mustard rounded-0 min-w-150 text-uppercase d-inline-flex align-items-center justify-content-center text-white" href="/shop">VIEW THE LOOK</Link>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                        <div className="slideshow__slide">
                            <Image src={slide3} alt="Slide3Img" className="position-absolute start-0 end-0 top-0 bottom-0 w-100 h-100 object-fit-cover" priority/>
                            <div className="container position-relative">
                                <div className="row justify-content-center">
                                    <Col lg={7}>
                                        <div className="content text-center">
                                            <h6 className="fs-24 text-white fw-medium mb-2">COME & GET OUR NEW LOOKBOOK</h6>
                                            <h1 className="fs-60 fw-semibold mb-3 text-white font-montserrat">RX EYEWEAR ESSENTIAL
                                                LookBook</h1>
                                            <Link className="btn btn-mustard rounded-0 min-w-150 d-inline-flex align-items-center justify-content-center text-white" href="/shop">Explore Now</Link>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default HomeSection