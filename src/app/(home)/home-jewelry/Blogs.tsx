"use client";
import React, { useEffect, useRef } from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'

import blog1 from "@assets/images/home-jewelry/blog-01.jpg"
import blog2 from "@assets/images/home-jewelry/blog-02.jpg"
import blog3 from "@assets/images/home-jewelry/blog-03.jpg"
import Image from 'next/image'

import 'flickity/css/flickity.css';

const data = [
    { id: 1, pic: blog1, name: "Unique First Anniversary Gift Ideas", desc: "If you’ve been faced with the decision to reschedule or cancel your 2020 wedding, you’re not alone.If only th..." },
    { id: 2, pic: blog2, name: "Glossary Of Jewelry Terms", desc: "IS TROILITE IN METEORITE AN IMPERFECTION? This depends entirely on who you ask. And could potentially lead into a h..." },
    { id: 3, pic: blog3, name: "Covid-19 Wedding Planning Advice", desc: "The sad reality is that some of us are losing very important people in our lives, including partners of many y..." }
]

const Blogs = () => {
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
            <section className="kalles-section_type_featured_blog pt-4">
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center">
                                <div>
                                    <h1 className="position-relative text-capitalize font-playfair fw-medium">
                                        <span>From The Blogs</span>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 g-md-4  blog-arrow" dir="ltr">
                            {data.map((item) => (
                                <div className="col-md-6 col-lg-4 px-2 px-lg-3" key={item.id}>
                                    <div className="blog-card">
                                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                            <Image src={item.pic} alt="ItemImg" className="img-fluid" />
                                        </Link>
                                        <div className="d-flex gap-1 align-items-center text-muted my-3">
                                            On
                                            <span className="text-body">September 10, 2024</span>
                                        </div>
                                        <h6 className="fs-17 font-playfair fw-medium main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.name}</Link></h6>
                                        <div className="post-content text-muted mt-3">{item.desc}</div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default Blogs