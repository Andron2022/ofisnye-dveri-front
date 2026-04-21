"use client";
import React from "react";
import { collectionData } from '@src/common/shop/collection'
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section">
                <div className="container">
                    <Row className="g-lg-4 g-2">
                        {collectionData.map((item: any, index: number) => {
                            return (
                                <Col md={4} className="col-6" key={index}>
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden shop-collection-img">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${item.img.src})` }}></div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">{item.name}</div>
                                        </div>
                                    </Link>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
export default CatSection;