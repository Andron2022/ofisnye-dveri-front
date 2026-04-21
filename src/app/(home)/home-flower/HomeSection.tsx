"use client";
import React, { useEffect, useRef} from 'react'
import { Col,  Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import slide1 from "@assets/images/home-flower/slide-01.jpg"
import slide2 from "@assets/images/home-flower/slide-02.png"
import slide3 from "@assets/images/home-flower/slide-03.jpg"

import 'flickity/css/flickity.css';



const HomeSection = ()=>{
    const flickityRef: any = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: 0,
                cellAlign: 'center',
                imagesLoaded: false,
                lazyLoad: 0,
                freeScroll: 0,
                wrapAround: true,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                prevNextButtons: false,
                pageDots: true,
                contain: true,
                adaptiveHeight: true,
                dragThreshold: 5,
                percentPosition: true,
                rightToLeft: false
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

    return(
        <React.Fragment>
              <div className="kalles-home-section type_slideshow type_carousel kalles-flower">
                    <div className="slideshow">
                        {/* <!-- first slide --> */}
                        <div className="slideshow__slide">
                            <Image src={slide1} alt="Slide1Img" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={8}>
                                        <div className="content">
                                            <h5 className="text-green2 fs-18 fw-medium">Honor your moment!</h5>
                                            <h1 className="fs-55 fw-semibold text-pink2 mb-3">Flower Shop & Florist</h1>
                                            <p className="fs-16 text-muted me-xl-5">Floral Hair Few things like flowers in your hair
                                                to make you feel like a goddess during quarantine.</p>
                                            <Link href="/shop">
                                                <div className="btn btn-success bg-green2 border-0 text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    Explore Now</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        {/* <!-- second slide --> */}
                        <div className="slideshow__slide">
                            <Image src={slide2} alt="Slide2Img" className="position-absolute w-100 h-100" />
                            <div className="container position-relative">
                                <div className="row justify-content-end">
                                    <Col lg={6}>
                                        <div className="content text-end">
                                            <h5 className="text-green2 fs-18 fw-medium">Wedding Decor</h5>
                                            <h1 className="fs-55 fw-semibold text-pink2 mb-3">Floral Arrangment</h1>
                                            <p className="fs-16 text-muted ms-xl-5">When presented with this event, we&apos;re given the
                                                creative freedom with flower selection and color palette.</p>
                                            <Link href="/shop">
                                                <div className="btn btn-success bg-green2 border-0 text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    Discovery</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </div>
                            </div>
                        </div>
                        {/* <!-- third slide --> */}
                        <div className="slideshow__slide">
                            <Image src={slide3} alt="Slide3Img" className="position-absolute w-100 h-100 object-fit-cover" />
                            <div className="container position-relative">
                                <Row>
                                    <Col lg={6}>
                                        <div className="content">
                                            <h5 className="text-green2 fs-18 fw-medium">Flashback Friday</h5>
                                            <h1 className="fs-55 fw-semibold text-pink2 mb-3">Daydream Bouquet</h1>
                                            <p className="fs-16 text-muted me-xl-5">The bridal bouquet featured three types of
                                                Protea and two types of roses. Come by and say Hi!</p>
                                            <Link href="/shop">
                                                <div className="btn btn-success bg-green2 border-0 text-white rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold">
                                                    Explore Now</div>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>
    )
}
export default HomeSection