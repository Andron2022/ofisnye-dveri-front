"use client";
import React, { useEffect, useRef } from "react";
import { Portfolio } from "@src/common/Portfolio/Portfolio";
import Image from "next/image";
import Link from "next/link";
import 'flickity/css/flickity.css';

const RelatedPortfolio = () => {

    const flickityRef = useRef<Flickity | null>(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.related-slideshow', {
                imagesLoaded: false,
                adaptiveHeight: false,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                cellAlign: 'left',
                wrapAround: true,
                prevNextButtons: false,
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
            <div className="d-flex justify-content-center mb-4">
                <h4 className="fw-bold">
                    RELATED PORTFOLIO
                </h4>
            </div>
            <div className="row py-2 blog-arrow kalles-blog-grid pb-5 mb-4 related-slideshow">
                {
                    Portfolio.map((item: any, index: number) => {
                        return (
                            <div key={index} className="col-md-4 col-sm-6 px-2 slideshow__slide">
                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                    <Image src={item.img} className="img-fluid" alt="ItemImg" />
                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                        <h6>{item.product}</h6>
                                        <p className="text-muted">{item.accessories}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}
export default RelatedPortfolio