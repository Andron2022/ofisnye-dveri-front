"use client";
import React from 'react'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'

import left from "@assets/images/home-lingerie/trending-item-left.jpg"
import right from "@assets/images/home-lingerie/trending-item-right.jpg"

const TrandingItems=()=>{
    return(
        <React.Fragment>
              <div className="kalles-lingerie-banner-trending position-relative">
                <Container>
                    <Row className="g-0">
                        <Col md={6} className="img-zoom">
                            <Image src={left} className="img-fluid" alt="LeftImg" />
                        </Col>
                        <Col md={6} className="h-100">
                            <div className="position-relative">
                                <Image src={right} className="img-fluid" alt="RightImg" />
                                <div className="text-center position-absolute top-0 start-0 end-0 bottom-0 d-flex align-items-center justify-content-center mx-5">
                                    <div>
                                        <div className="mb-4">
                                            <h3 className="position-relative flex text-capitalize font-futura fw-normal line-section-title">
                                                <span>TRENDING ITEMS</span>
                                            </h3>
                                        </div>
                                        <p className="fs-14 text-muted mb-3">Where many swim lines have their place in the sun,
                                            Kalles transcends beach and the pool. The pieces transition seamlessly as day or
                                            evening Ready-to-Wear, providing an innate versatility your already established
                                            wardrobe.</p>
                                        <Link className="btn btn-dark rounded-0 min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Read More</Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}
export default TrandingItems