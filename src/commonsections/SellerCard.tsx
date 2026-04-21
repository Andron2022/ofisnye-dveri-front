"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pro10 from "@assets/images/products/pr-10.jpg"
import pro11 from "@assets/images/products/pr-11.jpg"
import pro12 from "@assets/images/products/pr-12.jpg"
import pro14 from "@assets/images/products/pr-14.jpg"
import pro15 from "@assets/images/products/pr-15.jpg"
import pro21 from "@assets/images/products/pr-21.jpg"
import pro23 from "@assets/images/products/pr-23.jpg"
import pro29 from "@assets/images/products/pr-29.jpg"
import pro30 from "@assets/images/products/pr-30.jpg"
import pro33 from "@assets/images/products/pr-33.jpg"
import pro34 from "@assets/images/products/pr-34.jpg"

import metro1 from "@assets/images/home-metro/pr-q1.jpg"
import metro2 from "@assets/images/home-metro/pr-q2.jpg"
import metro4 from "@assets/images/home-metro/pr-q4.jpg"
import metro5 from "@assets/images/home-metro/pr-q5.jpg"

const SellerCard = () => {

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);

    // first row
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    const [imageUrl1, setImageUrl1] = useState(pro15);
    const [isHovered3, setIsHovered3] = useState(false);

    const [imageUrl2, setImageUrl2] = useState(pro12);

    // second row
    const [imageUrl3, setImageUrl3] = useState(pro33);
    const [isHovered4, setIsHovered4] = useState(false);

    const [isHovered5, setIsHovered5] = useState(false);
    const imageUrl = isHovered5 ? metro5 : metro4;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);


    return (
        <React.Fragment>
            <section>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span>Best Seller</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top sale in
                                    this week</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="g-lg-4 g-3 mt-4">
                        {/* first row */}
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3" onMouseEnter={() => setIsHovered1(true)} onMouseLeave={() => setIsHovered1(false)}>
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered1 ? pro30 : pro29} alt="image" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }} onClick={handleShow}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal"><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                </div>
                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">City Backpack Black</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$55.00</span>
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3" onMouseEnter={() => setIsHovered2(true)} onMouseLeave={() => setIsHovered2(false)}>
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered2 ? pro11 : pro10} alt="image" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onCanPlay={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal"><i className="iccl iccl-eye fw-semibold" onClick={handleShow}></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                </div>
                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1">Women Black Pants</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$100.00</span>
                                    </p>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div
                                className="topbar-product-card pb-3"
                                onMouseEnter={() => setIsHovered3(true)}
                                onMouseLeave={() => setIsHovered3(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image
                                        src={isHovered3 ? pro14 : imageUrl1}
                                        alt="image"
                                        className="img-fluid w-100 object-fit-cover"
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

                                    <div className="bg-overlay"></div>
                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
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
                                        style={{ zIndex: 1 }}
                                    >
                                        <Link
                                            href="#exampleModal"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            onClick={handleShow}
                                        >
                                            <i className="iccl iccl-eye fw-semibold"></i>
                                        </Link>
                                        <button
                                            type="button"
                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                            style={{ width: '36px', height: '36px' }}
                                            data-bs-toggle="modal"
                                            data-bs-target="#cardModal"
                                            onClick={handleAddToCardModalShow}
                                        >
                                            <i className="iccl iccl-cart fw-semibold"></i>
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <h6 className="mb-1">
                                        <Link href="#!" className="product-title">
                                            Mercury Tee
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span className="text-muted">$68.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl1(metro1);
                                                setIsHovered3(false);
                                            }}
                                            style={{ backgroundImage: `url(${metro1.src})`, backgroundSize: 'cover' }}
                                            className="d-inline-block bg-body-tertiary rounded-circle"
                                        ></Link>
                                        <Link
                                            href="#!"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setImageUrl1(metro2);
                                                setIsHovered3(false);
                                            }}
                                            style={{ backgroundImage: `url(${metro2.src})`, backgroundSize: 'cover' }}
                                            className="d-inline-block bg_color_pink rounded-circle"
                                        ></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={imageUrl2} alt="ImageUrl2Img" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1"><Link href="/product-detail-layout-01" className="product-title">Men pants</Link></h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$49.00 – $56.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link href="#!" onMouseOver={() => setImageUrl2(pro12)} onClick={(e) => { e.preventDefault(); setImageUrl2(pro12); }} className="d-inline-block bg_color_blue rounded-circle"></Link>
                                        <Link href="#!" onMouseOver={() => setImageUrl2(pro34)} onClick={(e) => { e.preventDefault(); setImageUrl2(pro34); }} className="d-inline-block bg-dark rounded-circle"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* second row */}
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <span className="new-label bg-danger text-white rounded-circle"> -34% </span>
                                    <Image src={pro21} alt="Pro21Img" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                    <p className="product-size mb-0 text-center text-white fw-medium"> S, M, L</p>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1"><Link href="/product-detail-layout-01" className="product-title">Short Sleeved Hoodie</Link></h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <del>$45.00</del>
                                        <span className="text-danger">$30.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3"
                                onMouseEnter={() => setIsHovered4(true)}
                                onMouseLeave={() => setIsHovered4(false)}
                            >
                                <div className="position-relative overflow-hidden">
                                    <Image src={isHovered4 ? pro34 : imageUrl3} alt="image" className="img-fluid w-100 object-fit-cover" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                </div>
                                <div className="mt-3 d-block">
                                    <h6 className="mb-1"> Sweatshirt In Geometric Print</h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$36.00</span>
                                    </p>
                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                        <Link href="#!" onMouseOver={() => setImageUrl3(pro33)} onClick={(e) => { e.preventDefault(); setImageUrl3(pro33); }} className="d-inline-block bg-dark rounded-circle"></Link>
                                        <Link href="#!" onMouseOver={() => setImageUrl3(pro34)} onClick={(e) => { e.preventDefault(); setImageUrl3(pro34); }} className="d-inline-block bg_color_blue rounded-circle"></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3">
                                <div className="position-relative overflow-hidden">
                                    <Image src={pro23} alt="Pro23Img" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <h6 className="mb-1"><Link href="/product-detail-layout-01" className="product-title">Dusk Pom Beanie</Link></h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$25.00</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="topbar-product-card pb-3"
                                onMouseEnter={() => setIsHovered5(true)}
                                onMouseLeave={() => setIsHovered5(false)}>
                                <div className="position-relative overflow-hidden">
                                    <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid object-fit-cover w-100" />
                                    <Link href="#" className="d-lg-none position-absolute " style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>
                                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o text-white"></i></Link>

                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                            <i className="iccl iccl-cart"></i></button>
                                    </div>
                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                        <Link href="#exampleModal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                            <i className="iccl iccl-cart fw-semibold"></i></button>
                                    </div>
                                </div>
                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                    <h6 className="mb-1"> Circle Snapback Cap </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <span>$25.00</span>
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </Row>
                </Container>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default SellerCard