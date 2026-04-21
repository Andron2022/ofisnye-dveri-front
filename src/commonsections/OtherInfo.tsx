"use client";
import React from "react";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";

const OtherInfo = () => {
    return (
        <React.Fragment>
            <Row className="my-4 my-md-5 g-3">
                <Col md={6} lg={4} className="text-center border-end">
                    <h6>CATEGORY:</h6>
                    <p className="text-muted">Portfolio</p>
                </Col>
                <Col md={6} lg={4} className="text-center border-end">
                    <h6>AUTHOR:</h6>
                    <p className="text-muted">Admin</p>
                </Col>
                <Col md={6} lg={4} className="text-center">
                    <h6>TAGS:</h6>
                    <p className="text-muted">Accessories, Diy, Handmade</p>
                </Col>
            </Row>
            <div className="d-flex justify-content-center">
                <Link href="https://www.facebook.com" className="facebook social-icon d-flex justify-content-center align-items-center" data-bs-toggle="tooltip" title=" Share on Facebook">
                    <i className="facl facl-facebook"></i>
                </Link>
                <Link href="https://twitter.com" className="twitter social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Twitter">
                    <i className="facl facl-twitter"></i>
                </Link>
                <Link href="https://www.facebook.com" className="facebook social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Email">
                    <i className="facl facl-facebook"></i>
                </Link>
                <Link href="https://www.pinterest.com" className="pinterest social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Pinterest">
                    <i className="facl facl-pinterest"></i>
                </Link>
                <Link href="#" className="tumblr social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on tumblr">
                    <i className="facl facl-tumblr"></i>
                </Link>
                <Link href="#" className="telegram social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Telegram">
                    <i className="facl facl-telegram"></i>
                </Link>
            </div>
            <div className="py-5 tooltip-back d-flex justify-content-center mt-4">
                <Link href="/single-portfolio-with-shop">
                    <h1 className="m-0">
                        <i className="pegk pe-7s-angle-left text-muted" data-toggle="tooltip" title=" Handmade Candle "></i>
                    </h1>
                </Link>
                <Link href="/single-portfolio-with-shop">
                    <i className="pegk pe-7s-keypad text-muted mx-5" style={{ fontSize: "40px" }} data-toggle="tooltip" title="Back to Portfolio "></i>
                </Link>
                <Link href="/single-portfolio-with-shop">
                    <h1 className="m-0">
                        <i className="pegk pe-7s-angle-right text-muted" data-toggle="tooltip" title="Handmade Craft "></i>
                    </h1>
                </Link>
            </div>
        </React.Fragment>
    )
}
export default OtherInfo