"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import ResponsiveFooter from '@src/components/ResponsiveFooter'
import Link from 'next/link'
import Image from 'next/image'

import footerlogo from "@assets/images/home-glasses/footer-logo.png"
import payment1 from "@assets/images/home-glasses/payment-01.svg"
import payment2 from "@assets/images/home-glasses/payment-02.svg"
import payment3 from "@assets/images/home-glasses/payment-03.svg"
import payment4 from "@assets/images/home-glasses/payment-04.svg"
import payment5 from "@assets/images/home-glasses/payment-05.svg"
import payment6 from "@assets/images/home-glasses/payment-06.svg"
import payment7 from "@assets/images/home-glasses/payment-07.svg"
import payment8 from "@assets/images/home-glasses/payment-08.svg"

const FooterDark = () => {
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
                        <div className="col-md-6 col-lg-4 mb-0 footer-accordion-item accordion-item">
                            <button className={`accordion-button footer-accordion-button  text-white px-0 ${open === 1 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                                <h5 className="text-white">Get in touch</h5>
                            </button>
                            <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <Link href="#!">
                                    <Image src={footerlogo} alt="FooterlogoImg" height="29" priority/>
                                </Link>

                                <div className="mt-3 mt-lg-4 pt-2">
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
                                        <Link href="https://www.facebook.com" className="d-inline-block fs-16" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Facebook">
                                            <i className="facl facl-facebook text-white"></i>
                                        </Link>
                                        <Link href="https://twitter.com" className="d-inline-block fs-16" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Twitter">
                                            <i className="facl facl-twitter text-white"></i>
                                        </Link>
                                        <Link href="https://www.instagram.com" className="d-inline-block fs-16" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Instagram">
                                            <i className="facl facl-instagram text-white"></i>
                                        </Link>
                                        <Link href="https://www.linkedin.com" className="d-inline-block fs-16" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on LinkedIn">
                                            <i className="facl facl-linkedin text-white"></i>
                                        </Link>
                                        <Link href="https://www.pinterest.com" className="d-inline-block fs-16" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Follow on Pinterest">
                                            <i className="facl facl-pinterest text-white"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 mb-0 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 py-3  ${open === 2 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleClick(2)}>
                                <h5 className="text-white">Categories</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Categories</h5>
                            <div id="collapseTwo" className={`accordion-collapse collapse ${open === 2 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled text-white">
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-white">Men</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-filter-sidebar" className="text-white">Women</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Accessories</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Shoes</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Denim</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="/shop-1600px-layout" className="text-white">Dress</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-2 mb-0 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 py-3  ${open === 3 ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onClick={() => handleClick(3)}>
                                <h5 className="text-white text-white">Useful links</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Useful links</h5>
                            <div id="collapseFour" className={`accordion-collapse collapse ${open === 3 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Store Location</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Latest News</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">My Account</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">Size Guide</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">FAQs 2</Link>
                                        </li>
                                        <li className="menu-item">
                                            <Link href="#!" className="text-white">FAQs</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 mb-0 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0 py-3  ${open === 4 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" onClick={() => handleClick(4)}>
                                <h5 className="text-white">Newsletter Signup</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block text-white">Newsletter Signup</h5>
                            <div id="collapseFive" className={`accordion-collapse collapse ${open === 4 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <p className="text-white">Subscribe to our newsletter and get 10% off your first purchase</p>
                                    <form id="contact_form" className="d-block">
                                        <div className="footer-subscribe position-relative">
                                            <input type="email" name="email" placeholder="Your email address" className="border-dark input-text form-control w-100 rounded-0 placeholder-white" required />
                                            <button type="submit" className="btn btn-dark bg-mustard position-absolute rounded-0 top-0 end-0 h-100">
                                                <span>Subscribe</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-3 d-flex flex-wrap gap-1">
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

            <div className="footer-alt mb-5 mb-lg-0 footer-dark py-4">
                <Container>
                    <Row className="text-center text-lg-start">
                        <Col lg={6}>
                            Copyright ©{" "}
                            {year}
                            <Link href="#!" className="text-mustard"> Kalles</Link> all
                            rights reserved. Powered by The4
                        </Col>
                        <Col lg={6} className='mt-2 mt-sm-0  d-flex justify-content-center'>
                            <ul id="footer-menu" className="list-unstyled d-flex align-items-center mb-0 justify-content-md-end">
                                <li className="menu-item ">
                                    <Link href="/shop-filter-sidebar" className="text-white mx-2">Shop</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-white mx-2">About Us</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-white mx-2">Contact</Link>
                                </li>
                                <li className="menu-item ">
                                    <Link href="#!" className="text-white mx-2">Blog</Link>
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

            {/* direction */}

            <div className="backdrop-shadow d-none"></div>
            <ResponsiveFooter />
        </React.Fragment>
    )
}

export default FooterDark