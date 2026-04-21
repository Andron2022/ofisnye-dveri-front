"use client";
import React from "react";
import { Col, Row } from 'react-bootstrap'

const NewsLetter = () => {
    return (
        <React.Fragment>
            <section className="kalles-furniture-newsletter overflow-hidden">
                <div className="container border-top">
                    <Row className="justify-content-center">
                        <div className="col-lg-6 col-md-8 col-10">
                            <h1 className="font-roboto-slab fw-light mb-2 text-center text-lg-start">Get Discount 20% Off</h1>
                            <p className="text-muted fs-16 mb-0 text-center text-lg-start">Subscribe to our newsletters now and stay up-to-date with new
                                collections, the latest lookbooks.</p>
                        </div>
                        <Col lg={6} md={10}>
                            <div className="input-group signup-newsletter-form">
                                <input type="text" className="form-control rounded-0 signup-newsletter-form" placeholder="Your email address" aria-describedby="button-addon2" />
                                <button className="btn btn-dark text-uppercase min-w-150 rounded-0" type="submit" id="button-addon2">SubScribe</button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
export default NewsLetter