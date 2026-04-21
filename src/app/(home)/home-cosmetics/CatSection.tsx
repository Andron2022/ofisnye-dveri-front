"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import banner1 from "@assets/images/home-cosmetics/cat-banner-01.jpg"
import banner2 from "@assets/images/home-cosmetics/cat-banner-02.jpg"
import banner3 from "@assets/images/home-cosmetics/cat-banner-03.jpg"
import banner4 from "@assets/images/home-cosmetics/cat-banner-04.jpg"


const CatSection = () => {

    return (
        <React.Fragment>
            <section className="cat-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-4 pb-2">
                                <div>
                                    <h1 className="position-relative text-capitalize font-playfair text-lima fw-medium">
                                        <span>Welcome to Kalles Natural Skincare</span>
                                    </h1>
                                    <span className="dn tt_divider"><span></span><i className="la la-spa text-muted"></i><span></span></span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="row g-4">
                        <Col md={6}>
                            <div className="row g-4">
                                <Col lg={12}>
                                    <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-505">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner1.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Accessories</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-315">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner2.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Skincare</div>
                                        </div>
                                    </Link>
                                </Col>
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="row g-4">
                                <Col lg={12}>
                                    <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner3.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Bath & Body</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner4.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Makeup Brushes</div>
                                        </div>
                                    </Link>
                                </Col>
                            </div>
                        </Col>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default CatSection