"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import portfolio1 from '@assets/images/portfolio/p-01.jpg'
import portfolio2 from '@assets/images/portfolio/p-02.jpg'
import portfolio3 from '@assets/images/portfolio/p-03.jpg'

import 'flickity/css/flickity.css';
import { Col, Row } from "react-bootstrap";
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
            <div>
                <div className="d-flex justify-content-center mb-4">
                    <h4 className="fw-bold">
                        RELATED PORTFOLIO
                    </h4>
                </div>
                <Row className="py-2 blog-arrow kalles-blog-grid pb-5 mb-4 related-slideshow">
                    <Col md={4} sm={6} className="px-2 slideshow__slide">
                        <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                            <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                            <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                <h6>WOMEN SHOES</h6>
                                <p className="text-muted">Accessories, DIY, Handmade</p>
                            </div>
                        </Link>
                    </Col>
                    <Col md={4} sm={6} className="px-2 slideshow__slide">
                        <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                            <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                            <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                <h6>KALLES WATCH</h6>
                                <p className="text-muted">Accessories, DIY, Handmade</p>
                            </div>
                        </Link>
                    </Col>
                    <Col md={4} sm={6} className="px-2 slideshow__slide">
                        <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                            <Image src={portfolio3} className="img-fluid" alt="Portfolio3Img" />
                            <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                <h6>HANDMADE CRAFT</h6>
                                <p className="text-muted">Accessories, DIY, Handmade</p>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}
export default RelatedPortfolio