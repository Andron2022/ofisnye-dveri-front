"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'

const Shipping = () => {
    return (
        <React.Fragment>
            <div className="kalles-section-type-shipping">
                <div className="container">
                    <Row className="g-4">
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="pegk pe-7s-car fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6 className="text-uppercase">Free Shipping</h6>
                                    <p className="text-muted mb-0">Free shipping on all US order or order above $100</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="pegk pe-7s-help2 fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6 className="text-uppercase">Support 24/7</h6>
                                    <p className="text-muted mb-0">Contact us 24 hours a day, 7 days a week</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="pegk pe-7s-refresh fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6 className="text-uppercase">30 Days Return</h6>
                                    <p className="text-muted mb-0">Simply return it within 30 days for an exchange.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="pegk pe-7s-door-lock fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6 className="text-uppercase">100% Payment Secure</h6>
                                    <p className="text-muted mb-0">We ensure secure payment with PEV</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Shipping