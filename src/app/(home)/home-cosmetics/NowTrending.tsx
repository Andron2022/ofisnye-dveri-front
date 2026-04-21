"use client";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';

import 'flickity/css/flickity.css';

import pr1 from "@assets/images/home-cosmetics/pr-01.jpg"
import pr2 from "@assets/images/home-cosmetics/pr-02.jpg"
import pr5 from "@assets/images/home-cosmetics/pr-05.jpg"
import pr6 from "@assets/images/home-cosmetics/pr-06.jpg"
import pr13 from "@assets/images/home-cosmetics/pr-13.jpg"
import pr14 from "@assets/images/home-cosmetics/pr-14.jpg"
import pr15 from "@assets/images/home-cosmetics/pr-15.jpg"
import pr16 from "@assets/images/home-cosmetics/pr-16.jpg"
import pr17 from "@assets/images/home-cosmetics/pr-17.jpg"
import pr18 from "@assets/images/home-cosmetics/pr-18.jpg"
import pr19 from "@assets/images/home-cosmetics/pr-19.jpg"
import pr20 from "@assets/images/home-cosmetics/pr-20.jpg"
import Link from 'next/link';


const trendingData = [
    {
        id: 1,
        imageUrl: pr13,
        hoveredImageUrl: pr14,
        name: 'Skin Medical HA5',
        price: 29.00,
        label: 'New',
        labelClass: 'bg-success'
    },
    {
        id: 2,
        imageUrl: pr5,
        hoveredImageUrl: pr6,
        name: 'Skin Fit Glow Cushion',
        price: 49.00,
    },
    {
        id: 3,
        imageUrl: pr15,
        hoveredImageUrl: pr16,
        label: '-34%',
        labelClass: 'bg-danger',
        name: 'White Dew Milky Cleanser',
        originalPrice: 98.00,
        discountedPrice: 65.00,
    },
    {
        id: 4,
        imageUrl: pr17,
        hoveredImageUrl: pr18,
        name: 'Water Bank Hydro Essence',
        price: 49.00,
    },
    {
        id: 5,
        imageUrl: pr19,
        hoveredImageUrl: pr20,
        name: 'My Foundation All Day Long Wear',
        price: 45.00,
    },
    {
        id: 6,
        imageUrl: pr1,
        hoveredImageUrl: pr2,
        label: 'Hot',
        labelClass: 'bg-danger',
        name: 'Laneige White Dew Emulsion',
        price: 55.00,
    },
    {
        id: 7,
        imageUrl: pr13,
        hoveredImageUrl: pr14,
        label: 'Hot',
        labelClass: 'bg-danger',
        name: 'Skin Medical HA5',
        price: 29.00,
    },
    {
        id: 8,
        imageUrl: pr5,
        hoveredImageUrl: pr6,
        name: 'Skin Fit Glow Cushion',
        price: 49.00,
    },
];

const TrendingCard = ({ trend }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col-lg-3 col-md-3 col-6 px-12">
                <div className="topbar-product-card overlay-hover" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                    <div className="position-relative overflow-hidden main">
                        {trend.label && (<span className={`new-label ${trend.labelClass} text-white rounded-circle`}> {trend.label} </span>)}
                        <Image src={isHovered ? trend.hoveredImageUrl : trend.imageUrl} alt="image" className="img-fluid" />
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Add to Wishlist</Tooltip>}
                        >
                            <Button variant="link" className="wishlistadd position-absolute">
                                <i className="facl facl-heart-o text-white"></i>
                            </Button>
                        </OverlayTrigger>

                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={() => setShow(true)}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>

                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: "1" }}>
                            <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold"></i></Link>
                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold"></i></button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="mb-1 fs-16 fw-semibold font-playfair"><Link href="/product-detail-layout-01" className="main_link_lima">{trend.name}</Link></h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>${trend.price}</span>
                        </p>
                    </div>
                </div>

            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const NowTrending = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.trend-data', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                adaptiveHeight: false,
                groupCells: '100%',
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


    return (
        <React.Fragment>
            <section className="kalles-cosmetics-trending-products pb-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-4">
                                <div>
                                    <h1 className="position-relative text-capitalize font-playfair text-lima fw-medium">
                                        <span>Now Trending</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-spa text-muted"></i><span></span></span>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <div className="row my-4 py-2 trend-data">

                        {trendingData.map(trend => (
                            <TrendingCard key={trend.id} trend={trend} />
                        ))}

                    </div>

                </Container>
            </section>
        </React.Fragment>
    )
}

export default NowTrending