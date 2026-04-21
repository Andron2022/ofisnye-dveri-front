"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link';

import women from "@assets/images/home-lookbook-collection/cat-women.jpg"
import shoes from "@assets/images/home-lookbook-collection/cat-accessories.jpeg"
import accessories from "@assets/images/home-lookbook-collection/cat-shoes.jpeg"
import watches from "@assets/images/home-lookbook-collection/cat-watches.jpg"

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section pb-4">
                <Container>
                    <Row className="g-lg-4 g-2">
                        <Col md={6}>
                            <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${women.src})` }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Women</div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={3} className="col-6">
                            <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-2 mb-lg-4">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${shoes.src})` }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Accessories</div>
                                </div>
                            </Link>
                            <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${accessories.src})`, backgroundPosition: "center" }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Shoes</div>
                                </div>
                            </Link>
                        </Col>
                        <Col md={3} className="col-6">
                            <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${watches.src})` }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Watches</div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default CatSection