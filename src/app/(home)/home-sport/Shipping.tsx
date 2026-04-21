"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Shipping = () => {
  return (
    <React.Fragment>
        <section className="kalles-glasses-shipping-info">
        <Container className=" border-top py-5">
            <Row className="py-2">
                <Col lg={4}>
                    <div className="text-center">
                        <i className="las la-truck text-orange fs-48"></i>
                        <h6 className="font-montserrat mt-3">FREE SHIPPING UK&amp;UK</h6>
                        <p className="mb-0 text-muted">Free shipping on all orders above $100</p>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="text-center">
                        <i className="las la-headset text-orange fs-48"></i>
                        <h6 className="font-montserrat mt-3">SUPPORT 24/7</h6>
                        <p className="mb-0 text-muted">Contact us 24 hours a day, 7 days a week</p>
                    </div>
                </Col>
                <Col lg={4}>
                    <div className="text-center">
                        <i className="las la-donate text-orange fs-48"></i>
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

export default Shipping