"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import top from "@assets/images/home-fashion-trend/slide-top.jpg"
import left from "@assets/images/home-fashion-trend/slide-left.jpg"
import right from "@assets/images/home-fashion-trend/slide-right.jpg"

const MainSection = () => {
    return (
        <React.Fragment>
            <section className="home-lookbook-section min-vh-100 position-relative">
                <div className="container-fluid px-0">
                    <Row className="g-0">
                        <Col lg={12} className="position-relative">
                            <Image src={top} alt="TopImg" className="w-100 img-fluid" />
                            <div className="pin-type position-absolute position-10">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-11">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-12">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-13">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={4} className="position-relative">
                            <Image src={left} alt="LeftImg" className="w-100 img-fluid" />
                            <div className="pin-type position-absolute position-03">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-04">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                        </Col>
                        <Col lg={8} className="position-relative">
                            <Image src={right} alt="RightImg" className="w-100 img-fluid" />
                            <div className="pin-type position-absolute position-09">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-10">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-11">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                            <div className="pin-type position-absolute position-05">
                                <span className="zoompin"></span>
                                <Link href="#!" className="bg-pink text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal">
                                    <i className="nav_link_icon position-relative"></i>
                                </Link>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}

export default MainSection