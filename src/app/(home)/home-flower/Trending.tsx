"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import trend1 from "@assets/images/home-flower/pr-trending-01.png"
import trend2 from "@assets/images/home-flower/pr-trending-02.png"
import trend3 from "@assets/images/home-flower/pr-trending-03.png"
import trend4 from "@assets/images/home-flower/pr-trending-04.png"
import trend5 from "@assets/images/home-flower/pr-trending-05.png"
import trend6 from "@assets/images/home-flower/pr-trending-06.png"
import trend7 from "@assets/images/home-flower/pr-trending-07.png"
import trend8 from "@assets/images/home-flower/pr-trending-08.png"
import trend9 from "@assets/images/home-flower/pr-trending-09.png"
import trend10 from "@assets/images/home-flower/pr-trending-10.png"
import trend11 from "@assets/images/home-flower/pr-trending-11.png"
import trend12 from "@assets/images/home-flower/pr-trending-12.png"

const Trending = () => {

    // trending
    const [istrendHovered, settrendIsHovered] = useState(false);
    const [istrendHovered1, settrendIsHovered1] = useState(false);
    const [istrendHovered2, settrendIsHovered2] = useState(false);
    const [istrendHovered3, settrendIsHovered3] = useState(false);
    const [istrendHovered4, settrendIsHovered4] = useState(false);
    const [istrendHovered5, settrendIsHovered5] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section className="mt-40 pt-30">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>TRENDING</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top view
                                    in this week</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-lg-4 g-3 mt-4">
                        <Col md={3} className='col-6'>
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => settrendIsHovered(true)}
                                onMouseLeave={() => settrendIsHovered(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={istrendHovered ? trend2 : trend1}
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
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                            data-bs-toggle="modal"
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
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
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
                                    <h6 className="mb-2 fw-normal text-pink2">
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
                        <Col md={3} className='col-6'>
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => settrendIsHovered1(true)}
                                onMouseLeave={() => settrendIsHovered1(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-danger text-white rounded-circle"> -31% </span>
                                    <Image
                                        src={istrendHovered1 ? trend4 : trend3}
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
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                            data-bs-toggle="modal"
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
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
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
                                            Shade Of Green
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <del>$285.00</del> <span className="text-danger">$199.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className='col-6'>
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => settrendIsHovered2(true)}
                                onMouseLeave={() => settrendIsHovered2(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={istrendHovered2 ? trend6 : trend5}
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
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                            data-bs-toggle="modal"
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
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
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
                        <Col md={3} className='col-6'>
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => settrendIsHovered3(true)}
                                onMouseLeave={() => settrendIsHovered3(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-success text-white rounded-circle text-center"> Sold Out </span>
                                    <Image
                                        src={istrendHovered3 ? trend8 : trend7}
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
                                            className="btn rounded-pill bg-pink2 text-white fs-14"
                                            data-bs-toggle="modal"
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
                                            className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
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
                                        </button>4
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal">
                                        <Link href="/product-detail-layout-01" className="text-pink2">
                                            Seasonal Hobnail Arrangement
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$145.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className='col-6'>
                            <div className="topbar-product-card" onMouseEnter={() => settrendIsHovered4(true)} onMouseLeave={() => settrendIsHovered4(false)}>
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-success text-white rounded-circle text-center"> Sold Out </span>
                                    <Image src={istrendHovered4 ? trend10 : trend9} alt="image" className="img-fluid" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill bg-pink2 text-white fs-14" data-bs-toggle="modal"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn bg-pink2 text-white rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span><i className="iccl iccl-cart"></i></button>
                                    </div>

                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" onClick={handleShow} className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal"><Link href="/product-detail-layout-01" className="text-pink2">Floral Garden Arrangement</Link></h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$195.00</span>
                                    </p>
                                </div>
                            </div>
                        </Col>
                        <Col md={3} className='col-6'>
                            <div className="topbar-product-card" onMouseEnter={() => settrendIsHovered5(true)} onMouseLeave={() => settrendIsHovered5(false)}>
                                <div className="position-relative overflow-hidden">
                                    <Image src={istrendHovered5 ? trend12 : trend11} alt="image" className="img-fluid" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill bg-pink2 text-white fs-14" data-bs-toggle="modal"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn bg-pink2 text-white rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span><i className="iccl iccl-cart"></i></button>
                                    </div>

                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" onClick={handleShow} className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                        <button type="button" className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-2 fw-normal"><Link href="/product-detail-layout-01" className="text-pink2">Boho Garden Arrangement</Link></h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$195.00</span>
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
export default Trending