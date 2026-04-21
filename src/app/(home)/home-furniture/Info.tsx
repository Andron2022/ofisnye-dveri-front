"use client";
import React from "react";
import { Container, Row } from 'react-bootstrap'
import Link from "next/link";
const Info = () => {
    return (
        <React.Fragment>
            <section className="kalles-furnitur-type-banner">
                <Container>
                    <Row className="justify-content-center">
                        <div className="col-lg-9 text-center">
                            <h6 className="mb-3 title fw-medium">URBAN DANISH DESIGN SINCE 1952</h6>
                            <p className="text-muted sub-title">We are not just another furniture store. We have worked with
                                interior design for more than 60 years, and we have a strong set of beliefs that run through
                                everything we do.</p>
                            <Link href="#!" className="btn d-flex align-items-center mx-auto rounded-0 fw-medium justify-content-center text-uppercase text-hover-white">Read
                                Our Story</Link>
                        </div>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default Info