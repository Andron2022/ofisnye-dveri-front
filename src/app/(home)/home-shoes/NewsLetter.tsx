"use client";
import React from 'react'
import {  Col, Container, Row } from 'react-bootstrap'

const NewsLetter=()=>{
    return(
        <React.Fragment>
            <section className="kalles-shoes-newsletter-section">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7} className="text-center">
                            <h2 className="text-white fs-35 ls-normal mb-3">SUBSCRIBE OUR NEWSLETTER</h2>
                            <p className="section-subtitle sub-title font-secondary fst-italic fs-14 text-white mb-4">Sign up for
                                our newsletter to be updated on the latest designs, exclusive offers, inspiration and tips!</p>
                            <form action="#!" className="newsletter-form mx-5">
                                <div className="d-flex">
                                    <div className="flex-grow-1">
                                        <input type="email" name="email" placeholder="Enter your email address" className="form-control bg-transparent text-muted border-0 border-bottom rounded-0" required />
                                    </div>
                                    <button className="btn btn-link text-white border-bottom rounded-0 flex-shrink-0">Submit</button>
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