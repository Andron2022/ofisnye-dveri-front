"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, Col, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';

import pr1 from "@assets/images/home-shoes/pr-01.jpg"
import pr2 from "@assets/images/home-shoes/pr-02.jpg"
import pr3 from "@assets/images/home-shoes/pr-03.jpg"
import pr4 from "@assets/images/home-shoes/pr-04.jpg"
import pr6 from "@assets/images/home-shoes/pr-06.jpg"
import pr7 from "@assets/images/home-shoes/pr-07.jpg"
import pr12 from "@assets/images/home-shoes/pr-12.jpg"
import pr13 from "@assets/images/home-shoes/pr-13.jpg"
import pr14 from "@assets/images/home-shoes/pr-14.jpg"
import pr15 from "@assets/images/home-shoes/pr-15.jpg"
import pr21 from "@assets/images/home-shoes/pr-21.jpg"
import pr22 from "@assets/images/home-shoes/pr-20.jpg"

import 'flickity/css/flickity.css';

const alsolike = [
    {
        "id": 1,
        "name": "Adidas Zapatillas Calcetin",
        "price": "$122.00",
        "imageUrl": pr4,
        "hoverImageUrl": pr13,
        "class": "mt-4 mb-4 pb-3"
    },
    {
        "id": 2,
        "name": "Deluxe Brand Uomo Slide Hi Tops",
        "originalPrice": "$635.00",
        "discountedPrice": "$452.00",
        "imageUrl": pr3,
        "hoverImageUrl": pr4,
        "isDiscounted": true,
        "discountPercentage": "-29%",
        "class": "mt-4 mb-4 pb-3"

    },
    {
        "id": 3,
        "name": "Deluxe Brand Donna Super Star Scarpe",
        "price": "$52.00",
        "imageUrl": pr15,
        "hoverImageUrl": pr15,
        "sizes": ["40", "41", "42", "43", "44", "45"],
        "colors": [
            { "colorName": "warning-subtle", "colorImageUrl": pr14 },
            { "colorName": "black", "colorImageUrl": pr15 }
        ],
        "class": "mt-3"
    },
    {
        "id": 4,
        "name": "Gold Foil Chunky Leather Sneakers",
        "price": "$309.00",
        "imageUrl": pr13,
        "hoverImageUrl": pr3,
        "class": "mt-4 mb-4 pb-3"
    },
    {
        "id": 5,
        "name": "Adidas Zapatillas Calcetin",
        "price": "$122.00",
        "imageUrl": pr4,
        "hoverImageUrl": pr13,
        "class": "mt-4"
    },
    {
        "id": 6,
        "name": "Deluxe Brand Uomo Slide Hi Tops",
        "originalPrice": "$635.00",
        "discountedPrice": "$452.00",
        "imageUrl": pr3,
        "hoverImageUrl": pr4,
        "discount": "-29%",
        "class": "mt-4"
    },
    {
        "id": 7,
        "name": "Deluxe Brand Donna Super Star Scarpe",
        "price": "$52.00",
        "imageUrl": pr15,
        "hoverImageUrl": pr15,
        "sizes": ["40", "41", "42", "43", "44", "45"],
        "colors": [
            { "colorName": "warning-subtle", "colorImageUrl": pr14 },
            { "colorName": "black", "colorImageUrl": pr15 }
        ],
        "class": "mt-3"
    },
    {
        "id": 8,
        "name": "Gold Foil Chunky Leather Sneakers",
        "price": "$309.00",
        "imageUrl": pr13,
        "hoverImageUrl": pr3,
        "class": "mt-4"
    }
]

const AlsoLikeCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState(product.imageUrl);

    return (
        <Col md={3} className="col-6">
            <Card className="rounded-0 mb-0">
                <CardBody>
                    <div
                        className="topbar-product-card overlay-hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden main">
                            {product.discount && (
                                <span className="new-label bg-danger text-white rounded-circle">
                                    {product.discount}
                                </span>
                            )}
                            <Image
                                src={isHovered ? product.hoverImageUrl : currentImageUrl}
                                alt="image"
                                className="img-fluid"
                            />
                            <Link href="#!" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                <i className="facl facl-heart-o"></i>
                            </Link>
                            <Link href="#!" className="compare_add position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Compare">
                                <i className="las la-sync"></i>
                            </Link>
                            <div className="product-button d-none d-lg-flex flex-column gap-2" style={{ boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                    <span>Quick View</span>
                                    <i className="iccl iccl-eye"></i>
                                </Link>
                                <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal">
                                    <span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal">
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            {product.sizes && (
                                <p className="product-size mb-0 text-center text-white fw-medium">
                                    {product.sizes.join(', ')}
                                </p>
                            )}
                        </div>
                        <div className={`${product.class}`}>
                            <h6 className="mb-1 fw-medium lh-base">
                                <Link href="/product-detail-layout-01" className="main_link_red">{product.name}</Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                {product.originalPrice && <del>{product.originalPrice}</del>}
                                <span className={product.discountedPrice ? 'text-danger' : ''}>
                                    {product.discountedPrice || product.price}
                                </span>
                            </p>
                            {product.colors && (
                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                    {product.colors.map((color: any, index: React.Key | null | undefined) => (
                                        <Link
                                            href="#!"
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentImageUrl(color.colorImageUrl);
                                                setIsHovered(false);
                                            }}
                                            className={`d-inline-block bg-${color.colorName} rounded-circle`}
                                        ></Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

const recentview = [
    {
        "id": 1,
        "name": "Givenchy Paris Strap Sneakers",
        "imageUrl": pr21,
        "hoverImageUrl": pr22,
        "price": "$122.00",
        "discountPrice": null,
        "sizes": null,
        "newLabel": false,

    },
    {
        "id": 2,
        "name": "Deluxe Brand Uomo Slide Hi Tops",
        "imageUrl": pr6,
        "hoverImageUrl": pr7,
        "price": "$635.00",
        "discountPrice": "$452.00",
        "sizes": null,
        "newLabel": true,
        "discount": "-29%",

    },
    {
        "id": 3,
        "name": "Deluxe Brand Donna Star Scarpe",
        "imageUrl": pr1,
        "hoverImageUrl": pr2,
        "price": "$52.00",
        "discountPrice": null,
        "sizes": "40, 41, 42, 43, 44, 45",
        "newLabel": false,

    },
    {
        "id": 4,
        "name": "Gold Foil Chunky Leather Sneakers",
        "imageUrl": pr13,
        "hoverImageUrl": pr12,
        "price": "$309.00",
        "discountPrice": null,
        "sizes": null,
        "newLabel": false,

    },
    {
        "id": 5,
        "name": "Adidas Zapatillas Calcetin",
        "price": "$122.00",
        "imageUrl": pr4,
        "hoverImageUrl": pr13,

    },
    {
        "id": 6,
        "name": "Deluxe Brand Uomo Slide Hi Tops",
        "price": "$635.00",
        "discountPrice": "$452.00",
        "imageUrl": pr3,
        "hoverImageUrl": pr4,
        "discount": "-29%",

    },
    {
        "id": 7,
        "name": "Deluxe Brand Donna Super Star Scarpe",
        "price": "$52.00",
        "imageUrl": pr15,
        "hoverImageUrl": pr15,
        "sizes": ["40", "41", "42", "43", "44", "45"],
        "colors": [
            { "colorName": "warning-subtle", "colorImageUrl": pr14 },
            { "colorName": "black", "colorImageUrl": pr15 }
        ],

    },
    {
        "id": 8,
        "name": "Gold Foil Chunky Leather Sneakers",
        "price": "$309.00",
        "imageUrl": pr13,
        "hoverImageUrl": pr3,
    }
]

const RecentViewCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Col md={3} className="col-6">
            <Card className="rounded-0 mb-0 border-start">
                <CardBody>
                    <div
                        className="topbar-product-card overlay-hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden main">
                            {product.newLabel && (
                                <span className="new-label bg-danger text-white rounded-circle">
                                    {product.discount}
                                </span>
                            )}
                            <Image
                                src={isHovered ? product.hoverImageUrl : product.imageUrl}
                                alt="image"
                                className="img-fluid"
                            />
                            <Link
                                href="#!"
                                className="wishlistadd position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o"></i>
                            </Link>
                            <Link
                                href="#!"
                                className="compare_add position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                data-bs-title="Compare"
                            >
                                <i className="las la-sync"></i>
                            </Link>
                            <div
                                className="product-button d-none d-lg-flex flex-column gap-2"
                                style={{ boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn rounded-pill fs-14"
                                >
                                    <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                >
                                    <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: '36px', height: '36px' }}
                                    data-bs-toggle="modal"
                                    data-bs-target="#cardModal"
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                            {product.sizes && (
                                <p className="product-size mb-0 text-center text-white fw-medium">
                                    {product.sizes}
                                </p>
                            )}
                        </div>
                        <div className="mt-4">
                            <h6 className="mb-1 fw-medium lh-base">
                                <Link href="/product-detail-layout-01" className="main_link_red">
                                    {product.name}
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                {product.discountPrice ? (
                                    <>
                                        {product.price && <del>{product.price}</del>}
                                        <span className="text-danger">{product.discountPrice}</span>
                                    </>
                                ) : (
                                    <span>{product.price}</span>
                                )}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
};

const AlsoLike = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.also-like', {
                cellAlign: 'left',
                imagesLoaded: 0,
                wrapAround: true,
                autoPlay: 0,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: false,
                pageDots: false,
                contain: 1,
                adaptiveHeight: 0,
                groupCells: '100%',
                dragThreshold: 5,
                percentPosition: 1,
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
            <section className="pt-md-5 mb-md-3 xl:hidden">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <h3 className="pb-2">You may also like</h3>
                            </div>
                        </Col>
                    </Row>

                    <Row className="my-4 py-2 also-like">
                        {alsolike.map((product) => (
                            <AlsoLikeCard key={product.id} product={product} />
                        ))}
                    </Row>
                </div>

                <div className="container">
                    <Row className="justify-content-center mt-lg-5 pt-lg-2">
                        <Col lg={7}>
                            <div className="text-center pb-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Row>
                    <div className="row my-4 py-2 also-like" data-flickity='{"imagesLoaded": 0,"adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold" : 5, "cellAlign": "left","wrapAround": true,"prevNextButtons": false,"percentPosition": 1,"pageDots": false, "autoPlay" : 0, "pauseAutoPlayOnHover" : true, "rightToLeft": false }'>

                        {recentview.map((product) => (
                            <RecentViewCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default AlsoLike