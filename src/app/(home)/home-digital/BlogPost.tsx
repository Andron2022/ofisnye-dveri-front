"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

import blog1 from "@assets/images/home-digital/blog-01.jpg"
import blog2 from "@assets/images/home-digital/blog-02.jpg"
import blog3 from "@assets/images/home-digital/blog-03.jpg"
import Image from 'next/image'

const BlogPost = () => {
    return (
        <React.Fragment>
            <section className="kalles-section_type_featured_blog kalles-decor-02-blog-post">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="position-relative flex">
                                        <span>Blog posts</span>
                                    </h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="row g-4 blog-arrow">
                        <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog1} alt="Blog1Img" className="blog-img object-fit-cover w-100" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">Style for couple in Weeding season</Link></h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    <span className="me-1">By <span className="text-body">John Doe</span></span>
                                    On
                                    <span className="text-body">May 22, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">Typography is the work of typesetters, compositors,
                                    typographers, graphic designers, art directors, manga artists,...</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog2} alt="Blog2Img" className="blog-img object-fit-cover w-100" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">The Easiest Way to Break Out on Top</Link></h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    <span className="me-1">By <span className="text-body">John Doe</span></span>
                                    On
                                    <span className="text-body">May 22, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">Typography is the work of typesetters, compositors,
                                    typographers, graphic designers, art directors, manga artists, ...</div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                            <div className="blog-card">
                                <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                    <Image src={blog3} alt="Blog3Img" className="blog-img object-fit-cover w-100" />
                                </Link>
                                <h6 className="fs-16 mt-3 main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">SPRING – SUMMER TRENDING 2020</Link></h6>
                                <div className="d-flex gap-1 align-items-center text-muted">
                                    <span className="me-1">By <span className="text-body">John Doe</span></span>
                                    On
                                    <span className="text-body">May 22, 2024</span>
                                </div>
                                <div className="post-content text-muted mt-3">Typography is the work of typesetters, compositors,
                                    typographers, graphic designers, art directors, manga artists, ...</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default BlogPost