"use client";
import React, { useState } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pr1 from "@assets/images/home-sport/pr-01.jpg"
import pr2 from "@assets/images/home-sport/pr-02.jpg"
import pr3 from "@assets/images/home-sport/pr-03.jpg"
import pr4 from "@assets/images/home-sport/pr-04.jpg"
import pr5 from "@assets/images/home-sport/pr-05.jpg"
import pr6 from "@assets/images/home-sport/pr-06.jpg"
import pr7 from "@assets/images/home-sport/pr-07.jpg"
import pr8 from "@assets/images/home-sport/pr-08.jpg"
import pr9 from "@assets/images/home-sport/pr-09.jpg"
import pr10 from "@assets/images/home-sport/pr-10.jpg"
import pr11 from "@assets/images/home-sport/pr-11.jpg"
import pr12 from "@assets/images/home-sport/pr-12.jpg"
import pr13 from "@assets/images/home-sport/pr-13.jpg"
import pr14 from "@assets/images/home-sport/pr-14.jpg"

const sellingData = [
    {
        "id": 1,
        "imageUrl": pr1,
        "hoverImageUrl": pr2,
        "title": "Shoes huarache – TT100",
        "price": "$145.00",
        "colorOptions": [
            {
                "imageUrl": pr1,
                "colorClass": "bg_color_blue"
            },
            {
                "imageUrl": pr2,
                "colorClass": "bg_color_cyan"
            }
        ]
    },
    {
        "id": 2,
        "imageUrl": pr3,
        "hoverImageUrl": pr4,
        "title": "SwimZip Men's Long Sleeve Zipper",
        "price": "$65.00",
    },
    {
        "id": 3,
        "imageUrl": pr5,
        "hoverImageUrl": pr6,
        "title": "Men's Tops Long Sleeve Shirts",
        "price": "$65.00",
        "discount": "-35%",
        "originalPrice": "$99.00",
        "colorOptions": [
            {
                "imageUrl": pr5,
                "colorClass": "bg_color_pink"
            },
            {
                "imageUrl": pr6,
                "colorClass": "bg-dark"
            },
            {
                "imageUrl": pr11,
                "colorClass": "bg_color_blue"
            }
        ]
    },
    {
        "id": 4,
        "imageUrl": pr7,
        "hoverImageUrl": pr8,
        "title": "Elip Power Max",
        "price": "$35.00",
    },
    {
        "id": 5,
        "imageUrl": pr9,
        "hoverImageUrl": pr10,
        "title": "Men's Sports Jogging Workout Shorts",
        "price": "$29.00",
        "colorOptions": [
            {
                "imageUrl": pr10,
                "colorClass": "bg_color_blue"
            },
            {
                "imageUrl": pr9,
                "colorClass": "bg-dark"
            }
        ]
    },
    {
        "id": 6,
        "imageUrl": pr11,
        "hoverImageUrl": pr12,
        "title": "Men's Long Sleeve Rash Guard",
        "price": "$65.00",
        "discount": "-35%",
        "originalPrice": "$99.00",
        "colorOptions": [
            {
                "imageUrl": pr6,
                "colorClass": "bg-dark"
            },
            {
                "imageUrl": pr11,
                "colorClass": "bg_color_blue"
            },
            {
                "imageUrl": pr5,
                "colorClass": "bg_color_pink"
            }
        ]
    },
    {
        "id": 7,
        "imageUrl": pr14,
        "hoverImageUrl": pr13,
        "title": "Calvin Klein Workout Shorts",
        "price": "$29.00",
        "colorOptions": [
            {
                "imageUrl": pr14,
                "colorClass": "bg-danger"
            },
            {
                "imageUrl": pr13,
                "colorClass": "bg-dark"
            }
        ]
    },
    {
        "id": 8,
        "imageUrl": pr2,
        "hoverImageUrl": pr1,
        "title": "Shoes huarache",
        "price": "$145.00",
        "colorOptions": [
            {
                "imageUrl": pr2,
                "colorClass": "bg_color_cyan"
            },
            {
                "imageUrl": pr1,
                "colorClass": "bg_color_blue"
            }
        ]
    }
]


const SellCard = ({ sell }: any) => {
    const [imageUrl, setImageUrl] = useState(sell.imageUrl);
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col-6 col-sm-4 col-md-3">
                <div
                    className="topbar-product-card overlay-hover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden main">
                        {sell.discount && (
                            <span className="onsale position-absolute bg-danger text-white d-flex align-items-center justify-content-center z-3">
                                {sell.discount}
                            </span>
                        )}
                        <Image src={isHovered ? sell.hoverImageUrl : imageUrl} alt="image" className="img-fluid" />
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Add to Wishlist</Tooltip>}
                        >
                            <Link href="#" className="wishlistadd position-absolute text-white dark">
                                <i className="facl facl-heart-o"></i>
                            </Link>
                        </OverlayTrigger>
                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn bg-orange text-white fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn bg-orange text-white fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-orange m-2" style={{ zIndex: 1 }}>
                            <Button variant="warning" href='#exampleModal' className="btn responsive-cart fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}>
                                <i className="iccl iccl-eye fw-semibold text-white"></i>
                            </Button>
                            <Button variant="warning" data-bs-toggle="modal" data-bs-target='#cardModal' className="btn responsive-cart fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold text-white"></i>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-1 font-montserrat fw-medium fs-14">
                            <Link href='/product-detail-layout-01' className="main_link_orange">{sell.title}</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            {sell.discount && <del>{sell.originalPrice}</del>}
                            <span className={sell.discount ? "text-danger" : ""}>{sell.price}</span>
                        </p>
                        {sell.colorOptions && (
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                {sell.colorOptions.map((color: { imageUrl: any; colorClass: any }, index: React.Key | null | undefined) => (
                                    <Link key={index} href="#!" onClick={() => setImageUrl(color.imageUrl)} className={`d-inline-block ${color.colorClass} rounded-circle`}></Link>
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
const TopSelling = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="text-center mb-4">
                                <div>
                                    <h1 className="position-relative text-capitalize font-montserrat fw-medium">
                                        <span>TOP SELLING</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-dumbbell text-muted"></i><span></span></span>
                                </div>
                                <p className="fs-14 text-muted mt-2 mb-0">Whether your goals are to improve weight or body
                                    composition, increase strength and function, or improve overall
                                    health, resistance training can help you get there.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4">
                        {sellingData.map((sell: any) => (
                            <SellCard key={sell.id} sell={sell} />
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default TopSelling