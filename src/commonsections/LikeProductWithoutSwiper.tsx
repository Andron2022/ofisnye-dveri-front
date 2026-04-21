"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import { Col, Row } from 'react-bootstrap'

import pro33 from '@assets/images/products/pr-33.jpg'
import pro15 from '@assets/images/products/pr-15.jpg'
import pr31 from '@assets/images/home-classic/pr-31.jpg'
import metro1 from '@assets/images/home-metro/pr-q1.jpg'
import metro2 from '@assets/images/home-metro/pr-q2.jpg'
import pr1 from '@assets/images/products/pr-34.jpg'

import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

const LikeProductWithoutSwiper = () => {
    const [imageUrl1, setImageUrl1] = useState(pr31);
    const [imageUrl2, setImageUrl2] = useState(pr31);

    const [imageUrl3, setImageUrl3] = useState(pro15);
    const [isHovered3, setIsHovered3] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <Row className="g-lg-4 g-3">

                <Col md={4} className="col-lg-3 col-6">
                    <div
                        className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={pro33}
                                alt="Pro33Img"
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
                            <h6 className="mb-1">City Backpack Black</h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$55.00</span>
                            </p>
                        </Link>
                    </div>
                </Col>
                <Col md={4} className="col-lg-3 col-6">
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
                                onClick={handleAddToCardModalShow}
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
                                    className="d-inline-block bg-pink2 bg-opacity-50 rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl1(pr1)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl1(pr1);
                                    }}
                                    className="d-inline-block bg-success bg-opacity-50 rounded-circle"
                                ></Link>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="col-lg-3 col-6">
                    <div
                        className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={imageUrl3}
                                alt="ImageUrl3Img"
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
                                    onMouseOver={() => setImageUrl3(metro1)}
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
                                    onMouseOver={() => setImageUrl3(metro2)}
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
                <Col md={4} className="col-lg-3 col-6">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            {/* <span className="new-label bg-danger text-white rounded-circle"> -25% </span> */}
                            <Image src={imageUrl2} alt="ImageUrl2Img" className="img-fluid w-100 object-fit-cover" />
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
                                    onMouseOver={() => setImageUrl2(pr31)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl2(pr31);
                                    }}
                                    className="d-inline-block bg_color_blue rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl2(pr1)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl2(pr1);
                                    }}
                                    className="d-inline-block bg-dark rounded-circle"
                                ></Link>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default LikeProductWithoutSwiper