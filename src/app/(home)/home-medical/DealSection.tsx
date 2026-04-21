"use client";
import React, { useState } from 'react'
import { Col, Container, OverlayTrigger, ProgressBar, Row, Tooltip } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import Image from 'next/image'
import Link from 'next/link'

import deal1 from "@assets/images/home-medical/deal-banner-01.png"
import deal2 from "@assets/images/home-medical/deal-banner-02.png"
import home11 from "@assets/images/home-medical/pr-11.jpg"
import home12 from "@assets/images/home-medical/pr-12.jpg"
import home13 from "@assets/images/home-medical/pr-13.jpg"
import home14 from "@assets/images/home-medical/pr-14.jpg"
import home15 from "@assets/images/home-medical/pr-15.jpg"
import home16 from "@assets/images/home-medical/pr-16.jpg"
import home17 from "@assets/images/home-medical/pr-17.jpg"
import home18 from "@assets/images/home-medical/pr-18.jpg"
import home19 from "@assets/images/home-medical/pr-19.jpg"
import home20 from "@assets/images/home-medical/pr-20.jpg"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';

const dealData = [
    {
        title: "Portable Personal Compressor",
        originalPrice: 76.00,
        discountedPrice: 55.00,
        imageUrl: home20,
        discountPercentage: 28,
        sold: 15,
        available: 0
    },
    {
        title: "Disposable Hand Wash Gel",
        originalPrice: 27.00,
        discountedPrice: 20.00,
        imageUrl: home11,
        discountPercentage: 26,
        sold: 5,
        available: 1
    },
    {
        title: "Surgical Latex Gloves",
        originalPrice: 16.00,
        discountedPrice: 10.00,
        imageUrl: home12,
        hoverImageUrl: home13,
        discountPercentage: 38,
        sold: 21,
        available: 9
    },
    {
        title: "Manual Oxygen Device",
        originalPrice: 15.00,
        discountedPrice: 12.00,
        imageUrl: home14,
        hoverImageUrl: home15,
        discountPercentage: 20,
        sold: 10,
        available: 0
    },
    {
        title: "12-Ply Gauze Sponges",
        originalPrice: 10.00,
        discountedPrice: 7.00,
        imageUrl: home16,
        hoverImageUrl: home17,
        discountPercentage: 30,
        sold: 14,
        available: 1
    },
    {
        title: "Cara Portable Air Compressor",
        originalPrice: 145.00,
        discountedPrice: 120.00,
        imageUrl: home18,
        hoverImageUrl: home19,
        discountPercentage: 18,
        sold: 7,
        available: 0
    }
]

const DealSection = () => {

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to Wishlist
        </Tooltip>
    );

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section>
                <Container>
                    {/*  */}
                    <div className="my-5 pb-md-5">
                        <div className="kalles-medical-deal-section">
                            <h4 className="product-cd-header text-center fs-25 d-inline-flex bg-body align-items-center mb-0">Product Deals Of The Day</h4>
                            <Swiper
                                spaceBetween={30}
                                slidesPerView={1}
                                keyboard={{
                                    enabled: true,
                                }}
                                pagination={{
                                    el: ".swiper-pagination",
                                    clickable: true,
                                }}
                                breakpoints={{
                                    576: {
                                        slidesPerView: 2,
                                    },
                                    640: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 5,
                                    }
                                }}
                                modules={[Pagination]}
                            >
                                {dealData.map((product, index) => (
                                    <SwiperSlide key={index}>
                                        <div>
                                            <h6 className="fs-16 fw-medium mb-1">
                                                <Link className="main_link_primary" href="/product-detail-layout-01">{product.title}</Link>
                                            </h6>
                                            <p className="mb-3 pb-1 fs-15 text-muted">
                                                <del>${product.originalPrice}</del>
                                                <span className="text-danger">${product.discountedPrice}</span>
                                            </p>
                                            <div x-data="{ imageUrl: 'assets/images/home-medical/pr-20.jpg' }" className="topbar-product-card desgin_1">
                                                <div className="position-relative overflow-hidden">
                                                    <span className="onsale bg-danger text-white text-center position-absolute d-inline-block">
                                                        <span>-{product.discountPercentage}%</span>
                                                    </span>
                                                    <Image src={product.imageUrl} alt={product.title} className="img-fluid" />
                                                    <div className="bg-overlay"></div>
                                                    <OverlayTrigger placement="top" overlay={renderTooltip}>
                                                        <Link href="#" className="text-white wishlistadd position-absolute">
                                                            <i className="facl facl-heart-o"></i>
                                                        </Link>
                                                    </OverlayTrigger>
                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14 text-white"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                                        <button type="button" onClick={handleAddToCardModalShow} className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick Shop</span>
                                                            <i className="iccl iccl-cart"></i></button>
                                                    </div>
                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-primary rounded-pill m-2" style={{zIndex: "1"}}>
                                                    <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{width: "36px", height: "36px"}}><i className="iccl iccl-eye fw-semibold text-white"></i></Link>
                                                    <button type="button" onClick={handleAddToCardModalShow} className="btn responsive-cart rounded-pill fs-14 p-2" style={{width: "36px", height: "36px"}} data-bs-toggle="modal" data-bs-target="#cardModal" >
                                                        <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="loop-product-stock mt-3">
                                                <ProgressBar className="rounded-pill" now={Math.min(100, (product.sold / (product.sold + product.available)) * 100)} />
                                                <div className="d-flex mt-2 fs-15">
                                                    <p className="mb-0 flex-grow-1">Sold: {product.sold}</p>
                                                    <p className="mb-0 flex-shrink-0">Available: {product.available}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        {/* modal */}
                    </div>

                    <Row className="mt-30">
                        <Col lg={8}>
                            <Link href="/shop" className="kalles-medical-banner-01 position-relative img-zoom d-inline-block">
                                <Image src={deal1} alt="Deal1Img" className="w-100 img-fluid" />
                                <div className="content position-absolute text-body">
                                    <h3>Independent Living</h3>
                                    <p className="mb-2 text-muted">Classic Personal Vaporizer</p>
                                    <p className="mb-0">
                                        <span className="text-danger fw-medium fs-25">$35.00</span>
                                        <del className="text-muted">$45.00</del>
                                    </p>
                                </div>
                            </Link>
                        </Col>
                        <Col lg={4}>
                            <Link href="/shop" className="kalles-medical-banner-01 position-relative img-zoom d-inline-block w-100">
                                <Image src={deal2} alt="Deal2Img" className="w-100 img-fluid" />
                                <div className="content position-absolute text-body">
                                    <p className="text-uppercase">Personal</p>
                                    <h3>Temperature Gun</h3>
                                    <p className="mb-2">
                                        <span className="text-danger fw-medium fs-25">$35.00</span>
                                        <del className="text-muted">$45.00</del>
                                    </p>

                                    <div className="d-inline-block text-white btn btn-primary rounded-pill">Shop
                                        Now</div>
                                </div>
                            </Link>

                        </Col>
                    </Row>
                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default DealSection