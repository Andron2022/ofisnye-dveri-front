"use client";
import React, { useRef, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { RelaredArticles } from '@src/common/Bolgs/RelaredArticles'
import Image from "next/image";
import Link from "next/link";

import 'flickity/css/flickity.css';
const RelatedArticles = () => {

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
                <h5 className="fw-bold">
                    RELATED ARTICLES
                </h5>
            </div>
            <Row className="pb-5 border-bottom mx-0 related-slideshow" >
                {
                    RelaredArticles.map((item: any, index: number) => {
                        return (
                            <Col md={4} sm={6} key={index} className="px-lg-2">
                                <div className="blog-card">
                                    <Link href="/blog-post-with-instagram-shop" className="overflow-hidden d-block blog-wrap">
                                        <Image src={item.img} alt="ItemImg" className="img-fluid" priority/>
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.title}</Link></h6>
                                    <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">{item.date}</span>
                                </div>
                            </Col>
                        )
                    })
                }
            </Row>
        </React.Fragment>
    )
}
export default RelatedArticles