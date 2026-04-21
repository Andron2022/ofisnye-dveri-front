"use client";
import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

import pr41 from "@assets/images/home-jewelry/pr-41.jpg"
import pr42 from "@assets/images/home-jewelry/pr-42.jpg"
import pr43 from "@assets/images/home-jewelry/pr-43.jpg"
import pr44 from "@assets/images/home-jewelry/pr-44.jpg"
import pr45 from "@assets/images/home-jewelry/pr-45.jpg"
import pr46 from "@assets/images/home-jewelry/pr-46.jpg"
import pr47 from "@assets/images/home-jewelry/pr-47.jpg"
import pr48 from "@assets/images/home-jewelry/pr-48.jpg"
import pr49 from "@assets/images/home-jewelry/pr-49.jpg"
import pr50 from "@assets/images/home-jewelry/pr-50.jpg"
import pr51 from "@assets/images/home-jewelry/pr-51.jpg"
import pr52 from "@assets/images/home-jewelry/pr-52.jpg"
import pr53 from "@assets/images/home-jewelry/pr-53.jpg"
import pr54 from "@assets/images/home-jewelry/pr-54.jpg"
import pr55 from "@assets/images/home-jewelry/pr-55.jpg"
import pr56 from "@assets/images/home-jewelry/pr-56.jpg"
import pr57 from "@assets/images/home-jewelry/pr-57.jpg"
import pr58 from "@assets/images/home-jewelry/pr-58.jpg"
import pr59 from "@assets/images/home-jewelry/pr-59.jpg"
import pr60 from "@assets/images/home-jewelry/pr-60.jpg"
import pr61 from "@assets/images/home-jewelry/pr-61.jpg"
import pr62 from "@assets/images/home-jewelry/pr-62.jpg"
import pr65 from "@assets/images/home-jewelry/pr-65.jpg"
import pr66 from "@assets/images/home-jewelry/pr-66.jpg"
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';

const trendingData = [
    {
        id: 1,
        imageUrl: pr41,
        hoverImageUrl: pr42,
        title: "Patrizia Heart Earrings",
        price: "$1245.00",
        colorOptions: [
            pr41,
            pr42,
            pr57,
            pr58
        ],
        sale: false,
        discount: null,
        wishlist: true
    },
    {
        id: 2,
        imageUrl: pr43,
        hoverImageUrl: pr44,
        title: "Swarovski Gaby Ring",
        price: "$309.00",
        colorOptions: [
            pr43,
            pr44,
            pr59
        ],
        sale: false,
        discount: null,
        wishlist: true
    },
    {
        id: 3,
        imageUrl: pr45,
        hoverImageUrl: pr46,
        title: "Arlean Earrings",
        price: "$899.00-$935.00",
        colorOptions: [
            pr45,
            pr46
        ],
        sale: false,
        discount: null,
        wishlist: true
    },
    {
        id: 4,
        imageUrl: pr47,
        hoverImageUrl: pr48,
        title: "Glamira Loberta Ring",
        price: "$3699.00",
        originalPrice: "$4200.00",
        colorOptions: [
            pr47,
            pr48,
            pr60,
            pr61,
            pr62
        ],
        sale: true,
        discount: 12,
        wishlist: true
    },
    {
        id: 5,
        imageUrl: pr49,
        hoverImageUrl: pr50,
        saleLabel: "Hot",
        title: "Glamira Gratia Ring",
        price: "$3,600.00",
        colorOptions: [
            pr49,
            pr50,
            pr61,
            pr62
        ]
    },
    {
        id: 6,
        imageUrl: pr51,
        hoverImageUrl: pr52,
        title: "Peridot Ecateri Earrings",
        price: "$925.00 - $985.00",
        colorOptions: [
            pr51,
            pr52
        ]
    },
    {
        id: 7,
        imageUrl: pr53,
        hoverImageUrl: pr54,
        saleLabel: "New",
        title: "Glamira - Sekaya Ring",
        price: "$3,590.00"
    },
    {
        id: 8,
        imageUrl: pr55,
        hoverImageUrl: pr56,
        title: "Cesarina Diamond Ring",
        price: "$1,575.00",
        colorOptions: [
            pr55,
            pr56,
            pr65,
            pr66
        ]
    }
];

const TrendingCard = ({ item }: any) => {
    const [imageUrl, setImageUrl] = useState(item.imageUrl);
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <div className="col-lg-3 col-6 col-md-4">
            <div
                className="topbar-product-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden">
                    {item.saleLabel && (
                        <span className={`onsale position-absolute bg-${item.saleLabel === 'Hot' ? 'warning' : 'danger'} text-white d-flex align-items-center justify-content-center z-3`}>
                            {item.saleLabel}
                        </span>
                    )}
                    <Image src={isHovered ? item.hoverImageUrl : imageUrl} alt="image" className="img-fluid w-100" />
                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-danger"></i>
                    </Link>
                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-danger"></i>
                    </Link>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn fs-14" onClick={handleShow}>
                            <span>Quick View</span>
                            <i className="iccl iccl-eye"></i>
                        </Link>
                        <button type="button" className="btn fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart fs-14 p-2" style={{ width: 36, height: 36 }} onClick={handleShow}>
                            <i className="iccl iccl-eye fw-semibold"></i>
                        </Link>
                        <button type="button" className="btn responsive-cart fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <h6 className="mb-1 fs-16 font-playfair">
                        <Link href="/product-detail-layout-01" className="text-reset">{item.title}</Link>
                    </h6>
                    <p className="mb-0 fs-15 text-muted">
                        <span>{item.price}</span>
                    </p>
                    {item.colorOptions && (
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                            {item.colorOptions.map((color: any, index: React.Key | null | undefined) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color);
                                        setIsHovered(false);
                                    }}
                                    style={{ backgroundImage: `url(${color.src})`, backgroundSize: 'cover' }}
                                    className="d-inline-block rounded-circle"
                                ></Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </div>
    );
};

const OurTrending = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection pt-4 pb-5">
                <Container>
                    <div className="row justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <div>
                                    <h1 className="position-relative text-capitalize font-playfair fw-medium">
                                        <span>Our Trendings</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-close fs-14 text-muted"></i><span></span></span>
                                </div>
                                <p className="fs-14 text-muted mt-2 mb-0">Explore all trending items</p>
                            </div>
                        </Col>
                    </div>
                    <div className="row g-2 g-md-4">
                        {trendingData.map((item, index) => (
                            <TrendingCard key={index} item={item} />
                        ))}
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default OurTrending