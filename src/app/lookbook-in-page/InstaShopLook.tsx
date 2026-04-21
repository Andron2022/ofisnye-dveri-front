"use client";
import React, { useEffect, useRef, } from "react";
import { Col } from 'react-bootstrap';

import Image from "next/image";
import Link from "next/link";
import insta1 from "@assets/images/instagram/ins1_1.jpg"
import insta2 from "@assets/images/instagram/ins1_2.jpg"
import insta4 from "@assets/images/instagram/ins1_4.jpg"
import insta5 from "@assets/images/instagram/ins1_5.jpg"
import insta6 from "@assets/images/instagram/ins1_6.jpg"
import insta8 from "@assets/images/instagram/ins1_8.jpg"
import insta13 from "@assets/images/instagram/ins1_13.jpg"
import insta14 from "@assets/images/instagram/ins1_14.jpg"

import 'flickity/css/flickity.css';

const InstaShopLook = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.insta-slider', {
                cellAlign: 'left',
                imagesLoaded: 0,
                adaptiveHeight: true,
                wrapAround: false,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                percentPosition: 1,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
    }, []);


    return (
        <React.Fragment>
            <h4 className="text-center mb-5">Shop The Look</h4>
            <div className="row position-relative insta-slider">
                <Col md={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta14} alt="Insta14Img" className="img-fluid" />
                        <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">1</Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                        <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon" >1</Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon" > <i className="facl facl-instagram fs-28"></i></Link>
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon" ><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon" ><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon"><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon"><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta2} alt="Insta2Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon"><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
                <Col lg={3} className="col-6">
                    <div className="insta-card position-relative">
                        <Image src={insta13} alt="Insta13Img" className="img-fluid" />
                        <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon"><i className="facl facl-instagram fs-28"></i></Link>
                    </div>
                </Col>
            </div>
        </React.Fragment>
    )
}
export default InstaShopLook