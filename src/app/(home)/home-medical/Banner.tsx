"use client";
import Image from 'next/image'
import { Button, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import React from 'react'

import banner1 from "@assets/images/home-medical/banner-01.jpg"
import banner2 from "@assets/images/home-medical/banner-02.jpg"
import banner3 from "@assets/images/home-medical/banner-03.jpg"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';

const Banner = () => {

    return (
        <React.Fragment>
            <section className="py-30">
                <Container>
                    <Row className="g-lg-4 g-2">
                        <Col xl={4} md={6}>
                            <div className="kalles-medical-banner-01 position-relative img-zoom">
                                <Image src={banner1} alt="Banner1Img" />
                                <div className="content position-absolute">
                                    <p className="text-uppercase">Personal</p>
                                    <h3>Temperature Gun</h3>
                                    <p className="mb-2">
                                        <span className="text-danger fw-medium fs-25">$35.00</span>
                                        <del>$45.00</del>
                                    </p>
                                    <Link href="/shop">
                                        <Button variant="primary" className="rounded-pill">Shop Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} md={6}>
                            <div className="kalles-medical-banner-01 position-relative img-zoom">
                                <Image src={banner2} alt="Banner2Img" />
                                <div className="content position-absolute">
                                    <p className="text-uppercase">Home Medical Supplies</p>
                                    <h3>Steam Vaporizer</h3>
                                    <p className="mb-2">
                                        <span className="text-danger fw-medium fs-25">$86.00</span>
                                    </p>
                                    <Link href="/shop">
                                        <Button variant="primary" className="rounded-pill">Shop Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col xl={4} md={6}>
                            <div className="kalles-medical-banner-01 position-relative img-zoom">
                                <Image src={banner3} alt="Banner3Img" />
                                <div className="content position-absolute">
                                    <p className="text-uppercase">Hospital Equipment</p>
                                    <h3>Stainless Steel Scissors</h3>
                                    <p className="mb-2">
                                        <span className="text-danger fw-medium fs-25">$13.00</span>
                                        <del>$16.00</del>
                                    </p>
                                    <Link href="/shop">
                                        <Button variant="primary" className="rounded-pill">Shop Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default Banner