"use client";
import React, { useEffect, useRef } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import FooterOneProductStore from '@src/components/FooterOneProductStore';
import ProductStoreHeader from '@src/components/Headers/ProductStoreHeader';
import PopupPage from '@src/components/Popup';
import MainModel from '@src/commonsections/MainModel';
import HeadTitle from '@src/commonsections/HeadTitle';

import bannerlist1 from "@assets/images/home-one-product-store/banner-list-desktop.jpg"
import user1 from "@assets/images/home-one-product-store/user-01.jpg"
import user2 from "@assets/images/home-one-product-store/user-02.jpg"
import slide1 from "@assets/images/home-one-product-store/slide-01.jpg"
import banner1 from "@assets/images/home-one-product-store/banner-1.jpg"
import banner2 from "@assets/images/home-one-product-store/banner-2.jpg"
import slidesecond from "@assets/images/home-one-product-store/slide-second-item.png"
import desktop from "@assets/images/home-one-product-store/slide-fourth-desktop.jpg"
import double1 from "@assets/images/home-one-product-store/double-slide-01.jpg"
import double2 from "@assets/images/home-one-product-store/double-slide-02.jpg"

import 'flickity/css/flickity.css';

const HomeOneProductStore = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.js_carousel', {
                cellAlign: 'left',
                imagesLoaded: false,
                wrapAround: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: false,
                pageDots: false,
                contain: true,
                groupCells: "100%",
                adaptiveHeight: true,
                dragThreshold: 5,
                percentPosition: true,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    return (
        <React.Fragment>
            <HeadTitle title="Home One Product Store" />
            <MainModel />
            <ProductStoreHeader />
            <div>
                {/* main section */}
                <section className="position-relative kalles-decor overflow-hidden kill-store-banner" style={{ backgroundImage: `url(${slide1.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="container-fluid px-0">
                        <Row>
                            <Col lg={12}>
                                <div className="bg-overlay"></div>
                                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-start text-lg-end py-5 text-white d-flex">
                                    <div className="container w-100 mt-md-5 pt-md-5">
                                        <div className="row justify-content-lg-end">
                                            <div className="col-6 col-lg-3 mb-5 mb-lg-0">
                                                <h1 className="text-capitalize fw-semibold mb-4 ms-lg-auto max-w-160">Cactus Mosquito Killer</h1>
                                                <h3 className="fs-14 fw-normal mb-2 mb-lg-4">LED Lamp Electronic Pest Repeller</h3>
                                                <Link href="/shop" className="btn btn-dark fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center">Shop
                                                    Now</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/* cat section */}
                <section className="cat-section py-2">
                    <Container fluid className="px-2">
                        <div className="row g-2">
                            <Col lg={6}>
                                <div className="kalles-medical-banner-01 position-relative img-zoom">
                                    <Image src={banner1} alt="Banner1Img" className="img-fluid w-100" />
                                    <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-end text-white m-5">
                                        <div>
                                            <h3 className="fs-36 fw-medium">No Fumes <br /> No Radiation <br /> No Bad Odors</h3>
                                            <p className="fs-16 mb-1">Having Without The Above 3 Disturbance. <br /> It Reduces Likehood
                                                Of Having Respirator <br /> Discomfort.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="kalles-medical-banner-01 position-relative img-zoom">
                                    <Image src={banner2} alt="Banner2Img" className="img-fluid w-100" />
                                    <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-end text-white m-5">
                                        <div>
                                            <h3 className="fs-36 fw-medium">No Fumes <br /> No Radiation <br /> No Bad Odors</h3>
                                            <p className="fs-16 mb-1">Having Without The Above 3 Disturbance. <br /> It Reduces Likehood
                                                Of Having Respirator <br /> Discomfort.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Container>
                </section>

                {/*  */}
                <section className="kalles-one-product-store-slide-type-02">
                    <Container>
                        <Row>
                            <Col lg={4}>
                                <h2 className="fs-30 fw-medium lh-base text-white mb-3">Green Fresh <br /> Sleep Peacefully <br /> Potted
                                    Shape</h2>
                                <p className="text-white mb-4 pb-2">Powerful flow of fan can make vortex to kill mosquito safely and
                                    easily by air drying and dehydration. USB powered, por table, convenient and safe to use.</p>
                                <div>
                                    <Image src={slidesecond} alt="SlidesecondImg" height="110" />
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*  */}
                <section className="kalles-one-product-store-slide-type-03">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6} className="text-lg-center">
                                <h2 className="fs-30 fw-medium lh-base mb-3">Smokeless. Tasteless. Dustless. Anti-Mosquito Lamp</h2>
                                <p className="mb-4 pb-1">The principle of inhalation and anti-mosquito uses mosquito&apos;s phototaxis of UV
                                    light to induce it to enter the effective range of the mosquito-killing lamp, and the airflow
                                    generated by fan is sucked into box.</p>
                                <Link href="#!" className="btn btn-dark fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center">Purchase
                                    Now</Link>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*  */}
                <section className="kalles-one-product-store-slide-type-02" style={{ backgroundImage: `url(${desktop.src})` }}>
                    <Container>
                        <Row className="justify-content-end">
                            <Col lg={4}>
                                <h2 className="fs-30 fs-small-14 fw-medium text-white lh-base mb-3">One Button Control <br /> Easy To Operation <br />
                                    Power By Micro USB</h2>
                                <p className="text-white mb-3">Using The UV Light Instead Of Volatile Mosquito Repellents,</p>
                                <ul className="text-white mb-4">
                                    <li>Decoy Of Bionic Breath</li>
                                    <li>Body Temperature Limitation</li>
                                    <li>Harmless Light Wave</li>
                                </ul>
                                <a href="#!" className="btn btn-light fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center text-hover-dark">Shop
                                    Now</a>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/*  */}
                <section className="cat-section py-2">
                    <div className="container-fluid px-2">
                        <Row className="g-2">
                            <Col lg={6}>
                                <div className="kalles-medical-banner-01 position-relative img-zoom">
                                    <Image src={double1} alt="Double1Img" className="img-fluid w-100" />
                                    <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex text-center justify-content-center text-white m-5">
                                        <div>
                                            <h3 className="fs-36 fw-medium">360 All Rounder Design</h3>
                                            <p className="fs-16 mb-1">Improves Air Flow Suction And All Rounder Coverage.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={6}>
                                <div className="kalles-medical-banner-01 position-relative img-zoom">
                                    <Image src={double2} alt="Double2Img" className="img-fluid w-100" />
                                    <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex text-center justify-content-center text-white m-5">
                                        <div>
                                            <h3 className="fs-36 fw-medium">Inhalation Systems</h3>
                                            <p className="fs-16 mb-1">UV Lamp Attract Mosquito Within Range Unit & Trap Box.</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/*  */}
                <section className="kalles-one-product-store-slide-type-02 position-relative" style={{ backgroundImage: `url(${bannerlist1.src})` }}>
                    <div className="bg-overlay"></div>
                    <div className="container position-relative">
                        <Row>
                            <Col lg={4}>
                                <ul className="text-white vstack gap-2">
                                    <li>Name / Cactus Mosquito Killer</li>
                                    <li>Model / DSH-MK-006</li>
                                    <li>Input Interface / Micro USB</li>
                                    <li>Power / 1.5W</li>
                                    <li>Coverage / 400-800 sq ft</li>
                                    <li>Input / DC5V-0.3A</li>
                                    <li>Net Weight / 307 gsm</li>
                                    <li>Product Size / 120*120*150 Min</li>
                                    <li>Standards / GB4706.1-2005</li>
                                </ul>
                            </Col>
                        </Row>
                    </div>
                </section>

                {/*  */}
                <section className="kalles-one-product-store-testimonial-section">
                    <Container>
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="text-center mb-4 pb-2">
                                    <h3 className="position-relative flex fs-30">
                                        <span>What People Say About Us</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="js_carousel">
                            <div className="col-12">
                                <div className="text-center">
                                    <Image src={user1} alt="User1Img" className="square-lg rounded-circle" />
                                    <div className="text-warning my-3">
                                        <i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-stardn"></i>
                                    </div>
                                    <p className="text-muted">
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                                        <br />
                                        have suffered alteration in some form, by injected humour, or randomised words which
                                        <br />
                                        don&apos;t look even slightly believable.
                                    </p>
                                    <h6 className="mb-0">Henry Pham</h6>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="text-center">
                                    <Image src={user2} alt="User2Img" className="square-lg rounded-circle" />
                                    <div className="text-warning my-3">
                                        <i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-stardn"></i>
                                    </div>
                                    <p className="text-muted">
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                                        <br />
                                        have suffered alteration in some form, by injected humour, or randomised words which
                                        <br />
                                        don&apos;t look even slightly believable.
                                    </p>
                                    <h6 className="mb-0">Nathan Nguyen</h6>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="text-center">
                                    <Image src={user1} alt="User1Img" className="square-lg rounded-circle" />
                                    <div className="text-warning my-3">
                                        <i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-star"></i><i className="facl facl-stardn"></i>
                                    </div>
                                    <p className="text-muted">
                                        There are many variations of passages of Lorem Ipsum available, but the majority
                                        <br />
                                        have suffered alteration in some form, by injected humour, or randomised words which
                                        <br />
                                        don&apos;t look even slightly believable.
                                    </p>
                                    <h6 className="mb-0">Daniel Truong</h6>
                                </div>
                            </div>
                        </div>
                    </Container>
                </section>

                {/*  */}
                <section className="kalles-on-product-frequently-questions">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="text-center mb-4 pb-2">
                                    <h3 className="position-relative flex fs-30">
                                        <span>Frequently Asked Questions</span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <Accordion defaultActiveKey="0" flush className='accordion-custom' id="accordionFlushExample">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            <div className="flex-grow-1">
                                                Anyone ever cough mosquitos with it?
                                            </div>
                                            <span className="icon d-inline-block ms-auto rounded-circle"></span>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-4'>
                                            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                old. Richard McClintock a Latin professor at Hampden-Sydney College in Virginia.
                                            </p>
                                            <p className="mb-0">It is a long established fact that a reader will be distracted by
                                                the readable.</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>
                                            <div className="flex-grow-1">
                                                Is it a Real UV led or only a blue or colored led ?
                                            </div>
                                            <span className="icon d-inline-block ms-auto rounded-circle"></span>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-4'>
                                            <div className="accordion-body p-4">
                                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                    in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                    old. Richard McClintock a Latin professor at
                                                    Hampden-Sydney College in Virginia.</p>
                                                <p className="mb-0">It is a long established fact that a reader will be distracted by
                                                    the readable.</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>
                                            <div className="flex-grow-1">
                                                Is UV light dangerous or optimized?
                                            </div>
                                            <span className="icon d-inline-block ms-auto rounded-circle"></span>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-4'>
                                            <div className="accordion-body p-4">
                                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                    in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                    old. Richard McClintock a Latin professor at
                                                    Hampden-Sydney College in Virginia.</p>
                                                <p className="mb-0">It is a long established fact that a reader will be distracted by
                                                    the readable.</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header>
                                            <div className="flex-grow-1">
                                                Has Autonomy or works only with the cable?
                                            </div>
                                            <span className="icon d-inline-block ms-auto rounded-circle"></span>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-4'>
                                            <div className="accordion-body p-4">
                                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots
                                                    in a piece of classical Latin literature from 45 BC, making it over 2000 years
                                                    old. Richard McClintock a Latin professor at
                                                    Hampden-Sydney College in Virginia.</p>
                                                <p className="mb-0">It is a long established fact that a reader will be distracted by
                                                    the readable.</p>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </div>
                </section>

                {/* footer */}
                <FooterOneProductStore />
                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeOneProductStore