"use client";
import React from 'react'
import { Col, Container } from 'react-bootstrap'
import Link from 'next/link'

import women from "@assets/images/home-fashion-simple/cat-women.jpg"
import footwear from "@assets/images/home-fashion-simple/cat-footwear.jpeg"
import accessories from "@assets/images/home-lookbook-collection/cat-accessories.jpeg"
import men from "@assets/images/home-fashion-simple/cat-men.jpg"

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section">
                <Container>
                    <div className="row g-4">
                        <Col lg={6}>
                            <div className="row g-4">
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-505">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${women.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Women</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-315">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${footwear.src})`, backgroundPosition: "center" }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Footwear</div>
                                        </div>
                                    </Link>
                                </Col>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className="row g-4">
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${accessories.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Accessories</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col lg={12}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${men.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Men</div>
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