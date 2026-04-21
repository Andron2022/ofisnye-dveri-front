"use client";
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

import imageUrl from '@assets/images/home-lookbook/pinner-p-01.jpg'
import hoverImageUrl from '@assets/images/home-lookbook/pinner-p-02.jpg'

import imageUrl2 from '@assets/images/home-lookbook/pinner-p-03.jpg'
import hoverImageUrl2 from '@assets/images/home-lookbook/pinner-p-04.jpg'

import imageUrl9 from '@assets/images/home-lookbook/pinner-p-09.jpg'
import hoverImageUrl10 from '@assets/images/home-lookbook/pinner-p-10.jpg'

import imageUrl7 from '@assets/images/home-lookbook/pinner-p-07.jpg'
import imageUrl8 from '@assets/images/home-lookbook/pinner-p-08.jpg'

import cap1 from '@assets/images/home-lookbook/pinner-p-11.jpg'
import cap2 from '@assets/images/home-lookbook/pinner-p-12.jpg'

import Watch1 from '@assets/images/home-classic/pr-big-24.jpg'
import Watch2 from '@assets/images/home-classic/pr-big-25.jpg'

import Link from 'next/link';



const HairMoadl = ({ modalShow1, handleRightModal1Close }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <React.Fragment>
            <Modal show={modalShow1} onHide={handleRightModal1Close} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <span className="new-label bg-danger text-white rounded-circle"> -30% </span>
                            <Image
                                src={isHovered ? hoverImageUrl : imageUrl}
                                alt="image"
                                className="img-fluid"
                                width={500}
                                height={500}
                            />
                            <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                                <i className="facl facl-heart-o"></i>
                            </Link>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal"><span>Quick
                                    Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <h6 className="mb-2">
                                <Link href="/product-detail-layout-01" className="product-title">Organza Hair Scrunchie</Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$5.00</del> <span className="text-danger">$3.50</span>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

const FashionModal = ({ modalShow2, handleRightModal2Close }: any) => {
    const [isHovered2, setIsHovered2] = useState(false);
    return (
        <React.Fragment>
            <Modal show={modalShow2} onHide={handleRightModal2Close} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div
                        className="topbar-product-card"
                        onMouseEnter={() => setIsHovered2(true)}
                        onMouseLeave={() => setIsHovered2(false)}
                    >
                        <div className="position-relative overflow-hidden">
                            <span className="new-label bg-danger text-white rounded-circle"> -56% </span>
                            <Image
                                src={isHovered2 ? hoverImageUrl2 : imageUrl2}
                                alt="image"
                                className="img-fluid"
                                width={500}
                                height={500}
                            />
                            <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                                <i className="facl facl-heart-o"></i>
                            </Link>

                            <div className="product-button d-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                    View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal"><span>Quick
                                    Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <h6 className="mb-2">
                                <Link href="/product-detail-layout-01" className="product-title">Striped Long Sleeve Top</Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <del>$45.00</del> <span className="text-danger">$20.00</span>
                            </p>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

const ProductInfoModal = ({ modalShow3, handleRightModal3Close }: any) => {
    return (
        <Modal show={modalShow3} onHide={handleRightModal3Close} centered className="modal-overl modal-md">
            <Modal.Header closeButton>
                <Modal.Title className="fs-16 mb-0 fw-normal">Sweatshirt in Stripe</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted mb-0">
                    With groundbreaking water resistant capabilities, The Mission has the highest waterproof rating of any smartwatch on the market.
                </p>
            </Modal.Body>
        </Modal>
    );
};

const ProductHoverModal = ({ modalShow4, handleRightModal4Close }: any) => {
    const [isHovered3, setIsHovered3] = useState(false);

    return (
        <Modal show={modalShow4} onHide={handleRightModal4Close} centered className="modal-overl pin_popup">
            <Modal.Body className="p-20">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered3(true)}
                    onMouseLeave={() => setIsHovered3(false)}
                >
                    <div className="position-relative overflow-hidden">
                        <Image
                            src={isHovered3 ? hoverImageUrl10 : imageUrl9}
                            alt="image"
                            className="img-fluid"
                            width={500}
                            height={500}
                        />
                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                            <i className="facl facl-heart-o"></i>
                        </Link>

                        <div className="product-button d-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick
                                Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">Men Knit Sweater</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$95.00</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const FashionModall = ({ modalShow5, handleRightModal5Close }: any) => {
    const [isHovered4, setIsHovered4] = useState(false);

    return (
        <Modal show={modalShow5} onHide={handleRightModal5Close} centered className="modal-overl pin_popup">
            <Modal.Body className="p-20">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered4(true)}
                    onMouseLeave={() => setIsHovered4(false)}
                >
                    <div className="position-relative overflow-hidden">
                        <Image
                            src={isHovered4 ? imageUrl8 : imageUrl7}
                            alt="image"
                            className="img-fluid"
                            width={500}
                            height={500}
                        />
                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                            <i className="facl facl-heart-o"></i>
                        </Link>

                        <div className="product-button d-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick
                                Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">Men Knit Sweater</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$95.00</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const SortModal = ({ modalShow6, handleRightModal6Close }: any) => {
    const [isHovered4, setIsHovered4] = useState(false);

    return (
        <Modal show={modalShow6} onHide={handleRightModal6Close} centered className="modal-overl pin_popup">
            <Modal.Body className="p-20">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered4(true)}
                    onMouseLeave={() => setIsHovered4(false)}
                >
                    <div className="position-relative overflow-hidden">
                        <Image
                            src={isHovered4 ? hoverImageUrl10 : imageUrl9}
                            alt="image"
                            className="img-fluid"
                            width={500}
                            height={500}
                        />
                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                            <i className="facl facl-heart-o"></i>
                        </Link>

                        <div className="product-button d-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick
                                Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">Men Knit Sweater</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$95.00</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const CapModal = ({ modalShow7, handleRightModal7Close }: any) => {
    const [isHovered5, setIsHovered5] = useState(false);

    return (
        <Modal show={modalShow7} onHide={handleRightModal7Close} centered className="modal-overl pin_popup">
            <Modal.Body className="p-20">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered5(true)}
                    onMouseLeave={() => setIsHovered5(false)}
                >
                    <div className="position-relative overflow-hidden">
                        <Image
                            src={isHovered5 ? cap2 : cap1}
                            alt="image"
                            className="img-fluid"
                            width={500}
                            height={500}
                        />
                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                            <i className="facl facl-heart-o"></i>
                        </Link>

                        <div className="product-button d-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick
                                Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">Circle Snapback Cap</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <span>$25.00</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const WatchModal = ({ modalShow10, handleRightModal10Close }: any) => {
    const [isHovered8, setIsHovered8] = useState(false);

    return (
        <Modal show={modalShow10} onHide={handleRightModal10Close} centered className="modal-overl pin_popup">
            <Modal.Body className="p-20">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered8(true)}
                    onMouseLeave={() => setIsHovered8(false)}
                >
                    <div className="position-relative overflow-hidden">
                        <span className="new-label bg-danger text-white rounded-circle"> -34% </span>
                        <Image
                            src={isHovered8 ? Watch2 : Watch1}
                            alt="image"
                            className="img-fluid"
                            width={500}
                            height={500}
                        />
                        <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" title="Add to Wishlist">
                            <i className="facl facl-heart-o"></i>
                        </Link>

                        <div className="product-button d-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick
                                View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" ><span>Quick
                                Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                    </div>
                    <div className="mt-3 text-center">
                        <h6 className="mb-2">
                            <Link href="/product-detail-layout-01" className="product-title">La Bohème Rose Gold</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            <del>$60.00</del> <span className="text-danger">$40.00</span>
                        </p>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

const ProductInfoModal2 = ({ modalShow8, handleRightModal8Close }: any) => {
    return (
        <Modal show={modalShow8} onHide={handleRightModal8Close} centered className="modal-overl modal-md">
            <Modal.Header closeButton>
                <Modal.Title className="fs-16 mb-0 fw-normal">Graphic T-shirt</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted mb-0">
                    With groundbreaking water resistant capabilities, The Mission has the highest waterproof rating of any smartwatch on the market.
                </p>
            </Modal.Body>
        </Modal>
    );
};
const ProductInfoModal3 = ({ modalShow9, handleRightModal9Close }: any) => {
    return (
        <Modal show={modalShow9} onHide={handleRightModal9Close} centered className="modal-overl modal-md">
            <Modal.Header closeButton>
                <Modal.Title className="fs-16 mb-0 fw-normal">01 - Water Resistance</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p className="text-muted mb-0">
                    With groundbreaking water resistant capabilities, The Mission has the highest waterproof rating of any smartwatch on the market.
                </p>
            </Modal.Body>
        </Modal>
    );
};


export { HairMoadl, FashionModal, ProductInfoModal, ProductHoverModal, FashionModall, SortModal, CapModal, ProductInfoModal2, ProductInfoModal3, WatchModal }