"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import kalles from "@assets/images/svg/kalles.svg"
import payment1 from "@assets/images/home-hand-made/payment-icon-01.svg"
import payment2 from "@assets/images/home-hand-made/payment-icon-02.svg"
import payment3 from "@assets/images/home-hand-made/payment-icon-03.svg"
import payment4 from "@assets/images/home-hand-made/payment-icon-04.svg"
import payment5 from "@assets/images/home-hand-made/payment-icon-05.svg"
import payment6 from "@assets/images/home-hand-made/payment-icon-06.svg"
import ResponsiveFooter from '@src/components/ResponsiveFooter'

const FooterHandmade = () => {

    const scrollToTop = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    const year = new Date().getFullYear();
    const [open, setOpen] = useState(null)
    const handleClick = (id: any) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }

    return (
        <React.Fragment>
            <footer className="footer footer-handmade">
                <Container>
                    <div className="row accordion" id="footer-accordion">
                        <Col md={4} lg={3} className="mb-2 footer-accordion-item accordion-item">
                            <button className={`accordion-button footer-accordion-button ${open === 1 ? "" : " collapsed"} px-0`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                                <h5>Get in touch</h5>
                            </button>
                            <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <Link href="#!">
                                    <Image src={kalles} alt="KallesImg" height="29" />
                                </Link>

                                <div className="mt-4 pt-2">
                                    <p className="d-flex align-items-starttext-black gap-2">
                                        <i className="pegk pe-7s-map-marker fs-24"></i>
                                        <span>184 Main Rd E, St Albans <br /> <span className="pl__30">VIC 3021, Australia</span></span>
                                    </p>
                                    <p className="d-flex align-items-starttext-black gap-2">
                                        <i className="pegk pe-7s-mail fs-24"></i>
                                        <a href="mailto:contact@company.com" className="text-reset">contact@company.com</a>
                                    </p>
                                    <p className="d-flex align-items-starttext-black gap-2">
                                        <i className="pegk pe-7s-call fs-24"></i>
                                        <span>+001 2233 456 </span>
                                    </p>
                                    <div className="footer-social d-flex align-items-center gap-4 mt-4">
                                        <Link href="https://www.facebook.com" className="d-inline-block">
                                            <i className="facl facl-facebook"></i>
                                        </Link>
                                        <Link href="https://twitter.com" className="d-inline-block">
                                            <i className="facl facl-twitter"></i>
                                        </Link>
                                        <Link href="https://www.instagram.com" className="d-inline-block">
                                            <i className="facl facl-instagram"></i>
                                        </Link>
                                        <Link href="https://www.linkedin.com" className="d-inline-block">
                                            <i className="facl facl-linkedin"></i>
                                        </Link>
                                        <Link href="https://www.pinterest.com" className="d-inline-block">
                                            <i className="facl facl-pinterest"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <div className="col-md-2 col-lg-2 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button ${open === 2 ? "" : " collapsed"} px-0`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleClick(2)}>
                                <h5>Categories</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Categories</h5>
                            <div id="collapseTwo" className={`accordion-collapse collapse ${open === 2 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-black">Men</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-black">Women</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-black">Accessories</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-black">Shoes</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-black">Denim</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-black">Dress</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-2 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 ${open === 3 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleClick(3)}>
                                <h5>Infomation</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Infomation</h5>
                            <div id="collapseThree" className={`accordion-collapse collapse ${open === 3 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">About Us</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Contact Us</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Terms &amp; Conditions</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Returns &amp; Exchanges</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Shipping &amp; Delivery</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Privacy Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <Col md={3} lg={2} className="mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 ${open === 4 ? "" : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onClick={() => handleClick(4)}>
                                <h5>Useful links</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Useful links</h5>
                            <div id="collapseFour" className={`accordion-collapse collapse ${open === 4 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Store Location</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Latest News</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">My Account</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">Size Guide</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">FAQs 2</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-black">FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                        <Col md={10} lg={3} className="mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 ${open === 5 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" onClick={() => handleClick(5)}>
                                <h5>Newsletter Signup</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Newsletter Signup</h5>
                            <div id="collapseFive" className={`accordion-collapse collapse ${open === 5 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <p className="text-black">Subscribe to our newsletter and get 10% off your first purchase</p>
                                    <form id="contact_form" className="d-block">
                                        <div className="footer-subscribe position-relative">
                                            <input type="email" name="email" placeholder="Your email address" className="border-dark input-text form-control w-100 rounded-pill" required />
                                            <button type="submit" className="btn btn-dark position-absolute rounded-pill">
                                                <span>Subscribe</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-3">
                                        <Image className="img-fluid" src={payment1} alt="amazon payments" />&nbsp;
                                        <Image className="img-fluid" src={payment2} alt="litecoin" />&nbsp;
                                        <Image className="img-fluid" src={payment3} alt="maestro" />&nbsp;
                                        <Image className="img-fluid" src={payment4} alt="master" />&nbsp;
                                        <Image className="img-fluid" src={payment5} alt="paypal" />&nbsp;
                                        <Image className="img-fluid" src={payment6} alt="visa" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </div>
                </Container>
            </footer>

            <div className="footer-alt mb-5 mb-lg-0 py-4 footer-handmade">
                <Container>
                    <Row>
                        <Col sm={6} className="text-center mb-1">
                            Copyright ©{" "}
                            {year}
                            <Link href="#!" className="text-reset fw-semibold"> Kalles</Link> all
                            rights reserved. Powered by The4
                        </Col>
                        <Col sm={6}>
                            <ul id="footer-menu" className="list-unstyled d-flex align-items-center mb-0 justify-content-end">
                                <li className="menu-item ">
                                    <Link href="/shop-filter-sidebar" className="text-muted mx-2">Shop</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-muted mx-2">About Us</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-muted mx-2">Contact</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-muted mx-2">Blog</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* responsive footer */}

            {/* scroll to top */}
            <Link
                href="#"
                onClick={scrollToTop}
                className="position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow"
                id="nt_backtop"
            >
                <i className="pr pegk pe-7s-angle-up"></i>
            </Link>

           

            <div className="backdrop-shadow d-none"></div>
            <ResponsiveFooter />
        </React.Fragment>
    )
}

export default FooterHandmade