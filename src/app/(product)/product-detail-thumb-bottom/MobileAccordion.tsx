"use client";
import React, { useState } from "react";
import Image from "next/image";
import icondown from '@assets/images/single-product/icon-down.svg'
import { Card, CardBody, Col, Row } from "react-bootstrap";
import Link from "next/link";

const MobileAccordion = () => {

    const [open, setOpen] = useState<number | any>(1)
    const handleClick = (id: any) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }

    return (
        <React.Fragment>
            <div className="mt-4 mb-3 d-block d-lg-none">
                <div className="container">
                    <div className="accordion-flush product-accordion" id="accordionFlushExample">
                        <div className="accordion-item border-0 mb-2">
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${open === 1 ? '' : "collapsed"} bg-light position-relative pe-3`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne" onClick={() => handleClick(1)}>
                                    Description
                                    <span className="bg-dark position-absolute end-0" style={{ width: "47px", height: "100%" }}></span>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className={`accordion-collapse collapse ${open === 1 ? 'show' : ""}`} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body border border-top-0 border-light">
                                    <div className="container">
                                        <Row className="align-items-center">
                                            <Col md={6}>
                                                <p className="cb">Typography is the work of<em> typesetters, compositors,
                                                    typographers, graphic designers, art directors, manga artists, comic
                                                    book artists, graffiti artists</em>, and now—anyone who arranges words,
                                                    letters, numbers, and symbols
                                                    for publication, display, or distribution—from clerical
                                                    <strong>workers and newsletter writers to anyone self-publishing
                                                        materials.</strong>
                                                </p>
                                                <blockquote className="product-blockquote fs-13">
                                                    <p className="mb-0">As the capability to create typography has become
                                                        ubiquitous, the application of principles and best practices developed
                                                        over generations of skilled workers and professionals has diminished.
                                                        Ironically, at a time when
                                                        scientific techniques.
                                                    </p>
                                                </blockquote>
                                                <p className="cb">Until the Digital Age, typography was a specialized occupation.
                                                    Digitization opened up typography to new generations of previously unrelated
                                                    designers and lay users, and David Jury, head of graphic design at
                                                    Colchester Institute
                                                    in England, states that “typography is now something everybody does. As the
                                                    capability to create typography has become ubiquitous, the application of
                                                    principles and best practices developed over generations of skilled workers
                                                    and professionals has diminished. Ironically, at a time when scientific
                                                    techniques.
                                                </p>
                                            </Col>
                                            <Col md={6}>
                                                <Row className="g-4">
                                                    <Col md={6}>
                                                        <div className="text-center">
                                                            <i className="pegk pe-7s-car fs-1 text-muted mb-3"></i>
                                                            <div className="info-box-content">
                                                                <h5>FREE SHIPPING</h5>
                                                                <span>Free shipping on all US order or order above
                                                                    $100</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="text-center">
                                                            <i className="pegk pe-7s-help2 fs-1 text-muted mb-3"></i>
                                                            <div className="info-box-content">
                                                                <h5>SUPPORT 24/7</h5>
                                                                <span>Contact us 24 hours a day, 7 days a week</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="text-center">
                                                            <i className="pegk pe-7s-refresh fs-1 text-muted mb-3"></i>
                                                            <div className="info-box-content">
                                                                <h5>30 DAYS RETURN</h5>
                                                                <span>Simply return it within 30 days for an
                                                                    exchange</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="text-center">
                                                            <i className="pegk pe-7s-door-lock fs-1 text-muted mb-3"></i>
                                                            <div className="info-box-content">
                                                                <h5>100% PAYMENT SECURE</h5>
                                                                <span>We ensure secure payment with PEV</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-0 mb-2">
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${open === 4 ? '' : "collapsed"} bg-light position-relative pe-3`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo" onClick={() => handleClick(4)}>
                                    Wash & Care
                                    <span className="bg-dark position-absolute end-0" style={{ width: "47px", height: "100%" }}></span>
                                </button>
                            </h2>
                            <div id="flush-collapseTwo" className={`accordion-collapse collapse ${open === 4 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul className="list-unstyled d-flex flex-wrap justify-content-center mb-0 ">
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M8.7 30.7h22.7c.3 0 .6-.2.7-.6l4-25.3c-.1-.4-.3-.7-.7-.8s-.7.2-.8.6L34 8.9l-3-1.1c-2.4-.9-5.1-.5-7.2 1-2.3 1.6-5.3 1.6-7.6 0-2.1-1.5-4.8-1.9-7.2-1L6 8.9l-.7-4.3c0-.4-.4-.7-.7-.6-.4.1-.6.4-.6.8l4 25.3c.1.3.3.6.7.6zm.8-21.6c2-.7 4.2-.4 6 .8 1.4 1 3 1.5 4.6 1.5s3.2-.5 4.6-1.5c1.7-1.2 4-1.6 6-.8l3.3 1.2-3 19.1H9.2l-3-19.1 3.3-1.2zM32 32H8c-.4 0-.7.3-.7.7s.3.7.7.7h24c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zm0 2.7H8c-.4 0-.7.3-.7.7s.3.6.7.6h24c.4 0 .7-.3.7-.7s-.3-.6-.7-.6zm-17.9-8.9c-1 0-1.8-.3-2.4-.6l.1-2.1c.6.4 1.4.6 2 .6.8 0 1.2-.4 1.2-1.3s-.4-1.3-1.3-1.3h-1.3l.2-1.9h1.1c.6 0 1-.3 1-1.3 0-.8-.4-1.2-1.1-1.2s-1.2.2-1.9.4l-.2-1.9c.7-.4 1.5-.6 2.3-.6 2 0 3 1.3 3 2.9 0 1.2-.4 1.9-1.1 2.3 1 .4 1.3 1.4 1.3 2.5.3 1.8-.6 3.5-2.9 3.5zm4-5.5c0-3.9 1.2-5.5 3.2-5.5s3.2 1.6 3.2 5.5-1.2 5.5-3.2 5.5-3.2-1.6-3.2-5.5zm4.1 0c0-2-.1-3.5-.9-3.5s-1 1.5-1 3.5.1 3.5 1 3.5c.8 0 .9-1.5.9-3.5zm4.5-1.4c-.9 0-1.5-.8-1.5-2.1s.6-2.1 1.5-2.1 1.5.8 1.5 2.1-.5 2.1-1.5 2.1zm0-.8c.4 0 .7-.5.7-1.2s-.2-1.2-.7-1.2-.7.5-.7 1.2.3 1.2.7 1.2z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M36.7 31.1l-2.8-1.3-4.7-9.1 7.5-3.5c.4-.2.6-.6.4-1s-.6-.5-1-.4l-7.5 3.5-7.8-15c-.3-.5-1.1-.5-1.4 0l-7.8 15L4 15.9c-.4-.2-.8 0-1 .4s0 .8.4 1l7.5 3.5-4.7 9.1-2.8 1.3c-.4.2-.6.6-.4 1 .1.3.4.4.7.4.1 0 .2 0 .3-.1l1-.4-1.5 2.8c-.1.2-.1.5 0 .8.1.2.4.3.7.3h31.7c.3 0 .5-.1.7-.4.1-.2.1-.5 0-.8L35.1 32l1 .4c.1 0 .2.1.3.1.3 0 .6-.2.7-.4.1-.3 0-.8-.4-1zm-5.1-2.3l-9.8-4.6 6-2.8 3.8 7.4zM20 6.4L27.1 20 20 23.3 12.9 20 20 6.4zm-7.8 15l6 2.8-9.8 4.6 3.8-7.4zm22.4 13.1H5.4L7.2 31 20 25l12.8 6 1.8 3.5z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M5.9 5.9v28.2h28.2V5.9H5.9zM19.1 20l-8.3 8.3c-2-2.2-3.2-5.1-3.2-8.3s1.2-6.1 3.2-8.3l8.3 8.3zm-7.4-9.3c2.2-2 5.1-3.2 8.3-3.2s6.1 1.2 8.3 3.2L20 19.1l-8.3-8.4zM20 20.9l8.3 8.3c-2.2 2-5.1 3.2-8.3 3.2s-6.1-1.2-8.3-3.2l8.3-8.3zm.9-.9l8.3-8.3c2 2.2 3.2 5.1 3.2 8.3s-1.2 6.1-3.2 8.3L20.9 20zm8.4-10.2c-1.2-1.1-2.6-2-4.1-2.6h6.6l-2.5 2.6zm-18.6 0L8.2 7.2h6.6c-1.5.6-2.9 1.5-4.1 2.6zm-.9.9c-1.1 1.2-2 2.6-2.6 4.1V8.2l2.6 2.5zM7.2 25.2c.6 1.5 1.5 2.9 2.6 4.1l-2.6 2.6v-6.7zm3.5 5c1.2 1.1 2.6 2 4.1 2.6H8.2l2.5-2.6zm18.6 0l2.6 2.6h-6.6c1.4-.6 2.8-1.5 4-2.6zm.9-.9c1.1-1.2 2-2.6 2.6-4.1v6.6l-2.6-2.5zm2.6-14.5c-.6-1.5-1.5-2.9-2.6-4.1l2.6-2.6v6.7z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M35.1 33.6L33.2 6.2c0-.4-.3-.7-.7-.7H13.9c-.4 0-.7.3-.7.7s.3.7.7.7h18l.7 10.5H20.8c-8.8.2-15.9 7.5-15.9 16.4 0 .4.3.7.7.7h28.9c.2 0 .4-.1.5-.2s.2-.3.2-.5v-.2h-.1zm-28.8-.5C6.7 25.3 13 19 20.8 18.9h11.9l1 14.2H6.3zm11.2-6.8c0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1 1-2.1 2.1-2.1 2.1 1 2.1 2.1zm6.3 0c0 1.2-1 2.1-2.1 2.1-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M20 33.8c7.6 0 13.8-6.2 13.8-13.8S27.6 6.2 20 6.2 6.2 12.4 6.2 20 12.4 33.8 20 33.8zm0-26.3c6.9 0 12.5 5.6 12.5 12.5S26.9 32.5 20 32.5 7.5 26.9 7.5 20 13.1 7.5 20 7.5zm-.4 15h.5c1.8 0 3-1.1 3-3.7 0-2.2-1.1-3.6-3.1-3.6h-2.6v10.6h2.2v-3.3zm0-5.2h.4c.6 0 .9.5.9 1.7 0 1.1-.3 1.7-.9 1.7h-.4v-3.4z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M30.2 29.3c2.2-2.5 3.6-5.7 3.6-9.3s-1.4-6.8-3.6-9.3l3.6-3.6c.3-.3.3-.7 0-.9-.3-.3-.7-.3-.9 0l-3.6 3.6c-2.5-2.2-5.7-3.6-9.3-3.6s-6.8 1.4-9.3 3.6L7.1 6.2c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.6 3.6c-2.2 2.5-3.6 5.7-3.6 9.3s1.4 6.8 3.6 9.3l-3.6 3.6c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l3.6-3.6c2.5 2.2 5.7 3.6 9.3 3.6s6.8-1.4 9.3-3.6l3.6 3.6c.1.1.3.2.5.2s.3-.1.5-.2c.3-.3.3-.7 0-.9l-3.8-3.6z">
                                                </path>
                                            </svg>
                                        </li>
                                        <li className="m-2">
                                            <svg width="35" viewBox="0 0 40 40">
                                                <path fill="currentColor" d="M34.1 34.1H5.9V5.9h28.2v28.2zM7.2 32.8h25.6V7.2H7.2v25.6zm13.5-18.3a.68.68 0 0 0-.7-.7.68.68 0 0 0-.7.7v10.9a.68.68 0 0 0 .7.7.68.68 0 0 0 .7-.7V14.5z">
                                                </path>
                                            </svg>
                                        </li>
                                    </ul>
                                    <p className="mb-0 text-center">LT01: 70% wool, 15% polyester, 10% polyamide, 5% acrylic 900
                                        Grms/mt</p>
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item border-0">
                            <h2 className="accordion-header">
                                <button className={`accordion-button ${open === 5 ? '' : "collapsed"} bg-light position-relative pe-3`} type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree" onClick={() => handleClick(5)}>
                                    Reviews
                                    <span className="bg-dark position-absolute end-0" style={{ width: "47px", height: "100%" }}></span>
                                </button>
                            </h2>
                            <div id="flush-collapseThree" className={`accordion-collapse collapse ${open === 5 ? 'show' : ''}`} data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <Row className="mb-3">
                                        <Col md={2} className="text-center">
                                            <p className="mb-0">Average</p>
                                            <h2 className="fw-bold my-1">4.8</h2>
                                            <div className="kalles-rating-result">
                                                <span className="kalles-rating-result__pipe ,b-1">
                                                    <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                    <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                    <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                    <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                    <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                </span>
                                            </div>
                                            <p className="text-muted">13 Review</p>
                                        </Col>
                                        <Col md={4}>
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0 me-2">Excellent</p>
                                                <input type="range" min="1" max="12" defaultValue="12" className="slider slider1" id="myRange" />
                                            </div>
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0 me-2">Very Good </p>
                                                <input type="range" min="1" max="12" defaultValue="0" className="slider slider1" id="myRange" />
                                            </div>
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0 me-2">Average</p>
                                                <input type="range" min="1" max="12" defaultValue="1" className="slider slider1" id="myRange" />
                                            </div>
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0 pe-2 me-4">Poor</p>
                                                <input type="range" min="1" max="12" defaultValue="0" className="slider slider1" id="myRange" />
                                            </div>
                                            <div className="d-flex align-items-center my-2">
                                                <p className="mb-0 me-2">Terrible</p>
                                                <input type="range" min="1" max="12" defaultValue="0" className="slider slider1" id="myRange" />
                                            </div>
                                        </Col>
                                        <Col md={2} >
                                            <button type="button" className="btn btn-warning py-1 px-2">
                                                <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="18.37" height="17.8" viewBox="0 0 21.682 21.602">
                                                    <g id="Symbol_32_2" data-name="Symbol 32 – 2" transform="translate(-961.98 -374.155)">
                                                        <path d="M0,0H4V11.2L1.937,14h0L0,11.2Z" transform="translate(979.891 381.756) rotate(40)" fill="none" stroke="#ffffff" strokeLinejoin="round" strokeWidth="1"></path>
                                                        <path d="M0,0H4" transform="translate(972.692 390.335) rotate(40)" fill="none" stroke="#ffffff" strokeWidth="1"></path>
                                                        <g transform="translate(981.126 380.964) rotate(40)" fill="none" stroke="#ffffff" strokeWidth="1">
                                                            <rect width="3.128" height="1.4" stroke="none"></rect>
                                                            <rect x="0.5" y="0.5" width="2.128" height="0.4" fill="none"></rect>
                                                        </g>
                                                        <path d="M2858.324,3384.6h7.412" transform="translate(-1891.1 -3003.987)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                                                        <path d="M2858.324,3384.6h7.412" transform="translate(-1891.1 -2999.611)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="1"></path>
                                                        <path d="M8.952,0H15a2,2,0,0,1,2,2V15a2,2,0,0,1-2,2H2a2,2,0,0,1-2-2V12.162" transform="translate(979.48 391.655) rotate(180)" fill="none" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"></path>
                                                    </g>
                                                </svg> Write a review</button>
                                        </Col>
                                    </Row>
                                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                        <p className="text-muted mb-0">Showing 1 - 6 of 13 reviews</p>
                                        <div className="d-flex mt-3 mt-sm-0">
                                            <Link href="#!" className="text-muted me-2 py-1 px-2 sub-gray">Filter
                                                <span><Image src={icondown} alt="IcondownImg" /></span></Link>
                                            <Link href="#!" className="text-muted py-1 px-2" style={{ backgroundColor: "#f2f2f2" }}>Short by: Latest
                                                <span><Image src={icondown} alt="IcondownImg" /></span></Link>
                                        </div>
                                    </div>
                                    <Row className="g-3">
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-warning text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>P</p>
                                                            <span className="fw-bold mx-2">Peter</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-danger text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>K</p>
                                                            <span className="fw-bold mx-2">Kodeman</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-primary text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>G</p>
                                                            <span className="fw-bold mx-2">Glager</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-info text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>C</p>
                                                            <span className="fw-bold mx-2">Chaos</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-warning text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>S</p>
                                                            <span className="fw-bold mx-2">Sevenor</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                        <Col sm={6} md={4}>
                                            <Card>
                                                <CardBody>
                                                    <div className=" rounded-pill d-inline-block align-items-center p-1" style={{ backgroundColor: "#f2f2f2" }}>
                                                        <div className="d-flex align-items-center">
                                                            <p className="mb-0 rounded-pill  bg-danger text-white d-inline-block text-center d-flex justify-content-center align-items-center" style={{ width: "25px", height: "25px" }}>D</p>
                                                            <span className="fw-bold mx-2">Dranking</span>
                                                        </div>
                                                    </div>
                                                    <div className="kalles-rating-result my-2">
                                                        <span className="kalles-rating-result__pipe ,b-1">
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                            <span className="kalles-rating-result__start kalles-rating-result__start--big active"></span>
                                                            <span className="text-muted kalles-rating-result__start kalles-rating-result__start--big"></span>
                                                        </span>
                                                    </div>
                                                    <h6>Contrary to popular belief</h6>
                                                    <p className="text-muted mb-2">It is a long established fact that a reader will
                                                        be
                                                        distracted
                                                        by the readable content of a page</p>
                                                    <p className="text-muted mb-2 opacity-75 fs-14">15 days ago
                                                    </p>
                                                    <div className="d-flex align-items-center">
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.939" className="text-muted">
                                                                <g transform="translate(-926.048 -414.43)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(929.463 415.021)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.769v11.039l-2.9-.279V422.22Z" transform="translate(-16.112 -0.939)" className="cls-2">
                                                                    </path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">12</span>
                                                        </div>
                                                        <div className="mx-2">
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.762 17.659" className="r--icon-dislike">
                                                                <g transform="translate(956.922 435.325) rotate(180)">
                                                                    <path d="M0,14.842V6.033l.266.709S3.779,4.692,3.9,1.674s2.5-1.661,2.624.45-.095,2.192.517,3.909c1.392-.021,2.211-.013,2.59-.006H9.71q.06,0,.119,0l.056,0v0A1.532,1.532,0,0,1,10.923,8.5a1.533,1.533,0,0,1,.45,2.515,1.533,1.533,0,0,1-.387,2.485,1.859,1.859,0,0,1,.257.966c0,.847-.515,1.584-1.15,1.584L9.237,16c-.7.042-2.286.125-2.717.131H6.448A31.646,31.646,0,0,1,0,14.842Z" transform="translate(944.575 418.257)" className="cls-1">
                                                                    </path>
                                                                    <path d="M945.558,421.946v10.321l-2.9.261V421.777Z" transform="translate(-1 2.296)" className="cls-2"></path>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">08</span>
                                                        </div>
                                                        <div>
                                                            <svg fill="#878787" width="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.125 17.584" className="r--icon-reply">
                                                                <defs>
                                                                    <clipPath>
                                                                        <rect width="14.094" height="3.924" className="cls-1">
                                                                        </rect>
                                                                    </clipPath>
                                                                </defs>
                                                                <g transform="translate(-784.909 -833.715)">
                                                                    <path d="M4.01,12.938H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H18.125a2,2,0,0,1,2,2v8.937a2,2,0,0,1-2,2H8.78l-.667.923L6.4,16.232Z" transform="translate(785.409 834.215)" className="cls-2">
                                                                    </path>
                                                                    <g transform="translate(788.554 839.127)" className="cls-3">
                                                                        <g transform="translate(-739 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-734 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                        <g transform="translate(-729 -839)">
                                                                            <g transform="translate(739 839)" className="cls-4">
                                                                                <circle cx="1.75" cy="1.75" r="1.75" className="cls-5">
                                                                                </circle>
                                                                                <circle cx="1.75" cy="1.75" r="1.25" className="cls-1">
                                                                                </circle>
                                                                            </g>
                                                                        </g>
                                                                    </g>
                                                                </g>
                                                            </svg>
                                                            <span className="text-muted">02</span>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        </Col>
                                    </Row>
                                    <div className="d-flex justify-content-center mt-4">
                                        <Link href="#" className="btn  text-center fw-semibold" style={{ backgroundColor: "#f2f2f2" }}>Load
                                            more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default MobileAccordion