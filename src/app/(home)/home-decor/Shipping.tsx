"use client";
import React from 'react'
import { Col, Container } from 'react-bootstrap'

const Shipping = () => {
    return (
        <React.Fragment>
            <div className="kalles-section-type-shipping">
                <Container>
                    <div className="row g-4">
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="las la-plane fw-semibold fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6>Free Shipping</h6>
                                    <p className="text-muted mb-0">Free shipping on all US order or order above $100</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="pegk pe-7s-help2 fw-semibold fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6 className="text-uppercase">Support 24/7</h6>
                                    <p className="text-muted mb-0">Contact us 24 hours a day, 7 days a week</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="las la-sync-alt fw-semibold fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6>30 Days Return</h6>
                                    <p className="text-muted mb-0">Simply return it within 30 days for an exchange.</p>
                                </div>
                            </div>
                        </Col>
                        <Col xl={3} md={6}>
                            <div className="d-flex gap-3">
                                <i className="las la-shield-alt fw-semibold fs-36 text-muted flex-shrink-0"></i>
                                <div className="flex-grow-1">
                                    <h6>100% Payment Secure</h6>
                                    <p className="text-muted mb-0">We ensure secure payment with PEV</p>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default Shipping