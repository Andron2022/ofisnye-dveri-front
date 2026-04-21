"use client";
import React, { useState } from 'react'
import { Accordion, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

import logo from "@assets/images/home-medical/footer-logo.png"

import payment from "@assets/images/payment2.png"
import Image from 'next/image';
import Link from 'next/link';
import ResponsiveFooter from './ResponsiveFooter';

const FooterMedical = () => {

    const [activeKey, setActiveKey] = useState('');

    const [open, setOpen] = useState(null)
    const handleClick = (id: any) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }


    const year = new Date().getFullYear();

    return (
        <React.Fragment>
            <footer className="footer border-top">
                <div className="container">
                    <div className="row accordion" id="footer-accordion">
                        <div className="col-lg-3 col-md-6 mb-2 footer-accordion-item accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 1 ? "" : " collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                                <h5>Get in touch</h5>
                            </button>
                            <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? "show" : ""}`} data-bs-parent="#accordionExample">
                                <a href="#!">
                                    <Image src={logo} alt="LogoImg" height="29" />
                                </a>
                                <div className="mt-4 pt-2">
                                    <p className="d-flex align-items-start text-muted gap-2">
                                        <i className="pegk pe-7s-map-marker fs-24"></i>
                                        <span>184 Main Rd E, St Albans <span className="pl__30">VIC 3021, Australia</span></span>
                                    </p>
                                    <p className="d-flex align-items-start text-muted gap-2">
                                        <i className="pegk pe-7s-mail fs-24"></i>
                                        <a href="mailto:contact@company.com" className="text-reset">contact@company.com</a>
                                    </p>
                                    <p className="d-flex align-items-start text-muted gap-2">
                                        <i className="pegk pe-7s-call fs-24"></i>
                                        <span>+001 2233 456 </span>
                                    </p>
                                    <div className="footer-social d-flex align-items-center gap-4 mt-3">
                                        <a href="https://www.facebook.com" className="d-inline-block">
                                            <i className="facl facl-facebook"></i>
                                        </a>
                                        <a href="https://twitter.com" className="d-inline-block">
                                            <i className="facl facl-twitter"></i>
                                        </a>
                                        <a href="https://www.instagram.com" className="d-inline-block">
                                            <i className="facl facl-instagram"></i>
                                        </a>
                                        <a href="https://www.linkedin.com" className="d-inline-block">
                                            <i className="facl facl-linkedin"></i>
                                        </a>
                                        <a href="https://www.pinterest.com" className="d-inline-block">
                                            <i className="facl facl-pinterest"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 2 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleClick(2)}>
                                <h5>Categories</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Categories</h5>
                            <div id="collapseTwo" className={`accordion-collapse collapse ${open === 2 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <a href="shop-filter-sidebar.html" className="text-muted">Men</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="shop-filter-sidebar.html" className="text-muted">Women</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="shop-1600px-layout.html" className="text-muted">Accessories</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="shop-1600px-layout.html" className="text-muted">Shoes</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="shop-1600px-layout.html" className="text-muted">Denim</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="shop-1600px-layout.html" className="text-muted">Dress</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 3 ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleClick(3)}>
                                <h5>Infomation</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Infomation</h5>
                            <div id="collapseThree" className={`accordion-collapse collapse ${open === 3 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">About Us</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Contact Us</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Terms &amp; Conditions</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Returns &amp; Exchanges</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Shipping &amp; Delivery</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Privacy Policy</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 4 ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onClick={() => handleClick(4)}>
                                <h5>Useful links</h5>
                            </button>
                            <h5 className="fw-medium d-none d-md-block">Useful links</h5>
                            <div id="collapseFour" className={`accordion-collapse collapse ${open === 4 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <ul className="menu list-unstyled">
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Store Location</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Latest News</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">My Account</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">Size Guide</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">FAQs 2</a>
                                        </li>
                                        <li className="menu-item">
                                            <a href="#!" className="text-muted">FAQs</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-3 mb-2 accordion-item footer-accordion-item">
                            <button className={`accordion-button footer-accordion-button px-0  ${open === 5 ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive" onClick={() => handleClick(5)}>
                                <h5>Newsletter Signup</h5>
                            </button>
                            <h5 className="d-none d-md-block">Newsletter Signup</h5>
                            <div id="collapseFive" className={`accordion-collapse collapse ${open === 5 ? 'show' : ""}`} data-bs-parent="#accordionExample">
                                <div className="mt-md-4 pt-md-2">
                                    <p className="text-muted">Subscribe to our newsletter and get 10% off your first purchase</p>
                                    <form id="contact_form" className="d-block">
                                        <div className="footer-subscribe position-relative">
                                            <input type="email" name="email" placeholder="Your email address"  className="input-text form-control w-100 rounded-pill" required />
                                            <button type="submit" className="btn btn-primary position-absolute rounded-pill">
                                                <span>Subscribe</span>
                                            </button>
                                        </div>
                                    </form>
                                    <div className="mt-3">
                                        <Image src={payment} alt="PaymentImg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="footer-alt mb-5 mb-lg-0 py-4 bg-light border-top">
                <div className="container">
                    <div className="row">
                        <Col lg={6} className="text-lg-start text-center text-muted">
                            Copyright ©{" "}
                            {year}
                            <Link href="#!" className="link-info"> Kalles</Link> all
                            rights reserved. Powered by <span className="text-dark">The4</span>
                        </Col>

                        <div className="col-lg-6">
                            <ul id="footer-menu" className="mt-2 mt-lg-0 list-unstyled d-flex align-items-center mb-0 justify-content-lg-end justify-content-center flex-wrap">
                                <li className="menu-item ">
                                    <a href="shop-filter-sidebar.html" className="text-muted mx-2">Shop</a>
                                </li>
                                <li className="menu-item ">
                                    <a href="#!" className="text-muted mx-2">About Us</a>
                                </li>
                                <li className="menu-item ">
                                    <a href="#!" className="text-muted mx-2">Contact</a>
                                </li>
                                <li className="menu-item ">
                                    <a href="#!" className="text-muted mx-2">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>


            <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow" id="nt_backtop">
                <i className="pr pegk pe-7s-angle-up"></i>
            </Link>

            <ResponsiveFooter />
            <div className="backdrop-shadow d-none"></div>

        </React.Fragment >
    )
}

export default FooterMedical