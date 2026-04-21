"use client";
import Link from "next/link";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ShopFooter = () => {
    return (
        <Row className="cookies-law d-lg-flex justify-content-lg-between align-items-center">
            <Col lg={8} className="mb-0 text-muted">We use cookies to improve your experience on our website. By browsing this
                website, you
                agree to our use of
                cookies.</Col>
            <Col lg={4} className="text-center mt-3 mt-lg-0 text-lg-end">
                <Link href="#!" className="btn"> MORE INFO</Link>
                <Link className="btn btn-teal text-white  px-4 fw-medium rounded-0" href="#!">ACCEPT</Link>
            </Col>

        </Row>
    )
}
export default ShopFooter