"use client";
import React from 'react'
import { Col, Container } from 'react-bootstrap'

import bn5 from "@assets/images/home-01/bn-05.jpg"
import bn6 from "@assets/images/home-01/bn-06.jpg"
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {
  return (
    <React.Fragment>
        <div className="banner-section position-relative">
        <Container>
            <div className="row g-4">
                <Col lg={6}>
                    <Link href="#!" className="position-relative hover-zoom d-block">
                        <Image src={bn5} alt="Bn5Img" className="img-fluid hover-zoom-img" />
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
                        <Image src={bn6} alt="Bn6Img" className="img-fluid hover-zoom-img" />
                        <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                            <div className="text-center text-white">
                                <h6 className="text-capitalize mb-2">Summer Sale</h6>
                                <h1 className="mb-0">UP TO 70%</h1>
                            </div>
                        </div>
                    </Link>
                </Col>
            </div>
        </Container>
    </div>
    </React.Fragment>
  )
}

export default Banner