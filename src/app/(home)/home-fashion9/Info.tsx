"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

const Info=()=>{
    return(
        <React.Fragment>
            <section className="pt-4">
                    <Container>
                        <Row className="g-lg-4 g-3 justify-content-center">
                            <Col lg={4} md={6}>
                                <Link href="/shop" className="text-black">
                                    <div className="p-3 bg-light text-center">
                                        <strong>FREE SHIPPING</strong> ALL ORDER OVER $100
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={4} md={6}>
                                <Link href="/shop" className="text-black">
                                    <div className="p-3 bg-light text-center">
                                        SUMMER <strong>SALE OFF</strong> TO <strong>50%</strong>
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={4} md={6}>
                                <Link href="/shop" className="text-black">
                                    <div className="p-3 bg-light text-center">
                                        WE SUPPORT <strong>24 HOURS</strong> A DAY
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
        </React.Fragment>
    )
}
export default Info