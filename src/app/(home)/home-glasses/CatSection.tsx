"use client";
import React from 'react'
import { Col, Container, Row, } from 'react-bootstrap';
import Image from 'next/image'
import Link from 'next/link'

import banner1 from "@assets/images/home-glasses/banner-01.jpg"
import banner2 from "@assets/images/home-glasses/banner-02.jpg"
import 'flickity/css/flickity.css';

const CatSection=()=>{
    return(
        <React.Fragment>
              <div className="banner-section kalles-glasses-banner-double-cat position-relative py-4 mt-2">
                    <Container>
                        <Row className="g-4">
                            <Col lg={6}>
                                <Link href="/shop" className="position-relative hover-zoom d-block">
                                    <Image src={banner1} alt="Banner1Img" className="img-fluid hover-zoom-img w-100" priority/>
                                    <div className="nt_promotion_html position-absolute">
                                        <div className="text-end">
                                            <h4 className="fs-28 font-pinyon-script text-mustard ls-1">The classic aviator</h4>
                                            <h6 className="mb-0 fs-32 text-body font-montserrat">MEN’S EYEWEAR <br /> ORIGINALS</h6>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                            <Col lg={6}>
                                <Link href="/shop" className="position-relative hover-zoom d-block">
                                    <Image src={banner2} alt="Banner2Img" className="img-fluid hover-zoom-img w-100" priority/>
                                    <div className="nt_promotion_html position-absolute">
                                        <div className="text-end">
                                            <h4 className="fs-28 font-pinyon-script text-mustard ls-1">a rectangular shape</h4>
                                            <h6 className="mb-0 fs-32 text-body font-montserrat">WOMEN’S <br /> SUNGLASSES</h6>
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
export default CatSection