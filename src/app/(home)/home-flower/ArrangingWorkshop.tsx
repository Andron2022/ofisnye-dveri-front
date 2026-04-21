"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import card1 from "@assets/images/home-flower/card-info-01.jpg"
import card2 from "@assets/images/home-flower/card-info-02.jpg"

const ArrangingWorkshop=()=>{

    return(
        <React.Fragment>
            <div className="banner-section position-relative">
                    <Container>
                        <Row className="g-0">
                            <Col md={6}>
                                <div className="position-relative overflow-hidden img-zoom">
                                    <Image src={card1} alt="Card1Img" className="img-fluid" />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="position-relative overflow-hidden img-zoom">
                                    <Image src={card2} alt="Card2Img" className="img-fluid" />
                                    <div className="position-absolute top-0 start-0 end-0 bottom-0 p-4 text-center d-flex align-items-center justify-content-center">
                                        <div>
                                            <h2 className=" mb-4">Fall Floral Arranging Workshop</h2>
                                            <p className="text-muted pb-2">Flowers look great in a vase, but if you&apos;ve got a little
                                                extra time at home these days and need a fun project, here are five great ways
                                                to play with your flowers! Floral things like flowers in your hair to make you
                                                feel like a goddess. </p>
                                            <Link href="#!" className="btn btn-custom-dark fw-medium rounded-pill min-w-150">Shop
                                                Now</Link>
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
export default ArrangingWorkshop