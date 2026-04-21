"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import { Button, Col, Container, Modal, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import Link from 'next/link'

import look1 from "@assets/images/home-lingerie/lookbook-pin-01.jpg"
import look2 from "@assets/images/home-lingerie/lookbook-pin-02.jpg"

import pr1 from "@assets/images/home-lingerie/pr-01.jpg"
import pr2 from "@assets/images/home-lingerie/pr-02.jpg"
import pr3 from "@assets/images/home-lingerie/pr-03.jpg"
import pr4 from "@assets/images/home-lingerie/pr-04.jpg"
import pr5 from "@assets/images/home-lingerie/pr-05.jpg"

const OurStory = () => {

    const [show, setShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(pr1);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleImageChange = (newImageUrl: any) => {
        setImageUrl(newImageUrl);
    };

    const [show2, setShow2] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);


    return (
        <React.Fragment>
            <section className="kalles-lingerie-main">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <div className="text-center">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize font-futura fw-normal line-section-title">
                                        <span>OUR STORY</span>
                                    </h3>
                                </div>
                                <p className="fs-14 text-muted mb-3 pb-2">When you think of swimwear, you likely don’t think about
                                    high necklines. After all, most styles are swooping so low in the front that they’re
                                    absolutely impossible to wear if you have a large bust. But don’t be mistaken – high
                                    neckline bikini tops are all the rage right now, and they’re super chic!</p>
                                <Link className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-/4" href="shop">Read More</Link>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-2 mt-5">

                        <Col md={6}>
                            <div className="position-relative">
                                <Image src={look1} className="img-fluid" alt="Look1Img" />
                                <div className="pin-type position-absolute position-05">
                                    <span className="zoompin"></span>
                                    <Link href='#pinType8' className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" onClick={handleShow}>
                                        <i className="nav_link_icon position-relative"></i>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="position-relative">
                                <Image src={look2} className="img-fluid" alt="Look2Img" />
                                <div className="pin-type position-absolute position-05">
                                    <span className="zoompin"></span>
                                    <Link href='#pinType9' className="bg-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" onClick={handleShow2}>
                                        <i className="nav_link_icon position-relative"></i>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
                {/* pin type */}
                <Modal show={show} onHide={handleClose} centered className="fade modal-overl pin_popup" id="pinType8">
                    <Modal.Body className="p-20">
                        <div
                            className="topbar-product-card"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="position-relative overflow-hidden">
                                <Image src={isHovered ? imageUrl : pr1} alt="image" className="img-fluid" />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute d-lg-none" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute d-none d-lg-flex">
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Button>
                                </OverlayTrigger>

                                <div className="product-button d-flex flex-column gap-2">
                                    <Button variant="link" className="btn rounded-pill fs-14">
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Button>
                                    <Button variant="link" className="btn rounded-pill fs-14">
                                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                    </Button>
                                </div>
                                <p className="product-size mb-0 text-center text-white fw-medium">S, M, L, XL, 2XL</p>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 font-futura fw-medium fs-15">
                                    <Link href="#" className="main_link">Mia & Marley Bikini Set</Link>
                                </h6>
                                <p className="mb-0 fs-14 text-muted">
                                    <span>$35.00</span>
                                </p>
                                <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                    <Link href="#!" onClick={() => handleImageChange(pr2)} className="d-inline-block bg-dark rounded-circle"></Link>
                                    <Link href="#!" onClick={() => handleImageChange(pr3)} className="d-inline-block bg-danger rounded-circle"></Link>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal show={show2} onHide={handleClose2} centered className="fade modal-overl pin_popup" id="pinType9">
                    <Modal.Body className="p-20">
                        <div
                            className="topbar-product-card"
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                        >
                            <div className="position-relative overflow-hidden">
                                <Image src={isHovered2 ? pr5 : pr4} alt="image" className="img-fluid" />
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute d-lg-none" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Button>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute d-none d-lg-flex">
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Button>
                                </OverlayTrigger>

                                <div className="product-button d-flex flex-column gap-2">
                                    <Button variant="link" className="btn rounded-pill fs-14">
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Button>
                                    <Button variant="link" className="btn rounded-pill fs-14">
                                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 font-futura fw-medium fs-15">
                                    <a href="#" className="main_link">Turks One-Piece Swimsuit</a>
                                </h6>
                                <p className="mb-0 fs-14 text-muted">
                                    <span>$40.00</span>
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* 
        <div className="modal fade modal-overl pin_popup" id="pinType9" tabindex="-1" aria-labelledby="pinType9Label" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body p-20">
                        <div x-data="{ imageUrl: 'assets/images/home-lingerie/pr-04.jpg', isHovered: false }" className="topbar-product-card" x-on:mouseenter="isHovered = true" x-on:mouseleave="isHovered = false">
                            <div className="position-relative overflow-hidden">
                                <Image :src="isHovered ? 'assets/images/home-lingerie/pr-05.jpg' : imageUrl" alt="imageImg" className="img-fluid">
                                <Link href="#" className="d-lg-none position-absolute " style="z-index: 1; top:10px; left:10px;" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                <div className="product-button d-flex flex-column gap-2">
                                    <Link href="#!" className="btn rounded-pill fs-14"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                    <Link href="#!" className="btn rounded-pill fs-14"><span>Quick Shop</span> <i className="iccl iccl-cart"></i></Link>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 font-futura fw-medium fs-15"><Link href="#!" className="main_link">Turks
                                        One-Piece Swimsuit</Link></h6>
                                <p className="mb-0 fs-14 text-muted">
                                    <span>$40.00</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
            </section>
        </React.Fragment>
    )
}
export default OurStory