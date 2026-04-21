"use client";
import React from "react";
import { Col, Container, Row, } from 'react-bootstrap';

const ShippingInfo = () => {
    return (
        <React.Fragment>
            <section className="kalles-glasses-shipping-info">
                <Container className="border-top border-bottom py-5 mt-5">
                    <Row className="py-4 g-3">
                        <Col md={6} lg={4}>
                            <div className="text-center">
                                <i className="las la-truck text-mustard fs-48"></i>
                                <h6 className="font-montserrat mt-3">FREE SHIPPING UK&UK</h6>
                                <p className="mb-0 text-muted">Free shipping on all orders above $100</p>
                            </div>
                        </Col>
                        <Col md={6} lg={4}>
                            <div className="text-center">
                                <i className="las la-headset text-mustard fs-48"></i>
                                <h6 className="font-montserrat mt-3">SUPPORT 24/7</h6>
                                <p className="mb-0 text-muted">Contact us 24 hours a day, 7 days a week</p>
                            </div>
                        </Col>
                        <Col md={6} lg={4}>
                            <div className="text-center">
                                <i className="las la-donate text-mustard fs-48"></i>
                                <h6 className="font-montserrat mt-3">30 DAYS MONEY BACK</h6>
                                <p className="mb-0 text-muted">Simply return it within 30 days for an exchange.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default ShippingInfo