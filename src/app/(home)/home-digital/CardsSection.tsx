"use client";
import React, { useState } from 'react'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import Image from 'next/image'
import Link from 'next/link'
import countdown from "@assets/images/home-digital/banner-countdown-left.jpg"
import pr17 from "@assets/images/home-digital/pr-17.jpg"
import countdownright from "@assets/images/home-digital/banner-countdown-right.jpg"


const CardsSection = () => {

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);
    return (
        <React.Fragment>
            <section className="py-5 my-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4">
                            <Link href="#!" className="kalles-banner-promotion d-block">
                                <Image src={countdown} alt="CountdownImg" className="img-fluid" />
                                <div className="p-20 position-absolute top-50 end-0 text-end translate-middle-y text-body">
                                    <p className="text-uppercase fw-medium fs-18 mb-1">WORK AT HOME SALE</p>
                                    <h3 className="fs-50">70%</h3>
                                    <button className="btn btn-outline-dark rounded-pill min-w-150">Get it Now</button>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-4">
                            <div className="kalles-banner-promotion topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pr17} alt="Pr17Img" className="img-fluid" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                    <div className="product-size text-center d-none d-lg-block">
                                        <h6 className="mb-1"><Link href="/product-detail-layout-01" className="main_link">La Bohème Rose Gold</Link></h6>
                                        <p className="mb-0 fs-14 text-muted">
                                            <del>$60.00</del>
                                            <span className="text-danger">$45.00</span>
                                        </p>
                                        <div className="product-color-list mt-1 gap-2 d-flex align-items-center justify-content-center p-2">
                                            <Link href="#!" onMouseOver={() => { }} onClick={(e) => { }} className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            <Link href="#!" onMouseOver={() => { }} onClick={(e) => { }} className="d-inline-block bg-dark rounded-circle"></Link>
                                        </div>
                                    </div>
                                    <div className="count-time d-none d-lg-block" data-date="10-10-2028">
                                        <ul className="list-unstyled d-flex gap-2 align-items-center text-center justify-content-center mb-0">
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded"><span className="days text-white fs-14">0</span>days</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded"><span className="text-white fs-14">00</span>Hours</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded"><span className="min text-white fs-14">00</span>Minutes</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded"><span className="sc text-white fs-14">00</span>Seconds</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="d-lg-none">
                                    <div className="text-center mt-3">
                                        <h6 className="mb-1"><Link href="/product-detail-layout-01" className="main_link">La Bohème Rose Gold</Link></h6>
                                        <p className="mb-0 fs-14 text-muted">
                                            <del>$60.00</del>
                                            <span className="text-danger">$45.00</span>
                                        </p>
                                        <div className="product-color-list mt-1 gap-2 d-flex align-items-center justify-content-center p-2">
                                            <Link href="#!" onMouseOver={() => { }} onClick={(e) => { }} className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            <Link href="#!" onMouseOver={() => { }} onClick={(e) => { }} className="d-inline-block bg-dark rounded-circle"></Link>
                                        </div>
                                    </div>
                                    <div className="count-time position-relative mt-4 d-lg-block d-none" data-date="10-10-2028">
                                        <ul className="list-unstyled d-flex gap-2 align-items-center text-center justify-content-center mb-0">
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded" style={{ minWidth: '50px' }}><span className="days text-white fs-14">0</span>days</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded" style={{ minWidth: '50px' }}><span className="text-white fs-14">00</span>Hours</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded" style={{ minWidth: '50px' }}><span className="min text-white fs-14">00</span>Minutes</li>
                                            <li className="bg-dark text-white text-white-50 fs-12 rounded" style={{ minWidth: '50px' }}><span className="sc text-white fs-14">00</span>Seconds</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <Link href="#!" className="kalles-banner-promotion d-block">
                                <Image src={countdownright} alt="CountdownrightImg" className="img-fluid" />
                                <div className="p-20 position-absolute top-50 end-0 text-body start-0 content-position text-center">
                                    <p className="text-uppercase fw-medium fs-18 mb-1">SUMMER SALE</p>
                                    <h3 className="fs-50">UP TO 30%</h3>
                                    <button className="btn btn-outline-dark rounded-pill min-w-150">Shop Now</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default CardsSection