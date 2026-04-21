"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'

import main from "@assets/images/home-electronic/main-slide.jpg"

import banner1 from "@assets/images/home-electronic/cat-banner-01.jpg"
import banner2 from "@assets/images/home-electronic/cat-banner-02.jpg"
import banner3 from "@assets/images/home-electronic/cat-banner-03.jpg"

import blog1 from "@assets/images/home-electronic/blog-thumb-01.jpg"
import blog2 from "@assets/images/home-electronic/blog-thumb-02.jpg"
import blog3 from "@assets/images/home-electronic/blog-thumb-03.jpg"

import pr1 from "@assets/images/home-electronic/pr-01.jpg"
import pr2 from "@assets/images/home-electronic/pr-02.jpg"
import pr3 from "@assets/images/home-electronic/pr-03.jpg"
import pr4 from "@assets/images/home-electronic/pr-04.jpg"
import pr5 from "@assets/images/home-electronic/pr-05.jpg"
import pr6 from "@assets/images/home-electronic/pr-06.jpg"
import pr7 from "@assets/images/home-electronic/pr-07.jpg"
import pr8 from "@assets/images/home-electronic/pr-08.jpg"
import pr14 from "@assets/images/home-decor-2/pr-14.jpg"
import pr15 from "@assets/images/home-decor-2/pr-15.jpg"
import pr16 from "@assets/images/home-decor-2/pr-16.jpg"
import pr17 from "@assets/images/home-decor-2/pr-17.jpg"
import pr20 from "@assets/images/home-decor-2/pr-20.jpg"
import pr21 from "@assets/images/home-decor-2/pr-21.jpg"
import pr26 from "@assets/images/home-decor-2/pr-26.jpg"
import pr27 from "@assets/images/home-decor-2/pr-27.jpg"
import LayoutHeader5 from '@src/components/Headers/LayoutHeader5'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import HeadTitle from '@src/commonsections/HeadTitle'

import 'flickity/css/flickity.css';

const catsection = [
    { id: 1, pic: banner1, title: "Smart Watch" },
    { id: 2, pic: banner2, title: "Macbook" },
    { id: 3, pic: banner3, title: "Headphone" },
]

const blog = [
    {
        "id": 1,
        "imageUrl": blog1,
        "title": "Dial and Disc Wireless Chargers home office from Sum",
        "author": true,
        "excerpt": "Sleek, minimalist wireless charging designs to \"complement and blend within the home and office\".",
    },
    {
        "id": 2,
        "imageUrl": blog2,
        "title": "The Headphones Can Translate 11 Languages Wireless Speaker",
        "author": true,
        "excerpt": "These 3-in-1 headphones can snap together and turn into a wireless speaker.",
    },
    {
        "id": 3,
        "imageUrl": blog3,
        "title": "Microsoft’s Top Secret Surface Headphones Project Revealed",
        "author": false,
        "excerpt": "Microsoft unveils the cool grey, minimalist voice-controlled Surface Headphones.",
    }
]

const seller = [
    {
        id: 1,
        defaultImageUrl: pr1,
        hoverImageUrl: pr2,
        name: "Ysamsung Camera",
        price: "$25.00",
        oldPrice: "$35.00",
    },
    {
        id: 2,
        defaultImageUrl: pr3,
        hoverImageUrl: pr4,
        name: "Beats Solo3 Wireless",
        price: "$35.00",
    },
    {
        id: 3,
        defaultImageUrl: pr5,
        hoverImageUrl: pr6,
        name: "Lomo Sanremo Edition",
        price: "$35.00",
    },
    {
        id: 4,
        defaultImageUrl: pr7,
        hoverImageUrl: pr8,
        name: "Ygoogle Speaker",
        price: "$65.00",
    },
    {
        id: 5,
        defaultImageUrl: pr14,
        hoverImageUrl: pr15,
        name: 'Ybeoplay H9i',
        price: '$55.00'
    },
    {
        id: 6,
        defaultImageUrl: pr16,
        hoverImageUrl: pr17,
        name: 'YApple MacBook',
        price: '$55.00'
    },
    {
        id: 7,
        defaultImageUrl: pr20,
        hoverImageUrl: pr21,
        name: 'Contemporary Design Classic',
        price: '$25.00'
    },
    {
        id: 8,
        defaultImageUrl: pr26,
        hoverImageUrl: pr27,
        name: 'Yapple Watch Nike Series 4',
        price: '$49.00'
    }
]

const ProductCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);


    return (
        <>
            <div className="col">
                <div className="topbar-product-card overlay-hover"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden shadow rounded main">
                        <Image
                            src={isHovered ? product.hoverImageUrl : product.defaultImageUrl}
                            alt="image"
                            className="img-fluid"
                        />
                        <Link href="#"
                            className="d-lg-none position-absolute"
                            style={{ zIndex: 1, top: '10px', left: '10px' }}
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add to Wishlist"
                        >
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                        <Link href="#"
                            className="wishlistadd d-none d-lg-flex position-absolute"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            data-bs-title="Add to Wishlist"
                        >
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal"
                                data-bs-toggle="modal"
                                className="btn rounded-pill fs-14"
                                onClick={handleShow}
                            >
                                <span>Quick View</span>
                                <i className="iccl iccl-eye"></i>
                            </Link>
                            <button type="button"
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
                            <Link href="#exampleModal"
                                data-bs-toggle="modal"
                                className="btn responsive-cart rounded-pill fs-14 p-2"
                                style={{ width: '36px', height: '36px' }}
                                onClick={handleShow}
                            >
                                <i className="iccl iccl-eye fw-semibold"></i>
                            </Link>
                            <button type="button"
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
                    <div className="mt-4 text-center">
                        <h6 className="mb-1 text-capitalize fs-14 fw-medium">
                            <Link href="/product-detail-layout-01" className="main_link_teal">{product.name}</Link>
                        </h6>
                        <p className="mb-0 fs-14 text-muted">
                            {product.oldPrice && <del>{product.oldPrice}</del>}
                            <span className={product.oldPrice ? "text-danger" : ""}>{product.newPrice}</span>
                        </p>
                    </div>
                </div>
            </div>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const HomeElectric = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.blog-arrow', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                prevNextButtons: true,
                pageDots: false,
                contain: true,
                groupCells: "100%",
                adaptiveHeight: false,
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
            <HeadTitle title="Home Electric" />
            <LayoutHeader5 />

            {/* main slide */}
            <div>
                <section className="position-relative kalles-decor kalles-categories-link-banner overflow-hidden">
                    <Container fluid className="px-0">
                        <Row>
                            <Col lg={12}>
                                <Image src={main} alt="MainImg" className="kalles-decor-img img-fluid w-100" />
                                <div className="bg-overlay"></div>
                                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h1 className="decor-title mt-5 mt-sm-0 mb-4 px-2 px-md-0 fw-semibold">Decor your home with smart devices</h1>
                                        <Link href="/shop" className="btn btn-custom stretched-link text-white fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center">Shop
                                            Now</Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>

            {/* cat section */}
            <section className="cat-section pt-4">
                <div className="container-fluid">
                    <div className="row g-4">
                        {catsection.map((item: any, index: number) => (
                            <Col key={index} md={4} >
                                <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${item.pic.src})` }}></div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">{item.title}</div>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </div>
                </div>
            </section>

            {/* tab-collection */}
            <section className="type_tab_collection pb-5 pt-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>BEST SELLER</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top seller
                                    in the week</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-4  mt-4">
                        {seller.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </div>
                    <div className="text-center mt-4 pt-2">
                        <Link href="#!" className="btn btn-dark btn-lg btn_icon_true min-w-150 px-5 fs-14 py-3 rounded-0">Load More</Link>
                    </div>
                </div>
            </section>

            {/* blog */}
            <section className="kalles-section_type_featured_blog kalles-decor-02-blog-post">
                <Container>
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>LATES FROM BLOG</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">The freshest
                                    and most exciting news</span>
                            </div>
                        </div>
                    </div>
                    <Row className="g-4 blog-arrow" dir="ltr">
                        {blog.map((blog: any, index: number) => (
                            <Col key={index} sm={6} lg={4} className="px-2" >
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={blog.imageUrl} alt="BlogImg" className="blog-img object-fit-cover w-100" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_mustard lh-base"><Link href="/blog-post-with-instagram-shop" className="text-reset">{blog.title}</Link></h6>
                                    <div className="d-flex gap-1 align-items-center text-muted">
                                        {blog.author ?
                                            <>
                                                By
                                                <span className="text-body">admin</span>
                                            </>
                                            : ""
                                        }
                                        On
                                        <span className="text-body">February 21, 2024</span>
                                    </div>
                                    <div className="post-content text-muted mt-3">{blog.excerpt}</div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            {/* newsletter */}
            <section className="kalles-electric-newsletter py-5 ">
                <Container>
                    <div className="row justify-content-center py-4">
                        <div className="col-md-8 col-10 text-center">
                            <div className="mb-2">
                                <h3 className="section-title position-relative flex">
                                    <span>SUBSCRIBE OUR NEWSLETTER</span>
                                </h3>
                            </div>
                            <span className="section-subtitle sub-title font-secondary fst-italic fs-16 text-muted ">
                                Sign up for our newsletter to be updated on the latest designs, exclusive offers, inspiration
                                and tips! </span>
                            <form id="contact_form" className="d-block mt-4 pt-2 mx-lg-5">
                                <div className="footer-subscribe position-relative mx-lg-5">
                                    <input type="email" name="email" placeholder="Your email address" className="input-text form-control w-100 rounded-pill py-3" required />
                                    <button type="submit" className="btn btn-dark position-absolute rounded-pill ">
                                        <span>Subscribe</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </section>

            {/* shipping */}
            <Shipping />

            {/* footer */}
            <FooterPage />



        </React.Fragment>
    )
}

export default HomeElectric