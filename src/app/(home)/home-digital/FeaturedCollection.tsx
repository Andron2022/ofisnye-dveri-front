"use client";
import React, { useState } from 'react'
import { Container, Nav, Row, Tab } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pr3 from "@assets/images/home-digital/pr-03.jpg"
import pr4 from "@assets/images/home-digital/pr-04.jpg"
import pr7 from "@assets/images/home-digital/pr-07.jpg"
import pr8 from "@assets/images/home-digital/pr-08.jpg"
import pr9 from "@assets/images/home-digital/pr-09.jpg"
import pr10 from "@assets/images/home-digital/pr-10.jpg"
import pr11 from "@assets/images/home-digital/pr-11.jpg"
import pr12 from "@assets/images/home-digital/pr-12.jpg"
import pr19 from "@assets/images/home-digital/pr-19.jpg"
import pr20 from "@assets/images/home-digital/pr-20.jpg"
import pr21 from "@assets/images/home-digital/pr-21.jpg"
import pr22 from "@assets/images/home-digital/pr-22.jpg"
import pr23 from "@assets/images/home-digital/pr-23.jpg"
import pr24 from "@assets/images/home-digital/pr-24.jpg"
import pr25 from "@assets/images/home-digital/pr-25.jpg"
import pr26 from "@assets/images/home-digital/pr-26.jpg"


const data = [
    {
        label: "-9%",
        imageUrl: pr11,
        hoverImageUrl: pr12,
        name: "Smart Watches 4",
        originalPrice: "$350.00",
        discountedPrice: "$320.00"
    },
    {
        imageUrl: pr9,
        hoverImageUrl: pr10,
        name: "Wireless Multiroom Speaker",
        price: "$250.00"
    },
    {
        imageUrl: pr19,
        hoverImageUrl: pr20,
        name: "ZenBook 3 Ultrabook 8GB 512SSD",
        price: "$250.00"
    },
    {
        imageUrl: pr3,
        hoverImageUrl: pr4,
        name: "X-Star Premium Drone with 4K Camera",
        price: "$450.00"
    },
    {
        label: "-28%",
        imageUrl: pr7,
        hoverImageUrl: pr8,
        name: "On-ear Wireless NXTG",
        originalPrice: "$312.00",
        discountedPrice: "$225.00"
    },
    {
        imageUrl: pr22,
        hoverImageUrl: pr21,
        name: "XPS 13 Laptop 6GB W10",
        price: "$1,115.00"
    },
    {
        label: "-69%",
        imageUrl: pr23,
        hoverImageUrl: pr24,
        name: "Gear Virtual Reality 3D",
        originalPrice: "$312.00",
        discountedPrice: "$99.00"
    },
    {
        label: "-24%",
        imageUrl: pr25,
        hoverImageUrl: pr26,
        name: "XPS 13 Laptop 6GB W10 Infinity Edge Display",
        originalPrice: "$312.00",
        discountedPrice: "$239.00"
    }
];

const FeaturedCard = ({ item }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <div className="col">
                <div
                    className="topbar-product-card overlay-hover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden main">
                        {item.label && <span className="new-label bg-indigo text-white rounded-circle text-center">{item.label}</span>}
                        <Image

                            src={isHovered ? item.hoverImageUrl : item.imageUrl}
                            alt="image"
                            className="img-fluid"
                        />
                        {item.wishlist && (
                            <>
                                <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>
                                <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                                    <i className="facl facl-heart-o text-white"></i>
                                </Link>
                            </>
                        )}
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
                        <h6 className="mb-1 fw-semibold fs-14"><Link href='/product-detail-layout-01' className="main_link_blue">{item.name}</Link></h6>
                        <p className="mb-0 fs-14 text-muted">
                            {item.originalPrice && <del>{item.originalPrice}</del>}{" "}
                            <span className={item.discountedPrice ? "text-danger" : ""}>{item.discountedPrice || item.price}</span>
                        </p>
                    </div>
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    );
};

const FeaturedCollection = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product">
                <Container >
                    <Row className="justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-3">
                                <div className="mb-2">
                                    <h3 className="position-relative flex fw-semibold">
                                        <span>Featured Collection</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </Row>
                    <div className="mb-4">
                        <Tab.Container id="custom-tabs-example" defaultActiveKey="accessories-tab">
                            <Nav className="tab_header gap-lg-4 justify-content-center mt-4 mb-0" >
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="accessories-tab" className="rounded-pill">Accessories</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="smart-tv-tab" className="rounded-pill">Smart TV</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="camera-tab" className="rounded-pill">Camera</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="digital-tab" className="rounded-pill">Digital</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4' id="pills-tabContent">
                                <Tab.Pane eventKey="accessories-tab" className='fade show' tabIndex={0}>
                                    <div className="row g-4 row-cols-2 row-cols-sm-3 row-cols-lg-4">
                                        {data.map((item, index) => (
                                            <FeaturedCard key={index} item={item} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="smart-tv-tab" className='fade ' tabIndex={0}>
                                    <div className="row g-4 row-cols-2 row-cols-sm-3 row-cols-lg-4">
                                        {data.map((item, index) => (
                                            <FeaturedCard key={index} item={item} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="camera-tab" className='fade ' tabIndex={0}>
                                    <div className="row g-4 row-cols-2 row-cols-sm-3 row-cols-lg-4">
                                        {data.map((item, index) => (
                                            <FeaturedCard key={index} item={item} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="digital-tab" className='fade ' tabIndex={0}>
                                    <div className="row g-4 row-cols-2 row-cols-sm-3 row-cols-lg-4">
                                        {data.map((item, index) => (
                                            <FeaturedCard key={index} item={item} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default FeaturedCollection