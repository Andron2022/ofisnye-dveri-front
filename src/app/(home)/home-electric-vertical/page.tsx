import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import LayoutHeader8 from '@src/components/Headers/LayoutHeader8'
import banner from "@assets/images/home-electronic-vertical/slide-banner.jpg"

import audio from "@assets/images/home-electronic-vertical/cat-audio.jpg"
import speaker from "@assets/images/home-electronic-vertical/cat-speaker.jpg"
import hiend from "@assets/images/home-electronic-vertical/cat-hi-end.jpg"
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import Blog from '@app/(home)/home-electric-vertical/Blog'
import BestSeller from '@app/(home)/home-electric-vertical/BestSeller'
import MainModel from '@src/commonsections/MainModel'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeElectricVertical = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Electric Vertical" />
            <MainModel />
            <LayoutHeader8 />
            <div>
                {/* main */}
                <section className="position-relative kalles-decor overflow-hidden" style={{ backgroundImage: `url(${banner.src})` }}>
                    <div className="container-fluid px-0">
                        <div className="row">
                            <div className="col-lg-12">
                                <Image src={banner} alt="BannerImg" className="kalles-decor-img img-fluid w-100" />
                                <div className="bg-overlay"></div>
                                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 d-flex align-items-center justify-content-center">
                                    <div>
                                        <h1 className="mx-3 decor-title  mb-4">Decor your home with high-end audio</h1>
                                        <Link href="/shop" className="btn btn-custom stretched-link text-white fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center">Shop
                                            Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section 2 */}
                <section>
                    <Container className="mt-5">
                        <Row>
                            <Col md={4}>
                                <div className="d-flex">
                                    <i className="las la-life-ring text-muted" style={{ fontSize: "40px" }}></i>
                                    <div className="ms-2">
                                        <h6 className="mb-1">SUPPORT 24/7</h6>
                                        <p className="text-muted">we support 24 hours a day</p>
                                    </div>
                                </div>
                            </Col>
                            <div className="col-md-4 my-4 my-md-0">
                                <div className="d-flex">
                                    <i className="las la-sync-alt text-muted" style={{ fontSize: "40px" }}></i>
                                    <div className="ms-2">
                                        <h6 className="mb-1">30 DAYS RETURN</h6>
                                        <p className="text-muted">you have 30 days to return</p>
                                    </div>
                                </div>
                            </div>
                            <Col md={4}>
                                <div className="d-flex">
                                    <i className="las la-user-circle text-muted " style={{ fontSize: "40px" }}></i>
                                    <div className="ms-2">
                                        <h6 className="mb-1">PAYMENT 100% SECURE</h6>
                                        <p className="text-muted">Payment 100% Secure</p>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* cat section */}
                <section className="cat-section">
                    <Container>
                        <div className="row g-2 g-lg-4">
                            <Col md={4}>
                                <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden mb-4" style={{ height: "220px" }}>
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${audio.src})` }}>
                                    </div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Smart Watch</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden mb-4" style={{ height: "220px" }}>
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${speaker.src})` }}>
                                    </div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Macbook</div>
                                    </div>
                                </Link>
                            </Col>
                            <Col md={4}>
                                <Link href="#!" className="d-block position-relative cat_grid_item overflow-hidden mb-4" style={{ height: "220px" }}>
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${hiend.src})` }}>
                                    </div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Headphone</div>
                                    </div>
                                </Link>
                            </Col>
                        </div>
                    </Container>
                </section>

                {/* best seller */}
                <BestSeller />

                {/* blog */}
                <Blog />

                {/* newsletter */}
                <section className="kalles-electric-newsletter py-5 ">
                    <Container>
                        <div className="row justify-content-center py-4">
                            <Col md={8} className="col-10 text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>SUBSCRIBE OUR NEWSLETTER</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-16 text-muted ">
                                    Sign up for our newsletter to be updated on the latest designs, exclusive offers, inspiration
                                    and tips! </span>
                                <form id="contact_form" className="d-block mt-4 pt-2 mx-lg-5">
                                    <div className="footer-subscribe position-relative mx-lg-5">
                                        <input type="email" name="email" placeholder="Your email address" className="input-text form-control w-100 rounded-pill py-3" required />
                                        <button type="submit" className="btn btn-dark position-absolute rounded-pill ">
                                            <span>Subscribe</span>
                                        </button>
                                    </div>
                                </form>
                            </Col>
                        </div>
                    </Container>
                </section>

                {/* Shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />
                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeElectricVertical