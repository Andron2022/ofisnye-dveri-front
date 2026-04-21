"use client";
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import Link from 'next/link'

import pr9 from "@assets/images/home-fashion-trend/pr-09.jpg"
import pr10 from "@assets/images/home-fashion-trend/pr-10.jpg"
import pr15 from "@assets/images/home-fashion-trend/pr-15.jpg"
import pr16 from "@assets/images/home-fashion-trend/pr-16.jpg"
import pr17 from "@assets/images/home-fashion-trend/pr-17.jpg"
import pr18 from "@assets/images/home-fashion-trend/pr-18.jpg"
import pr20 from "@assets/images/home-fashion-trend/pr-20.jpg"
import pr21 from "@assets/images/home-fashion-trend/pr-21.jpg"
import pr22 from "@assets/images/home-fashion-trend/pr-22.jpg"
import pr23 from "@assets/images/home-fashion-trend/pr-23.jpg"
import pr24 from "@assets/images/home-fashion-trend/pr-24.jpg"
import pr25 from "@assets/images/home-fashion-trend/pr-25.jpg"
import pr26 from "@assets/images/home-fashion-trend/pr-26.jpg"
import pr27 from "@assets/images/home-fashion-trend/pr-27.jpg"
import pr28 from "@assets/images/home-fashion-trend/pr-28.jpg"
import Image from 'next/image'


const selling = [
    {
        id: 1,
        imageUrl: pr17,
        hoverImageUrl: pr18,
        label: "New",
        labelClass: "bg-success",
        title: "Festival Shirt Young",
        price: "$66.00 - $86.00",
        colors: [
            {
                colorClass: "bg-danger",
                imageUrl: pr17
            },
            {
                colorClass: "bg-dark",
                imageUrl: pr18
            }
        ]
    },
    {
        id: 2,
        imageUrl: pr20,
        hoverImageUrl: pr21,
        title: "Tbar 3/4 Baseball Tee",
        price: "$44.00"
    },
    {
        id: 3,
        imageUrl: pr22,
        hoverImageUrl: pr23,
        label: "-10%",
        labelClass: "bg-danger",
        title: "Drop Shoulder Pullover Fleece",
        price: "$54.00",
        originalPrice: "$60.00"
    },
    {
        id: 4,
        imageUrl: pr24,
        hoverImageUrl: pr25,
        title: "Tbar Collab Movie And Tv T-Shirt",
        price: "$55.00"
    },
    {
        id: 5,
        imageUrl: pr15,
        hoverImageUrl: pr16,
        title: "Essential Longline Curved Hem",
        price: "$77.00",
    },
    {
        id: 6,
        imageUrl: pr9,
        hoverImageUrl: pr10,
        title: "91 Short Sleeve Shirt",
        price: "$66.00",
        colors: [
            { colorClass: "bg-body-tertiary", imageUrl: pr9 },
            { colorClass: "bg-warning-subtle", imageUrl: pr10 }
        ]
    },
    {
        id: 7,
        imageUrl: pr26,
        hoverImageUrl: pr26,
        title: "Tbar Collab Movie And Tv T-Shirt",
        price: "$51.00",
    },
    {
        id: 8,
        imageUrl: pr27,
        hoverImageUrl: pr28,
        label: "Hot",
        title: "Graduate Tee",
        price: "$54.00",
    }
]

const ProductCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <Col lg={3} md={4} className="col-6">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden">
                        {product.label && (
                            <span className={`new-label ${product.labelClass} text-white rounded-circle`}>
                                {product.label}
                            </span>
                        )}
                        <Image
                            src={isHovered ? product.hoverImageUrl : imageUrl}
                            alt="image"
                            className="img-fluid"
                        />
                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                <span>Quick View</span>
                                <i className="iccl iccl-eye"></i>
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
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} onClick={handleShow}>
                                <i className="iccl iccl-eye fw-semibold"></i>
                            </Link>
                            <button
                                type="button"
                                className="btn responsive-cart rounded-pill fs-14 p-2"
                                style={{ width: 36, height: 36 }}
                                data-bs-toggle="modal"
                                data-bs-target="#cardModal"
                                onClick={handleAddToCardModalShow}
                            >
                                <i className="iccl iccl-cart fw-semibold"></i>
                            </button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="mb-1 fw-medium">
                            <Link href="/product-detail-layout-01" className="main_link_acid_green">{product.title}</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>{product.price}</span>
                        </p>
                        {product.colors && (
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                {product.colors.map((color: { imageUrl: any; colorClass: any }, index: number) => (
                                    <Link
                                        key={index}
                                        href="#!"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setImageUrl(color.imageUrl);
                                            setIsHovered(false);
                                        }}
                                        className={`d-inline-block ${color.colorClass} rounded-circle`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Col>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const BestSeller = () => {
    return (
        <React.Fragment>
            <section className="mt-30 pt-5">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <div>
                                    <h3 className="position-relative title_9 d-inline-block fs-30">
                                        <span>best seller products</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor!</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="my-4 g-3 g-lg-4">
                        {selling.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Row>
                    <div className="mt-4 text-center">
                        <button className="btn-load">Load More</button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default BestSeller