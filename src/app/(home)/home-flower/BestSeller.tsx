"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import flw1 from "@assets/images/home-flower/pr-flw-01.png"
import flw2 from "@assets/images/home-flower/pr-flw-02.png"
import flw5 from "@assets/images/home-flower/pr-flw-05.png"
import flw6 from "@assets/images/home-flower/pr-flw-06.png"
import flw9 from "@assets/images/home-flower/pr-flw-09.png"
import flw10 from "@assets/images/home-flower/pr-flw-10.png"
import flw12 from "@assets/images/home-flower/pr-flw-12.png"
import flw13 from "@assets/images/home-flower/pr-flw-13.png"
import flw17 from "@assets/images/home-flower/pr-17.png"
import flw18 from "@assets/images/home-flower/pr-18.png"

import trend1 from "@assets/images/home-flower/pr-trending-01.png"
import trend2 from "@assets/images/home-flower/pr-trending-02.png"
import trend5 from "@assets/images/home-flower/pr-trending-05.png"
import trend6 from "@assets/images/home-flower/pr-trending-06.png"
import trend9 from "@assets/images/home-flower/pr-trending-09.png"
import trend10 from "@assets/images/home-flower/pr-trending-10.png"
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'


const BestSeller = () => {

    // best seller
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);
    const [isHovered6, setIsHovered6] = useState(false);
    const [imageUrl, setImageUrl] = useState(flw12);

    const handleColorChange = (newImageUrl: any) => {
        setImageUrl(newImageUrl);
        setIsHovered6(false);
    };
    
    const [isHovered7, setIsHovered7] = useState(false);
    const [isHovered8, setIsHovered8] = useState(false);

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
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span>Best Seller</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top sale
                                    in this week</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-lg-4 g-3 mt-4">
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered ? flw2 : flw1} alt="image" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill bg-pink2 text-white fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Kalles Medium Arrangement
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$295.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered2 ? trend2 : trend1} alt="image" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill bg-pink2 text-white fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Regular Succulent Shebang
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$125.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered3 ? flw6 : flw5} alt="image" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill bg-pink2 text-white fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Regular Succulent Shebang
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$335.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered4 ? trend6 : trend5} alt="image" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill bg-pink2 text-white fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Seasonal Arrangement
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$95.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered5 ? flw10 : flw9}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Lovely Lavender Gift Box
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$295.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered6(true)}
                                onMouseLeave={() => setIsHovered6(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered6 ? imageUrl : imageUrl}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="bg-overlay"></div>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Botanical Crowns
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$25.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onClick={() => handleColorChange(flw12)}
                                            className="d-inline-block bg-danger rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={() => handleColorChange(flw13)}
                                            className="d-inline-block bg_color_green rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={() => handleColorChange(flw12)}
                                            className="d-inline-block bg-body-tertiary rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered7(true)}
                                onMouseLeave={() => setIsHovered7(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-success text-white rounded-circle text-center">
                                        Sold Out
                                    </span>
                                    <Image
                                        src={isHovered7 ? trend10 : trend9}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Floral Garden Arrangement
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$195.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-6">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered8(true)}
                                onMouseLeave={() => setIsHovered8(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered8 ? flw18 : flw17}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn bg-pink2 text-white rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Floral Crowns
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$28.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />

        </React.Fragment>
    )
}
export default BestSeller