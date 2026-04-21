"use client";
import React from "react";
import { Container } from 'react-bootstrap'

const Shipping = () => {
    return (
        <React.Fragment>
            <div className="kalles-section-type-shipping pb-4">
                <Container>
                    <div className="d-flex overflow-auto justify-content-between">
                        <div className="d-flex gap-3 pb-3 me-4" style={{ whiteSpace: "nowrap" }}>
                            <i className="pegk pe-7s-plane fs-48 text-muted flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <h6 className="text-uppercase">Free Shipping</h6>
                                <p className="text-muted mb-0">Free shipping for all US order</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 pb-3 me-4" style={{ whiteSpace: "nowrap" }}>
                            <i className="pegk pe-7s-help2 fs-48 text-muted flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <h6 className="text-uppercase">Support 24/7</h6>
                                <p className="text-muted mb-0">We support 24 hours a day</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 pb-3 me-4" style={{ whiteSpace: "nowrap" }}>
                            <i className="pegk pe-7s-refresh fs-48 text-muted flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <h6 className="text-uppercase">30 Days Return</h6>
                                <p className="text-muted mb-0">You have 30 days to return</p>
                            </div>
                        </div>
                        <div className="d-flex gap-3 pb-3" style={{ whiteSpace: "nowrap" }}>
                            <i className="pegk pe-7s-door-lock fs-48 text-muted flex-shrink-0"></i>
                            <div className="flex-grow-1">
                                <h6 className="text-uppercase">100% Payment Secure</h6>
                                <p className="text-muted mb-0">Payment 100% secured</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default Shipping