"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import blog1 from "@assets/images/home-furniture/blog-01.jpg"
import blog2 from "@assets/images/home-furniture/blog-02.jpg"
import blog3 from "@assets/images/home-furniture/blog-03.jpg"

const Blogs = () => {

    return (
        <React.Fragment>
            <section className="kalles-furniture-feature-blog">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center wrap_title position-relative">
                                <h3 className="font-roboto-slab mb-3 fw-light fs-35 pb-1">Inspiration</h3>
                                <p className="fs-16 text-muted mb-5">Contrary to popular belief, Lorem Ipsum is not simply
                                    random
                                    text. It has roots in a piece of classical Latin literature from 45 BC, making it over
                                    2000
                                    years old.</p>
                            </div>
                        </Col>
                    </Row>
                    <Row className="mt-4 g-lg-4 g-2">
                        <Col md={4}>
                            <div className="post-blog img-zoom overflow-hidden position-relative">
                                <Image src={blog1} alt="Blog1Img" className="img-fluid w-100 object-fit-cover" />
                                <div className="post-info position-absolute start-0 top-0 end-0 bottom-0 fs-16 d-flex align-items-center justify-content-center p-4 bg-white border">
                                    <div>
                                        <div className="d-flex gap-1 align-items-center text-muted mb-2">
                                            <span className="me-1">By <span className="text-body">admin</span></span>
                                            On
                                            <span className="text-body">June 13, 2024</span>
                                        </div>
                                        <h6 className="fs-16 mb-2 lh-base"><a href="#!" className="main_link_warning">Tour a
                                            Luminous,
                                            Cozy and Stylish Family Home in Sweden</a></h6>
                                        <p className="text-muted mb-2">In part one of this post, we looked at the contemporary
                                            lifestyle setting: Tres Chic. In part two of the series, we...</p>
                                        <a href="#!" className="main_link_warning">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="post-blog img-zoom overflow-hidden position-relative">
                                <Image src={blog2} alt="Blog2Img" className="img-fluid w-100 object-fit-cover" />
                                <div className="post-info position-absolute start-0 top-0 end-0 bottom-0 fs-16 d-flex align-items-center justify-content-center p-4 bg-white border">
                                    <div>
                                        <div className="d-flex gap-1 align-items-center text-muted mb-2">
                                            <span className="me-1">By <span className="text-body">admin</span></span>
                                            On
                                            <span className="text-body">June 13, 2024</span>
                                        </div>
                                        <h6 className="fs-16 mb-2 lh-base"><a href="#!" className="main_link_warning">The Perfect
                                            Escape: A Remote Cabin in Iceland For a Stylish</a></h6>
                                        <p className="text-muted mb-2">In part one of this post, we looked at the contemporary
                                            lifestyle setting: Tres Chic. In part two of the series, we...</p>
                                        <a href="#!" className="main_link_warning">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="post-blog img-zoom overflow-hidden position-relative">
                                <Image src={blog3} alt="Blog3Img" className="img-fluid w-100 object-fit-cover" />
                                <div className="post-info position-absolute start-0 top-0 end-0 bottom-0 fs-16 d-flex align-items-center justify-content-center p-4 bg-white border">
                                    <div>
                                        <div className="d-flex gap-1 align-items-center text-muted mb-2">
                                            <span className="me-1">By <span className="text-body">admin</span></span>
                                            On
                                            <span className="text-body">June 13, 2024</span>
                                        </div>
                                        <h6 className="fs-16 mb-2 lh-base"><a href="#!" className="main_link_warning">Tour the
                                            Perfectly
                                            Styled Oslo Home of Katerina Dima</a></h6>
                                        <p className="text-muted mb-2">In part one of this post, we looked at the contemporary
                                            lifestyle setting: Tres Chic. In part two of the series, we...</p>
                                        <a href="#!" className="main_link_warning">READ MORE</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Blogs