"use client";
import React from 'react'
import Link from 'next/link'
import { Col, Container, Row } from 'react-bootstrap'

import home5 from "@assets/images/home-01/bn-05.jpg"
import home6 from "@assets/images/home-01/bn-06.jpg"
import Image from 'next/image'

const LookBookCard = () => {
    return (
        <React.Fragment>
            <div className="banner-section position-relative">
                <Container>
                    <Row className="g-4">
                        <Col lg={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={home5} alt="Home5Img" className="img-fluid hover-zoom-img" />
                                <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                                    <div className="text-center text-white">
                                        <h4 className="fs-24">LOOKBOOK 2021</h4>
                                        <h6 className="mb-0">MAKE LOVE THIS LOOK</h6>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <Link href="#!" className="position-relative hover-zoom d-block">
                                <Image src={home6} alt="Home6Img" className="img-fluid hover-zoom-img" />
                                <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                                    <div className="text-center text-white">
                                        <h6 className="text-capitalize mb-2">Summer Sale</h6>
                                        <h1 className="mb-0" style={{ fontSize: '50px' }}>UP TO 70%</h1>
                                    </div>
                                </div>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        </React.Fragment>
    )
}

export default LookBookCard