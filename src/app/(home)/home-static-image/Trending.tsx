"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pro1 from "@assets/images/products/pr-01.jpg"
import pro2 from "@assets/images/products/pr-02.jpg"
import pro4 from "@assets/images/products/pr-04.jpg"
import pro5 from "@assets/images/products/pr-05.jpg"
import pro6 from "@assets/images/products/pr-06.jpg"
import pro7 from "@assets/images/products/pr-07.jpg"
import pro8 from "@assets/images/products/pr-08.jpg"
import pro9 from "@assets/images/products/pr-09.jpg"
import pro14 from "@assets/images/products/pr-14.jpg"
import pro15 from "@assets/images/products/pr-15.jpg"
import pro17 from "@assets/images/products/pr-17.jpg"
import pro18 from "@assets/images/products/pr-18.jpg"
import pro25 from "@assets/images/products/pr-25.png"
import pro26 from "@assets/images/products/pr-26.png"
import pro27 from "@assets/images/products/pr-27.jpg"
import pro28 from "@assets/images/products/pr-28.jpg"
import pro31 from "@assets/images/products/pr-31.jpg"
import pro32 from "@assets/images/products/pr-32.jpg"
import pro33 from "@assets/images/products/pr-33.jpg"
import pro34 from "@assets/images/products/pr-34.jpg"

import metro1 from "@assets/images/home-metro/pr-q1.jpg"
import metro2 from "@assets/images/home-metro/pr-q2.jpg"

const Trending = () => {


    // first row
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const [imageUrl0, setImageUrl0] = useState(pro4);
    const [imageUrl1, setImageUrl1] = useState(pro6);

    // second row
    const [imageUrl3, setImageUrl3] = useState(pro15);
    const [isHovered3, setIsHovered3] = useState(false);

    const [isHovered4, setIsHovered4] = useState(false);

    const [isHovered5, setIsHovered5] = useState(false);

    const [isHovered6, setIsHovered6] = useState(false);

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.carousel-data', {
                imagesLoaded: false,
                adaptiveHeight: false,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                cellAlign: 'left',
                wrapAround: true,
                prevNextButtons: true,
                percentPosition: true,
                pageDots: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
            });
            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section className="mt-5 pt-5">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>TRENDING</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">
                                    Top view in this week
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-4 pt-2 carousel-data">
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered1(true)}
                                onMouseLeave={() => setIsHovered1(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-success text-white rounded-circle text-center">New</span>
                                    <Image
                                        src={isHovered1 ? pro2 : pro1}
                                        alt="image"
                                        className="img-fluid"
                                    />
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
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>

                                    <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M, L, XL</p>
                                </div>

                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">Analogue Resin Strap</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$30.00</span>
                                    </p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered2 ? pro34 : pro33}
                                        alt="image"
                                        className="img-fluid"
                                    />
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
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>

                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                </div>

                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">Ridley High Waist</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$36.00</span>
                                    </p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <Image src={imageUrl0} alt="ImageUrl0Img" className="img-fluid" />
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
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>

                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}>
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>

                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                </div>

                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="#!" className="product-title">
                                            Blush Beanie
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$15.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl0(pro5)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl0(pro5);
                                            }}
                                            className="d-inline-block bg-body-tertiary rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl0(pro31)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl0(pro31);
                                            }}
                                            className="d-inline-block bg_color_pink rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl0(pro32)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl0(pro32);
                                            }}
                                            className="d-inline-block bg-dark rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div className="topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-danger text-white rounded-circle"> -25% </span>
                                    <Image src={imageUrl1} alt="ImageUrl1Img" className="img-fluid" />
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
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>

                                    <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                                </div>

                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="#!" className="product-title">
                                            Cluse La Boheme Rose Gold
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <del>$60.00</del>
                                        <span className="text-danger">$45.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl1(pro7)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl1(pro7);
                                            }}
                                            className="d-inline-block bg_color_green rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl1(pro8)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl1(pro8);
                                            }}
                                            className="d-inline-block bg-body-secondary rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onMouseOver={() => setImageUrl1(pro9)}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl1(pro9);
                                            }}
                                            className="d-inline-block bg_color_blue rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        {/* second row */}
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered3 ? pro14 : imageUrl3}
                                        alt="image"
                                        className="img-fluid"
                                    />
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

                                    <div className="bg-overlay"></div>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="#!" className="product-title">
                                            Mercury Tee
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span className="text-muted">$68.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl3(metro1);
                                                setIsHovered3(false);
                                            }}
                                            style={{ backgroundImage: `url(${metro1.src})`, backgroundSize: 'cover' }}
                                            className="d-inline-block bg-body-tertiary rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl3(metro2);
                                                setIsHovered3(false);
                                            }}
                                            style={{ backgroundImage: `url(${metro2.src})`, backgroundSize: 'cover' }}
                                            className="d-inline-block bg_color_pink rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-danger text-white rounded-circle"> -34% </span>
                                    <Image
                                        src={isHovered4 ? pro28 : pro27}
                                        alt="image"
                                        className="img-fluid"
                                    />
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

                                    <div className="bg-overlay"></div>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="#!" className="product-title">
                                            Mercury Tee
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span className="text-muted">$68.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered5 ? pro17 : pro18}
                                        alt="image"
                                        className="img-fluid"
                                    />
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
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                </div>

                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">Cream Women Pants</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$35.00</span>
                                    </p>
                                </Link>
                            </div>
                        </Col>
                        <Col md={3} className="col-md-3 col-xl-2 col-6 px-lg-12 px-2">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered6(true)}
                                onMouseLeave={() => setIsHovered6(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered6 ? pro26 : pro25}
                                        alt="image"
                                        className="img-fluid"
                                    />
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
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                                            href="#exampleModal" onClick={handleShow}
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                </div>

                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">Black Mountain Hat</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$50.00</span>
                                    </p>
                                </Link>
                            </div>
                        </Col>
                    </div>
                </div>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default Trending