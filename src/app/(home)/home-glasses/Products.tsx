"use client";
import React, { useState } from 'react'
import { Col, Container, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import Image from 'next/image'
import Link from 'next/link'

import pr1 from "@assets/images/home-glasses/pr-01.jpg"
import pr2 from "@assets/images/home-glasses/pr-02.jpg"
import pr3 from "@assets/images/home-glasses/pr-03.jpg"
import pr4 from "@assets/images/home-glasses/pr-04.jpg"
import pr5 from "@assets/images/home-glasses/pr-05.jpg"
import pr6 from "@assets/images/home-glasses/pr-06.jpg"
import pr7 from "@assets/images/home-glasses/pr-07.jpg"
import pr8 from "@assets/images/home-glasses/pr-08.jpg"
import pr9 from "@assets/images/home-glasses/pr-09.jpg"
import pr10 from "@assets/images/home-glasses/pr-10.jpg"
import pr13 from "@assets/images/home-glasses/pr-13.jpg"
import pr14 from "@assets/images/home-glasses/pr-14.jpg"
import pr15 from "@assets/images/home-glasses/pr-15.jpg"
import pr16 from "@assets/images/home-glasses/pr-16.jpg"

import 'flickity/css/flickity.css';
const Products = () => {

    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [imageUrl, setImageUrl] = useState(pr5);
    const [isHovered4, setIsHovered4] = useState(false);

    const [isHovered5, setIsHovered5] = useState(false);
    const [isHovered6, setIsHovered6] = useState(false);
    const [isHovered7, setIsHovered7] = useState(false);
    const [isHovered8, setIsHovered8] = useState(false);

    const [isHovered9, setIsHovered9] = useState(false);
    const [isHovered10, setIsHovered10] = useState(false);
    const [imageUrl10, setImageUrl10] = useState(pr5);
    const [isHovered11, setIsHovered11] = useState(false);
    const [imageUrl12, setImageUrl12] = useState(pr7);
    const [isHovered12, setIsHovered12] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <Container>
                    <div className="row justify-content-center">
                        <Col lg={8}>
                            <div className="text-center">
                                <div>
                                    <h1 className="position-relative text-capitalize font-montserrat fw-medium">
                                        <span>Our Products</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-glasses text-muted"></i><span></span></span>
                                </div>
                                <p className="fs-14 text-muted mt-2 mb-0">Eyeglasses teamed up to design a performance cycling frame
                                    inspired by the French outfitter’s ability to honor classic
                                    design while elevating technical capabilities.</p>
                            </div>
                        </Col>
                    </div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="#featured">
                        <Nav className="nav nav-underline gap-4 nav-mustard justify-content-center mt-4 mb-0" id="pills-tab">
                            <Nav.Item>
                                <Nav.Link className='fw-medium fs-14' id="featured-tab" eventKey="#featured">FEATURED</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="fw-medium fs-14" id="new-arrivals-tab" eventKey="#new-arrivals">NEW ARRIVALS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="fw-medium fs-14" id="onSale-tab" eventKey="#onSale">ON SALE</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='mt-4'>
                            <Tab.Pane className='fade' id="featured-tab" eventKey="#featured">
                                <Row className="g-4">
                                    <Col lg={3} className="col-6">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered ? pr6 : pr14}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="button-tooltip">
                                                        Add to Wishlist
                                                    </Tooltip>}
                                                >
                                                    <Link href="#" className="wishlistadd position-absolute mustard">
                                                        <i className="facl facl-heart-o text-white"></i>
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Vintage Aviator Sunglasses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$155.00</span>
                                                </p>
                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="col-6">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered2(true)}
                                            onMouseLeave={() => setIsHovered2(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered2 ? pr10 : pr9}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="button-tooltip">
                                                        Add to Wishlist
                                                    </Tooltip>}
                                                >
                                                    <Link href="#" className="wishlistadd position-absolute mustard">
                                                        <i className="facl facl-heart-o text-white"></i>
                                                    </Link>
                                                </OverlayTrigger>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Miu Miu/Core Collection MU 08RS
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$450.00</span>
                                                </p>
                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="col-6">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered3(true)}
                                            onMouseLeave={() => setIsHovered3(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered3 ? pr4 : pr3}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="button-tooltip">
                                                        Add to Wishlist
                                                    </Tooltip>}
                                                >
                                                    <Link href="#" className="wishlistadd position-absolute mustard">
                                                        <i className="facl facl-heart-o text-white"></i>
                                                    </Link>
                                                </OverlayTrigger>
                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Miu Miu/Core Collection MU 59US
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$388.00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={3} className="col-6">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered4(true)}
                                            onMouseLeave={() => setIsHovered4(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered4 ? pr6 : imageUrl}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">Add to Wishlist</Tooltip>}>
                                                    <Link href="#" className="wishlistadd position-absolute mustard">
                                                        <i className="facl facl-heart-o text-white"></i>
                                                    </Link>
                                                </OverlayTrigger>
                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Ray-ban/Hexagonal Flat Lenses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00 - $259.00</span>
                                                </p>
                                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr6);
                                                        }}
                                                        className="d-inline-block bg-dark rounded-circle"
                                                    ></Link>
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr4);
                                                        }}
                                                        className="d-inline-block bg_color_green rounded-circle"
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane className='fade' id="new-arrivals-tab" eventKey="#new-arrivals">
                                <Row className="g-4">
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered5(true)}
                                            onMouseLeave={() => setIsHovered5(false)}
                                        >
                                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                    <i className="iccl iccl-cart text-white"></i></button>
                                            </div>
                                            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                    <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Vintage Aviator Sunglasses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$155.00</span>
                                                </p>
                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered6(true)}
                                            onMouseLeave={() => setIsHovered6(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered6 ? pr6 : pr5}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Ray-ban/Hexagonal Flat Lenses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00 - $259.00</span>
                                                </p>
                                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr6);
                                                            setIsHovered(false);
                                                        }}
                                                        className="d-inline-block bg-dark rounded-circle"
                                                    ></Link>
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr4);
                                                            setIsHovered(false);
                                                        }}
                                                        className="d-inline-block bg_color_green rounded-circle"
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered7(true)}
                                            onMouseLeave={() => setIsHovered7(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered7 ? pr8 : pr7}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Ray-ban Gold Flat Lenses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00</span>
                                                </p>
                                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr8);
                                                            setIsHovered(false);
                                                        }}
                                                        className="d-inline-block bg_color_green rounded-circle"
                                                    ></Link>
                                                    <Link
                                                        href="#!"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setImageUrl(pr13);
                                                            setIsHovered(false);
                                                        }}
                                                        className="d-inline-block bg-warning rounded-circle"
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered8(true)}
                                            onMouseLeave={() => setIsHovered8(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered8 ? pr16 : pr15}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Ray-Ban/SQUARE II
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$320.00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane className='fade' id="onSale-tab" eventKey="#onSale">
                                <Row className="g-4">
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered9(true)}
                                            onMouseLeave={() => setIsHovered9(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered9 ? pr2 : pr1}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Miu Miu/NOIR Glasses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered10(true)}
                                            onMouseLeave={() => setIsHovered10(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered10 ? pr4 : pr3}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Miu Miu/Core Collection MU 59US
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$388.00</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered11(true)}
                                            onMouseLeave={() => setIsHovered11(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered11 ? pr6 : imageUrl10}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="product-detail-layout-01.html" className="main_link_mustard">
                                                        Ray-ban/Hexagonal Flat Lenses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00 - $259.00</span>
                                                </p>
                                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                                    <Link
                                                        href="#!"
                                                        onClick={() => setImageUrl10(pr6)}
                                                        className="d-inline-block bg-dark rounded-circle"
                                                    ></Link>
                                                    <Link
                                                        href="#!"
                                                        onClick={() => setImageUrl10(pr4)}
                                                        className="d-inline-block bg_color_green rounded-circle"
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3">
                                        <div
                                            className="topbar-product-card overlay-hover"
                                            onMouseEnter={() => setIsHovered12(true)}
                                            onMouseLeave={() => setIsHovered12(false)}
                                        >
                                            <div className="position-relative overflow-hidden main">
                                                <Image
                                                    src={isHovered12 ? pr8 : imageUrl12}
                                                    alt="image"
                                                    className="img-fluid"
                                                    priority
                                                />
                                                <Link
                                                    href="#"
                                                    className="wishlistadd position-absolute mustard"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title="Add to Wishlist"
                                                >
                                                    <i className="facl facl-heart-o text-white"></i>
                                                </Link>

                                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-mustard text-white fs-14"><span>Quick View</span> <i className="iccl iccl-eye text-white"></i></Link>
                                                    <button type="button" className="btn bg-mustard fs-14 text-white" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                                        <i className="iccl iccl-cart text-white"></i></button>
                                                </div>
                                                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-mustard m-2" style={{ zIndex: "1" }}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" className="btn responsive-cart bg-mustard  fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                            </div>
                                            <div className="mt-3 text-center">
                                                <h6 className="mb-1">
                                                    <Link href="/product-detail-layout-01" className="main_link_mustard">
                                                        Ray-ban Gold Flat Lenses
                                                    </Link>
                                                </h6>
                                                <p className="mb-0 fs-14 text-muted">
                                                    <span>$205.00</span>
                                                </p>
                                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                                    <Link
                                                        href="#!"
                                                        onClick={() => setImageUrl12(pr8)}
                                                        className="d-inline-block bg_color_green rounded-circle"
                                                    ></Link>
                                                    <Link
                                                        href="#!"
                                                        onClick={() => setImageUrl12(pr13)}
                                                        className="d-inline-block bg-warning rounded-circle"
                                                    ></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>


                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default Products