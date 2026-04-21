"use client";
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import slide1 from "@assets/images/home-hand-made/slide-01.png"
import slide2 from "@assets/images/home-hand-made/slide-02.jpg"
import slide3 from "@assets/images/home-hand-made/slide-03.jpg"

import 'flickity/css/flickity.css';

const slides = [
    {
        image: slide1,
        title: "Handcraft Shop",
        subtitle: "Inspired by Your Sweetest Dreams",
        buttonText: "Explore Now",
    },
    {
        image: slide2,
        title: "Spring Sale",
        subtitle: "Daily Recipes for Your Health",
        buttonText: "Discovery",
    },
    {
        image: slide3,
        title: "Handmade Store",
        subtitle: "Decorative Box for New Aspiration",
        buttonText: "Explore Now",
    }
];

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
            <section className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-handmade overflow-hidden" dir="ltr">
                <div className="slideshow" style={{ height: "100%" }}>

                    {slides.map((slide, index) => (
                        <div key={index} className="slideshow__slide">
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                className="position-absolute w-100 h-100 object-fit-cover"
                            />
                            <div className="container position-relative">
                                <div className="row">
                                    <div className="col-10 col-lg-4">
                                        <div className="content">
                                            <h5 className="fw-medium text-sea fs-18 mb-2">{slide.title}</h5>
                                            <h1 className="fs-45 lh-base fw-normal mb-4">{slide.subtitle}</h1>
                                            <Link
                                                className="btn btn-dark rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4"
                                                href="/shop"
                                            >
                                                {slide.buttonText}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </React.Fragment>
    )
}

export default MainSlide