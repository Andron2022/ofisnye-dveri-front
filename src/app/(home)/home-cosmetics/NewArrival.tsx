"use client";
import Image from 'next/image';
import React, { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';

import pr1 from "@assets/images/home-cosmetics/pr-01.jpg"
import pr2 from "@assets/images/home-cosmetics/pr-02.jpg"
import pr4 from "@assets/images/home-cosmetics/pr-04.jpg"
import pr5 from "@assets/images/home-cosmetics/pr-05.jpg"
import pr7 from "@assets/images/home-cosmetics/pr-07.jpg"
import pr8 from "@assets/images/home-cosmetics/pr-08.jpg"
import pr11 from "@assets/images/home-cosmetics/pr-11.jpg"
import pr12 from "@assets/images/home-cosmetics/pr-12.jpg"
import pr13 from "@assets/images/home-cosmetics/pr-13.jpg"
import pr14 from "@assets/images/home-cosmetics/pr-14.jpg"
import pr15 from "@assets/images/home-cosmetics/pr-15.jpg"
import pr16 from "@assets/images/home-cosmetics/pr-16.jpg"
import pr21 from "@assets/images/home-cosmetics/pr-21.jpg"
import Link from 'next/link';

const productData = [
    {
        id: 1,
        imageUrl: pr15,
        hoveredImageUrl: pr16,
        name: 'White Dew Milky Cleanser',
        originalPrice: 98.00,
        discountedPrice: 98.00,
        discountPercentage: '-34%',
    },
    {
        id: 2,
        imageUrl: pr11,
        hoveredImageUrl: pr12,
        name: 'Fresh Calming Balancing Toner',
        price: 49.00,
    },
    {
        id: 3,
        imageUrl: pr21,
        hoveredImageUrl: pr21,
        name: 'Advanced Hydrating Conditioner',
        price: 28.00,
    },
    {
        id: 4,
        imageUrl: pr13,
        hoveredImageUrl: pr14,
        name: 'Skin Medical HA5',
        price: 29.00,
        label: 'New',
    },
    {
        id: 5,
        imageUrl: pr1,
        hoveredImageUrl: pr2,
        name: 'Laneige White Dew Emulsion',
        price: 55.00,
        label: 'Hot',
    },
    {
        id: 6,
        imageUrl: pr7,
        hoveredImageUrl: pr8,
        name: 'Dr.Jart Sensitive Sun Protector',
        price: 35.00,
    },
    {
        id: 7,
        imageUrl: pr4,
        hoveredImageUrl: pr5,
        name: 'Les Beiges Water Fresh Tint Light',
        price: 38.00,
    },
    {
        id: 8,
        imageUrl: pr14,
        hoveredImageUrl: pr15,
        name: 'Advanced Hydrating Shampoo',
        price: 32.00,
    }
];

const NewArrive = ({ product }: any) => {

    const [isHovered, setIsHovered] = useState(false);
    const handleHover = () => setIsHovered(!isHovered);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col-md-3 col-6">
                <div className="topbar-product-card overlay-hover" onMouseEnter={handleHover} onMouseLeave={handleHover}>
                    <div className="position-relative overflow-hidden main">
                        {product.discountPercentage && (
                            <span className="new-label bg-danger text-white rounded-circle"> {product.discountPercentage} </span>
                        )}
                        <Image src={isHovered ? product.hoveredImageUrl : product.imageUrl} alt="image" className="img-fluid" />
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Add to Wishlist</Tooltip>}
                        >
                            <Button variant="link" className="wishlistadd position-absolute">
                                <i className="facl facl-heart-o text-white"></i>
                            </Button>
                        </OverlayTrigger>

                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow} ><span>Quick Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>

                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}>
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold"></i></button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="mb-1 fs-16 fw-semibold font-playfair"><Link href="/product-detail-layout-01" className="main_link_lima">{product.name}</Link></h6>
                        {product.discountedPrice && (
                            <p className="mb-0 fs-14 text-muted">
                                <del>${product.originalPrice}</del> <span className="text-danger">${product.discountedPrice}</span>
                            </p>
                        )}
                        {!product.discountedPrice && (
                            <p className="mb-0 fs-14 text-muted">
                                <span>${product.price}</span>
                            </p>
                        )}
                    </div>
                </div>
                {/* <Modal */}
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const NewArrival = () => {
    return (
        <React.Fragment>
            <section className="cat-section">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div>
                                <h1 className="position-relative text-center text-capitalize font-playfair text-lima fw-medium">
                                    <span>New Arrivals</span>
                                </h1>
                                <span className="dn tt_divider"><span></span><i className="la la-spa text-muted"></i><span></span></span>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4 mt-4">
                        {productData.map(product => (
                            <NewArrive key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default NewArrival