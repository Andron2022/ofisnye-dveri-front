"use client";
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import {  Col} from 'react-bootstrap'
import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pro33 from '@assets/images/products/pr-33.jpg'
import pro34 from '@assets/images/products/pr-34.jpg'
import pro35 from '@assets/images/products/pr-35.jpg'
import pro27 from '@assets/images/products/pr-27.jpg';
import pro25 from '@assets/images/products/pr-25.png'
import pro26 from '@assets/images/products/pr-26.png'
import pro4 from '@assets/images/products/pr-04.jpg'
import pro15 from '@assets/images/products/pr-15.jpg'
import pro1 from '@assets/images/products/pr-01.jpg'
import pr31 from '@assets/images/home-classic/pr-31.jpg'
import pr33 from '@assets/images/home-classic/pr-33.jpg'
import pro19 from '@assets/images/home-classic/pr-19.jpg'
import pro20 from '@assets/images/home-classic/pr-20.jpg'
import pro14 from '@assets/images/products/pr-14.jpg'
import pr50 from '@assets/images/home-fashion-9/pr-s-50.jpg'
import metro1 from '@assets/images/home-metro/pr-q1.jpg'
import metro2 from '@assets/images/home-metro/pr-q2.jpg'

import 'flickity/css/flickity.css';

// import ProductModal from './ProductModal'
// import AddToCardModal from './AddToCardModal'

const LikeProducts = () => {
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const [imageUrl, setImageUrl] = useState(pro4);
    const [imageUrl1, setImageUrl1] = useState(pr31);
    const [imageUrl2, setImageUrl2] = useState(pro1);

    const [imageUrl3, setImageUrl3] = useState(pro15);
    const [imageUrl4, setImageUrl4] = useState(pro27);
    const [isHovered3, setIsHovered3] = useState(false);

    const [isHovered6, setIsHovered6] = useState(false);

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                imagesLoaded: false,
                adaptiveHeight: false,
                contain: true,
                groupCells: '100%',
                dragThreshold: 5,
                cellAlign: 'left',
                wrapAround: true,
                prevNextButtons: false,
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
            <div className="row my-4 py-2 slideshow">
                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div
                        className="topbar-product-card pb-3"
                        onMouseEnter={() => setIsHovered1(true)}
                        onMouseLeave={() => setIsHovered1(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered1 ? pro34 : pro33}
                                alt="image"
                                className="img-fluid"
                                style={{ zIndex: 1 }}
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M, L, XL</p>
                        </div>

                        <Link href="/product-detail-layout-01" className="mt-3 d-block">
                            <h6 className="mb-1">Ridley High Waist</h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$36.00</span>
                            </p>
                        </Link>
                    </div>
                </Col>
                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={imageUrl2} alt="ImageUrl2Img" className="img-fluid w-100 object-fit-cover" />
                            <span className="new-label bg-danger text-white rounded-circle text-center">-25%</span>
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Skin Sweatpans
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$60.00</del>&nbsp;
                                <span className="text-danger">$45.00</span>
                            </p>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl2(pr50)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl2(pr50);
                                    }}
                                    className="d-inline-block bg_color_pink rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl2(pro1)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl2(pro1);
                                    }}
                                    className="d-inline-block bg-success rounded-circle"
                                ></Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid w-100 object-fit-cover" />
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    href="#exampleModal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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
                        </div>
                    </div>
                </Col>
                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            {/* <span className="new-label bg-danger text-white rounded-circle"> -25% </span> */}
                            <Image src={imageUrl1} alt="ImageUrl1Img" className="img-fluid w-100 object-fit-cover" />
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Cluse La Boheme Rose Gold
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$60.00</del>&nbsp;
                                <span className="text-danger">$45.00</span>
                            </p>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl1(pr31)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl1(pr31);
                                    }}
                                    className="d-inline-block bg-body-secondary rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl1(pr33)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl1(pr33);
                                    }}
                                    className="d-inline-block bg-black rounded-circle"
                                ></Link>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div
                        className="topbar-product-card pb-3"
                        onMouseEnter={() => setIsHovered3(true)}
                        onMouseLeave={() => setIsHovered3(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered3 ? pro14 : imageUrl3}
                                alt="image"
                                className="img-fluid w-100 object-fit-cover"
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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

                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={imageUrl4} alt="ImageUrl4Img" className="img-fluid w-100 object-fit-cover" />
                            <span className="new-label bg-danger text-white rounded-circle text-center">-34%</span>
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Skin Sweatpans
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$60.00</del>&nbsp;
                                <span className="text-danger">$45.00</span>
                            </p>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl4(pro27)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl4(pro27);
                                    }}
                                    className="d-inline-block bg_color_pink rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl4(pro35)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl4(pro35);
                                    }}
                                    className="d-inline-block bg-dark rounded-circle"
                                ></Link>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div
                        className="topbar-product-card pb-3"
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered2 ? pro20 : pro19}
                                alt="image"
                                className="img-fluid w-100 object-fit-cover"
                                style={{ zIndex: 1 }}
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M, L, XL</p>
                        </div>

                        <Link href="/product-detail-layout-01" className="mt-3 d-block">
                            <h6 className="mb-1">Cream women pants</h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$30.00</span>
                            </p>
                        </Link>
                    </div>
                </Col>

                <Col md={3} className="col-6 px-lg-12 px-2">
                    <div
                        className="topbar-product-card pb-3"
                        onMouseEnter={() => setIsHovered6(true)}
                        onMouseLeave={() => setIsHovered6(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered6 ? pro26 : pro25}
                                alt="image"
                                className="img-fluid w-100 object-fit-cover"
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
                                <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
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
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
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
            
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default LikeProducts