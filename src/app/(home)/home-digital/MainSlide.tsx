"use client";
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import mainslide from "@assets/images/home-digital/main-slide.jpg"
import Link from 'next/link';

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
        <React.Fragment>
            <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-digital overflow-hidden" dir="ltr">
                <div className="slideshow" data-flickity='{ "fade":0,"cellAlign": "center","imagesLoaded": 0,"lazyLoad": 0,"freeScroll": 0,"wrapAround": true,"autoPlay" : 0,"pauseAutoPlayOnHover" : true, "rightToLeft": false, "prevNextButtons": false,"pageDots": true, "contain" : 1,"adaptiveHeight" : 1,"dragThreshold" : 5,"percentPosition": 1 }'>
                    <div className="slideshow__slide">
                        <Image src={mainslide} alt="MainslideImg" className="d-none d-md-block position-absolute w-100 h-100 object-fit-cover" />
                        <div className="container position-relative">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="content text-center text-sm-start">
                                        <h5 className="fw-medium fs-18 mb-2">SUMMER 2024</h5>
                                        <h1 className=" lh-base mb-1 ">Meet Galaxy S20, S20+</h1>
                                        <h5 className="mb-4 fs-22">This is the phone that will change photography</h5>
                                        <Link className="btn btn-dark text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Explore Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="slideshow__slide">
                        <Image src={mainslide} alt="MainslideImg" className="d-none d-md-block position-absolute w-100 h-100 object-fit-cover" />
                        <div className="container position-relative">
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="content">
                                        <h5 className="fw-medium fs-18 mb-2">SUMMER 2024</h5>
                                        <h1 className="fs-55 lh-base mb-1">Meet Galaxy S20, S20+</h1>
                                        <h5 className="mb-4 fs-22">This is the phone that will change photography</h5>
                                        <Link className="btn btn-dark text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Explore Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default MainSlide