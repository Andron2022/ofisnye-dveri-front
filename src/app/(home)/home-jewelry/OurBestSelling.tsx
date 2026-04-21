"use client";
import React, { useState } from 'react'
import { Col, Container } from 'react-bootstrap'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import Image from 'next/image'
import Link from 'next/link'

import pr15 from "@assets/images/home-jewelry/pr-15.jpg"
import pr16 from "@assets/images/home-jewelry/pr-16.jpg"
import pr17 from "@assets/images/home-jewelry/pr-17.jpg"
import pr18 from "@assets/images/home-jewelry/pr-18.jpg"
import pr19 from "@assets/images/home-jewelry/pr-19.jpg"
import pr20 from "@assets/images/home-jewelry/pr-20.jpg"
import pr21 from "@assets/images/home-jewelry/pr-21.jpg"
import pr22 from "@assets/images/home-jewelry/pr-22.jpg"
import pr23 from "@assets/images/home-jewelry/pr-23.jpg"
import pr24 from "@assets/images/home-jewelry/pr-24.jpg"
import pr25 from "@assets/images/home-jewelry/pr-25.jpg"
import pr26 from "@assets/images/home-jewelry/pr-26.jpg"
import pr27 from "@assets/images/home-jewelry/pr-27.jpg"
import pr28 from "@assets/images/home-jewelry/pr-28.jpg"
import pr29 from "@assets/images/home-jewelry/pr-29.jpg"
import pr30 from "@assets/images/home-jewelry/pr-30.jpg"
import pr31 from "@assets/images/home-jewelry/pr-31.jpg"
import pr32 from "@assets/images/home-jewelry/pr-32.jpg"
import pr33 from "@assets/images/home-jewelry/pr-33.jpg"
import pr34 from "@assets/images/home-jewelry/pr-34.jpg"
import pr35 from "@assets/images/home-jewelry/pr-35.jpg"
import pr36 from "@assets/images/home-jewelry/pr-36.jpg"
import pr37 from "@assets/images/home-jewelry/pr-37.jpg"
import pr38 from "@assets/images/home-jewelry/pr-38.jpg"
import pr39 from "@assets/images/home-jewelry/pr-39.jpg"
import pr40 from "@assets/images/home-jewelry/pr-40.jpg"

const sellingData = [
    {
        imageUrl: pr15,
        hoverImageUrl: pr16,
        label: "New",
        labelClass: "bg-danger",
        title: "Glamira - Siplora Ring",
        price: "$4,800.00",
    },
    {
        imageUrl: pr17,
        hoverImageUrl: pr18,
        title: "Chain Bertha Necklace",
        price: "$1,225.00",
        colors: [
            pr17,
            pr18
        ]
    },
    {
        imageUrl: pr19,
        hoverImageUrl: pr20,
        label: "Hot",
        labelClass: "bg-warning",
        title: "Brigida Diamond Ring",
        price: "$2,395.00",
        colors: [
            pr19,
            pr20,
            pr31,
            pr32,
            pr33
        ]
    },
    {
        imageUrl: pr21,
        hoverImageUrl: pr22,
        title: "Acennan Ruby Earrings",
        price: "$899.00 - $905.00",
        colors: [
            pr21,
            pr22
        ]
    },
    {
        imageUrl: pr23,
        hoverImageUrl: pr24,
        label: "-21%",
        labelClass: "bg-warning",
        title: "Germana Diamond Ring",
        price: "$3,259.00 - $3,900.00",
        colors: [
            pr23,
            pr24,
            pr34
        ]
    },
    {
        imageUrl: pr25,
        hoverImageUrl: pr26,
        title: "Parthenia Earrings",
        price: "$1,025.00 - $1,245.00",
        colors: [
            pr25,
            pr26
        ]
    },
    {
        imageUrl: pr27,
        hoverImageUrl: pr28,
        title: "Pendant Mecole Necklace",
        price: "$3,009.00",
        colors: [
            pr27,
            pr28,
            pr35,
            pr36
        ]
    },
    {
        imageUrl: pr40,
        hoverImageUrl: pr30,
        title: "Cesarina Diamond Ring",
        price: "$1,575.00",
        colors: [
            pr29,
            pr30,
            pr37,
            pr38,
            pr39,
            pr40
        ]
    }
];

const SellingCard = ({ item }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(item.imageUrl);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col-lg-3 col-6 col-md-4">
                <div className="topbar-product-card"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    <div className="position-relative overflow-hidden">
                        {item.label && (
                            <span className={`onsale position-absolute ${item.labelClass} text-white d-flex align-items-center justify-content-center z-3`}>
                                {item.label}
                            </span>
                        )}
                        <Image src={isHovered ? item.hoverImageUrl : imageUrl} alt="image" className="img-fluid w-100" />
                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                            <i className="facl facl-heart-o text-danger"></i>
                        </Link>
                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                            <i className="facl facl-heart-o text-danger"></i>
                        </Link>
                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn fs-14" onClick={handleShow}>
                                <span>Quick View</span> <i className="iccl iccl-eye"></i>
                            </Link>
                            <button type="button" className="btn fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                            </button>
                        </div>
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white m-2" style={{ zIndex: 1 }}>
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                                <i className="iccl iccl-eye fw-semibold"></i>
                            </Link>
                            <button type="button" className="btn responsive-cart fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
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
                        {item.colors && (
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                {item.colors.map((color: any, index: React.Key | null | undefined) => (
                                    <Link href="#!" key={index} onClick={() => { setImageUrl(color); setIsHovered(false); }} style={{ backgroundImage: `url(${color.src})`, backgroundSize: 'cover' }} className="d-inline-block rounded-circle"></Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const OurBestSelling = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <Container>
                    <div className="row justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-5">
                                <div>
                                    <h1 className="position-relative text-capitalize font-playfair fw-medium">
                                        <span>Our Best Selling</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-close fs-14 text-muted"></i><span></span></span>
                                </div>
                                <p className="fs-14 text-muted mt-2 mb-0">Discover our best selling items</p>
                            </div>
                        </Col>
                    </div>
                    <div className="row g-2 g-md-4">

                        {sellingData.map((item, index) => (
                            <SellingCard key={index} item={item} />
                        ))}
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default OurBestSelling