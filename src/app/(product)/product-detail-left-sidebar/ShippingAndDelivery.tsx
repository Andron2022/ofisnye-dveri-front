"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import insta1 from '@assets/images/instagram/ins1_1.jpg'
import insta2 from '@assets/images/instagram/ins1_2.jpg'
import insta4 from '@assets/images/instagram/ins1_4.jpg'
import insta5 from '@assets/images/instagram/ins1_5.jpg'
import insta6 from '@assets/images/instagram/ins1_6.jpg'
import insta7 from '@assets/images/instagram/ins1_7.jpg'
import insta8 from '@assets/images/instagram/ins1_8.jpg'
import insta13 from '@assets/images/instagram/ins1_13.jpg'
import insta14 from '@assets/images/instagram/ins1_14.jpg'
import Image from "next/image";
import Link from "next/link";


const ShippingAndDelivery = () => {
    return (
        <React.Fragment>
            <Col lg={6} xl={3} className="order-3 order-xl-1 mt-5 mt-xl-0">
                <div>
                    <h5 className="mb-5"><span className="widget-title">Shipping</span> & Delivery</h5>
                    <div>
                        <div className="d-flex gap-3 mb-3">
                            <div className="flex-shrink-0 fs-36">
                                <i className="las la-truck align-top"></i>
                            </div>
                            <div className="flex-grow-1">
                                <h6>FREE SHIPPING</h6>
                                <p className="text-muted">Free shipping on all US order</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div className="flex-shrink-0 fs-36">
                                <i className="las la-headset align-top"></i>
                            </div>
                            <div className="flex-grow-1">
                                <h6>SUPPORT 24/7</h6>
                                <p className="text-muted">Contact us 24 hours a day</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 mb-3">
                            <div className="flex-shrink-0 fs-36">
                                <i className="las la-exchange-alt align-top"></i>
                            </div>
                            <div className="flex-grow-1">
                                <h6>30 DAYS RETURN</h6>
                                <p className="text-muted">You have 30 days to return</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h5 className="mb-4">
                        <span className="widget-title">Instagram</span></h5>
                    <div>
                        <Row className="g-1">
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                        <Image src={insta1} alt="Insta1Img" className="img-fluid" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                    <Image src={insta2} alt="Insta2Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block" >
                                    <Image src={insta4} alt="Insta4Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block" >
                                    <Image src={insta5} alt="Insta5Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block" >
                                    <Image src={insta6} alt="Insta6Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                        <Image src={insta7} alt="Insta7Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                        <Image src={insta8} alt="Insta8Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                        <Image src={insta13} alt="Insta13Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-4">
                                <div>
                                    <Link href="/index" className="insta-card insta-icon d-block">
                                        <Image src={insta14} alt="Insta14Img" className="img-fluid"/>
                                    </Link>
                                </div>
                            </div>
                        </Row>
                    </div>
                </div>
            </Col>
        </React.Fragment>
    )
}
export default ShippingAndDelivery