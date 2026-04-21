"use client";
import React from 'react'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import grid1 from "@assets/images/home-shoes/grid-bn-01.jpg"
import grid2 from "@assets/images/home-shoes/grid-bn-02.jpg"
import grid3 from "@assets/images/home-shoes/grid-bn-03.jpg"
import grid4 from "@assets/images/home-shoes/grid-bn-04.jpg"
import grid5 from "@assets/images/home-shoes/grid-bn-05.jpg"

const ShoesSection = () => {
    return (
        <React.Fragment>
            <div>
                <section className="kalles-shoes-grid-banner">
                    <div className="container-fluid px-2">
                        <div className="row g-2">
                            <Col md={4}>
                                <div className="row g-2">
                                    <Col lg={12}>
                                        <Link href="/shop" className="overflow-hidden img-zoom position-relative d-block">
                                            <Image src={grid1} alt="Grid1Img" className="img-fluid w-100" />
                                            <div className="position-absolute bottom-0 text-white p-4 m-2">
                                                <h3 className="fs-30 fw-medium mb-1">Ultra Boost Shoes</h3>
                                                <p className="fw-medium mb-0">SHOP ADIDAS <i className="las la-angle-right"></i></p>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col lg={12}>
                                        <Link href="/shop" className="overflow-hidden img-zoom position-relative d-block">
                                            <Image src={grid4} alt="Grid4Img" className="img-fluid w-100" />
                                            <div className=" position-absolute bottom-0 text-white p-4 m-2">
                                                <h3 className="fs-30 fw-medium mb-1">Faded To Perfection</h3>
                                                <p className="fw-medium mb-0">SHOP ECCO <i className="las la-angle-right"></i></p>
                                            </div>
                                        </Link>
                                    </Col>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="row g-2">
                                    <Col lg={12}>
                                        <Link href="/shop" className="overflow-hidden img-zoom position-relative d-block">
                                            <Image src={grid2} alt="Grid2Img" className="img-fluid w-100" />
                                            <div className="position-absolute bottom-0 text-white p-4 m-2">
                                                <h3 className="fs-30 fw-medium mb-1">Toms Exclusives</h3>
                                                <p className="fw-medium mb-0">SHOP TOMS <i className="las la-angle-right"></i></p>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col lg={12}>
                                        <Link href="/shop" className="overflow-hidden img-zoom position-relative d-block">
                                            <Image src={grid5} alt="Grid5Img" className="img-fluid w-100" />
                                            <div className="position-absolute bottom-0 text-white p-4 m-2">
                                                <h3 className="fs-30 fw-medium mb-1">Summer Ready</h3>
                                                <p className="fw-medium mb-0">SHOP CONVERSE <i className="las la-angle-right"></i></p>
                                            </div>
                                        </Link>
                                    </Col>
                                </div>
                            </Col>
                            <Col md={4}>
                                <Link href="/shop" className="overflow-hidden img-zoom position-relative d-block">
                                    <Image src={grid3} alt="Grid3Img" className="img-fluid w-100 object-fit-cover" />
                                    <div className="position-absolute bottom-0 text-white p-4 m-2">
                                        <h3 className="fs-30 fw-medium mb-1">The Ragged Priest</h3>
                                        <p className="fw-medium mb-0">SHOP NOW <i className="las la-angle-right"></i></p>
                                    </div>
                                </Link>
                            </Col>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default ShoesSection