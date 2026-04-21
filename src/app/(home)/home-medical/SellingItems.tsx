"use client";
import React, { useState } from 'react'
import { Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import Image from 'next/image'
import Link from 'next/link'

import home1 from "@assets/images/home-medical/pr-01.jpg"
import home2 from "@assets/images/home-medical/pr-02.jpg"
import home12 from "@assets/images/home-medical/pr-12.jpg"
import home13 from "@assets/images/home-medical/pr-13.jpg"
import home21 from "@assets/images/home-medical/pr-21.jpg"
import home22 from "@assets/images/home-medical/pr-22.jpg"
import home23 from "@assets/images/home-medical/pr-23.jpg"
import home24 from "@assets/images/home-medical/pr-24.jpg"
import home25 from "@assets/images/home-medical/pr-25.jpg"
import home26 from "@assets/images/home-medical/pr-26.jpg"
import home27 from "@assets/images/home-medical/pr-27.jpg"
import home28 from "@assets/images/home-medical/pr-28.jpg"
import home29 from "@assets/images/home-medical/pr-29.jpg"
import home30 from "@assets/images/home-medical/pr-30.jpg"
import home31 from "@assets/images/home-medical/pr-31.jpg"
import home32 from "@assets/images/home-medical/pr-32.jpg"
import home33 from "@assets/images/home-medical/pr-33.jpg"
import home34 from "@assets/images/home-medical/pr-34.jpg"


const SellingItems = () => {

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to Wishlist
        </Tooltip>
    );

    // best selling items
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);
    const [isHovered6, setIsHovered6] = useState(false);
    const [isHovered7, setIsHovered7] = useState(false);
    const [isHovered8, setIsHovered8] = useState(false);
    const [isHovered9, setIsHovered9] = useState(false);
    const [isHovered10, setIsHovered10] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section>
                <Container>
                    <Row className="mt-3 align-items-center">
                        <Col md={6}>
                            <h3 className="fs-26 mb-0 text-center text-md-start">Best selling items</h3>
                        </Col>
                        <Col md={6} className="text-center text-md-end">
                            <Link href="#!" className="main_link_primary text-decoration-underline">See all products</Link>
                        </Col>
                    </Row>
                    <Row className='row-cols-lg-5 row-cols-md-3 row-cols-2 mt-4'>
                        <Col>
                            <div
                                className="topbar-product-card design_1"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-12%</span>
                                    </span>
                                    <Image
                                        src={isHovered ? home22 : home21}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">Search Lab N95 Face Mask</Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$25.00</del>
                                <span className="text-danger">$22.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card design_1"
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-46%</span>
                                    </span>
                                    <Image
                                        src={isHovered2 ? home24 : home23}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip}
                                    >
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">Anti-septic Dry Hand Gel</Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$35.00</del>
                                <span className="text-danger">$19.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div>
                                <div
                                    className="topbar-product-card desgin_1"
                                    onMouseEnter={() => setIsHovered3(true)}
                                    onMouseLeave={() => setIsHovered3(false)}
                                >
                                    <div className="position-relative overflow-hidden">
                                        <span className="onsale bg-danger text-white text-center position-absolute d-inline-block"><span>-19%</span></span>
                                        <Image
                                            src={isHovered3 ? home26 : home25}
                                            alt="image"
                                            className="img-fluid"
                                        />
                                        <div className="bg-overlay"></div>
                                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                                            <Link href="#" className="text-white wishlistadd position-absolute">
                                                <i className="facl facl-heart-o"></i>
                                            </Link>
                                        </OverlayTrigger>
                                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                                <i className="iccl iccl-cart"></i></button>
                                        </div>
                                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="fs-16 fw-medium mb-1 mt-3">
                                    <Link className="main_link_primary" href="/product-detail-layout-01">Digital Thermometer</Link>
                                </h6>
                                <p className="mb-3 pb-1 fs-15 text-muted">
                                    <del>$55.00</del>
                                    <span className="text-danger">$45.00</span>
                                </p>
                            </div>
                        </Col>

                        <Col>
                            <div>
                                <div
                                    className="topbar-product-card desgin_1"
                                    onMouseEnter={() => setIsHovered4(true)}
                                    onMouseLeave={() => setIsHovered4(false)}
                                >
                                    <div className="position-relative overflow-hidden">
                                        <Image
                                            src={isHovered4 ? home28 : home27}
                                            alt="image"
                                            className="img-fluid"
                                        />
                                        <div className="bg-overlay"></div>
                                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                                            <Link href="#" className="text-white wishlistadd position-absolute">
                                                <i className="facl facl-heart-o"></i>
                                            </Link>
                                        </OverlayTrigger>
                                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                                <i className="iccl iccl-cart"></i></button>
                                        </div>
                                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                        </div>
                                    </div>
                                </div>
                                <h6 className="fs-16 fw-medium mb-1 mt-3">
                                    <Link className="main_link_primary" href="/product-detail-layout-01">Anti-virus Carbon Mask</Link>
                                </h6>
                                <p className="mb-3 pb-1 fs-15 text-muted">
                                    <span>$35.00</span>
                                </p>
                            </div>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-23%</span>
                                    </span>
                                    <Image
                                        src={isHovered5 ? home30 : home29}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Temperature Gun
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$45.00</del>
                                <span className="text-danger">$35.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered6(true)}
                                onMouseLeave={() => setIsHovered6(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-38%</span>
                                    </span>
                                    <Image
                                        src={isHovered6 ? home13 : home12}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Surgical Latex Gloves
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$16.00</del>
                                <span className="text-danger">$10.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered7(true)}
                                onMouseLeave={() => setIsHovered7(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-17%</span>
                                    </span>
                                    <Image
                                        src={isHovered7 ? home2 : home1}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Surgical Face Mask
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$12.00</del>
                                <span className="text-danger">$10.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered8(true)}
                                onMouseLeave={() => setIsHovered8(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered8 ? home31 : home31}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Blood Pressure Monitor
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <span>$121.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered10(true)}
                                onMouseLeave={() => setIsHovered10(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                        <span>-40%</span>
                                    </span>
                                    <Image
                                        src={isHovered10 ? home33 : home32}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Stainless Steel Kidney Tray
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <del>$30.00</del>
                                <span className="text-danger">$18.00</span>
                            </p>
                        </Col>

                        <Col>
                            <div
                                className="topbar-product-card desgin_1"
                                onMouseEnter={() => setIsHovered9(true)}
                                onMouseLeave={() => setIsHovered9(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered9 ? home34 : home34}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <div className="bg-overlay"></div>
                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                    </OverlayTrigger>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{ zIndex: "1" }}>
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                            </div>
                            <h6 className="fs-16 fw-medium mb-1 mt-3">
                                <Link className="main_link_primary" href="/product-detail-layout-01">
                                    Hand Sanitizer
                                </Link>
                            </h6>
                            <p className="mb-3 pb-1 fs-15 text-muted">
                                <span>$6.00</span>
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />

        </React.Fragment>
    )
}
export default SellingItems