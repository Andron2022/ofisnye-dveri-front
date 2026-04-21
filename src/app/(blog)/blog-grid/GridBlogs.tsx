"use client";
import React from "react";
import { BolgsDat2 } from '@src/common/Bolgs/BolgsData'
import { Col, Row } from "react-bootstrap";
import Link from "next/link";

const GridBlogs = () => {
    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <Row className="kalles-blog-grid my-4 g-4">
                        {
                            BolgsDat2.map((item: any, index: number) => {
                                return (
                                    <Col key={index} sm={6} className="slideshow__slide" style={{ height: 'max-content !important' }}>
                                        <Link href="/blog-post-with-instagram-shop">
                                            <div className="blog_grid overflow-hidden">
                                                <div className=" blog_grid_img w-100 position-relative" style={{ backgroundImage: `url(${item.img.src})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "400px" }}>
                                                </div>
                                            </div>
                                            <div className="my-4">
                                                <p className="text-muted">{item.words} <span className="text-black">{item.type}</span> {item.words2} <span className="text-black">{item.date}</span></p>
                                                <h6 className="text-black">{item.des}</h6>
                                            </div>
                                        </Link>
                                    </Col>
                                )
                            })
                        }

                    </Row>
                    <div className="filter-pagination">
                        <ul className="pagination py-4 d-flex justify-content-center">
                            <li className="active"><Link href="#" className="text-danger">1</Link></li>
                            <li><Link href="#">2</Link></li>
                            <li><Link href="#">3</Link></li>
                            <li><Link href="#">Next</Link></li>
                        </ul>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default GridBlogs