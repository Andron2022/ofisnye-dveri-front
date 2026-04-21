"use client";
import React, { useState } from 'react'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useMediaQuery } from 'react-responsive';
import { SizeGuideModal, DeliveryAndReturnModal, Question } from '@src/components/ProductModal/ProductModals'
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules'
import Link from 'next/link'
import Image from 'next/image'

import thumb01 from "@assets/images/single-product/tab-accordion/thumb-01.jpg"
import thumb02 from "@assets/images/single-product/tab-accordion/thumb-02.jpg"
import productTrust from "@assets/images/single-product/cart_image.png"

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductSwiper = ({handleShoppingShow}:any) => {
    const isMobile = useMediaQuery({ maxWidth: 1025 });
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (change: number) => {
        setQuantity((prev) => Math.max(0, prev + change));
    };

    const handleChange = (event: any) => {
        const value = Math.max(0, Math.min(100, Number(event.target.value)));
        setQuantity(value);
    };


    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);


    return (
        <React.Fragment>
            <Container className='py-4'>
                <Row className='py-3 gx-xl-1'>
                    <Col md={6}>
                        <Row className='g-2'>
                            <Col xl={2} className="mt-xl-3 mt-2 order-2 order-xl-1">
                                <Swiper
                                    // onSwiper={setThumbsSwiper}

                                    pagination={{
                                        type: 'progressbar',
                                    }}
                                    direction={isMobile ? 'horizontal' : 'vertical'}
                                    slidesPerView={isMobile ? 4 : 6}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    spaceBetween={10}
                                    className="productSmall"
                                    modules={[FreeMode, Pagination]}
                                >
                                    <div className="swiper-wrapper">
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="object-fit-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb02}
                                                alt="Thumb02Img"
                                                className="object-fit-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="object-fit-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb02}
                                                alt="Thumb02Img"
                                                className="object-fit-cover"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="object-fit-cover"
                                            />
                                        </SwiperSlide>
                                    </div>
                                </Swiper>
                            </Col>
                            <Col xl={9} className="mt-3 order-1 order-xl-2">
                                <Swiper
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    className="productMain"
                                    modules={[Thumbs, Navigation]}
                                >
                                    <div className="swiper-wrapper">
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="img-fluid w-100"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb02}
                                                alt="Thumb02Img"
                                                className="img-fluid w-100"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="img-fluid w-100"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb02}
                                                alt="Thumb02Img"
                                                className="img-fluid w-100"
                                            />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <Image
                                                src={thumb01}
                                                alt="Thumb01Img"
                                                className="img-fluid w-100"
                                            />
                                        </SwiperSlide>
                                    </div>
                                </Swiper>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6} className='mt-5 mt-md-0'>
                        <h4 className="mb-3">Felt Cowboy Hat</h4>
                        <div className="d-flex flex-wrap justify-content-between">
                            <p className="text-muted fs-18 mb-4">$22.00</p>
                            <div id="tab_reviews_product">
                                <div className="kalles-rating-result">
                                    <span className="kalles-rating-result__pipe">
                                        <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>&nbsp;
                                        <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>&nbsp;
                                        <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>&nbsp;
                                        <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>&nbsp;
                                        <span className="kalles-rating-result__start kalles-rating-result__start--big de-active"></span>
                                    </span>&nbsp;
                                    <Link href='#'>(06 reviews)</Link>
                                </div>
                            </div>
                        </div>

                        <p className="text-muted"><span><i className="cd mr__5 fading_true fs__20 las la-fire me-1"></i></span>
                            <span className="text-black">25</span> sold in last <span className="text-black">21</span>
                            hours
                        </p>

                        <p className="text-muted">
                            Go kalles this summer with this vintage navy and white striped v-neck t-shirt from the Nike.
                            Perfect for pairing with denim and white kicks for a stylish kalles vibe.
                        </p>

                        <div className="d-flex flex-wrap align-items-center gap-2 mt-4">
                            <div className="input-step border border-dark rounded-pill">
                                <Button variant="outline-dark" className="minus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(-1)}>–</Button>
                                <input type="number" className="product-quantity fw-bold fs-6" value={quantity} min="0" max="100" onChange={handleChange} />
                                <Button variant="outline-dark" className="plus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(1)}>+</Button>
                            </div>
                            <Button variant="teal" className="text-uppercase rounded-pill min-w-150" onClick={handleShoppingShow}>
                                Add to cart
                            </Button>
                            <div className="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center" style={{ lineHeight: '40px' }}>
                                <Link href="#"><i className="facl facl-heart-o"></i></Link>
                            </div>
                        </div>

                        <p className="text-black text-center mt-4"><span><i className="cd mr__5 fading_true fs__20 las la-hourglass-half"></i></span>
                            HURRY! ONLY <span className="text-danger">15</span> LEFT IN STOCK.
                        </p>

                        <ProgressBar striped className='stock-progress mb-5' animated  now={75} role="progressbar" />

                        <div className="mt-4 d-flex justify-content-center">
                            <Image src={productTrust} alt="ProductTrustImg" className="img-fluid" />
                        </div>

                        <div className="mt-4 d-flex gap-3 text-nowrap flex-wrap row-gap-1">
                            <Link href="#sizeGuidModal" data-bs-toggle="modal" className="text-black fw-semibold" onClick={handleShow}>Size Guide</Link>
                            <Link href="#deliveyReturnModal" data-bs-toggle="modal" className="text-black fw-semibold mx-2" onClick={handleShow2}>Delivery and Return</Link>
                            <Link href="#askQuesitionModal" data-bs-toggle="modal" className="text-black fw-semibold" onClick={handleShow3}>Ask a
                                Question</Link>
                        </div>
                        <div className="mt-4">
                            <p className="mb-2"><span>SKU :</span><span className="text-muted"> P15-2</span></p>
                            <p className="mb-2">
                                <span>Categories:</span>
                                <span className="text-muted">
                                    <Link href="#!" className="text-muted"> All, </Link>
                                    <Link href="#!" className="text-muted">Best seller, </Link>
                                    <Link href="#!" className="text-muted">Bottom, </Link>
                                    <Link href="#!" className="text-muted">Dress, </Link>
                                    <Link href="#!" className="text-muted">New Arrival, </Link>
                                    <Link href="#!" className="text-muted">Women</Link>
                                </span>
                            </p>
                            <p className="mb-2">
                                <span>Tags :</span>
                                <span className="text-muted">
                                    <Link href="#!" className="text-muted"> Color Black, </Link>
                                    <Link href="#!" className="text-muted">Color Grey, </Link>
                                    <Link href="#!" className="text-muted">Color Pink, </Link>
                                    <Link href="#!" className="text-muted">Price $7-$50, </Link>
                                    <Link href="#!" className="text-muted">Size L, </Link>
                                    <Link href="#!" className="text-muted">Size M, </Link>
                                    <Link href="#!" className="text-muted">Size S</Link>
                                </span>
                            </p>
                        </div>
                        <div className="social-share my-4">
                            <div className="d-flex align-items-center gap-2">
                                <Link href="https://www.facebook.com/">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <g>
                                            <path d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z" fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </Link>
                                <Link href="https://twitter.com/">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <g>
                                            <path d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336" fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </Link>
                                <Link href="https://www.google.com/gmail/about">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <g>
                                            <g fillRule="evenodd"></g>
                                            <path d="M27 22.757c0 1.24-.988 2.243-2.19 2.243H7.19C5.98 25 5 23.994 5 22.757V13.67c0-.556.39-.773.855-.496l8.78 5.238c.782.467 1.95.467 2.73 0l8.78-5.238c.472-.28.855-.063.855.495v9.087z">
                                            </path>
                                            <path d="M27 9.243C27 8.006 26.02 7 24.81 7H7.19C5.988 7 5 8.004 5 9.243v.465c0 .554.385 1.232.857 1.514l9.61 5.733c.267.16.8.16 1.067 0l9.61-5.733c.473-.283.856-.96.856-1.514v-.465z">
                                            </path>
                                        </g>
                                    </svg>
                                </Link>
                                <Link href="https://www.pinterest.com/">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <g>
                                            <path d="M7 13.252c0 1.81.772 4.45 2.895 5.045.074.014.178.04.252.04.49 0 .772-1.27.772-1.63 0-.428-1.174-1.34-1.174-3.123 0-3.705 3.028-6.33 6.947-6.33 3.37 0 5.863 1.782 5.863 5.058 0 2.446-1.054 7.035-4.468 7.035-1.232 0-2.286-.83-2.286-2.018 0-1.742 1.307-3.43 1.307-5.225 0-1.092-.67-1.977-1.916-1.977-1.692 0-2.732 1.77-2.732 3.165 0 .774.104 1.63.476 2.336-.683 2.736-2.08 6.814-2.08 9.633 0 .87.135 1.728.224 2.6l.134.137.207-.07c2.494-3.178 2.405-3.8 3.533-7.96.61 1.077 2.182 1.658 3.43 1.658 5.254 0 7.614-4.77 7.614-9.067C26 7.987 21.755 5 17.094 5 12.017 5 7 8.15 7 13.252z" fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </Link>
                                <Link href="https://www.messenger.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                        <g>
                                            <path d="M16 6C9.925 6 5 10.56 5 16.185c0 3.205 1.6 6.065 4.1 7.932V28l3.745-2.056c1 .277 2.058.426 3.155.426 6.075 0 11-4.56 11-10.185C27 10.56 22.075 6 16 6zm1.093 13.716l-2.8-2.988-5.467 2.988 6.013-6.383 2.868 2.988 5.398-2.987-6.013 6.383z" fillRule="evenodd"></path>
                                        </g>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <p className="text-black">
                            <i className="las la-truck fading_true fs__20 mr__5"></i>&nbsp;
                            Order in the next 15 hours 13 minutes to get it between
                            <span className="border-bottom fw-medium">Friday, 29th January and Wednesday, 3rd
                                February</span>
                        </p>
                        <p className="text-black">
                            <i className="cd mr__5 fading_true fs__20 las la-eye"></i>
                            <span className="fw-medium"> 85 People </span>are viewing this right now
                        </p>
                    </Col>
                </Row>
                <SizeGuideModal show={show} handleClose={handleClose} />
                <DeliveryAndReturnModal show2={show2} handleClose2={handleClose2} />
                <Question show3={show3} handleClose3={handleClose3} />
            </Container>
        </React.Fragment>
    )
}

export default ProductSwiper