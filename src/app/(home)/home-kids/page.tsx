"use client";
import React, { useEffect, useRef } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link';
import Image from 'next/image'
import HandPickedProduct from '@app/(home)/home-kids/HandPickedProduct'
import KidsHeader from '@src/components/Headers/KidsHeader'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'
import FooterKids from '@src/components/FooterKids'
import SwiperSection from '@app/(home)/home-kids/SwiperSection'
import Dealofday from '@app/(home)/home-kids/Dealofday'
import PinBanner from '@app/(home)/home-kids/PinBanner'
import Cards from '@app/(home)/home-kids/Cards'
import LatestBlog from '@app/(home)/home-kids/LatestBlog'

import newsletter from "@assets/images/home-kids/newsletter-bg.png"
import slide1 from "@assets/images/home-kids/slide-bg-01.jpg"
import slide2 from "@assets/images/home-kids/slide-bg-02.jpg"
import banner1 from "@assets/images/home-kids/banner-01.png"
import banner2 from "@assets/images/home-kids/banner-02.png"
import bodybg from "@assets/images/home-kids/body-bg.jpg"

import 'flickity/css/flickity.css';

const HomeKids = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bodybg.src})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.overflowX = 'hidden';

    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundRepeat = '';
      document.body.style.backgroundSize = '';
      document.body.style.overflowX = '';
    };
  }, []);

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
        prevNextButtons: true,
        pageDots: false,
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
      <HeadTitle title="Home Kids" />
      <div className="home_kids_main">
        {/* {{> partials/header-kids}} */}
        <KidsHeader />
        {/* main slide */}
        <div className="px-0 kalles-home-section type_slideshow type_carousel kalles-medical kalles-bags kids-banner" dir="ltr">
          <div className="slideshow">

            <div className="slideshow__slide" style={{ background: `url(${slide1.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="container-fluid position-relative">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content">
                      <h5 className="text-blue fw-normal text-uppercase fs-14">Free Shipping Available</h5>
                      <h1 className="font-futura text-blue-dark mb-5">BIG SAVE ON <br /> FASHION BONANSA</h1>
                      <p className="mb-4">Flannel lightweight line overall collection</p>
                      <Link href="#!" className="btn btn-blue-dark text-white px-4 text-uppercase rounded-pill fw-semibold">shop
                        now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="slideshow__slide" style={{ background: `url(${slide2.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
              <div className="container position-relative">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="content">
                      <h5 className="text-blue fw-normal text-uppercase fs-14">FREE SHIPPING AVAILABLE
                      </h5>
                      <h1 className="font-futura fs-50 text-blue-dark mb-3">BIG SAVE ON<br /> FASHION
                        BONANZA</h1>
                      <h5 className="text-blue fw-normal fs-14 pb-3">Lightweight collection of
                        apparels now!
                      </h5>
                      <Link href="#!" className="btn btn-blue-dark text-white px-4 text-uppercase rounded-pill fw-semibold mt-4">shop
                        now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* cards */}
        <section className="kids-discount">
          <div className="container-fluid px-4 pt-5 bg-white">
            <Row className="g-4">
              <Col lg={6}>
                <div className=" position-relative">
                  <Image src={banner1} className="w-100 img-fluid" alt="Banner1Img" />
                  <div className="position-absolute top-50 start-0 translate-middle-y mt-3 ms-2 ms-md-5">
                    <h6 className="fw-light d-none d-sm-block text-uppercase fs-13 fst-italic">50% Discount available</h6>
                    <h2 className="text-blue-dark text-uppercase fw-bold mb-1 mb-md-3">Warm winnter <br />
                      collection 2021
                    </h2>
                    <Link href="#!" className="btn btn-pink2 text-white text-uppercase rounded-pill fw-semibold">shop
                      now</Link>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className=" position-relative">
                  <Image src={banner2} className="w-100 img-fluid" alt="Banner2Img" />
                  <div className="position-absolute top-50 start-0 translate-middle-y mt-3 ms-2 ms-md-5">
                    <h6 className="fw-light d-none d-sm-block text-uppercase fs-13 fst-italic">FREE SHIPPING NOW</h6>
                    <h2 className="text-blue-dark text-uppercase fw-bold mb-1 mb-md-3">Baby sitter <br />
                      trollycosatto
                    </h2>
                    <Link href="#!" className="btn btn-pink2 text-white text-uppercase rounded-pill fw-semibold">shop
                      now</Link>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </section>

        {/*  */}
        <Dealofday />

        {/* swiper */}
        <SwiperSection />

        {/* pin banner */}
        <PinBanner />

        {/*  */}
        <Cards />

        {/* handpicked product */}
        <HandPickedProduct />

        {/* latest from blog */}
        <LatestBlog />

        {/* news letter */}
        <section>
          <div className="container-fluid overflow-hidden bg-white px-0">
            <div className="position-relative">
              <Image className="kids-subscribe-image" src={newsletter} alt="NewsletterImg" />
              <div className="position-absolute top-50 start-0 w-100 translate-middle-y">
                <div className="row align-items-center justify-content-center pt-5 pb-4">
                  <div className="col-lg-5 text-white mb-4 mb-md-0">
                    <p className="text-center text-lg-start fs-22 mb-0">Subscribe Now!</p>
                  </div>
                  <div className="col-lg-5">
                    <form id="contact_form" className="d-block">
                      <div className="footer-subscribe position-relative">
                        <input type="email" name="email" placeholder="Your email address" className="input-text form-control form-control-lg text-white py-3 w-100 rounded-pill bg-transparent text-white text-opacity-75 fs-14" required />
                        <button type="submit" className="btn btn-dark position-absolute kids-subscribe-btn rounded-pill">
                          <span>Subscribe</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* footer */}
        <FooterKids />

        <PopupPage />
      </div>

    </React.Fragment>
  )
}

export default HomeKids