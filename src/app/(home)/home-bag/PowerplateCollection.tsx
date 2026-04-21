"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col } from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link';
import 'flickity/css/flickity.css';

import pr15 from "@assets/images/home-bags/pr-15.jpg"
import pr16 from "@assets/images/home-bags/pr-16.jpg"
import pr17 from "@assets/images/home-bags/pr-17.jpg"
import pr18 from "@assets/images/home-bags/pr-18.jpg"
import pr19 from "@assets/images/home-bags/pr-19.jpg"
import pr20 from "@assets/images/home-bags/pr-20.jpg"
import pr21 from "@assets/images/home-bags/pr-21.jpg"
import pr22 from "@assets/images/home-bags/pr-22.jpg"
import pr23 from "@assets/images/home-bags/pr-23.jpg"
import pr24 from "@assets/images/home-bags/pr-24.jpg"
import pr25 from "@assets/images/home-bags/pr-25.jpg"
import pr26 from "@assets/images/home-bags/pr-26.jpg"
import pr27 from "@assets/images/home-bags/pr-27.jpg"
import pr28 from "@assets/images/home-bags/pr-28.jpg"
import pr29 from "@assets/images/home-bags/pr-29.jpg"
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';


const powerplate = [
    {
        id: 1,
        name: "Nebula Violet Backpack",
        price: 235.00,
        imageUrl: pr15,
        hoverImageUrl: pr16
    },
    {
        id: 2,
        name: "Crumpler The Algorith Backpack",
        price: 159.00,
        imageUrl: pr16,
        hoverImageUrl: pr17
    },
    {
        id: 3,
        name: "Little America Herschel Supy",
        price: 235.00,
        imageUrl: pr18,
        hoverImageUrl: pr19
    },
    {
        id: 4,
        name: "Tim Rogue Laptop Backpack",
        price: 189.00,
        imageUrl: pr20,
        hoverImageUrl: pr21
    },
    {
        id: 5,
        name: "Versatile Laptop Work Bag",
        price: 185.00,
        imageUrl: pr22,
        hoverImageUrl: pr23
    },
    {
        id: 6,
        name: "Herschel Classic Backpack",
        price: 168.00,
        imageUrl: pr24,
        hoverImageUrl: pr25
    },
    {
        id: 7,
        name: "Antihero Fortnight Backpack",
        price: 129.00,
        imageUrl: pr26,
        hoverImageUrl: pr27
    },
    {
        id: 8,
        name: "Timbuk Authority BackPack",
        price: 205.00,
        imageUrl: pr28,
        hoverImageUrl: pr29
    }
]

const PowerplateCollection = () => {


    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: false,
                cellAlign: 'center',
                imagesLoaded: false,
                lazyLoad: false,
                freeScroll: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: false,
                pageDots: true,
                contain: true,
                adaptiveHeight: true,
                dragThreshold: 5,
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

    const [hoveredProduct, setHoveredProduct] = useState<null | number>(null);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);


    return (
        <React.Fragment>
            <section className="pt-5 mt-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center">
                                <div className="mb-2">
                                    <h1>POWERPLATE COLLECTION</h1>
                                </div>
                                <span className="fs-14 text-uppercase ls-normal text-muted">DISCOVER OUR BEST PRODUCTS</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 mt-4">
                        {powerplate.map(product => (
                            <div className="col-md-3 col-6" key={product.id}>
                                <div
                                    className="topbar-product-card"
                                    onMouseEnter={() => setHoveredProduct(product.id)}
                                    onMouseLeave={() => setHoveredProduct(null)}
                                >
                                    <div className="position-relative overflow-hidden">
                                        <Image
                                            src={hoveredProduct === product.id ? product.hoverImageUrl : product.imageUrl}
                                            alt="image"
                                            className="img-fluid"
                                        />
                                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                            <i className="facl facl-heart-o"></i>
                                        </Link>
                                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
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
                                        <div
                                            className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                            style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                        >
                                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
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
                                        <h6 className="mb-1 fs-16 fw-medium text-capitalize">
                                            <Link href="/product-detail-layout-01" className="main_link_red">
                                                {product.name}
                                            </Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-muted">
                                            <span>${product.price.toFixed(2)}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 text-center pt-3">
                        <button className="btn btn-custom-dark-red btn-load rounded-0">Load More <i className="las la-arrow-down"></i></button>
                    </div>
                </div>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}
export default PowerplateCollection;