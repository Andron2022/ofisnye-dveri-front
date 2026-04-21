"use client";
import React from 'react'
import { Col, Container } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import banner1 from "@assets/images/home-jewelry/banner-promotion-01.jpg"
import banner2 from "@assets/images/home-jewelry/banner-promotion-02.jpg"

const Cards = () => {
    return (
        <React.Fragment>
            <div className="banner-section position-relative mt-5 pt-4">
                <Container>
                    <div className="row g-2 g-md-4">
                        <Col lg={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={banner1} alt="Banner1Img" className="img-fluid hover-zoom-img w-100" />
                                <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-end m-4 mb-5">
                                    <div className="text-white">
                                        <h5 className="fs-16 fw-medium">The latest on-trend styles</h5>
                                        <h4 className="fs-36 font-playfair fw-semibold mb-4">Check out our latest range</h4>
                                        <p className="fw-normal btn btn-dark rounded-0 font-futura mb-0 btn_icon_true d-inline-block position-relative fs-14">
                                            Shop Now</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={banner2} alt="Banner2Img" className="img-fluid hover-zoom-img w-100" />
                                <div className="position-absolute top-50 start-50 translate-middle d-flex align-items-center text-center">
                                    <div className="text-white">
                                        <h5 className="fs-16 fw-medium">Shop our most popular products</h5>
                                        <h4 className="fs-36 font-playfair fw-semibold mb-4" style={{ whiteSpace: "nowrap" }}>Earing Collections</h4>
                                        <p className="fw-normal btn btn-dark rounded-0 font-futura mb-0 btn_icon_true d-inline-block position-relative fs-14">
                                            Shop Now</p>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Cards