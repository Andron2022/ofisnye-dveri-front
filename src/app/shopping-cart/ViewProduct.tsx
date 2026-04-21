"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import pro1 from '@assets/images/single-product/pr-viewed-01.jpg'
import pro3 from '@assets/images/single-product/pr-viewed-03.jpg'
import pro15 from '@assets/images/products/pr-01.jpg'
import pr37 from '@assets/images/products/pr-s-37.png'
import metro1 from '@assets/images/home-metro/pr-q1.jpg'
import metro2 from '@assets/images/home-metro/pr-q2.jpg'
import pro35 from '@assets/images/products/pr-35.jpg'
import pro27 from '@assets/images/products/pr-27.jpg';
import pro18 from '@assets/images/products/pr-18.jpg'

import pro25 from '@assets/images/products/pr-25.png'
import 'flickity/css/flickity.css';

import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'


const ViewedProduct = () => {
    const [imageUrl3, setImageUrl3] = useState(pro15);
    const [isHovered3, setIsHovered3] = useState(false);
    const [imageUrl4, setImageUrl4] = useState(pro27);


    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow2', {
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
            <Row className="my-4 py-2 slideshow2">


                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pro1} alt="Pro1Img" className="img-fluid w-100 object-fit-cover" />
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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Felt Cowboy Hat
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$22.00</span>
                            </p>
                        </div>
                    </div>
                </Col>


                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pro3} alt="Pro3Img" className="img-fluid w-100 object-fit-cover" />
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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Blue Jean
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$25.00</span>
                            </p>
                        </div>
                    </div>
                </Col>

                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    La Bohème Rose Gold
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$60.00</del>&nbsp;
                                <span className="text-danger">$40.00</span>
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

                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pr37} alt="Pr37Img" className="img-fluid w-100 object-fit-cover" />
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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    imple Skin T-shirt
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$56.00</span>
                            </p>
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
                                src={isHovered3 ? metro1 : imageUrl3}
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

                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
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

                            <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Mercury Tee
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$68.00</span>
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



                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pro18} alt="Pro18Img" className="img-fluid w-100 object-fit-cover" />
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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    La Bohème Rose Gold
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$60.00</del>
                                <span className="text-danger">$40.00</span>
                            </p>
                        </div>
                    </div>
                </Col>

                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pro25} alt="Pro25Img" className="img-fluid w-100 object-fit-cover" />
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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Black mountain hat
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$50.00</span>
                            </p>
                        </div>
                    </div>
                </Col>

            </Row>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default ViewedProduct