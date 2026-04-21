"use client";
import React, { useEffect, useRef } from 'react'
import { Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'


import blog1 from "@assets/images/home-fashion-trend/blog-01.jpg"
import blog2 from "@assets/images/home-fashion-trend/blog-02.jpg"
import blog3 from "@assets/images/home-fashion-trend/blog-03.jpg"
import 'flickity/css/flickity.css';

const BlogPost = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.blog-arrow', {
                cellAlign: 'left',
                imagesLoaded: false,
                groupCells: "100%",
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
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
                        <h3 className="position-relative title_9 d-inline-block fs-30">
                            <span>latest blog posts</span>
                        </h3>
                        <p className="fs-14 mb-0 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor!</p>
                    </div>
                </div>
            </div>
            <Row className="row g-4 blog-arrow" dir="ltr">
                <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog1} alt="Blog1Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_acid_green lh-base fw-medium"><Link href="/blog-post-with-instagram-shop" className="text-reset main_link_acid_green">4 ITEMS IN WHICH IT IS
                                WORTH IT TO INVEST</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            By
                            <span className="text-body">Kate Hoang</span>
                            On
                            <span className="text-body">April 6, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">It is essential to have timeless pieces in our
                            wardrobe, these are items that can be spent a lot, however you will...</div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog2} alt="Blog2Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_acid_green lh-base fw-medium"><Link href="/blog-post-with-instagram-shop" className="text-reset main_link_acid_green">NEUTRAL COLORS: THE BEST
                                COLORS FOR MEN</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            By
                            <span className="text-body">Kate Hoang</span>
                            On
                            <span className="text-body">April 6, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">NEUTRAL COLORS: THE BEST COLORS FOR MEN Having a
                            wardrobe that has mostly neutral colors is a great idea, regardle...</div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-4 px-2 px-lg-3">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog3} alt="Blog3Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_acid_green lh-base fw-medium"><Link href="/blog-post-with-instagram-shop" className="text-reset main_link_acid_green">6 TIPS WILL MAKE YOU LOOK
                                ATTRACTIVE</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            By
                            <span className="text-body">Kate Hoang</span>
                            On
                            <span className="text-body">February 21, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">1. Face Men should also take care of the sun and
                            blemishes. It is recommended that you choose the ideal soap accor...</div>
                    </div>
                </div>
            </Row>
        </div>
    </section>
    </React.Fragment>
  )
}

export default BlogPost