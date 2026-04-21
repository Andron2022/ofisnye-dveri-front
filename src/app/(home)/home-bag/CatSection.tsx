"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Card, CardBody, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import messengers from "@assets/images/home-bags/messengers-cat.jpg"
import travel from "@assets/images/home-bags/travel-luggage-cat.jpg"
import laptop from "@assets/images/home-bags/laptop-bags-cat.jpg"
import backpack from "@assets/images/home-bags/backpack-cat.jpg"
import 'flickity/css/flickity.css';


const CatSection=()=>{
    return(
        <React.Fragment>
             <section className="cat-section pt-5 mt-5">
                    <div className="container-fluid">
                        <Row className="g-2">
                            <Col md={8}>
                                <Row className="g-2">
                                    <Col md={6}>
                                        <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${messengers.src})` }}></div>
                                            <div className="cat-grid-button text-body">
                                                <div className="cat_grid_item__title">Messengers</div>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col md={6}>
                                        <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${travel.src})` }}>
                                            </div>
                                            <div className="cat-grid-button text-body">
                                                <div className="cat_grid_item__title">Travel & Luggage</div>
                                            </div>
                                        </Link>
                                    </Col>
                                    <Col md={12}>
                                        <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-410">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${laptop.src})` }}></div>
                                            <div className="cat-grid-button text-body">
                                                <div className="cat_grid_item__title">Laptop Bags</div>
                                            </div>
                                        </Link>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={4} className="h-100">
                                <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden h-844">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${backpack.src})`, backgroundPosition: "center" }}>
                                    </div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Backpack</div>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default CatSection