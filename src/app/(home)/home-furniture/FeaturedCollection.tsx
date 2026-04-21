"use client";
import React, { useEffect, useRef,useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import pr1 from "@assets/images/home-furniture/pr-01.jpg"
import pr2 from "@assets/images/home-furniture/pr-02.png"
import pr4 from "@assets/images/home-furniture/pr-04.png"
import pr5 from "@assets/images/home-furniture/pr-05.png"
import pr6 from "@assets/images/home-furniture/pr-06.jpg"
import pr11 from "@assets/images/home-furniture/pr-11.jpg"

import 'flickity/css/flickity.css';
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

const FeaturedCollection = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.js_carousel', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: 0,
                dragThreshold: 5,
                percentPosition: true,
                groupCells: "100%"
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
            <section className="kalles-furnitur-featured-collection position-relative">
                <div className="container" dir="ltr">
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center wrap_title position-relative">
                                <h3 className="font-roboto-slab mb-3 fw-light fs-35 pb-1">Best Seller</h3>
                                <p className="fs-16 text-muted mb-5">The point of using Lorem Ipsum is that it has a
                                    more-or-less
                                    normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making
                                    it
                                    look like readable English.</p>
                            </div>
                        </Col>
                    </Row>
                    <div className="row g-3 mt-4 js_carousel" dir="ltr">
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr1} alt="Pr1Img" className="img-fluid" />
                                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill bg-blue-dark text-white fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button type="button" className="btn rounded-pill bg-blue-dark text-white fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">Hans Wegner Style Elbow Chair</Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$300.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr5} alt="Pr5Img" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            onClick={handleShow}
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">
                                            Liby Sage Green
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$100.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr6} alt="Pr6Img" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            onClick={handleShow}
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">
                                            Andie Light Grey Oak Legs
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$910.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr4} alt="Pr4Img" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            onClick={handleShow}
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">
                                            3-seater sofa w/ chaiselong
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$680.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr11} alt="Pr11Img" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            onClick={handleShow}
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">
                                            Fabio Antracit
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$420.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr2} alt="Pr2Img" className="img-fluid" />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-warning"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            onClick={handleShow}
                                        >
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill bg-blue-dark text-white fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-blue-dark rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            data-bs-toggle="modal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_warning fs-18">
                                            Retro Dining Rectangle
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-16 text-muted">
                                        <span>$300.00</span>
                                    </p>
                                </div>
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
export default FeaturedCollection