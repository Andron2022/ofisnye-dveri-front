"use client";
import React, { useEffect, useRef } from 'react'
import { Col } from 'react-bootstrap'
import 'flickity/css/flickity.css';
import Image from 'next/image'

import intg1 from "@assets/images/home-cosmetics/intg-01.jpg"
import intg2 from "@assets/images/home-cosmetics/intg-02.jpg"
import intg3 from "@assets/images/home-cosmetics/intg-03.jpg"
import intg4 from "@assets/images/home-cosmetics/intg-04.jpg"
import intg5 from "@assets/images/home-cosmetics/intg-05.jpg"
import intg6 from "@assets/images/home-cosmetics/intg-06.jpg"


const ImageList = () => {
    const flickityRef = useRef<Flickity | null>(null);

    const banner = [
        { id: 1, pic: intg1 }, { id: 2, pic: intg2 }, { id: 3, pic: intg3 }, { id: 4, pic: intg4 }, { id: 5, pic: intg5 }, { id: 6, pic: intg6 }
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
            <section className="overflow-hidden">
                <div className="container-fuild px-0">
                    <div className="row g-0 blog-arrow" dir="ltr">
                        {banner.map((item, idx) => (
                            <Col md={2} sm={6} key={idx}>
                                <div className="overflow-hidden img-zoom">
                                    <Image src={item.pic} alt="ItemImg" className="img-fluid h-100" />
                                </div>
                            </Col>))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default ImageList