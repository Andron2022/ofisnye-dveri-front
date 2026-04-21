"use client";
import React, { useEffect, useRef } from 'react'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import CatSection from '@app/(home)/home-fashion-vertical/CatSection'
import BannerSection from '@app/(home)/home-fashion-vertical/BannerSection'
import OurProduct2 from '@src/commonsections/OurProduct2'

import Link from 'next/link'

import slide1 from "@assets/images/home-fashion-vertical/slide-01.jpg"
import slide2 from "@assets/images/slide/slider-02.jpg"
import slide3 from "@assets/images/slide/slider-03.jpg"
import TrendingandNewArrival from '@src/commonsections/TrendingandNewArrival'
import LayoutHeader7 from '@src/components/Headers/LayoutHeader7'
import TopBanner from '@src/components/Headers/TopBanner'
import MainModel from '@src/commonsections/MainModel'
import HeadTitle from '@src/commonsections/HeadTitle'

import 'flickity/css/flickity.css';

const HomeFashionVertical = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: false,
                cellAlign: 'center',
                imagesLoaded: false,
                lazyLoad: false,
                freeScroll: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: false,
                pageDots: true,
                contain: true,
                adaptiveHeight: true,
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
            <HeadTitle title="Home fashion Vertical" />
            <MainModel />
            <TopBanner topclass="vertical-wrpper" />
            <LayoutHeader7 />
            <div className="page-vertical-wrapper">



                {/* main */}
                <div className="kalles-home-section type_slideshow type_carousel">
                    <div className="slideshow">

                        <div className="slideshow__slide w-100" style={{ backgroundImage: `url(${slide1.src})` }}>
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="text-center d-flex justify-content-end">
                                        <div data-aos="fade-right" data-aos-delay="300">
                                            <h4 className="fs-18 fw-medium">Men Collection</h4>
                                            <h1 className="summer-tag fw-semibold mb-3">CLEARANCE SALE OFF 70%</h1>
                                            <Link className="btn btn-dark rounded-0 min-w-150 text-white" href="/shop">Shop Now
                                                Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slideshow__slide w-100" style={{ backgroundImage: `url(${slide2.src})` }}>
                            <div className="container">
                                <div className="row justify-content-end">
                                    <div className="col-md-6">
                                        <div className="text-end" data-aos="fade-right" data-aos-delay="300">
                                            <h4 className="fs-18 fw-medium">NEW SEASON</h4>
                                            <h3 className="display-4 fw-semibold mb-3">Lookbook Collection</h3>
                                            <Link className="btn btn-dark rounded-0 min-w-150 text-white" href="/shop-filter-sidebar">Explore
                                                Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="slideshow__slide w-100" style={{ backgroundImage: `url(${slide3.src})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div data-aos="fade-right" data-aos-delay="300">
                                            <h4 className="fs-18 fw-medium">SUMMER SALE</h4>
                                            <h1 className="display-4 fw-semibold mb-3">Save up to 70%</h1>
                                            <Link className="btn btn-dark rounded-0 min-w-150 text-white" href="/shop-filter-sidebar">Explore
                                                Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* cat section */}
                <CatSection />

                {/* new arrival */}
                <section>
                    <div className="container-fluid px-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="text-center">
                                    <div className="mb-2">
                                        <h3 className="section-title position-relative flex">
                                            <span>NEW ARRIVAL</span>
                                        </h3>
                                    </div>
                                    <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">New product
                                        of our store</span>
                                </div>
                            </div>
                        </div>
                        <TrendingandNewArrival colClass="col-md-3 col-6 px-lg-12 px-2" />
                    </div>
                </section>

                {/* banner section */}
                <BannerSection />

                {/* our product */}
                <OurProduct2 />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* Shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />

            </div>
        </React.Fragment>
    )
}

export default HomeFashionVertical