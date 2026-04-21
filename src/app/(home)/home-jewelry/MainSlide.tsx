"use client";
import React, { useEffect, useRef } from 'react'
import Link from 'next/link';

import slide1 from "@assets/images/home-jewelry/main-slide-01.jpg"
import slide2 from "@assets/images/home-jewelry/main-slide-02.jpg"
import Image from 'next/image';

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
        <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-jewelry-home overflow-hidden min-vh-100">
        <div className="slideshow">

            <div className="slideshow__slide">
                <Image src={slide1} alt="Slide1Img" className="position-absolute w-100 h-100 object-fit-cover" />
                <div className="container position-relative">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="content text-white">
                                <h5 className="fw-medium fs-18 mb-2">A must-have for any jewellery box</h5>
                                <h1 className="fs-50 fw-semibold mb-4">70% OFF NEW COLLECTIONS</h1>
                                <Link className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Explore Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slideshow__slide">
                <Image src={slide2} alt="Slide2Img" className="position-absolute w-100 h-100 object-fit-cover" />
                <div className="container position-relative">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="content text-center text-white">
                                <h5 className="fw-medium fs-18 mb-2">Autumn-Spring Collections</h5>
                                <h1 className="fs-50 fw-semibold mb-4">WEDDING SEASON 50% OFF</h1>
                                <Link className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Discover More</Link>
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