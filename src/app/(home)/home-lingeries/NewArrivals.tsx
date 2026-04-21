"use client";
import React, {  useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import pr6 from "@assets/images/home-lingerie/pr-06.jpg"
import pr7 from "@assets/images/home-lingerie/pr-07.jpg"
import pr8 from "@assets/images/home-lingerie/pr-08.jpg"
import pr9 from "@assets/images/home-lingerie/pr-09.jpg"
import pr10 from "@assets/images/home-lingerie/pr-10.jpg"
import pr11 from "@assets/images/home-lingerie/pr-11.jpg"
import pr12 from "@assets/images/home-lingerie/pr-12.jpg"
import pr13 from "@assets/images/home-lingerie/pr-13.jpg"
import pr14 from "@assets/images/home-lingerie/pr-14.jpg"
import pr15 from "@assets/images/home-lingerie/pr-15.jpg"
import pr16 from "@assets/images/home-lingerie/pr-16.jpg"
import pr17 from "@assets/images/home-lingerie/pr-17.jpg"
import pr18 from "@assets/images/home-lingerie/pr-18.jpg"
import pr19 from "@assets/images/home-lingerie/pr-19.jpg"
import pr20 from "@assets/images/home-lingerie/pr-20.jpg"
import pr21 from "@assets/images/home-lingerie/pr-21.jpg"
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

const NewArrivals=()=>{

    const [imageUrl, setImageUrl] = useState(pr6);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [imageUrl3, setImageUrl3] = useState(pr10);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);
    const [isHovered5, setIsHovered5] = useState(false);
    const [isHovered6, setIsHovered6] = useState(false);


    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);


    return(
        <React.Fragment>
             <section className="kalles-lingerie-new-products">
                <Container fluid>
                    <Row className="justify-content-center">
                        <Col lg={9}>
                            <div className="text-center">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize font-futura fw-normal line-section-title">
                                        <span>NEW ARRIVALS</span>
                                    </h3>
                                </div>
                                <p className="fs-14 text-muted mb-0">Making this the perfect beach to street look with some denim
                                    cut-offs!</p>
                            </div>
                        </Col>
                    </Row>

                    {/*  */}
                    <div className="row g-lg-4 g-3 justify-content-center row-cols-2 row-cols-md-4 row-cols-lg-6 mt-4">
                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered ? pr7 : imageUrl}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Jayme Bandeau Bikini Top
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$32.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl(pr18);
                                                setIsHovered(false);
                                            }}
                                            className="d-inline-block bg-white rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl(pr7);
                                                setIsHovered(false);
                                            }}
                                            className="d-inline-block bg-dark rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl(pr19);
                                                setIsHovered(false);
                                            }}
                                            className="d-inline-block bg-danger rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered2(true)}
                                onMouseLeave={() => setIsHovered2(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered2 ? pr9 : pr8}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Turks One-Piece Swimsuit
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$40.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered3 ? pr11 : imageUrl3}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Seaside Bandeau Bikini Top
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$42.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl3(pr11);
                                                setIsHovered3(false);
                                            }}
                                            className="d-inline-block bg-white rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl3(pr20);
                                                setIsHovered3(false);
                                            }}
                                            className="d-inline-block bg_color_green rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl3(pr21);
                                                setIsHovered3(false);
                                            }}
                                            className="d-inline-block bg_color_blue rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered4 ? pr13 : pr12}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Callie Off The Shoulder Bikini
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$38.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered5 ? pr15 : pr14}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Zen Color Block One-piece
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$29.99</span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div
                                className="topbar-product-card"
                                onMouseEnter={() => setIsHovered6(true)}
                                onMouseLeave={() => setIsHovered6(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered6 ? pr17 : pr16}
                                        alt="image"
                                        className="img-fluid"
                                    />
                                    <Link
                                        href="#"
                                        className="d-lg-none position-absolute"
                                        style={{ zIndex: 1, top: '10px', left: '10px' }}
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <Link
                                        href="#"
                                        className="wishlistadd d-none d-lg-flex position-absolute"
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="top"
                                        data-bs-title="Add to Wishlist"
                                    >
                                        <i className="facl facl-heart-o text-white"></i>
                                    </Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn rounded-pill fs-14"
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                        style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}
                                    >
                                        <Link
                                            href="#exampleModal" onClick={handleShow}
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
                                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                                         >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1 fw-medium font-futura">
                                        <Link href="/product-detail-layout-01" className="main_link_acid_green">
                                            Brooke Underwire Bikini
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$39.99</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />

        </React.Fragment>
    )
}
export default NewArrivals