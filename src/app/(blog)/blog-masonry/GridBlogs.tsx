"use client";
import React from "react";
import { BlogMasonayData } from '@src/common/Bolgs/BolgsData'
import { Card, CardBody, Col, Row } from "react-bootstrap";
import Link from "next/link";

const GridBlogs = () => {
    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <Row className="kalles-blog-grid my-4 g-4">
                        {
                            BlogMasonayData.map((item: any, index: number) => {
                                return (
                                    <Col md={6} className="slideshow__slide " style={{ height: "max-content !important" }} key={index}>
                                        <div className="blog_grid overflow-hidden">
                                            <div className=" blog_grid_img w-100 position-relative" style={{ backgroundImage: `url(${item.img.src})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "400px" }}>
                                            </div>
                                            <Card className="rounded-0 border-0 bg-black position-absolute m-4 bottom-0 start-0 end-0 z-3">
                                                <CardBody className="text-center">
                                                    <div>
                                                        <span className="fs-12 text-white-50">{item.words} <span className="text-white">{item.type}</span></span>
                                                        <span className="fs-12 text-white-50">{item.words2} <Link href="#!" className="text-white">{item.type2}</Link>,
                                                            <Link href="#!" className="text-white">{item.fashion}</Link>
                                                        </span>
                                                    </div>
                                                    <h2 className="fs-14 text-uppercase blog_grid_img_heading my-2">
                                                        <Link className="text-white" href="blog-post-with-instagram-shop.html">{item.title}</Link>
                                                    </h2>
                                                    <span>
                                                        <time className="text-white-50" dateTime="2020-04-06T02:22:00Z">{item.date}</time>
                                                    </span>
                                                </CardBody>
                                            </Card>
                                        </div>

                                        <div className="p-4 text-center blog-grid-contain">
                                            <p className="text-muted">{item.des}</p>
                                            <button className="btn btn-outline-dark rounded-pill px-4 fw-semibold mx-auto mb-3">Continue
                                                Reading</button>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <div className="filter-pagination">
                        <ul className="pagination py-4 d-flex justify-content-center">
                            <li><Link href="#">1</Link></li>
                            <li className="active text-danger"><Link href="#" className="text-danger">2</Link></li>
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