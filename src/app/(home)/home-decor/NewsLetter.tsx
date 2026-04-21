"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const NewsLetter = () => {
    return (
        <React.Fragment>
            <section className="kalles-decor-newsletter bg-light">
                <Container>
                    <Row className=" justify-content-center">
                        <Col lg={8}>
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize line-section-title">
                                        <span>subscribe our newsletter</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Sign up for our newsletter to be updated on the latest designs,
                                    exclusive offers, inspiration and tips!</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className=" justify-content-center">
                        <Col lg={6}>
                            <form action="#!" className="signup-newsletter-form">
                                <div className="row g-2">
                                    <div className="col-md col-12">
                                        <input type="email" name="email" placeholder="Your email address" className="form-control rounded-0 bg-transparent" required />
                                    </div>
                                    <div className="col-md-auto col-12">
                                        <button type="submit" className="btn btn-dark rounded-0 fw-semibold btn_icon_true position-relative w-100">Subscribe</button>
                                    </div>
                                </div>
                            </form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default NewsLetter