"use client";
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'

import insta1 from "@assets/images/home-jewelry/instagram-01.jpg"
import insta2 from "@assets/images/home-jewelry/instagram-02.jpg"
import insta3 from "@assets/images/home-jewelry/instagram-03.jpg"
import insta4 from "@assets/images/home-jewelry/instagram-04.jpg"
import insta5 from "@assets/images/home-jewelry/instagram-05.jpg"
import insta6 from "@assets/images/home-jewelry/instagram-06.jpg"

import 'flickity/css/flickity.css';

const InstaSection = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.related-slideshow', {
                imagesLoaded: false,
                adaptiveHeight: true,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                cellAlign: 'left',
                wrapAround: false,
                prevNextButtons: true,
                percentPosition: true,
                pageDots: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
    }, []);

    return (
        <React.Fragment>
            <section className="overflow-hidden">
                <div className="container-fuild px-0">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4">
                                <div>
                                    <h3 className="position-relative flex font-playfair fw-semibold fs-30 text-uppercase">
                                        <span>@ FOLLOW US ON INSTAGRAM</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 related-slideshow" dir="ltr">
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta1} alt="Insta1Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta2} alt="Insta2Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta3} alt="Insta3Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta4} alt="Insta4Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta5} alt="Insta5Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-6">
                            <div className="overflow-hidden img-zoom">
                                <Image src={insta6} alt="Insta6Img" className="w-100 img-fluid h-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default InstaSection