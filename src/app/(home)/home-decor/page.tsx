import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import slide from "@assets/images/home-decor/main-slide.jpg"

import banner1 from "@assets/images/home-decor/cat-banner-01.jpg"
import banner2 from "@assets/images/home-decor/cat-banner-02.jpg"
import banner3 from "@assets/images/home-decor/cat-banner-03.jpg"
import FooterPage from '@src/components/Footer'
import LatestBlog from '@app/(home)/home-decor/LatestBlog'
import NewsLetter from '@app/(home)/home-decor/NewsLetter'
import Shipping from '@app/(home)/home-decor/Shipping'
import BestSelling from '@app/(home)/home-decor/BestSelling'
import HeaderDecor from '@src/components/HeaderDecor'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'

const catData = [
    { id: 1, pic: banner1, title: "Lighting Collections", btntext: "Explore Now", direction: false, text: false },
    { id: 2, pic: banner2, title: "Audio Decor", btntext: "View Collections", direction: true, text: true },
    { id: 3, pic: banner3, title: "New Arrivals", btntext: "Shop Now", direction: false, text: true },
]

const HomeDecor = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Decor" />
            <HeaderDecor />
            <div>
                {/* main slide */}
                <section className="position-relative kalles-decor overflow-hidden">
                    <Container fluid className="px-0">
                        <Row>
                            <Col lg={12}>
                                <Image src={slide} alt="SlideImg" className="w-100 img-fluid kalles-decor-img" />
                                <div className="bg-overlay"></div>
                                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 text-white d-flex align-items-center justify-content-center">
                                    <div className="pt-5 pt-sm-0">
                                        <h1 className="text-capitalize summer-tag fw-medium main-title mb-4 pb-2 ">interior decorations</h1>
                                        <h3 className=" font-secondary  fw-normal fst-italic mb-4">looking for furniture for
                                            your living room</h3>
                                        <Link href="/shop" className="btn btn-custom stretched-link fw-medium min-w-150 rounded-0 d-inline-flex align-items-center justify-content-center">Shop
                                            Now&nbsp;<i className="las la-arrow-right"></i></Link>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* cat section */}
                <section className="mt-3 kalles-decor-cat-banner-layout bg-light">
                    <Container fluid>
                        <Row className="g-3">
                            {catData.map((item, index) => (
                                <Col key={index} md={6} lg={4}>
                                    <Link href="/shop" className="position-relative hover-zoom d-block">
                                        <Image src={item.pic} alt="ItemImg" className="img-fluid hover-zoom-img w-100" />
                                        <div className={item.direction ? "position-absolute start-0 start-0 end-0 top-0 bottom-0 align-items-end justify-content-end text-end d-flex m-3" : "position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex m-3"}>
                                            <div className={item.text ? "text-dark" : "text-white"}>
                                                <h4 className="fs-30 fw-semibold mb-2">{item.title}</h4>
                                                <p className={item.text ? "fw-semibold font-futura mb-0 btn_icon_true dark d-inline-block position-relative fs-16" : "fw-semibold font-futura mb-0 btn_icon_true d-inline-block position-relative fs-16"}>
                                                    {item.btntext}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>

                {/* best selling product */}
                <BestSelling />

                {/* latest blog */}
                <LatestBlog />

                {/* news letter */}
                <NewsLetter />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterPage />

                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeDecor