"use client";
import React, { useEffect, useRef } from 'react'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import 'flickity/css/flickity.css';

import blog1 from "@assets/images/home-decor-2/blog-post-01.jpg"
import blog2 from "@assets/images/home-decor-2/blog-post-02.jpg"
import blog3 from "@assets/images/home-decor-2/blog-post-03.jpg"

const blogData = [
    {
        image: blog1,
        title: "The Kozmophone Is a Holographic, Bluetooth Turntable",
        author: true,
        content: "Imagine a turntable with a portable and detachable phonograph-style horn speaker and a miniature."
    },
    {
        image: blog2,
        title: "The Pi Offers a Futuristic Slice of Proximity Charging For New iPhones",
        author: true,
        content: "This startup founded by MIT grads wants users to charge up to four iPhones at the same time."
    },
    {
        image: blog3,
        title: "Poilu Vases Are 3D Printed with Implanted “Hair”",
        author: false,
        content: "A collection of 3D printed vases where \"hair\" is implanted during the printing process."
    }
]

const LatestBlog = () => {

    const flickityRef = useRef<Flickity | null>(null);

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
                groupCells: "100%",
                adaptiveHeight: false,
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
            <section className="kalles-section_type_featured_blog kalles-decor-02-blog-post">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize fw-semibold line-section-title">
                                        <span>latest blog posts</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor!</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 blog-arrow" dir="ltr">
                        {blogData.map((item, idx) => (
                            <Col md={6} lg={4} key={idx}>
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={item.image} alt="ItemImg" className="blog-img object-fit-cover w-100" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_mustard lh-base"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.title}</Link></h6>
                                    <div className="d-flex gap-1 align-items-center text-muted">
                                        {item.author ?
                                            <>
                                                By
                                                <span className="text-body">admin</span>
                                            </>
                                            :
                                            ""}
                                        On
                                        <span className="text-body">February 21, 2024</span>
                                    </div>
                                    <div className="post-content text-muted mt-3">{item.content}</div>
                                </div>
                            </Col>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default LatestBlog