"use client";
import React from "react";
import pro1 from '@assets/images/home-01/bn-01.jpg'
import pro2 from '@assets/images/home-01/bn-02.jpg'
import pro3 from '@assets/images/home-01/bn-03.jpg'
import pro4 from '@assets/images/home-01/bn-04.jpg'
import { Col, Row } from "react-bootstrap";
import Link from "next/link";


const CatSection = () => {
    return (
        <React.Fragment>
            <Row className="g-4 cat-section mt-0 py-0">
                <Col md={6}>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pro1.src})` }}></div>
                        <div className="cat-grid-button text-body">
                            <div className="cat_grid_item__title">Women</div>
                        </div>
                    </Link>
                </Col>
                <Col md={3}>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-4">
                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pro2.src})` }}></div>
                        <div className="cat-grid-button text-body">
                            <div className="cat_grid_item__title">Accessories</div>
                        </div>
                    </Link>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pro3.src})` }}></div>
                        <div className="cat-grid-button text-body">
                            <div className="cat_grid_item__title">Footwear</div>
                        </div>
                    </Link>
                </Col>
                <Col md={3}>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pro4.src})` }}></div>
                        <div className="cat-grid-button text-body">
                            <div className="cat_grid_item__title">Watches</div>
                        </div>
                    </Link>
                </Col>
            </Row>
        </React.Fragment>
    )
}
export default CatSection