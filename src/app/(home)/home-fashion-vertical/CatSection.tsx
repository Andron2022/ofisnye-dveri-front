"use client";
import { Col, Container } from 'react-bootstrap'
import Link from 'next/link'
import React from 'react'

import women from "@assets/images/home-fashion-vertical/cat-women.jpg"
import cap from "@assets/images/home-fashion-vertical/cat-caps-and-hats.jpg"
import foot from "@assets/images/home-fashion-vertical/cat-foot-wear.jpeg"
import accessories from "@assets/images/home-fashion-vertical/cat-accessories.jpg"
import watch from "@assets/images/home-classic/cat-watch.jpg"

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section">
                <Container>
                    <div className="row g-xl-4 g-2">
                        <div className="col-md-6">
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-570">
                                <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${women.src})`}}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Women</div>
                                </div>
                            </Link>
                            <div className="row gx-xl-4 gx-2 mt-xl-4 mt-2">
                                <Col sm={6}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${cap.src})`}}></div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Caps&Hats</div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col sm={6}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${foot.src})`}}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Footwear</div>
                                        </div>
                                    </Link>
                                </Col>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-xl-4 mb-2">
                                <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${accessories.src})`, backgroundPosition: "center"}}>
                                </div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Accessoies</div>
                                </div>
                            </Link>
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-570">
                                <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${watch.src})`, backgroundPosition: "center"}}>
                                </div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Watches</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default CatSection