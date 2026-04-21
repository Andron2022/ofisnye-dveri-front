"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';

import Image from 'next/image'
import Link from 'next/link';
import 'flickity/css/flickity.css';

import pr1 from "@assets/images/home-bags/pr-01.jpg"
import pr2 from "@assets/images/home-bags/pr-02.jpg"
import pr3 from "@assets/images/home-bags/pr-03.jpg"
import pr4 from "@assets/images/home-bags/pr-04.jpg"
import pr5 from "@assets/images/home-bags/pr-05.jpg"
import pr7 from "@assets/images/home-bags/pr-07.jpg"
import pr8 from "@assets/images/home-bags/pr-08.jpg"
import pr13 from "@assets/images/home-bags/pr-13.jpg"
import pr14 from "@assets/images/home-bags/pr-14.jpg"

import banner from "@assets/images/home-bags/bestseller-product-banner.jpg"
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';

const BestSellerProducts = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(pr1);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

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
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center pb-3">
                                <div className="mb-2">
                                    <h1>BEST SELLER PRODUCTS</h1>
                                </div>
                                <span className="fs-14 text-uppercase ls-normal text-muted">BEST SELLING PRODUCTS THIS SEASON</span>
                            </div>
                        </Col>
                    </Row>
                    <Card className="border-0 mt-4 overflow-hidden">
                        <Row className="g-4 align-items-center">
                            <Col lg={6} className=" order-1 order-md-0">
                                <CardBody>
                                    <Row className="g-4">
                                        <div className="col-lg-6 col-md-3 col-6">
                                            <div
                                                className="topbar-product-card"
                                                onMouseEnter={() => setIsHovered(true)}
                                                onMouseLeave={() => setIsHovered(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Image
                                                        src={isHovered ? pr2 : imageUrl}
                                                        alt="image"
                                                        className="img-fluid"
                                                    />
                                                    <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                                        <i className="facl facl-heart-o"></i>
                                                    </Link>

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>
                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                                                            <i className="iccl iccl-eye fw-semibold"></i>
                                                        </Link>
                                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <i className="iccl iccl-cart fw-semibold"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="mb-1 fs-16 fw-medium">
                                                        <Link href="/product-detail-layout-01" className="main_link_red">Tactical Bags</Link>
                                                    </h6>
                                                    <p className="mb-0 fs-15 text-muted">
                                                        <span>$51.00 - $57.00</span>
                                                    </p>
                                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                                        <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl(pr14); setIsHovered(false); }} className="d-inline-block bg_color_blue rounded-circle"></Link>
                                                        <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl(pr1); setIsHovered(false); }} className="d-inline-block bg_color_green rounded-circle"></Link>
                                                        <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl(pr2); setIsHovered(false); }} className="d-inline-block bg-success rounded-circle"></Link>
                                                        <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl(pr13); setIsHovered(false); }} className="d-inline-block bg-dark rounded-circle"></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-6">
                                            <div
                                                className="topbar-product-card"
                                                onMouseEnter={() => setIsHovered2(true)}
                                                onMouseLeave={() => setIsHovered2(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Image
                                                        src={isHovered2 ? pr4 : pr3}
                                                        alt="image"
                                                        className="img-fluid"
                                                    />
                                                    <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                                        <i className="facl facl-heart-o"></i>
                                                    </Link>

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>
                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                                                            <i className="iccl iccl-eye fw-semibold"></i>
                                                        </Link>
                                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <i className="iccl iccl-cart fw-semibold"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="mb-1 fs-16 fw-medium">
                                                        <Link href="/product-detail-layout-01" className="main_link_red">Crumpler The Drewbob 200</Link>
                                                    </h6>
                                                    <p className="mb-0 fs-15 text-muted">
                                                        <span>$79.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-6">
                                            <div
                                                className="topbar-product-card"
                                                onMouseEnter={() => setIsHovered3(true)}
                                                onMouseLeave={() => setIsHovered3(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Image
                                                        src={isHovered3 ? pr5 : pr5}
                                                        alt="image"
                                                        className="img-fluid"
                                                    />
                                                    <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                                        <i className="facl facl-heart-o"></i>
                                                    </Link>

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>
                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                                                            <i className="iccl iccl-eye fw-semibold"></i>
                                                        </Link>
                                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <i className="iccl iccl-cart fw-semibold"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="mb-1 fs-16 fw-medium">
                                                        <Link href="/product-detail-layout-01" className="main_link_red">Crumpler Rooftop Resume</Link>
                                                    </h6>
                                                    <p className="mb-0 fs-15 text-muted">
                                                        <span>$189.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-3 col-6">
                                            <div
                                                className="topbar-product-card"
                                                onMouseEnter={() => setIsHovered4(true)}
                                                onMouseLeave={() => setIsHovered4(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Image
                                                        src={isHovered4 ? pr8 : pr7}
                                                        alt="image"
                                                        className="img-fluid"
                                                    />
                                                    <Link
                                                        href="#"
                                                        className="wishlistadd position-absolute"
                                                        data-bs-toggle="tooltip"
                                                        data-bs-placement="top"
                                                        title="Add to Wishlist"
                                                    >
                                                        <i className="facl facl-heart-o"></i>
                                                    </Link>

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="btn rounded-pill fs-14"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                                        >
                                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>
                                                    <div
                                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                                    >
                                                        <Link
                                                            href="#exampleModal" onClick={handleShow}
                                                            data-bs-toggle="modal"
                                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                                            style={{ width: 36, height: 36 }}
                                                        >
                                                            <i className="iccl iccl-eye fw-semibold"></i>
                                                        </Link>
                                                        <button
                                                            type="button"
                                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                                            style={{ width: 36, height: 36 }}
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                                        >
                                                            <i className="iccl iccl-cart fw-semibold"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="mb-1 fs-16 fw-medium">
                                                        <Link href="/product-detail-layout-01" className="main_link_red">
                                                            Crumpler Big Breakfast Tote
                                                        </Link>
                                                    </h6>
                                                    <p className="mb-0 fs-15 text-muted">
                                                        <span>$199.00</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Col>
                            <Col lg={6} className="order-md-1 order-0">
                                <div className="position-relative">
                                    <Image src={banner} alt="BannerImg" className="img-fluid w-100" />
                                    <div className="position-absolute bottom-0 start-0 text-white p-5">
                                        <h6>FEATURED BACKPACK</h6>
                                        <h2 className="fs-60 mb-2">Urban 80M</h2>
                                        <Link href="/shop" className="btn text-white btn-custom-white-red btn_icon_true fw-medium min-w-150 rounded-0 py-3 px-5 text-uppercase fs-17">Learn
                                            More </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default BestSellerProducts