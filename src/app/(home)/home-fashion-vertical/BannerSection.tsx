"use client";
import React from 'react'
import { Col } from 'react-bootstrap'

import banner1 from "@assets/images/home-fashion-vertical/banner-01.jpg"
import banner2 from "@assets/images/home-fashion-vertical/banner-02.jpg"
import Image from 'next/image'
import Link from 'next/link'


const BannerSection = () => {
    return (
        <React.Fragment>
            <div className="banner-section position-relative">
                <div className="container">
                    <div className="row g-4">
                        <Col md={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={banner1} alt="Banner1Img" className="img-fluid hover-zoom-img" />
                                <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                                    <div className="text-center text-white">
                                        <h4 className="fs-24">LOOKBOOK 2021</h4>
                                        <h6 className="mb-0">MAKE LOVE THIS LOOK</h6>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={banner2} alt="Banner2Img" className="img-fluid hover-zoom-img" />
                                <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                                    <div className="text-center text-white">
                                        <h6 className="text-capitalize mb-2">Summer Sale</h6>
                                        <h1 className="mb-0">UP TO 70%</h1>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default BannerSection