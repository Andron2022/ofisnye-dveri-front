"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'

import blog1 from "@assets/images/home-hand-made/blog-01.jpg"
import blog2 from "@assets/images/home-hand-made/blog-02.jpg"
import blog3 from "@assets/images/home-hand-made/blog-03.jpg"
import blog4 from "@assets/images/home-hand-made/blog-04.jpg"
import Link from 'next/link'

import 'flickity/css/flickity.css';

const blogData = [
    {
        id: 1,
        title: "Tile Tray with Brass Handles",
        imageUrl: blog1,
        content: "I got back home I decided to create a couple trays to do some heavy lifting at my new house. We believe we shouldn’t..."
    },
    {
        id: 2,
        title: "Make a healthy meal",
        imageUrl: blog2,
        content: "Whether it’s a special event or a subscription service designed specifically for your home or office needs, we’d lo..."
    },
    {
        id: 3,
        title: "The Bombshell is a perfect fit on your table",
        imageUrl: blog3,
        content: "Each bouquet is hand-delivered with a custom notecard, and comes either wrapped in our signature newspaper, tissue..."
    },
    {
        id: 4,
        title: "Dining Table Chairs Makeover",
        imageUrl: blog4,
        content: "The perfect centerpiece is here! Designed in a low sitting glass vase perfect to allow conversation to carry over ..."
    }
]

const BlogPost = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.insta-slider', {
                imagesLoaded: false,
                adaptiveHeight: false,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                cellAlign: 'left',
                wrapAround: true,
                prevNextButtons: true,
                percentPosition: true,
                pageDots: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
    }, []);

    return (
        <React.Fragment>
            <section className="kalles-section_type_featured_blog latest-blogs kalles-decor-02-blog-post">
                <Container>
                    <Row className=" justify-content-center" style={{ marginBottom: "50px" }}>
                        <Col lg={7}>
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex fw-semibold font-avenir">
                                        <span>Blog Posts</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Don&apos;t miss any news from us</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className=" g-4 blog-arrow kalles-blog-grid insta-slider">
                        {blogData.map((blog) => (
                            <div key={blog.id} className="col-md-6 col-lg-3 px-2 px-lg-3 slideshow__slide">
                                <div className="blog-card">
                                    <Link href='/blog-post-with-instagram-shop' className="overflow-hidden d-block blog-wrap">
                                        <Image src={blog.imageUrl} alt="BlogImg" className="blog-img object-fit-cover w-100" />
                                    </Link>
                                    <h6 className="fs-17 font-avenir fw-semibold text-body mt-3">
                                        <Link href="/blog-post-with-instagram-shop" className="text-reset">
                                            {blog.title}
                                        </Link>
                                    </h6>
                                    <div className="d-flex gap-1 align-items-center text-muted">
                                        On <span className="text-body">May 27, 2024</span>
                                    </div>
                                    <div className="post-content text-muted mt-3">{blog.content}</div>
                                </div>
                            </div>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default BlogPost