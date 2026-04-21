"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import banner4 from "@assets/images/home-kids/banner-04.png"
import banner5 from "@assets/images/home-kids/banner-05.png"
import Image from 'next/image'

const Cards = () => {
  return (
    <React.Fragment>
        <section className="kids-discount ">
            <div className="container-fluid px-4 pt-5 bg-white">
                <Row className="row justify-content-center g-4 mt-lg-3">
                    <Col lg={5}>
                        <div className=" position-relative">
                            <Image src={banner4} className="w-100 img-fluid" alt="Banner4Img" />
                            <div className="position-absolute top-50 start-0 translate-middle-y mt-3 ms-2 ms-md-5">
                                <h6 className="fw-light d-none d-sm-block text-uppercase fs-13 fst-italic">50% Discount available</h6>
                                <h2 className="text-blue-dark text-uppercase fw-bold mb-1 mb-md-3">Flannel-lined <br />
                                    clothings
                                </h2>
                                <a href="#!" className="btn btn-pink2 text-white text-uppercase rounded-pill fw-semibold">shop
                                    now</a>
                            </div>
                        </div>
                    </Col>
                    <Col lg={5}>
                        <div className=" position-relative">
                            <Image src={banner5} className="w-100 img-fluid" alt="Banner5Img" />
                            <div className="position-absolute top-50 start-0 translate-middle-y mt-3 ms-2 ms-md-5">
                                <h6 className="fw-light d-none d-sm-block text-uppercase fs-13 fst-italic">FREE SHIPPING NOW</h6>
                                <h2 className="text-blue-dark text-uppercase fw-bold mb-1 mb-md-3">HEATHERED TOE <br />
                                    TEADYBEAR
                                </h2>
                                <a href="#!" className="btn btn-pink2 text-white text-uppercase rounded-pill fw-semibold">shop
                                    now</a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    </React.Fragment>
  )
}

export default Cards