"use client";
import React, { useState } from 'react'
import { Tooltip } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import big24 from "@assets/images/home-classic/pr-big-24.jpg"
import big25 from "@assets/images/home-classic/pr-big-25.jpg"
import bn1 from "@assets/images/home-static-image/bn-01.jpg"
import bn2 from "@assets/images/home-static-image/bn-02.jpg"

const Sale = () => {

    const [imageUrl, setImageUrl] = useState(big24);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <div className="row g-lg-4 g-3 gy-md-0 gy-4 align-items-center">
                        <div className="col-md-4">
                            <Link href="/shop-right-sidebar" className="position-relative hover-zoom d-flex promotion_banner">
                                <Image src={bn1} alt="Bn1Img" className="img-fluid hover-zoom-img object-fit-cover" />
                                <div className="p-20 position-absolute bottom-0 left-0 text-body">
                                    <p className="text-uppercase fw-medium fs-14 mb-1">View Collections</p>
                                    <h3 className="fs-35">LOOKBOOK</h3>
                                    <p className="text-muted mb-0">your world of fashion in numbers</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <div className="kalles-banner-promotion topbar-product-card">
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-danger text-white rounded-circle"> -34% </span>
                                    <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid" />
                                    <Tooltip title="Add to Wishlist">
                                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                                            <i className="facl facl-heart-o text-white"></i>
                                        </Link>
                                    </Tooltip>
                                    <Tooltip title="Add to Wishlist">
                                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                                            <i className="facl facl-heart-o text-white"></i>
                                        </Link>
                                    </Tooltip>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                            <span>Quick View</span>
                                            <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <span>Quick Shop</span> 
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>

                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal">
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
                                            <Link href="#!" onMouseOver={() => setImageUrl(big24)} onClick={(e) => e.preventDefault()} className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            <Link href="#!" onMouseOver={() => setImageUrl(big25)} onClick={(e) => e.preventDefault()} className="d-inline-block bg-dark rounded-circle"></Link>
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
                                            <Link href="#!" onMouseOver={() => setImageUrl(big24)} onClick={(e) => e.preventDefault()} className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            <Link href="#!" onMouseOver={() => setImageUrl(big25)} onClick={(e) => e.preventDefault()} className="d-inline-block bg-dark rounded-circle"></Link>
                                        </div>
                                    </div>

                                    <div className="count-time position-relative mt-4" data-date="10-10-2028">
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

                        <div className="col-md-4">
                            <Link href="/shop" className="position-relative hover-zoom d-flex promotion_banner kalles-banner-promotion">
                                <Image src={bn2} alt="Bn2Img" className="img-fluid hover-zoom-img object-fit-cover" />
                                <div className="p-20 position-absolute top-50 end-0 text-body start-0 content-position text-center">
                                    <p className="text-uppercase fw-medium fs-18 mb-1">Men Collection</p>
                                    <h3 className="fs-50">SALE 70%</h3>
                                    <button className="btn btn-custom-dark fw-medium min-w-150 rounded-pill">Shop Now</button>
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
export default Sale