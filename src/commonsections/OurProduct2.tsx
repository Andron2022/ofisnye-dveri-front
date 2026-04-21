"use client";
import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Button, Col, Container, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap'


import pro1 from "@assets/images/products/pr-01.jpg"
import pro2 from "@assets/images/products/pr-02.jpg"
import pro4 from "@assets/images/products/pr-04.jpg"
import pro5 from "@assets/images/products/pr-05.jpg"
import pro7 from "@assets/images/products/pr-07.jpg"
import pro8 from "@assets/images/products/pr-08.jpg"
import pro9 from "@assets/images/products/pr-09.jpg"
import pro11 from "@assets/images/products/pr-11.jpg"
import pro12 from "@assets/images/products/pr-12.jpg"
import pro14 from "@assets/images/products/pr-14.jpg"
import pro15 from "@assets/images/products/pr-15.jpg"
import pro23 from "@assets/images/products/pr-23.jpg"

import pro29 from "@assets/images/products/pr-29.jpg"
import pro30 from "@assets/images/products/pr-30.jpg"
import pro31 from "@assets/images/products/pr-31.jpg"
import pro32 from "@assets/images/products/pr-32.jpg"
import pro33 from "@assets/images/products/pr-33.jpg"
import pro34 from "@assets/images/products/pr-34.jpg"


import metro1 from "@assets/images/home-metro/pr-q1.jpg"
import metro2 from "@assets/images/home-metro/pr-q2.jpg"
import metro10 from "@assets/images/home-metro/pr-q10.jpg"
import metro11 from "@assets/images/home-metro/pr-q11.jpg"

import pr29 from "@assets/images/home-fashion-9/pr-s-29.jpg"
import pr30 from "@assets/images/home-fashion-9/pr-s-30.jpg"
import pr43 from "@assets/images/home-fashion-9/pr-s-43.jpg"
import ProductModal from './ProductModal';
import AddToCardModal from './AddToCardModal';


const ProductCard = ({ product, handleAddToCardModalShow, handleShow }: any) => {
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="col-md-3 col-6">
            <div
                className="topbar-product-card pb-3"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden">
                    {product.hoverImageUrl ?
                        <Image
                            src={isHovered ? product.hoverImageUrl : imageUrl}
                            alt="image"
                            className="img-fluid object-fit-cover w-100"
                        />
                        :
                        <Image
                            src={imageUrl}
                            alt="ImageUrlImg"
                            className="img-fluid object-fit-cover w-100"
                        />
                    }
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
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn rounded-pill fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div
                        className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                        style={{ zIndex: 1 }}
                    >
                        <Link
                            href="#exampleModal"
                            data-bs-toggle="modal"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: '36px', height: '36px' }}
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
                <Link href={product.detailUrl} className="mt-3 d-block">
                    <h6 className="mb-1">{product.name}</h6>
                    <p className="mb-0 fs-14 text-muted">
                        <span>${product.price}</span>
                    </p>
                </Link>
                {product.colors ?
                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                        {product.colors && product.colors.map((color: { imageUrl: any; }, index: React.Key | null | undefined) => (
                            <Link
                                href="#!"
                                key={index}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImageUrl(color.imageUrl.src);
                                    setIsHovered(false);
                                }}
                                style={{
                                    background: `url('${color.imageUrl.src}')`,
                                    backgroundSize: 'cover'
                                }}
                                className="d-inline-block bg-body-tertiary rounded-circle"
                            />
                        ))}
                    </div>
                    :
                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                        {product.additionalColors && product.additionalColors.map((color: { imageUrl: any; className: any; }, index: React.Key | null | undefined) => (
                            <Link
                                key={index}
                                href="#!"
                                onMouseOver={() => setImageUrl(color.imageUrl)}
                                onClick={(e) => { e.preventDefault(); setImageUrl(color.imageUrl); }}
                                className={`d-inline-block rounded-circle ${color.className}`}
                            >
                            </Link>
                        ))}
                    </div>
                }


            </div>
        </div>
    );
};


const OurProduct2 = () => {

    // feature
    const [isHovered11, setIsHovered11] = useState(false);
    const [isHovered22, setIsHovered22] = useState(false);

    const [imageUrl, setImageUrl] = useState(pro4);
    const [imageUrl2, setImageUrl2] = useState(pro11);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    const productsFour = [
        {
            imageUrl: pro29,
            hoverImageUrl: pro30,
            name: 'City Backpack Black',
            price: 55.00,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: metro10,
            hoverImageUrl: metro11,
            name: 'Women Black Pants',
            price: 100.00,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pro15,
            hoverImageUrl: pro14,
            name: 'Mercury Tee',
            price: 68.00,
            detailUrl: '#!',
            colors: [
                { imageUrl: metro1 },
                { imageUrl: metro2 },
            ],
        },
        {
            imageUrl: pro12,
            name: 'Men pants',
            price: '49.00 – 56.00',
            detailUrl: '/product-detail-layout-01',
            additionalColors: [
                { imageUrl: pro12, className: 'bg_color_blue' },
                { imageUrl: pro34, className: 'bg-dark' },
            ],
        },
    ];

    const productsEight = [
        {
            imageUrl: pr29,
            hoverImageUrl: pr30,
            name: 'Short Sleeved Hoodie',
            price: 30.00,
            originalPrice: 45.00,
            isDiscounted: true,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pro33,
            hoverImageUrl: metro11,
            name: 'Sweatshirt in Geometric Print',
            price: 35.00,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pro23,
            hoverImageUrl: pro23,
            name: 'Dusk Pom Beanie',
            price: 25.00,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pr43,
            hoverImageUrl: pr43,
            name: 'Stan Smith Trainers',
            price: 75.00,
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pro12,
            name: "Men pants",
            price: "49.00 – $56.00",
            detailUrl: '/product-detail-layout-01',
            additionalColors: [
                { imageUrl: pro12, className: 'bg_color_blue' },
                { imageUrl: pro34, className: 'bg-dark' },
            ],
        },
        {
            imageUrl: pro23,
            name: "Dusk Pom Beanie",
            price: "25.00",
            detailUrl: '/product-detail-layout-01',
        },
        {
            imageUrl: pro12,
            name: 'Men pants',
            price: '49.00 – 56.00',
            detailUrl: '/product-detail-layout-01',
            additionalColors: [
                { imageUrl: pro12, className: 'bg_color_blue' },
                { imageUrl: pro34, className: 'bg-dark' },
            ],
        },
        {
            imageUrl: pro15,
            hoverImageUrl: pro14,
            name: 'Mercury Tee',
            price: "68.00",
            detailUrl: '#!',
            colors: [
                { imageUrl: metro1 },
                { imageUrl: metro2 },
            ],
        }
    ];


    return (
        <React.Fragment>
            <section className="type_tab_collection">
                <Container>
                    <div className="row justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative text-uppercase">
                                        <span>OUR PRODUCTS</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top sale in
                                    this week</span>
                            </div>
                        </Col>
                    </div>
                    <div className="mt-4">
                        <Tab.Container id="custom-tabs-example" defaultActiveKey="best-seller">
                            <Nav className="tab_header gap-lg-4 justify-content-center mt-4 mb-0" >
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="best-seller" className="rounded-pill">Best Seller</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="featured" className="rounded-pill">Featured</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="sale" className="rounded-pill">Sale</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="top-sale" className="rounded-pill">Top Sale</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4' id="pills-tabContent">
                                <Tab.Pane eventKey="best-seller" className='fade show' tabIndex={0}>
                                    <Row className="g-4">
                                        {productsFour.map((product, index) => (
                                            <ProductCard key={index} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                        ))}
                                        {productsEight.map((product, index) => (
                                            <ProductCard key={index} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                        ))}
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="featured" className='fade' tabIndex={0}>
                                    <Row className="g-4">
                                        <Col md={3} className="col-6 px-lg-12 px-2">
                                            <div
                                                className="topbar-product-card pb-3"
                                                onMouseEnter={() => setIsHovered11(true)}
                                                onMouseLeave={() => setIsHovered11(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <span className="new-label bg-success text-white rounded-circle text-center">New</span>
                                                    <Image
                                                        src={isHovered11 ? pro2 : pro1}
                                                        alt="image"
                                                        className="img-fluid w-100 object-fit-cover"
                                                        style={{ zIndex: 1 }}
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
                                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
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
                                                            data-bs-toggle="modal"
                                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                                            style={{ width: '36px', height: '36px' }}
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

                                                    <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M, L, XL</p>
                                                </div>

                                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                                    <h6 className="mb-1">Analogue Resin Strap</h6>
                                                    <p className="mb-0 fs-14 text-muted">
                                                        <span>$30.00</span>
                                                    </p>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md={3} className="col-6 px-lg-12 px-2">
                                            <div
                                                className="topbar-product-card pb-3"
                                                onMouseEnter={() => setIsHovered22(true)}
                                                onMouseLeave={() => setIsHovered22(false)}
                                            >
                                                <div className="position-relative overflow-hidden">
                                                    <Image
                                                        src={isHovered22 ? pro34 : pro33}
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

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
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
                                                            data-bs-toggle="modal"
                                                            className="btn responsive-cart rounded-pill fs-14 p-2"
                                                            style={{ width: '36px', height: '36px' }}
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

                                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                                </div>

                                                <Link href="/product-detail-layout-01" className="mt-3 d-block">
                                                    <h6 className="mb-1">Ridley High Waist</h6>
                                                    <p className="mb-0 fs-14 text-muted">
                                                        <span>$36.00</span>
                                                    </p>
                                                </Link>
                                            </div>
                                        </Col>
                                        <Col md={3} className="col-6 px-lg-12 px-2">
                                            <div className="topbar-product-card pb-3">
                                                <div className="position-relative overflow-hidden">
                                                    <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid w-100 object-fit-cover" />
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
                                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <span>Quick Shop</span>
                                                            <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>

                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                                        style={{ zIndex: 1 }}>
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

                                                    <p className="product-size mb-0 text-center text-white fw-medium">S, M, L</p>
                                                </div>

                                                <div className="mt-3">
                                                    <h6 className="mb-1">
                                                        <Link href="#!" className="product-title">
                                                            Blush Beanie
                                                        </Link>
                                                    </h6>
                                                    <p className="mb-0 fs-14 text-muted">
                                                        <span>$15.00</span>
                                                    </p>
                                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                                        <Link
                                                            href="#!"
                                                            onMouseOver={() => setImageUrl(pro5)}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setImageUrl(pro5);
                                                            }}
                                                            className="d-inline-block bg-body-tertiary rounded-circle"
                                                        ></Link>
                                                        <Link
                                                            href="#!"
                                                            onMouseOver={() => setImageUrl(pro31)}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setImageUrl(pro31);
                                                            }}
                                                            className="d-inline-block bg_color_pink rounded-circle"
                                                        ></Link>
                                                        <Link
                                                            href="#!"
                                                            onMouseOver={() => setImageUrl(pro32)}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setImageUrl(pro32);
                                                            }}
                                                            className="d-inline-block bg-dark rounded-circle"
                                                        ></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col md={3} className="col-6">
                                            <div className="topbar-product-card pb-3">
                                                <div className="position-relative overflow-hidden">
                                                    <span className="new-label bg-danger text-white rounded-circle">-25%</span>
                                                    <Image src={imageUrl2} alt="ImageUrl2Img" className="img-fluid object-fit-cover w-100" />
                                                    <OverlayTrigger
                                                        overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                                        placement="top"
                                                    >
                                                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                                                            <i className="facl facl-heart-o text-white"></i>
                                                        </Link>
                                                    </OverlayTrigger>
                                                    <OverlayTrigger
                                                        overlay={<Tooltip>Add to Wishlist</Tooltip>}
                                                        placement="top"
                                                    >
                                                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                                                            <i className="facl facl-heart-o text-white"></i>
                                                        </Link>
                                                    </OverlayTrigger>

                                                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                                                        <Link href="#exampleModal" className="btn rounded-pill fs-14" data-bs-toggle="modal" onClick={handleShow}>
                                                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                                        </Link>
                                                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                            <span>Quick Shop</span>
                                                            <i className="iccl iccl-cart"></i>
                                                        </button>
                                                    </div>
                                                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                                        <Button variant="link" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                                                            <i className="iccl iccl-eye fw-semibold"></i>
                                                        </Button>
                                                        <Button variant="link" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                                                            <i className="iccl iccl-cart fw-semibold"></i>
                                                        </Button>
                                                    </div>
                                                    <p className="product-size mb-0 text-center text-white fw-medium">XS, S, M</p>
                                                </div>
                                                <div className="mt-3">
                                                    <h6 className="mb-1">
                                                        <Link href="#!" className="product-title">Cluse La Boheme Rose Gold</Link>
                                                    </h6>
                                                    <p className="mb-0 fs-14 text-muted">
                                                        <del>$60.00</del>
                                                        <span className="text-danger">$45.00</span>
                                                    </p>
                                                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                                        <Link href="#!" onMouseOver={() => setImageUrl2(pro7)} onClick={(e) => e.preventDefault()} className="d-inline-block bg_color_green rounded-circle"></Link>
                                                        <Link href="#!" onMouseOver={() => setImageUrl2(pro8)} onClick={(e) => e.preventDefault()} className="d-inline-block bg-body-secondary rounded-circle"></Link>
                                                        <Link href="#!" onMouseOver={() => setImageUrl2(pro9)} onClick={(e) => e.preventDefault()} className="d-inline-block bg_color_blue rounded-circle"></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="sale" className='fade' tabIndex={0}>
                                    <Row className="g-4">
                                        {productsFour.map((product, index) => (
                                            <ProductCard key={index} product={product} handleAddToCardModalShow={handleAddToCardModalShow} handleShow={handleShow} />
                                        ))}
                                        {productsEight.map((product, index) => (
                                            <ProductCard key={index} product={product} handleAddToCardModalShow={handleAddToCardModalShow} handleShow={handleShow} />
                                        ))}
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="top-sale" className='fade' tabIndex={0}>
                                    <Row className="g-4">
                                        {productsFour.map((product, index) => (
                                            <ProductCard key={index} product={product} handleAddToCardModalShow={handleAddToCardModalShow} handleShow={handleShow} />
                                        ))}
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </Container>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default OurProduct2