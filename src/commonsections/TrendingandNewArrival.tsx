"use client";
import React, { useEffect, useRef, useState } from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pr1 from "@assets/images/products/pr-01.jpg"
import pr2 from "@assets/images/products/pr-02.jpg"
import pr4 from "@assets/images/products/pr-04.jpg"
import pr5 from "@assets/images/products/pr-05.jpg"
import pr6 from "@assets/images/products/pr-06.jpg"
import pr7 from "@assets/images/products/pr-07.jpg"
import pr8 from "@assets/images/products/pr-08.jpg"
import pr9 from "@assets/images/products/pr-09.jpg"
import pr14 from "@assets/images/products/pr-14.jpg"
import pr15 from "@assets/images/products/pr-15.jpg"
import pr17 from "@assets/images/products/pr-17.jpg"
import pr18 from "@assets/images/products/pr-18.jpg"
import pr25 from "@assets/images/products/pr-25.png"
import pr26 from "@assets/images/products/pr-26.png"
import pr27 from "@assets/images/products/pr-27.jpg"
import pr28 from "@assets/images/products/pr-28.jpg"
import pr31 from "@assets/images/products/pr-31.jpg"
import pr32 from "@assets/images/products/pr-32.jpg"
import pr33 from "@assets/images/products/pr-33.jpg"
import pr34 from "@assets/images/products/pr-34.jpg"

import metro1 from "@assets/images/home-metro/pr-q1.jpg"
import metro2 from "@assets/images/home-metro/pr-q2.jpg"

import 'flickity/css/flickity.css';

const data = [
    {
        "imageUrl": pr1,
        "hoverImageUrl": pr2,
        "newLabelText": "New",
        "title": "Analogue Resin Strap",
        "price": "$30.00",
        "sizes": ["XS, S, M, L, XL"],
        "labelClass": "bg-success"
    },
    {
        "imageUrl": pr33,
        "hoverImageUrl": pr34,
        "title": "Ridley High Waist",
        "price": "$36.00",
        "sizes": ["S, M, L"],
    },
    {
        "imageUrl": pr4,
        "title": "Blush Beanie",
        "price": "$15.00",
        "sizes": ["S, M, L"],
        "colors": [
            { "imageUrl": pr5, "color": "bg-body-tertiary" },
            { "imageUrl": pr31, "color": "bg_color_pink" },
            { "imageUrl": pr32, "color": "bg-dark" }
        ],
    },
    {
        "imageUrl": pr6,
        "newLabelText": "-25%",
        "labelClass": "bg-danger",
        "title": "Cluse La Boheme Rose Gold",
        "price": "$45.00",
        "sizes": ["XS, S, M"],
        "colors": [
            { "imageUrl": pr7, "color": "bg_color_green" },
            { "imageUrl": pr8, "color": "bg-body-secondary" },
            { "imageUrl": pr9, "color": "bg_color_blue" }
        ],
        "discountedPrice": "$60.00"
    },
    {
        "imageUrl": pr15,
        "hoverImageUrl": pr14,
        "title": "Mercury Tee",
        "price": "$68.00",
        "colorOptions": [
            { "imageUrl": metro1 },
            { "imageUrl": metro2 }
        ]
    },
    {
        "imageUrl": pr27,
        "hoverImageUrl": pr28,
        "newLabelText": "-34%",
        "labelClass": "bg-danger",
        "title": "Mercury Tee",
        "price": "$68.00"
    },
    {
        "imageUrl": pr18,
        "hoverImageUrl": pr17,
        "title": "Cream Women Pants",
        "price": "$35.00",
        "sizes": ["S, M, L"]
    },
    {
        "imageUrl": pr25,
        "hoverImageUrl": pr26,
        "title": "Black Mountain Hat",
        "price": "$50.00",
        "sizes": ["S, M, L"]
    }
]

const TrendArrivalCard = ({ item }: any) => {
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
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="topbar-product-card pb-3"
            >
                <div className="position-relative overflow-hidden">
                    {item.newLabelText && (
                        <span className={`new-label ${item.labelClass} text-white rounded-circle text-center`}>
                            {item.newLabelText}
                        </span>
                    )}
                    <Image src={isHovered && item.hoverImageUrl ? item.hoverImageUrl : imageUrl} alt="image" className="img-fluid" />
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Add to Wishlist</Tooltip>}
                    >
                        <Link href="" className="position-absolute" style={{ top: 10, left: 10, zIndex: 1 }}>
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                    </OverlayTrigger>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i></button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i></button>
                    </div>
                    <p className="product-size mb-0 text-center text-white fw-medium">{item.sizes}</p>
                </div>
                <div className='mt-3'>
                    <h6 className="mb-1"><Link href="#!" className="product-title">{item.title}</Link></h6>
                    <p className="mb-0 fs-14 text-muted">
                        {item.discountedPrice ?
                            <>
                                {item.discountedPrice && <del>{item.discountedPrice}</del>}{" "}
                                <span className="text-danger">{item.price}</span>
                            </>
                            :
                            <span>{item.price}</span>
                        }
                    </p>
                    {item.colors ?
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {item.colors && item.colors.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onMouseOver={() => setImageUrl(color.imageUrl)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                        :
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {item.colorOptions && item.colorOptions.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    style={{
                                        background: `url('${color.imageUrl.src}')`,
                                        backgroundSize: 'cover'
                                    }}
                                    className="d-inline-block bg-body-tertiary rounded-circle"
                                />
                            ))}
                        </div>
                    }

                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );

};


const TrendingandNewArrival = ({ colClass }: any) => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.tranding-card', {
                groupCells: '100%',
                imagesLoaded: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: 1,
                adaptiveHeight: false,
                dragThreshold: 5,
                cellAlign: "left",
                percentPosition: true,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }
        // Cleanup Flickity on unmount
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    return (
        <React.Fragment>
            <div className="row my-4 py-2 tranding-card">
                {data.map((item, idx) => (
                    <div key={idx} className={colClass}>
                        <TrendArrivalCard item={item} />
                    </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default TrendingandNewArrival