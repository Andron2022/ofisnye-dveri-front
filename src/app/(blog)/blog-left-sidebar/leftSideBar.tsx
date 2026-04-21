"use client";
import React from "react";
import thumbnail1 from '@assets/images/blog-page/blog-thumbnail-01.jpg'
import thumbnail2 from '@assets/images/blog-page/blog-thumbnail-02.jpg'
import thumbnail3 from '@assets/images/blog-page/blog-thumbnail-03.jpg'

import insta1 from '@assets/images/instagram/ins1_1.jpg'
import insta8 from '@assets/images/instagram/ins1_8.jpg'
import insta4 from '@assets/images/instagram/ins1_4.jpg'
import insta5 from '@assets/images/instagram/ins1_5.jpg'
import insta6 from '@assets/images/instagram/ins1_5.jpg'

import insta7 from '@assets/images/instagram/ins1_7.jpg'
import insta13 from '@assets/images/instagram/ins1_13.jpg'
import insta14 from '@assets/images/instagram/ins1_14.jpg'

import pr1 from '@assets/images/blog-page/pr-thumbnail-01.jpg'
import pr2 from '@assets/images/blog-page/pr-thumbnail-02.jpg'
import pr3 from '@assets/images/blog-page/pr-thumbnail-03.jpg'

import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const LeftSideBar = () => {
    return (
        <React.Fragment>
            <Col lg={3} className="mb-4 mb-lg-0">
                <div>
                    <h5 className="mb-2 fw-medium"> Blog Categories </h5>
                    <div className="filter-title mb-4"></div>
                    <ul className=" list-unstyled mb-4 navbar-nav justify-content-center ">
                        <li className="nav-item">
                            <Link className="nav-link pt-0 pe-3 text-teal" href="#!">
                                <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-16 me-2 mt-1 fw-bold filter-close" style={{ transform: "rotate(45deg)" }}></i>Life Style (10)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link pt-0 pe-3" href="#!">
                                <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-16 me-2 mt-1 fw-bold filter-close" style={{ transform: "rotate(45deg)" }}></i>Electric (7)</span>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link pt-0 pe-3" href="#!">
                                <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-16 me-2 mt-1 fw-bold filter-close" style={{ transform: "rotate(45deg)" }}></i>Electric (6)</span>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>
                    <h5 className="mb-2 mt-3 mt-lg-4 fw-medium">Recent Post </h5>
                    <div className="filter-title mb-4"></div>
                    <Row>
                        <div className="col-4">
                            <Image src={thumbnail1} alt="Thumbnail1Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">Spring – Summer Trending 2020</h6>
                            <p className="text-muted mb-0">April 6, 2020</p>
                        </div>
                    </Row>
                    <Row className="my-3">
                        <div className="col-4">
                            <Image src={thumbnail2} alt="Thumbnail2Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">The Easiest Way to Break Out on Top</h6>
                            <p className="text-muted mb-0">April 6, 2020</p>
                        </div>
                    </Row>
                    <Row className="row">
                        <div className="col-4">
                            <Image src={thumbnail3} alt="Thumbnail3Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">Style for couple in Weeding season</h6>
                            <p className="text-muted mb-0">April 6, 2020</p>
                        </div>
                    </Row>
                </div>
                <div>
                    <h5 className="mb-2 mt-3 mt-lg-5 fw-medium"> Instagram </h5>
                    <div className="filter-title mb-4"></div>
                    <Row className="row-cols-3 g-1">
                        <div className="insta-card position-relative">
                            <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta4} alt="Insta4Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta5} alt="Insta5Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta6} alt="Insta6Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta7} alt="Insta7Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta8} alt="Insta8Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta13} alt="Insta13Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                        <div className="insta-card position-relative">
                            <Image src={insta14} alt="Insta14Img" className="img-fluid" />
                            <Link href="#!" className="d-flex position-absolute text-white start-0 end-0 top-0 bottom-0 align-items-center justify-content-center icon">
                                <i className="facl facl-instagram fs-28"></i>
                            </Link>
                        </div>
                    </Row>
                </div>
                <div>
                    <h5 className="mb-2 mt-3 mt-lg-5 fw-medium">Sale Products </h5>
                    <div className="filter-title mb-4"></div>
                    <Row>
                        <div className="col-4">
                            <Image src={pr1} alt="Pr1Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">Analogue Resin Strap</h6>
                            <p className="text-muted mb-0">$30.00</p>
                        </div>
                    </Row>
                    <Row className="my-3">
                        <div className="col-4">
                            <Image src={pr2} alt="Pr2Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">Ridley High Waist</h6>
                            <p className="text-muted mb-0">$36.00</p>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-4">
                            <Image src={pr3} alt="Pr3Img" className="img-fluid" />
                        </div>
                        <div className="col-8 ps-0">
                            <h6 className="fw-medium mb-1">Blush Beanie</h6>
                            <p className="text-muted mb-0">$15.00</p>
                        </div>
                    </Row>
                </div>
                <div>
                    <h5 className="mb-2 mt-3 mt-lg-5 fw-medium">Blog Tags </h5>
                    <div className="filter-title mb-4"></div>
                    <Row className="d-flex me-lg-2">
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-3 py-0 fs-12" style={{ height: "30px" }}>Beauty (3)</button>
                        </div>
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-3 py-0 fs-12" style={{ height: "30px" }}>Fashion (5)</button>
                        </div>
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-3 py-0 fs-12" style={{ height: "30px" }}>Food (3)</button>
                        </div>
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-3 py-0 fs-12" style={{ height: "30px" }}>Life (1)</button>
                        </div>
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-3 py-0 fs-12" style={{ height: "30px" }}>Life Style (5)</button>
                        </div>
                        <div style={{ display: "contents" }}>
                            <button className="btn btn-outline-dark m-1 rounded-pill px-2 py-0 fs-12" style={{ height: "30px" }}>Travel (5)</button>
                        </div>
                    </Row>
                </div>
            </Col>
        </React.Fragment>
    )
}
export default LeftSideBar