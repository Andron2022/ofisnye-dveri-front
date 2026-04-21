"use client";
import React, { useState } from 'react'
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import slide from "@assets/images/home-furniture/slide.jpg"

import pr7 from "@assets/images/home-furniture/pr-07.jpg"
import pr8 from "@assets/images/home-furniture/pr-08.jpg"
import pr9 from "@assets/images/home-furniture/pr-09.jpg"

const HomeSection = () => {

    const [show, setShow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    return (
        <React.Fragment>
            <section className="kalles-home-furniture position-relative home-lookbook-section" style={{ backgroundImage: `url(${slide.src})` }}>
                <div className="pin-type position-absolute position-01">
                    <span className="zoompin"></span>
                    <Link href="#pinType1" className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center position-relative" onClick={handleShow}>
                        <i className="las la-plus position-relative"></i>
                    </Link>
                </div>

                <div className="pin-type position-absolute position-02">
                    <span className="zoompin"></span>
                    <Link href="#pinType2" className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center position-relative" onClick={handleShow2}>
                        <i className="las la-plus position-relative"></i>
                    </Link>
                </div>
                <div className="pin-type position-absolute position-03">
                    <span className="zoompin"></span>
                    <Link href="#pinType3" className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center position-relative" onClick={handleShow3}>
                        <i className="las la-plus position-relative"></i>
                    </Link>
                </div>

                {/* modal */}
                <Modal show={show} onHide={handleClose} centered className='fade modal-overl pin_popup' id="pinType1">
                    <Modal.Body className="p-20">
                        <div
                            className="topbar-product-card"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div className="position-relative overflow-hidden">
                                <Image src={isHovered ? pr7 : pr7} alt="image" className="img-fluid" />
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute">
                                        <i className="facl facl-heart-o"></i>
                                    </Button>
                                </OverlayTrigger>

                                <div className="product-button product-btn-warning d-flex flex-column gap-2">
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Button>
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 fs-15 lh-base">
                                    <Link href="/product-detail-layout-01" className="main_link_warning">
                                        HAY About A Danish Style Dining Chair White
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-16 text-muted">
                                    <span>$300.00</span>
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={show2} onHide={handleClose2} centered className='fade modal-overl pin_popup' id="pinType2">
                    <Modal.Body className="p-20">
                        <div
                            className="topbar-product-card"
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                        >
                            <div className="position-relative overflow-hidden">
                                <Image src={isHovered2 ? pr8 : pr8} alt="image" className="img-fluid" />
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute">
                                        <i className="facl facl-heart-o"></i>
                                    </Button>
                                </OverlayTrigger>

                                <div className="product-button product-btn-warning d-flex flex-column gap-2">
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Button>
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 fs-15 lh-base">
                                    <Link href="/product-detail-layout-01" className="main_link_warning">
                                        HAY About A Danish Style Dining Chair White
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-16 text-muted">
                                    <span>$300.00</span>
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <Modal show={show3} onHide={handleClose3} centered className='fade modal-overl pin_popup' id="pinType3">
                    <Modal.Body className="p-20">
                        <div
                            className="topbar-product-card"
                            onMouseEnter={() => setIsHovered3(true)}
                            onMouseLeave={() => setIsHovered3(false)}
                        >
                            <div className="position-relative overflow-hidden">
                                <Image src={isHovered3 ? pr9 : pr9} alt="image" className="img-fluid" />
                                <OverlayTrigger
                                    placement="right"
                                    overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                >
                                    <Button variant="link" className="wishlistadd position-absolute">
                                        <i className="facl facl-heart-o"></i>
                                    </Button>
                                </OverlayTrigger>

                                <div className="product-button product-btn-warning d-flex flex-column gap-2">
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                    </Button>
                                    <Button variant="warning" className="rounded-pill fs-14">
                                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-3 text-center">
                                <h6 className="mb-2 fs-15 lh-base">
                                    <Link href="/product-detail-layout-01" className="main_link_warning">
                                        HAY About A Danish Style Dining Chair White
                                    </Link>
                                </h6>
                                <p className="mb-0 fs-16 text-muted">
                                    <span>$300.00</span>
                                </p>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </section>
        </React.Fragment>
    )
}
export default HomeSection