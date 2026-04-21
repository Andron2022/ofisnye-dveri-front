"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

import cat1 from "@assets/images/home-video-banner/cat-01.jpg"
import cat2 from "@assets/images/home-video-banner/cat-02.jpg"
import cat3 from "@assets/images/home-video-banner/cat-03.jpg"


const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section">
                <Container>
                    <Row className="g-lg-4 g-2">
                        <Col md={6}>
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-100">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat1.src})` }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Women</div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={6}>
                            <Row className="gy-lg-4 gy-2">
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat2.src})` }}></div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Accessories</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat3.src})` }}></div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Summer Outfit</div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default CatSection