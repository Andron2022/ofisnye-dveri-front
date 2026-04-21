"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import banner1 from "@assets/images/home-decor-2/banner-cat-01.jpg"
import banner2 from "@assets/images/home-decor-2/banner-cat-02.jpg"
import banner3 from "@assets/images/home-decor-2/banner-cat-03.jpg"
import cat2 from "@assets/images/home-decor/cat-banner-02.jpg"
import banner5 from "@assets/images/home-decor-2/banner-cat-05.jpg"

const MainBanner = () => {
    return (
        <React.Fragment>
            <section className="mt-3 kalles-decor-cat-banner-layout">
                <Container fluid>
                    <Row className="overflow-hidden">
                        <Col lg={6} className="pe-md-0">
                            <Row className="g-3">
                                <Col md={6}>
                                    <Link href="/shop" className="position-relative hover-zoom d-block">
                                        <Image src={banner1} alt="Banner1Img" className="img-fluid hover-zoom-img w-100" />
                                        <div className="position-absolute top-0 end-0 d-flex m-3">
                                            <div className="text-dark text-center">
                                                <h4 className="fs-30 fw-semibold mb-2">living room</h4>
                                                <p className="fw-semibold text-dark viewbtn mb-0 btn_icon_true d-inline-block position-relative fs-16">
                                                    view collectons</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col md={6}>
                                    <Link href="/shop" className="position-relative hover-zoom d-block">
                                        <Image src={banner2} alt="Banner2Img" className="img-fluid hover-zoom-img w-100" />
                                        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex m-3">
                                            <div className="text-dark text-center">
                                                <h4 className="fs-30 fw-semibold mb-2" style={{ whiteSpace: 'nowrap' }}>kitchen & dining</h4>
                                                <p className="fw-semibold text-dark viewbtn mb-0 btn_icon_true d-inline-block position-relative fs-16">
                                                    view collectons</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col md={8}>
                                    <Link href="/shop" className="position-relative hover-zoom d-block h-100">
                                        <Image src={cat2} alt="Cat2Img" className="img-fluid hover-zoom-img w-100 h-100" />
                                        <div className="position-absolute top-0 end-0 d-flex m-3">
                                            <div className="text-dark text-center">
                                                <h4 className="fs-30 fw-semibold mb-2">audio decor</h4>
                                                <p className="fw-semibold text-dark viewbtn mb-0 btn_icon_true d-inline-block position-relative fs-16">
                                                    view collectons</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col md={4}>
                                    <Link href="/shop" className="position-relative hover-zoom d-block bg-light">
                                        <Image src={banner5} alt="Banner5Img" className="img-fluid hover-zoom-img w-100" />
                                        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex m-3">
                                            <h4 className="fs-30 fw-semibold mb-2 text-dark">bottles</h4>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col lg={6} className="mt-3 mt-lg-0">
                            <Link href="/shop" className="position-relative hover-zoom d-block">
                                <Image src={banner3} alt="Banner3Img" className="img-fluid hover-zoom-img w-100" />
                                <div className="position-absolute top-0 start-0 d-flex m-3">
                                    <div className="text-light">
                                        <h4 className="fs-30 fw-semibold mb-2">lighting collections</h4>
                                        <p className="fw-semibold text-white mb-0 btn_icon_true d-inline-block position-relative fs-16">
                                            Explorer
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default MainBanner