"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import blog1 from "@assets/images/home-flower/blog-01.jpg"
import blog2 from "@assets/images/home-flower/blog-02.jpg"
import blog3 from "@assets/images/home-flower/blog-03.jpg"

import 'flickity/css/flickity.css';

const FeaturedBlogs = () => {

    const flickityRef: any = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.blog-arrow', {
                cellAlign: 'center',
                imagesLoaded: 0,
                wrapAround: true,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: 1,
                adaptiveHeight: 0,
                dragThreshold: 5,
                percentPosition: 1,
                groupCells: "100%"
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
            <section className="kalles-section_type_featured_blog">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span style={{ whiteSpace: "nowrap" }}>Latest from Blog</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">The
                                    freshest and most exciting news</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-4 blog-arrow" dir="ltr">
                        <Col md={4}>
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog1} alt="Blog1Img" className="img-fluid" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset">5 Ways to Play: Florals at home!</Link></h6>
                                <div className="post-content text-muted">Dried flower straw wreathes are super fun and easy to
                                    make. Don&apos;t have dried flowers? We couldn’t be more thrilled ...</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog2} alt="Blog2Img" className="img-fluid" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset">Ed Alfrey and Warner Brothers Event</Link></h6>
                                <div className="post-content text-muted">Flowers look great in a vase, but if you&apos;ve got a
                                    little extra time at home these days and need a fun project, here...</div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog3} alt="Blog3Img" className="img-fluid" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset">A Wanderlust Wedding</Link></h6>
                                <div className="post-content text-muted">In January, WildFlora got the opportunity to once again
                                    work with Fundamental Events Catering (always a pleasure!) ...</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default FeaturedBlogs