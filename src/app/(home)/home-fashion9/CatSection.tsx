"use client";
import React from 'react'
import { Col, Container} from 'react-bootstrap'
import Link from 'next/link'
import women from "@assets/images/home-fashion-9/cat-women.jpg"
import men from "@assets/images/home-fashion-9/cat-men.jpg"
import shoes from "@assets/images/home-fashion-9/cat-shoes.jpg"
import accessories from "@assets/images/home-fashion-9/cat-accessories.jpg"
import watch from "@assets/images/home-fashion-9/cat-watch.jpg"


const CatSection=()=>{
    return(
        <React.Fragment>
            <section className="cat-section">
                    <Container>
                        <div className="row g-lg-4 g-2">
                            <Col md={3}>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-lg-4 mb-2">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${women.src})` }}></div>
                                    <div className="cat-grid-button text-body bg-dark">
                                        <div className="cat_grid_item__title text-white">Women</div>
                                    </div>
                                </Link>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${accessories.src})` }}></div>
                                    <div className="cat-grid-button text-body bg-dark">
                                        <div className="cat_grid_item__title text-white">Accessories</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={6}>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${watch.src})`, backgroundPosition: "center" }}>
                                    </div>
                                    <div className="cat-grid-button text-body bg-dark">
                                        <div className="cat_grid_item__title text-white">Watch Collections</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={3}>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-lg-4 mb-2">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${men.src})` }}></div>
                                    <div className="cat-grid-button text-body bg-dark">
                                        <div className="cat_grid_item__title text-white">Men</div>
                                    </div>
                                </Link>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${shoes.src})` }}></div>
                                    <div className="cat-grid-button text-body bg-dark">
                                        <div className="cat_grid_item__title text-white">Shoes</div>
                                    </div>
                                </Link>
                            </Col>
                        </div>
                    </Container>
                </section>
        </React.Fragment>
    )
}
export default CatSection