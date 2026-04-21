"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import ProductModal from "@src/commonsections/ProductModal";
import AddToCardModal from "@src/commonsections/AddToCardModal";
import pr1 from '@assets/images/home-classic/pr-01.jpg'
import pr2 from '@assets/images/home-metro/pr-q4.jpg'
import pr6 from '@assets/images/home-classic/pr-06.jpg'
import prq1 from '@assets/images/home-metro/pr-q1.jpg'
import prq2 from '@assets/images/home-metro/pr-q2.jpg'
import pr3 from '@assets/images/home-classic/pr-03.jpg'
import prq6 from '@assets/images/home-metro/pr-q6.jpg'
import prq8 from '@assets/images/home-metro/pr-q8.jpg'
import pr27 from '@assets/images/home-classic/pr-27.jpg'
import pr37 from '@assets/images/home-classic/pr-31.jpg'
import prq10 from '@assets/images/home-metro/pr-q10.jpg'
import pr24 from '@assets/images/home-classic/pr-big-24.jpg'
import prq12 from '@assets/images/home-metro/pr-q12.jpg'
import prq14 from '@assets/images/home-metro/pr-q14.jpg'
import pr19 from '@assets/images/home-classic/pr-19.jpg'

const CatSection = () => {

    const [imageUrl, setImageUrl] = useState(prq1);
    const [show, setShow] = useState(false);
    const [key, setKey] = useState('home');
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <div className="row  g-lg-4 g-3 row-cols-2 row-cols-md-4 pb-1">
                <div className="col-md">
                    <Row className="g-3 g-lg-4">
                        <div className="col-12">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-success text-white rounded-circle"> New </span>
                                    <Image src={pr1} alt="Product" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                                        }}
                                    >
                                        <h6 className="mb-1">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Cream Women Pants
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span>$35.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr2} alt="Product" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                                        }}
                                    >
                                        <h6 className="mb-1">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Cream Women Pants
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span>$35.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Row>
                </div>


                <Col md={6} className="col-md">
                    <div className="topbar-product-card">
                        <div className="position-relative overflow-hidden">
                            <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                                }}
                            >
                                <h6 className="mb-1">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        Mercury Tee
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$68.00</span>
                                </p>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl(prq1)}
                                    onClick={(e) => e.preventDefault()}
                                    className="d-inline-block rounded-circle"
                                    style={{
                                        background: "url('assets/images/home-metro/pr-q1.jpg')",
                                        backgroundSize: 'cover',
                                        width: '16px',
                                        height: '16px'
                                    }}
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl(prq2)}
                                    onClick={(e) => e.preventDefault()}
                                    className="d-inline-block bg-black rounded-circle"
                                    style={{
                                        background: "url('assets/images/home-metro/pr-q2.jpg')",
                                        backgroundSize: 'cover',
                                        width: '16px',
                                        height: '16px'
                                    }}
                                ></Link>
                            </div>
                        </div>
                    </div>

                    <div className="d-md-none">
                        <div className="topbar-product-card pt-3">
                            <div className="position-relative overflow-hidden">
                                <Image src={pr6} alt="Pr6Img" className="img-fluid w-100" />
                                <Link
                                    href="#"
                                    className="d-lg-none position-absolute"
                                    style={{ zIndex: 1, top: '10px', left: '10px' }}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Add to Wishlist"
                                >
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>
                                <Link
                                    href="#"
                                    className="wishlistadd d-none d-lg-flex position-absolute"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Add to Wishlist"
                                >
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>

                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn rounded-pill fs-14"
                                        data-bs-toggle="modal"
                                        data-bs-target="#cardModal"
                                        onClick={handleAddToCardModalShow}
                                    >
                                        <span>Quick Shop</span>
                                        <i className="iccl iccl-cart"></i>
                                    </button>
                                </div>
                                <div
                                    className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                    style={{ zIndex: 1 }}
                                >
                                    <Link
                                        href="#exampleModal"
                                        data-bs-toggle="modal"
                                        className="btn responsive-cart rounded-pill fs-14 p-2"
                                        style={{ width: '36px', height: '36px' }}
                                        onClick={handleShow}
                                    >
                                        <i className="iccl iccl-eye fw-semibold"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn responsive-cart rounded-pill fs-14 p-2"
                                        style={{ width: '36px', height: '36px' }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#cardModal"
                                        onClick={handleAddToCardModalShow}
                                    >
                                        <i className="iccl iccl-cart fw-semibold"></i>
                                    </button>
                                </div>
                                <div
                                    className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                    }}
                                >
                                    <h6 className="mb-1 text-white">
                                        <Link href="product-detail-layout-01.html" className="product-title text-white">
                                            Blush Beanie
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-white">
                                        <span>$15.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>

                <div className="col-md">
                    <div className="row g-3 g-lg-4">
                        <div className="col-12">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr3} alt="Product" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                                        }}
                                    >
                                        <h6 className="mb-1">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Ridley High Waist
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span>$36.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <Image src={prq6} alt="Product" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)'
                                        }}
                                    >
                                        <h6 className="mb-1">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Crosshatch Backpack
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span>$30.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pr6} alt="Pr6Img" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                }}
                            >
                                <h6 className="mb-1 text-white">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        Blush Beanie
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$15.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="d-md-none">
                        <div className="topbar-product-card pb-3">
                            <div className="position-relative overflow-hidden">
                                <Image src={pr27} alt="Pr27Img" className="img-fluid w-100" />
                                <Link
                                    href="#"
                                    className="d-lg-none position-absolute"
                                    style={{ zIndex: 1, top: '10px', left: '10px' }}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Add to Wishlist"
                                >
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>
                                <Link
                                    href="#"
                                    className="wishlistadd d-none d-lg-flex position-absolute"
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    data-bs-title="Add to Wishlist"
                                >
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>

                                <div className="product-button d-none d-lg-flex flex-column gap-2">
                                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn rounded-pill fs-14"
                                        data-bs-toggle="modal"
                                        data-bs-target="#cardModal"
                                        onClick={handleAddToCardModalShow}
                                    >
                                        <span>Quick Shop</span>
                                        <i className="iccl iccl-cart"></i>
                                    </button>
                                </div>
                                <div
                                    className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                    style={{ zIndex: 1 }}
                                >
                                    <Link
                                        href="#exampleModal"
                                        data-bs-toggle="modal"
                                        className="btn responsive-cart rounded-pill fs-14 p-2"
                                        style={{ width: '36px', height: '36px' }}
                                        onClick={handleShow}
                                    >
                                        <i className="iccl iccl-eye fw-semibold"></i>
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn responsive-cart rounded-pill fs-14 p-2"
                                        style={{ width: '36px', height: '36px' }}
                                        data-bs-toggle="modal"
                                        data-bs-target="#cardModal"
                                        onClick={handleAddToCardModalShow}
                                    >
                                        <i className="iccl iccl-cart fw-semibold"></i>
                                    </button>
                                </div>
                                <div
                                    className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                    style={{
                                        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                    }}
                                >
                                    <h6 className="mb-1 text-white">
                                        <Link href="product-detail-layout-01.html" className="product-title text-white">
                                            City Backpack Black
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-white">
                                        <span>$55.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pr37} alt="Pr37Img" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                }}
                            >
                                <h6 className="mb-1 text-white">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        Men Pants
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$49.00 – $56.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={prq8} alt="Prq8Img" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                }}
                            >
                                <h6 className="mb-1 text-white">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        Dusk Pom Beanie
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$25.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md d-none d-md-block">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pr27} alt="Pr27Img" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                }}
                            >
                                <h6 className="mb-1 text-white">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        City Backpack Black
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$55.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="row g-3 g-lg-4">
                <div className="col-lg-6">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={prq10} alt="Prq10Img" className="img-fluid w-100" />
                            <Link
                                href="#"
                                className="d-lg-none position-absolute"
                                style={{ zIndex: 1, top: '10px', left: '10px' }}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link
                                href="#"
                                className="wishlistadd d-none d-lg-flex position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1 }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            <div
                                className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                style={{
                                    background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                }}
                            >
                                <h6 className="mb-1 text-white">
                                    <Link href="product-detail-layout-01.html" className="product-title text-white">
                                        Women Black Pants
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-14 text-white">
                                    <span>$100.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className="row g-3 g-lg-4">
                        <div className="col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr24} alt="Pr24Img" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                        }}
                                    >
                                        <h6 className="mb-1 text-white">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                La Bohème Rose Gold
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <del>$60.00</del><span className="text-danger"> $40.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={prq12} alt="Prq12Img" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                        }}
                                    >
                                        <h6 className="mb-1 text-white">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Large Icon Bag
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <del>$60.00</del><span className="text-danger"> $45.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={prq14} alt="Prq14Img" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                        }}
                                    >
                                        <h6 className="mb-1 text-white">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Sunny Life
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span className="text-danger"> $68.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr19} alt="Pr19Img" className="img-fluid w-100" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="product-size mb-0 start-0 end-0 bottom-0 p-2"
                                        style={{
                                            background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 100%)',
                                        }}
                                    >
                                        <h6 className="mb-1 text-white">
                                            <Link href="product-detail-layout-01.html" className="product-title text-white">
                                                Cream Women Pants
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-white">
                                            <span className="text-danger"> $68.00</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-3 my-3 my-lg-5 d-flex justify-content-center">
                <button className="btn-load btn btn-custom-dark fw-semibold min-w-150 rounded-pill">Lord More</button>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default CatSection