"use client";
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Link from 'next/link';
import LatestBlogs from '@src/commonsections/LatestBlogs';
import FollowInstagram from '@src/commonsections/FollowInstagram';
import Shipping from '@src/commonsections/Shipping';
import FooterPage from '@src/components/Footer';
import TrendingandNewArrival from '@src/commonsections/TrendingandNewArrival';
import TopBanner from '@src/components/Headers/TopBanner';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';
import HeaderLookbookCollection from '@src/components/Headers/HeaderLookbookCollection';
import { PinModal1, PinModal2, PinModal3, PinModal4, PinModal5, PinModal6 } from '@src/components/Lookbookmodels/LookbookModels';

import HomeSection from '@app/(home)/home-lookbook-collection/HomeSection';
import CatSection from '@app/(home)/home-lookbook-collection/CatSection';
import Collections from '@app/(home)/home-lookbook-collection/Collections';

import pin1 from "@assets/images/home-lookbook-collection/bg-pin-01.jpeg"
import pin2 from "@assets/images/home-lookbook-collection/bg-pin-02.jpeg"
import pin3 from "@assets/images/home-lookbook-collection/bg-pin-03.jpg"
import pin4 from "@assets/images/home-lookbook-collection/bg-pin-04.jpg"
import pin5 from "@assets/images/home-lookbook-collection/bg-pin-05.jpg"

import 'flickity/css/flickity.css';

const HomeLookbookCollection = () => {

    const [PinMode1, setPinMode1] = useState(false);
    const [PinMode2, setPinMode2] = useState(false);
    const [PinMode3, setPinMode3] = useState(false);
    const [PinMode4, setPinMode4] = useState(false);
    const [PinMode5, setPinMode5] = useState(false);
    const [PinMode6, setPinMode6] = useState(false);

    const handlePinMode1Show = () => setPinMode1(true);
    const handlePinMode1Close = () => setPinMode1(false);
    const handlePinMode2Show = () => setPinMode2(true);
    const handlePinMode2Close = () => setPinMode2(false);
    const handlePinMode3Show = () => setPinMode3(true);
    const handlePinMode3Close = () => setPinMode3(false);
    const handlePinMode4Show = () => setPinMode4(true);
    const handlePinMode4Close = () => setPinMode4(false);
    const handlePinMode5Show = () => setPinMode5(true);
    const handlePinMode5Close = () => setPinMode5(false);
    const handlePinMode6Show = () => setPinMode6(true);
    const handlePinMode6Close = () => setPinMode6(false);

    return (
        <React.Fragment>
            <HeadTitle title="Home Lookbook Collection" />
            <div>

                <TopBanner />

                {/* header */}
                <HeaderLookbookCollection />

                {/* main slide */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* collections */}
                <Collections />

                {/* trending */}
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <Row className="justify-content-center">
                            <Col lg={7}>
                                <div className="text-center">
                                    <div className="mb-2">
                                        <h3 className="section-title position-relative flex">
                                            <span>TRENDING</span>
                                        </h3>
                                    </div>
                                    <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Top view in
                                        this week</span>
                                </div>
                            </Col>
                        </Row>
                        <TrendingandNewArrival colClass="col-md-3 col-6 col-lg-2 px-lg-12 px-2" />
                    </div>
                </section>

                {/*  */}

                {/* cat section 2 */}
                <section className="cat-section pb-0">
                    <div className="container">
                        <Row className="justify-content-center">
                            <Col lg={7}>
                                <div className="text-center">
                                    <div className="mb-2">
                                        <h3 className="section-title position-relative flex text-uppercase">
                                            <span>Lookbook Collection</span>
                                        </h3>
                                    </div>
                                    <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Spring summer 2024 lookbook</span>
                                </div>
                            </Col>
                        </Row>
                        <Row className="g-4 mt-4">
                            <Col lg={6}>
                                <Row className="g-4">
                                    <Col md={6}>
                                        <div className="position-relative cat_grid_item overflow-hidden h-350">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pin1.src})` }}>
                                            </div>
                                            <div className="pin-type position-absolute position-09 z-2">
                                                <span className="zoompin"></span>
                                                <Link href="#pinType1" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode1Show}>
                                                    <i className="nav_link_icon position-relative"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="position-relative cat_grid_item overflow-hidden h-350">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pin2.src})` }}>
                                            </div>
                                            <div className="pin-type position-absolute position-08 z-2">
                                                <span className="zoompin"></span>
                                                <Link href="#pinType2" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode2Show}>
                                                    <i className="nav_link_icon position-relative"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="position-relative cat_grid_item overflow-hidden h-350">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pin4.src})` }}>
                                            </div>
                                            <div className="pin-type position-absolute position-04 z-2">
                                                <span className="zoompin"></span>
                                                <Link href="#pinType3" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode3Show}>
                                                    <i className="nav_link_icon position-relative"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="position-relative cat_grid_item overflow-hidden h-350">
                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pin5.src})` }}>
                                            </div>
                                            <div className="pin-type position-absolute position-04 z-2">
                                                <span className="zoompin"></span>
                                                <Link href="#pinType4" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode4Show}>
                                                    <i className="nav_link_icon position-relative"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={6}>
                                <div className="position-relative cat_grid_item overflow-hidden h-100">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${pin3.src})` }}>
                                    </div>
                                    <div className="pin-type position-absolute position-06 z-2">
                                        <span className="zoompin"></span>
                                        <Link href="#pinType5" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode5Show}>
                                            <i className="nav_link_icon position-relative"></i>
                                        </Link>
                                    </div>
                                    <div className="pin-type position-absolute position-09 z-2">
                                        <span className="zoompin"></span>
                                        <Link href="#pinType6" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handlePinMode6Show}>
                                            <i className="nav_link_icon position-relative"></i>
                                        </Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Render Modals */}

                </section>

                <PinModal1 show={PinMode1} handleClose={handlePinMode1Close} />
                <PinModal2 show={PinMode2} handleClose={handlePinMode2Close} />
                <PinModal3 show={PinMode3} handleClose={handlePinMode3Close} />
                <PinModal4 show={PinMode4} handleClose={handlePinMode4Close} />
                <PinModal5 show={PinMode5} handleClose={handlePinMode5Close} />
                <PinModal6 show={PinMode6} handleClose={handlePinMode6Close} />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* Shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />

                <PopupPage />

            </div>
        </React.Fragment>
    )
}

export default HomeLookbookCollection