"use client";
import React from 'react'
import Image from 'next/image'
import { Col, Container, Row } from 'react-bootstrap';

import avatar1 from "@assets/images/home-bags/avatar-01.jpg"
import avatar2 from "@assets/images/home-bags/avatar-02.jpg"
import avatar3 from "@assets/images/home-bags/avatar-03.jpg"

import 'flickity/css/flickity.css';


const happycustomer = [
    {
        id: 1,
        avatar: avatar1,
        name: "Chester Torres",
        position: "VP of Product / Local Inc"
    },
    {
        id: 2,
        avatar: avatar2,
        name: "Annie Quinn",
        position: "Co-Founder / April Inc"
    },
    {
        id: 3,
        avatar: avatar3,
        name: "ARTHUR HANSEN",
        position: "CEO / Letters Inc"
    }
]


const HappyCustomer = () => {
    return (
        <React.Fragment>
            <section className="kalles-furniture-testimonial pt-3">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center">
                                <div className="mb-2">
                                    <h1>HAPPY CUSTOMERS</h1>
                                </div>
                                <span className="fs-14 text-uppercase ls-normal text-muted">WHAT FOLKS ARE SAYING ABOUT US</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="quotes_wrapper mt-30 g-0">
                        {happycustomer.map((item) => (
                            <Col lg={4} key={item.id}>
                                <div className="quote_slide border">
                                    <p className="text-muted fs-14">Amazing theme and top class support, as I’m a beginner, Luke helped
                                        me above and beyond and was more than patient, his responses were quick and he has a genuine
                                        care for you to enjoy and move forward with your theme!</p>
                                    <div className="d-flex align-items-center gap-3 mt-4 pt-2">
                                        <Image src={item.avatar} alt="ItemImg" className="square-md rounded-circle" />
                                        <div>
                                            <h6 className="quote_author mb-0 text-uppercase">{item.name}</h6>
                                            <p className="text-muted mb-1">{item.position}</p>
                                            <div className="text-warning fs-13">
                                                <i className="facl facl-star"></i>
                                                <i className="facl facl-star"></i>
                                                <i className="facl facl-star"></i>
                                                <i className="facl facl-star"></i>
                                                <i className="facl facl-star"></i>
                                                <i className="facl facl-stardn"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default HappyCustomer