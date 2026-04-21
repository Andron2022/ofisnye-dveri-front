"use client";
import React, { useEffect, useRef } from 'react'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import blog1 from "@assets/images/home-sport/blog-01.jpg"
import blog2 from "@assets/images/home-sport/blog-02.jpg"
import blog3 from "@assets/images/home-sport/blog-03.jpg"

const latest = [
    {
        image: blog1,
        title: 'Tips At-home Cardio Workouts',
        description: 'Time to get your sweat on with this workout for a flat stomach! These are the 10 best moves to tighten up that core...',
    },
    {
        image: blog2,
        title: '5 Tips To Stay Healthy At Home',
        description: 'And now more than ever it’s so important to continue to take care of ourselves and make sure we’re putting extra ca...',
    },
    {
        image: blog3,
        title: '10 Minute Fat Burning Workout For Beginners',
        description: 'I know sometimes it can be difficult to keep your healthy nutrition on track, so that’s why I created the Hot Body ...',
    },
]

const LatestNews = () => {

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
        <section className="kalles-section_type_featured_blog border-top sport-blog mt-5">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-9">
                    <div className="text-center mb-4 pb-2">
                        <div>
                            <h1 className="position-relative text-capitalize font-montserrat fw-medium">
                                <span>Latest News</span>
                            </h1>
                            <span className="dn tt_divider"><span></span><i className="la la-dumbbell text-muted"></i><span></span></span>
                        </div>
                        <p className="fs-14 text-muted mt-2 mb-0">Increased caloric expenditure can result from resistance
                            training both due to acute effects from training sessions
                            and long-term effects from increased muscle mass.</p>
                    </div>
                </div>
            </div>
            <div className="row g-4 blog-arrow " dir="ltr">
                {latest.map((item, idx) => (
                    <Col md={6} lg={4} className="px-2 px-lg-3" key={idx}>
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={item.image} alt="ItemImg" className="img-fluid" />
                        </Link>
                        <h6 className="fs-16 mt-3 font-montserrat fw-medium main_link text-truncate_orange"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.title}</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            On
                            <span className="text-body">September 1, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">{item.description}</div>
                    </div>
                </Col>
            ))}
            </div>
        </div>
    </section>
    </React.Fragment>
  )
}

export default LatestNews