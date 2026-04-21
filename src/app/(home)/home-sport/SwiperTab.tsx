"use client";
import React, { useState } from 'react'
import { Nav, Tab } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import Image from 'next/image'
import Link from 'next/link'

import pr1 from "@assets/images/home-sport/pr-01.jpg"
import pr2 from "@assets/images/home-sport/pr-02.jpg"
import pr4 from "@assets/images/home-sport/pr-04.jpg"
import pr7 from "@assets/images/home-sport/pr-07.jpg"
import pr8 from "@assets/images/home-sport/pr-08.jpg"
import pr9 from "@assets/images/home-sport/pr-09.jpg"
import pr10 from "@assets/images/home-sport/pr-10.jpg"
import pr11 from "@assets/images/home-sport/pr-11.jpg"
import pr12 from "@assets/images/home-sport/pr-12.jpg"
import pr13 from "@assets/images/home-sport/pr-13.jpg"
import pr14 from "@assets/images/home-sport/pr-14.jpg"


import 'swiper/css';
import 'swiper/css/navigation';

const featuredData = [
    {
        name: "Nike As Dri-Fit Training",
        price: "$65.00",
        images: {
            default: pr4,
            hover: pr11,
            colors: [
                pr4,
                pr11,
                pr12
            ]
        }
    },
    {
        name: "Body Trimmer",
        price: "$65.00",
        originalPrice: "$99.00",
        discount: "-35%",
        images: {
            default: pr8,
            hover: pr7
        }
    },
    {
        name: "NIKE Trophy Training Shorts",
        price: "$29.00",
        images: {
            default: pr10,
            hover: pr9,
            colors: [
                pr10,
                pr9
            ]
        }
    },
    {
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        images: {
            default: pr13,
            hover: pr14,
            colors: [
                pr14,
                pr13
            ]
        }
    },
    {
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        images: {
            default: pr1,
            hover: pr2,
            colors: [
                pr14,
                pr13
            ]
        }
    }
];

const newArrivalData = [
    {
        imageUrl: pr11,
        hoverImageUrl: pr4,
        discount: "-35%",
        name: "Men's Long Sleeve Rash Guard",
        originalPrice: "$99.00",
        price: "$65.00",
        colors: [
            { color: "bg-dark", imageUrl: pr4 },
            { color: "bg_color_blue", imageUrl: pr11 },
            { color: "bg_color_pink", imageUrl: pr12 }
        ]
    },
    {
        imageUrl: pr13,
        hoverImageUrl: pr14,
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        colors: [
            { color: "bg-danger", imageUrl: pr14 },
            { color: "bg-dark", imageUrl: pr13 }
        ]
    },
    {
        imageUrl: pr7,
        hoverImageUrl: pr8,
        name: "Elip Power Max",
        price: "$35.00"
    },
    {
        imageUrl: pr2,
        hoverImageUrl: pr1,
        name: "Shoes huarache",
        price: "$145.00",
        colors: [
            { color: "bg_color_cyan", imageUrl: pr2 },
            { color: "bg_color_blue", imageUrl: pr1 }
        ]
    },
    {
        imageUrl: pr1,
        hoverImageUrl: pr2,
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        colors: [
            { color: "bg-danger", imageUrl: pr14 },
            { color: "bg-dark", imageUrl: pr13 }
        ]
    }
]

const onSaleData = [
    {
        imageUrl: pr7,
        hoverImageUrl: pr8,
        name: "Elip Power Max",
        price: "$35.00"
    },
    {
        imageUrl: pr4,
        hoverImageUrl: pr11,
        name: "Nike As Dri-Fit Training",
        price: "$65.00",
        colors: [
            { "color": "bg-dark", "imageUrl": pr4 },
            { "color": "bg_color_blue", "imageUrl": pr11 },
            { "color": "bg_color_pink", "imageUrl": pr12 }
        ]
    },
    {
        imageUrl: pr13,
        hoverImageUrl: pr14,
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        colors: [
            { "color": "bg-danger", "imageUrl": pr14 },
            { "color": "bg-dark", "imageUrl": pr13 }
        ]
    },
    {
        imageUrl: pr11,
        hoverImageUrl: pr4,
        salePercentage: "-35%",
        name: "Men's Long Sleeve Rash Guard",
        originalPrice: "$99.00",
        price: "$65.00",
        colors: [
            { "color": "bg-dark", "imageUrl": pr4 },
            { "color": "bg_color_blue", "imageUrl": pr11 },
            { "color": "bg_color_pink", "imageUrl": pr12 }
        ]
    },
    {
        imageUrl: pr1,
        hoverImageUrl: pr2,
        name: "Calvin Klein Training Shorts",
        price: "$29.00",
        colors: [
            { "color": "bg-danger", "imageUrl": pr14 },
            { "color": "bg-dark", "imageUrl": pr13 }
        ]
    }
]

const SwiperCard = ({ item }: any) => {
    const [imageUrl, setImageUrl] = useState(item.images.default);
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [cardShow, setCardShow] = useState(false);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div
                className="topbar-product-card overlay-hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden main">
                    {item.discount && (
                        <span className="onsale position-absolute bg-danger text-white d-flex align-items-center justify-content-center z-3">
                            {item.discount}
                        </span>
                    )}
                    <Image
                        src={isHovered ? item.images.hover : imageUrl}
                        alt="image"
                        className="img-fluid"
                    />
                    <Link
                        href="#"
                        className="wishlistadd position-absolute text-white dark"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add to Wishlist"
                    >
                        <i className="facl facl-heart-o"></i>
                    </Link>

                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn bg-orange text-white fs-14" onClick={handleShow}>
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn bg-orange text-white fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-orange m-2" style={{ zIndex: 1 }}>
                        <Link
                            href="#exampleModal"
                            data-bs-toggle="modal"
                            className="btn responsive-cart fs-14 p-2"
                            style={{ width: 36, height: 36 }}
                            onClick={handleShow}
                        >
                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn responsive-cart fs-14 p-2"
                            style={{ width: 36, height: 36 }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <h6 className="mb-1">
                        <Link href="product-detail-layout-01.html" className="main_link_orange">
                            {item.name}
                        </Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        {item.originalPrice && <del>{item.originalPrice}</del>}
                        <span className={item.originalPrice ? "text-danger" : ""}>{item.price}</span>
                    </p>
                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                        {item.images.colors &&
                            item.images.colors.map((color: any, index: React.Key | null | undefined) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color);
                                        setIsHovered(false);
                                    }}
                                    className="d-inline-block rounded-circle"
                                    style={{ background: `url(${color.src}) no-repeat center/cover` }}
                                ></Link>
                            ))}
                    </div>
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const NewArrivalCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div
                className="topbar-product-card overlay-hover"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className="position-relative overflow-hidden main">
                    {product.salePercentage && (
                        <span className="onsale position-absolute bg-danger text-white d-flex align-items-center justify-content-center z-3">
                            {product.salePercentage}
                        </span>
                    )}
                    <Image src={isHovered ? product.hoverImageUrl : imageUrl} alt="image" className="img-fluid" />
                    <Link href="#" className="wishlistadd position-absolute text-white dark" data-bs-toggle="tooltip" data-bs-placement="top" title={product.wishlistTooltip}>
                        <i className="facl facl-heart-o"></i>
                    </Link>

                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href='#exampleModal' data-bs-toggle="modal" className="btn bg-orange text-white fs-14" onClick={handleShow}>
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button type="button" className="btn bg-orange text-white fs-14" data-bs-toggle="modal" data-bs-target='#cardModal' onClick={handleAddToCardModalShow}>
                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-orange m-2" style={{ zIndex: 1 }}>
                        <Link href='#exampleModal' data-bs-toggle="modal" className="btn responsive-cart fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                        </Link>
                        <button type="button" className="btn responsive-cart fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target='#cardModal' onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <h6 className="mb-1">
                        <Link href='/product-detail-layout-01' className="main_link_orange">
                            {product.name}
                        </Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        {product.originalPrice && <del>{product.originalPrice}</del>}
                        <span className="text-danger">{product.price}</span>
                    </p>
                    {product.colors && (
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                            {product.colors.map((color: { imageUrl: any; color: any }, index: React.Key | null | undefined) => (
                                <Link
                                    key={index}
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const SwiperTab = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection pt-5">
                <div className="container">
                    <Tab.Container id="custom-tabs-example" defaultActiveKey="featured-tab">
                        <Nav className="nav-underline nav-orange gap-4 justify-content-center mb-4 pb-2 mb-0" >
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="featured-tab" className="rounded-pill">FEATURED</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="newArrivals-tab" className="rounded-pill">NEW ARRIVALS</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="onSale-tab" className="rounded-pill">ON SALE</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='mt-4' id="pills-tabContent">
                            <Tab.Pane eventKey="featured-tab" className='fade show' tabIndex={0}>
                                <Swiper
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    loop={true}
                                    modules={[Navigation]}
                                    breakpoints={{
                                        300: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    className='featuredSwiper'
                                >
                                    {featuredData.map((item, index) => (
                                        <SwiperSlide key={index}>
                                            <SwiperCard item={item} />
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-button-next"></div>
                                    <div className="swiper-button-prev"></div>
                                </Swiper>
                            </Tab.Pane>
                            <Tab.Pane eventKey="newArrivals-tab" className='fade' tabIndex={0}>
                                <Swiper
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    loop={true}
                                    modules={[Navigation]}
                                    breakpoints={{
                                        300: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    className='featuredSwiper'
                                >
                                    {newArrivalData.map((product, index) => (
                                        <SwiperSlide key={index}>
                                            <NewArrivalCard product={product} />
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-button-next"></div>
                                    <div className="swiper-button-prev"></div>
                                </Swiper>
                            </Tab.Pane>
                            <Tab.Pane eventKey="onSale-tab" className='fade' tabIndex={0}>
                                <Swiper
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    loop={true}
                                    modules={[Navigation]}
                                    breakpoints={{
                                        300: {
                                            slidesPerView: 2,
                                            spaceBetween: 20,
                                        },
                                        768: {
                                            slidesPerView: 3,
                                            spaceBetween: 40,
                                        },
                                        1024: {
                                            slidesPerView: 4,
                                            spaceBetween: 50,
                                        },
                                    }}
                                    className='featuredSwiper'
                                >
                                    {onSaleData.map((product, index) => (
                                        <SwiperSlide key={index}>
                                            <NewArrivalCard product={product} />
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-button-next"></div>
                                    <div className="swiper-button-prev"></div>
                                </Swiper>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </section>
        </React.Fragment >
    )
}

export default SwiperTab