"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import portfolio1 from '@assets/images/portfolio/p-01.jpg'
import portfolio2 from '@assets/images/portfolio/p-02.jpg'
import portfolio3 from '@assets/images/portfolio/p-03.jpg'
import portfolio4 from '@assets/images/portfolio/p-04.jpg'
import portfolio5 from '@assets/images/portfolio/p-05.jpg'
import portfolio6 from '@assets/images/portfolio/p-06.jpg'
import portfolio7 from '@assets/images/portfolio/p-07.jpg'
import portfolio8 from '@assets/images/portfolio/p-08.jpg'
import portfolio9 from '@assets/images/portfolio/p-09.jpg'
import Image from "next/image";
import Link from "next/link";

const PortfolioTab = () => {

    // const [activeKey, setActiveKey] = useState('All');
    const [open, setOpen] = useState<number>(1)
    const handleClick = (id: any) => {
        setOpen(id)
    }

    return (
        <React.Fragment>
            <section className="type_tab_collection pt-0">
                <div className="container">
                    <div>
                        <ul className="nav tab_header gap-lg-4 my-5 justify-content-center" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 1 ? 'active' : ""}`} id="best-seller-tab" data-bs-toggle="pill" data-bs-target="#best-seller" type="button" role="tab" aria-controls="best-seller" aria-selected="true" onClick={() => handleClick(1)}>All</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 2 ? 'active' : ""}`} id="featured-tab" data-bs-toggle="pill" data-bs-target="#featured" type="button" role="tab" aria-controls="featured" aria-selected="false" onClick={() => handleClick(2)}>Accessories(7)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 3 ? 'active' : ""}`} id="sale-tab" data-bs-toggle="pill" data-bs-target="#sale" type="button" role="tab" aria-controls="sale" aria-selected="false" onClick={() => handleClick(3)}>Clothing(3)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 4 ? 'active' : ""}`} id="top-sale-tab" data-bs-toggle="pill" data-bs-target="#top-sale" type="button" role="tab" aria-controls="top-sale" aria-selected="false" onClick={() => handleClick(4)}>DIT(6)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 5 ? 'active' : ""}`} id="handmade-tab" data-bs-toggle="pill" data-bs-target="#handmade" type="button" role="tab" aria-controls="handmade" aria-selected="false" onClick={() => handleClick(5)}>Clothing(3)</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className={`nav-link pill-border rounded-pill ${open === 6 ? 'active' : ""}`} id="top-jewellery-tab" data-bs-toggle="pill" data-bs-target="#top-jewellery" type="button" role="tab" aria-controls="top-jewellery" aria-selected="false" onClick={() => handleClick(6)}>DIT(6)</button>
                            </li>
                        </ul>



                        <div className="tab-content mt-4" id="pills-tabContent">
                            <div className={`tab-pane fade ${open === 1 ? "show active" : ""}`} id="best-seller" role="tabpanel" aria-labelledby="best-seller-tab" tabIndex={0}>
                                <Row className="g-2 g-lg-4">
                                    <Col sm={6}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid w-100" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <div className="col-sm-6">
                                        <div className="row g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>BRANDING DESIGN MOCKUP</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>POSTER MOCKUP</h6>
                                                        <p className="text-muted">Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Row>
                            </div>
                            <div className={`tab-pane fade ${open === 2 ? "show active" : ""}`} id="featured" role="tabpanel" aria-labelledby="featured-tab" tabIndex={0}>
                                <div className="row g-2 g-lg-4">
                                    <div className="col-sm-6 col-md-4">
                                        <div className="row g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CANDLE</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid w-100" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        </Row>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid w-100" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid w-100" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                </div>
                            </div>
                            <div className={`tab-pane fade ${open === 3 ? "show active" : ""}`} id="sale" role="tabpanel" aria-labelledby="sale-tab" tabIndex={0}>
                                <Row className="g-2 g-lg-4">
                                    <Col sm={6} md={4}>
                                        <div className="row g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CANDLE</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid w-100" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        </Row>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid w-100" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid w-100" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`tab-pane fade ${open === 4 ? "show active" : ""}`} id="top-sale" role="tabpanel" aria-labelledby="top-sale-tab" tabIndex={0}>
                                <Row className="g-2 g-lg-4">
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CANDLE</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid w-100" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3} >
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid w-100" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid w-100" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`tab-pane fade ${open === 5 ? "show active" : ""}`} id="handmade" role="tabpanel" aria-labelledby="handmade-tab" tabIndex={0}>
                                <Row className="g-2 g-lg-4">
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio1} className="img-fluid" alt="Portfolio1Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CANDLE</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid w-100" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>LEATHER BAG</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>

                                        </Row>
                                    </Col>
                                    <Col sm={6} md={4}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid w-100" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid w-100" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                            <div className={`tab-pane fade ${open === 6 ? "show active" : ""}`} id="top-jewellery" role="tabpanel" aria-labelledby="top-jewellery-tab" tabIndex={0}>
                                <Row className="g-2 g-lg-4">
                                    <Col sm={6}  md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio4} className="img-fluid" alt="Portfolio4Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WOMEN SHOES</h6>
                                                        <p className="text-muted">Accessories, DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid w-100" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CANDLE</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio8} className="img-fluid" alt="Portfolio8Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio7} className="img-fluid" alt="Portfolio7Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio3} className="img-fluid w-100" alt="Portfolio3Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>HANDMADE CRAFT</h6>
                                                        <p className="text-muted">DIY, Handmade</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio5} className="img-fluid w-100" alt="Portfolio5Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio9} className="img-fluid w-100" alt="Portfolio9Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>WHITE SPORT SHOES</h6>
                                                        <p className="text-muted">Accessories, Clothing, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col sm={6} md={3}>
                                        <Row className="g-2 g-lg-4">
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio2} className="img-fluid" alt="Portfolio2Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>KALLES WATCH</h6>
                                                        <p className="text-muted">Accessories, Handmade, Jewellery</p>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-12">
                                                <Link href="/shop" className="d-lg-block portfolio-img text-black text-center">
                                                    <Image src={portfolio6} className="img-fluid" alt="Portfolio6Img" />
                                                    <div className="position-absolute start-50 translate-middle portfolio-card-detail" style={{ zIndex: 2 }}>
                                                        <h6>SHOE CLEANER</h6>
                                                        <p className="text-muted">Accessories, DIY</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="py-3 my-3 my-lg-5 d-flex justify-content-center">
                            <button className="btn-load btn btn-custom-dark fw-semibold min-w-150 rounded-pill">Lord More
                                Posts</button>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default PortfolioTab