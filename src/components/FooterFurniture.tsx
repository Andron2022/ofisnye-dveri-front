"use client";
import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Link from 'next/link'

import amazon from "@assets/images/home-furniture/payment-amazon.svg"
import litecoin from "@assets/images/home-furniture/payment-litecoin.svg"
import maestro from "@assets/images/home-furniture/payment-maestro.svg"
import paypal from "@assets/images/home-furniture/payment-paypal.svg"
import visa from "@assets/images/home-furniture/payment-visa.svg"
import master from "@assets/images/home-furniture/payment-master.svg"
import Image from 'next/image'
import ResponsiveFooter from '@src/components/ResponsiveFooter'

const FooterFurniture = () => {

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
            <div>
                <footer className="footer furniture">
                    <Container>
                        <div className="row accordion" id="footer-accordion">
                            <div className="col-md-3 footer-accordion-item accordion-item">
                                <button className={`accordion-button footer-accordion-button px-0  ${open === 1 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                                    <h5>COMPANY</h5>
                                </button>
                                <h5 className="fw-medium d-none d-md-block">COMPANY</h5>
                                <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                    <div className="mt-md-4 pt-md-2">
                                        <ul className="menu list-unstyled fs-16">
                                            <li className="menu-item">
                                                <Link href="/shop-filter-sidebar" className="text-muted">About Kalles</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-filter-sidebar" className="text-muted">Blog</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Contact Us</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Order Tracking</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">FAQs</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Sitemap</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Secure Payment</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 accordion-item footer-accordion-item">
                                <button className={`accordion-button footer-accordion-button px-0  ${open === 2 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" onClick={() => handleClick(2)}>
                                    <h5>CUSTOMER SERVICE</h5>
                                </button>
                                <h5 className="fw-medium d-none d-md-block">CUSTOMER SERVICE</h5>
                                <div id="collapseTwo" className={`accordion-collapse collapse ${open === 2 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                    <div className="mt-md-4 pt-md-2">
                                        <ul className="menu list-unstyled fs-16">
                                            <li className="menu-item">
                                                <Link href="/shop-filter-sidebar" className="text-muted">Help & Contact Us</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-filter-sidebar" className="text-muted">Bussiness Idenity</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Return & Refunds</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Term & Conditions</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Secure Payment</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Trade Assurance</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="/shop-1600px-layout" className="text-muted">Inspection Service</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 accordion-item footer-accordion-item">
                                <button className={`accordion-button footer-accordion-button px-0  ${open === 3 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" onClick={() => handleClick(3)}>
                                    <h5>MY ACCOUNT</h5>
                                </button>
                                <h5 className="fw-medium d-none d-md-block">MY ACCOUNT</h5>
                                <div id="collapseThree" className={`accordion-collapse collapse ${open === 3 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                    <div className="mt-md-4 pt-md-2">
                                        <ul className="menu list-unstyled fs-16">
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">My Account</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Discount</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Orders History</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Personal Information</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Shipping Information</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 accordion-item footer-accordion-item">
                                <button className={`accordion-button footer-accordion-button px-0  ${open === 4 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour" onClick={() => handleClick(4)}>
                                    <h5>SOCIAL MEDIA</h5>
                                </button>
                                <h5 className="fw-medium d-none d-md-block">SOCIAL MEDIA</h5>
                                <div id="collapseFour" className={`accordion-collapse collapse ${open === 4 ? 'show' : ''}`} data-bs-parent="#accordionExample">
                                    <div className="mt-md-4 pt-md-2">
                                        <ul className="menu list-unstyled fs-16">
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Facebook</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Twitter</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Instagram</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Tumblr</Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link href="#!" className="text-muted">Pinterest</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </footer>

                <div className="footer-alt mb-5 mb-lg-0 py-4 fs-16 furniture">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 text-lg-start text-center text-muted">
                                Copyright ©{" "}
                                {year} <Link href="#!" className="link-warning">Kalles</Link>{" "}
                                all rights reserved. Powered by The4
                            </div>
                            <div className="col-lg-6">
                                <ul id="footer-menu" className="mt-2 mt-lg-0 list-unstyled d-flex align-items-center mb-0 justify-content-lg-end justify-content-center flex-wrap">
                                    <li className="menu-item ms-0">
                                        <Link href="/shop-filter-sidebar" className="text-muted mx-1">
                                            <Image src={amazon} alt="AmazonImg" />
                                        </Link>
                                    </li>
                                    <li className="menu-item ms-0">
                                        <Link href="#!" className="text-muted mx-1">
                                            <Image src={litecoin} alt="LitecoinImg" />
                                        </Link>
                                    </li>
                                    <li className="menu-item ms-0">
                                        <Link href="#!" className="text-muted mx-1">
                                            <Image src={maestro} alt="MaestroImg" />
                                        </Link>
                                    </li>
                                    <li className="menu-item ms-0">
                                        <Link href="#!" className="text-muted mx-1">
                                            <Image src={paypal} alt="PaypalImg" />
                                        </Link>
                                    </li>
                                    <li className="menu-item ms-0">
                                        <Link href="#!" className="text-muted mx-1">
                                            <Image src={visa} alt="VisaImg" />
                                        </Link>
                                    </li>
                                    <li className="menu-item ms-0">
                                        <Link href="#!" className="text-muted mx-1">
                                            <Image src={master} alt="MasterImg" />
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="position-fixed bg-white border rounded d-flex align-items-center justify-content-center shadow" id="nt_backtop">
                    <i className="pr pegk pe-7s-angle-up"></i>
                </Link>


                <div className="backdrop-shadow d-none"></div>
                <ResponsiveFooter />
            </div>
        </React.Fragment>
    )
}

export default FooterFurniture