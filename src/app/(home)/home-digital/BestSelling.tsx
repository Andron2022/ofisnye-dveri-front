"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import Image from 'next/image';
import Link from 'next/link';

import pr1 from "@assets/images/home-digital/pr-01.jpg"
import pr2 from "@assets/images/home-digital/pr-02.jpg"
import pr3 from "@assets/images/home-digital/pr-03.jpg"
import pr4 from "@assets/images/home-digital/pr-04.jpg"
import pr5 from "@assets/images/home-digital/pr-05.jpg"
import pr6 from "@assets/images/home-digital/pr-06.jpg"
import pr7 from "@assets/images/home-digital/pr-07.jpg"
import pr8 from "@assets/images/home-digital/pr-08.jpg"
import pr9 from "@assets/images/home-digital/pr-09.jpg"
import pr10 from "@assets/images/home-digital/pr-10.jpg"
import pr11 from "@assets/images/home-digital/pr-11.jpg"
import pr12 from "@assets/images/home-digital/pr-12.jpg"
import pr13 from "@assets/images/home-digital/pr-13.jpg"
import pr14 from "@assets/images/home-digital/pr-14.jpg"
import pr15 from "@assets/images/home-digital/pr-15.jpg"
import pr16 from "@assets/images/home-digital/pr-16.jpg"


const ProductCard = ({ imageUrl, productName, hoverImageUrl, oldPrice, newPrice, badge }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);
    return (
        <React.Fragment>
            <Col lg={3} md={4} className="col-6">
                <div
                    className="topbar-product-card overlay-hover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden main">
                        {badge ? <span className="new-label bg-indigo text-white rounded-circle text-center"> {badge} </span> : badge}
                        <Image src={isHovered ? hoverImageUrl : imageUrl} className='img-fluid' alt="image" />
                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}>
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold"></i></button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="mb-1 fw-semibold fs-14"><Link href="/product-detail-layout-01" className="main_link_blue">{productName}</Link></h6>
                        <p className="mb-0 fs-14 text-muted">
                            {oldPrice && <del>{oldPrice}</del>}
                            <span className="text-danger">{newPrice}</span>
                        </p>
                    </div>
                </div>
            </Col>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    );
};

const BestSelling = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-4">
                                <div>
                                    <h3 className="position-relative text-capitalize fs-24">
                                        <span>Best Selling</span>
                                    </h3>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-4">
                        <ProductCard
                            imageUrl={pr1}
                            productName="Video & Air Quality Monitor"
                            oldPrice="$312.00"
                            newPrice="$239.00"
                            hoverImageUrl={pr2}
                            badge="-24%"
                        />
                        <ProductCard
                            imageUrl={pr3}
                            productName="X-Star Premium Drone with 4K Camera"
                            newPrice="$450.00"
                            hoverImageUrl={pr4}
                        />
                        <ProductCard
                            imageUrl={pr5}
                            productName="Digital 20.1 4K Video"
                            oldPrice="$440.00"
                            newPrice="$400.00"
                            hoverImageUrl={pr6}
                            badge="-10%"
                        />
                        <ProductCard
                            imageUrl={pr7}
                            productName="On-ear Wireless NXTG"
                            oldPrice="$312.00"
                            newPrice="$225.00"
                            hoverImageUrl={pr8}
                            badge="-28%"
                        />
                        <ProductCard
                            imageUrl={pr9}
                            productName="Wireless Multiroom Speaker"
                            newPrice="$250.00"
                            hoverImageUrl={pr10}
                        />
                        <ProductCard
                            imageUrl={pr11}
                            productName="Smart Watches 4"
                            oldPrice="$350.00"
                            newPrice="$320.00"
                            hoverImageUrl={pr12}
                            badge="-9%"
                        />
                        <ProductCard
                            imageUrl={pr13}
                            productName="Camera TZ85 optical 30 white DMC-TZ85"
                            oldPrice="$550.00"
                            newPrice="$450.00"
                            hoverImageUrl={pr14}
                            badge="-19%"
                        />
                        <ProductCard
                            imageUrl={pr15}
                            productName="X70 Digital Camera White"
                            newPrice="$350.00"
                            hoverImageUrl={pr16}
                        />
                    </Row>
                </Container>
            </section>

        </React.Fragment>
    )
}

export default BestSelling