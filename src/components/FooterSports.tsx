"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ResponsiveFooter from '@src/components/ResponsiveFooter'
import Image from 'next/image'
import Link from 'next/link'

import footer from "@assets/images/home-glasses/footer-logo.png"

import payment1 from "@assets/images/home-glasses/payment-01.svg"
import payment2 from "@assets/images/home-glasses/payment-02.svg"
import payment3 from "@assets/images/home-glasses/payment-03.svg"
import payment4 from "@assets/images/home-glasses/payment-04.svg"
import payment5 from "@assets/images/home-glasses/payment-05.svg"
import payment6 from "@assets/images/home-glasses/payment-06.svg"
import payment7 from "@assets/images/home-glasses/payment-07.svg"
import payment8 from "@assets/images/home-glasses/payment-08.svg"

const FooterSports = () => {
    const [open, setOpen] = useState(null)
    const scrollToTop = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };


    const year = new Date().getFullYear();
    const handleClick = (id: any) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }

    return (
        <React.Fragment>
            <footer className="footer footer-dark text-white">
                <div className="container">
                    <div className="row accordion" id="footer-accordion">
                        <div className="col-md-4 col-lg-3 mb-2 footer-accordion-item accordion-item">
                            <button className={`accordion-button footer-accordion-button  px-0 ${open === 1 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                                <h5 className="text-white">Get in touch</h5>
                            </button>
                            <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <Link href="#!">
                                    <Image src={footer} alt="FooterImg" height="29" />
                                </Link>
                                <div className="mt-4 pt-2">
                                    <p className="d-flex align-items-start text-white gap-2">
                                        <i className="pegk pe-7s-map-marker fs-24"></i>
                                        <span>184 Main Rd E, St Albans <br /> <span className="pl__30">VIC 3021, Australia</span></span>
                                    </p>
                                    <p className="d-flex align-items-start text-white gap-2">
                                        <i className="pegk pe-7s-mail fs-24"></i>
                                        <Link href="mailto:contact@company.com" className="text-reset">contact@company.com</Link>
                                    </p>
                                    <p className="d-flex align-items-start text-white gap-2">
                                        <i className="pegk pe-7s-call fs-24"></i>
                                        <span>+001 2233 456 </span>
                                    </p>
                                    <div className="footer-social d-flex align-items-center gap-4 mt-4">
                                        <Link href="https://www.facebook.com" className="d-inline-block fs-16 text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Facebook">
                                            <i className="facl facl-facebook"></i>
                                        </Link>
                                        <Link href="https://twitter.com" className="d-inline-block fs-16 text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Twitter">
                                            <i className="facl facl-twitter"></i>
                                        </Link>
                                        <Link href="https://www.instagram.com" className="d-inline-block fs-16 text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Instagram">
                                            <i className="facl facl-instagram"></i>
                                        </Link>
                                        <Link href="https://www.linkedin.com" className="d-inline-block fs-16 text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on LinkedIn">
                                            <i className="facl facl-linkedin"></i>
                                        </Link>
                                        <Link href="https://www.pinterest.com" className="d-inline-block fs-16 text-white" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Pinterest">
                                            <i className="facl facl-pinterest"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-2 col-lg-2 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 2 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleClick(2)}>
                                <h5 className="text-white">Categories</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Categories</h5>
                            <div id="collapseTwo" className={`accordion-collapse collapse ${open === 2 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-lg-4 pt-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-white">Celebrations</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-white">Events</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Home Decor</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Seasonal Bouquet</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Wedding Decor</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-2 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 3 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleClick(3)}>
                                <h5 className="text-white">Infomation</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Infomation</h5>
                            <div id="collapseThree" className={`accordion-collapse collapse ${open === 3 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">About Us</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Contact Us</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Terms &amp; Conditions</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Returns &amp; Exchanges</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Shipping &amp; Delivery</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Privacy Policy</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-2 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 4 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleClick(4)}>
                                <h5 className="text-white">Useful links</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Useful links</h5>
                            <div id="collapseThree" className={`accordion-collapse collapse ${open === 4 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Contact us</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Privacy Policy</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Shipping & Delivery</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Terms & Conditions</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Returns & Exchanges</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-10 col-lg-3 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 5 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" onClick={() => handleClick(5)}>
                                <h5 className="text-white">Newsletter Signup</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Newsletter Signup</h5>
                            <div id="collapseFive" className={`accordion-collapse collapse ${open === 5 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-lg-4 pt-2">
                                    <p className="text-white">Subscribe to our newsletter and get 10% off your first purchase</p>
                                    <form id="contact_form" className="d-block">
                                        <div className="footer-subscribe footer-subscribe-sport position-relative">
                                            <input type="email" name="email" placeholder="Your email address" className="input-text form-control w-100 rounded-0 text-white bg-transparent" required />
                                            <button type="submit" className="btn bg-orange text-white position-absolute rounded-0">
                                                <span>Subscribe</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-3">
                                        <Link href="#!"><Image src={payment1} alt="Payment1Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment2} alt="Payment2Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment3} alt="Payment3Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment4} alt="Payment4Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment5} alt="Payment5Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment6} alt="Payment6Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment7} alt="Payment7Img" className="img-fluid" /></Link>
                                        <Link href="#!"><Image src={payment8} alt="Payment8Img" className="img-fluid" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="footer-alt mb-5 mb-lg-0 py-4 footer-dark text-white" style={{ backgroundColor: "black" }}>
                <Container>
                    <Row>
                        <Col lg={6}>
                            Copyright ©{" "}
                            {year}
                            <Link href="#!" className="text-orange"> Kalles</Link> all
                            rights reserved. Powered by The4
                        </Col>
                        <Col lg={6}>
                            <ul id="footer-menu" className="list-unstyled d-flex align-items-center mb-0 justify-content-lg-end mt-2 mt-lg-0">
                                <li className="menu-item ">
                                    <Link href="/shop-filter-sidebar" className="mx-2 text-white">Shop</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="mx-2 text-white">About Us</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="mx-2 text-white">Contact</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="mx-2 text-white">Blog</Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </div>

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

export default FooterSports