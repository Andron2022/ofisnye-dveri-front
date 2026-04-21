"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import prPin11 from '@assets/images/home-lookbook-collection/pr-pin-11.jpg'; // Adjust the path
import prPin12 from '@assets/images/home-lookbook-collection/pr-pin-12.jpg';

import pr10 from '@assets/images/products/pr-10.jpg'
import pr41 from '@assets/images/products/pr-41.jpg'

import pr51 from '@assets/images/home-lookbook-collection/pr-pin-51.jpg'
import pr52 from '@assets/images/home-lookbook-collection/pr-pin-51.jpg'

import pr61 from '@assets/images/home-lookbook-collection/pr-pin-61.jpg'
import pr62 from '@assets/images/home-lookbook-collection/pr-pin-62.jpg'

import prr41 from '@assets/images/home-lookbook-collection/pr-pin-41.jpg'
import prr42 from '@assets/images/home-lookbook-collection/pr-pin-42.jpg'
import ProductModal from "@src/commonsections/ProductModal";
import AddToCardModal from "@src/commonsections/AddToCardModal";
import Link from "next/link";

const PinModal1 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? prPin12 : prPin11}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                New Look lace up trainer
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$14.99</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const PinModal2 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? pr41 : pr10}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                Tote Bag Cream Cord
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$16.00</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const PinModal3 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? pr52 : pr51}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                Tote Bag Cream Cord
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$16.00</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const PinModal4 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? pr62 : pr61}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                Tote Bag Cream Cord Sweatshirt Stripe
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$18.00</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const PinModal5 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? prr42 : prr41}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                Men Knit Sweater
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$95.00</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const PinModal6 = ({ show, handleClose }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showw, setShoww] = useState(false);
    const [cardShow, setCardShoww] = useState(false);
    const handleModelClose = () => setShoww(false);
    const handleModelShow = () => setShoww(true);

    const handleAddToCardModalShow = () => setCardShoww(true);
    const handleAddToCardModalClose = () => setCardShoww(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <Image
                                src={isHovered ? prr42 : prr41}
                                alt="image"
                                className="img-fluid"
                            />
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip id="tooltip-right">Add to Wishlist</Tooltip>}
                            >
                                <Link href="#" className="wishlistadd position-absolute">
                                    <i className="facl facl-heart-o"></i>
                                </Link>
                            </OverlayTrigger>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleModelShow}><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-toggle="modal" data-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>

                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">
                                High Waist Skinny Jean
                            </Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$95.00</span>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
            <ProductModal show={showw} handleClose={handleModelClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );

};

export { PinModal1, PinModal2, PinModal3, PinModal4, PinModal5, PinModal6 }
