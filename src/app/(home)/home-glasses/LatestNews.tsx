"use client";
import React from 'react'
import { Col, Container, Row, } from 'react-bootstrap';

import Image from 'next/image'
import Link from 'next/link'
import blog1 from "@assets/images/home-glasses/blog-01.jpg"
import blog2 from "@assets/images/home-glasses/blog-02.jpg"
import blog3 from "@assets/images/home-glasses/blog-03.jpg"



const LatestNews = () => {

    return (
        <React.Fragment>
            <section className="kalles-section_type_featured_blog">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-4">
                                <div>
                                    <h1 className="position-relative text-capitalize font-montserrat fw-medium">
                                        <span>Latest News</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-glasses text-muted"></i><span></span></span>
                                </div>
                                <p className="fs-14 text-muted mt-2 mb-0">Finding eyeglasses with the qualities that are most important to you could be as simple as choosing a frame material each distinguished by its own strengths.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-4 blog-arrow"
                        // data-flickity='{"imagesLoaded": 0, "adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold": 5, "cellAlign": "left", "wrapAround": true, "prevNextButtons": true, "percentPosition": 1, "pageDots": false, "autoPlay": 0, "pauseAutoPlayOnHover": true }'
                        dir="ltr">
                        <Col md={6} lg={4} className="px-2">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog1} alt="Blog1Img" className="img-fluid" priority/>
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_mustard font-montserrat">
                                    <Link href="/blog-post-with-instagram-shop" className="text-reset main_link_mustard">Eyeglasses that Suit Your Personality</Link>
                                </h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    On <span className="text-body">August 27, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">Because people generally recognize you by your face, the eyeglasses you wear are a very real part of your identity....</div>
                            </div>
                        </Col>
                        <Col md={6} lg={4} className="px-2">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog2} alt="Blog2Img" className="img-fluid" priority/>
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_mustard font-montserrat">
                                    <Link href="/blog-post-with-instagram-shop" className="text-reset main_link_mustard">How Eyeglasses Protect and Improve Vision?</Link>
                                </h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    On <span className="text-body">August 26, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">For most Americans, eyeglasses are an indispensable part of our daily lives. In the United States, more than 6 out...</div>
                            </div>
                        </Col>
                        <Col md={6} lg={4} className="px-2">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog3} alt="Blog3Img" className="img-fluid" priority/>
                                </Link>
                                <h6 className="fs-16 mt-3 main_link_mustard font-montserrat">
                                    <Link href="/blog-post-with-instagram-shop" className="text-reset main_link_mustard">Making a spectacle: How glasses are crafted</Link>
                                </h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    On <span className="text-body">August 26, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">When it comes to getting a pair of glasses, looks can be deceiving. We see them as functional fashion, but in reali...</div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default LatestNews