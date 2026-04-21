"use client";
import React, { useState } from 'react'
import { Col,  Row } from 'react-bootstrap'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import pro33 from '@assets/images/products/pr-33.jpg'
import pro34 from '@assets/images/products/pr-34.jpg'
import pro15 from '@assets/images/products/pr-01.jpg'
import pro51 from '@assets/images/products/pr-pin-51.jpg'
import pr33 from '@assets/images/home-classic/pr-33.jpg'
import pr50 from '@assets/images/products/pr-50.jpg'
import pr37 from '@assets/images/products/pr-s-37.png'
import Image from 'next/image'

const ViewProductWithoutSwiper = () => {

    const [imageUrl1, setImageUrl1] = useState(pr50);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <Row className="my-4 py-2">
                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={imageUrl1} alt="ImageUrl1Img" className="img-fluid w-100 object-fit-cover" />
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
                                    Short Sleeved
                                    Hoodie
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$45.00</del>&nbsp;
                                <span className="text-danger">$30.00</span>
                            </p>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl1(pr33)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl1(pr33);
                                    }}
                                    className="d-inline-block bg_color_pink rounded-circle"
                                ></Link>
                                <Link
                                    href="#!"
                                    onMouseOver={() => setImageUrl1(pro33)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl1(pro34);
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
                                    Sweatshirt in
                                    Geometric Print
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>$35.00</span>
                            </p>
                        </div>
                    </div>
                </Col>
                <Col md={4} className="col-lg-3 col-6 px-lg-12 px-2">
                    <div className="topbar-product-card pb-3">
                        <div className="position-relative overflow-hidden">
                            <Image src={pro15} alt="Pro15Img" className="img-fluid w-100 object-fit-cover" />
                            <span className="new-label bg-success-light text-white rounded-circle text-center">New</span>

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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Dusk Pom
                                    Beanie
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
                            <Image src={pro51} alt="Pro51Img" className="img-fluid w-100 object-fit-cover" />

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
                        </div>

                        <div className="mt-3">
                            <h6 className="mb-1">
                                <Link href="#!" className="product-title">
                                    Circle
                                    Snapback Cap
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span className="">$25.00</span>
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
export default ViewProductWithoutSwiper