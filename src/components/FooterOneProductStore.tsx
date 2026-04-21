"use client";
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import footerlogo from "@assets/images/home-glasses/footer-logo.png"
import Image from 'next/image'
import Link from 'next/link'
import ResponsiveFooter from '@src/components/ResponsiveFooter'

const FooterOneProductStore = () => {
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
      <footer className="footer footer-dark bg-green-dark text-white home-one-product">
        <Container>
          <div className="row accordion" id="footer-accordion">
            <div className="col-md-4 col-lg-3 mb-2 footer-accordion-item accordion-item">
              <button className={`accordion-button footer-accordion-button  px-0 ${open === 1 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne" onClick={() => handleClick(1)}>
                <h5 className="text-white">Get in touch</h5>
              </button>
              <div id="collapseOne" className={`accordion-collapse collapse ${open === 1 ? "show" : ''}`} data-bs-parent="#accordionExample">
                <Link href="#!">
                  <Image src={footerlogo} alt="FooterlogoImg" height="29" />
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
                    <div className="footer-subscribe position-relative">
                      <input type="email" name="email" placeholder="Your email address" className="input-text text-white form-control w-100 rounded-pill text-white bg-transparent" required />
                      <button type="submit" className="btn bg-black fw-semibold text-white position-absolute rounded-pill">
                        <span>Subscribe</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>

      <div className="footer-alt mb-5 mb-lg-0 py-4">
        <Container>
          <Row>
            <Col lg={6} className="text-muted text-center">
              Copyright ©{" "}
              {year}
              <Link href="#!" className="text-muted"> Kalles</Link> all
              rights reserved. Powered by <span className="text-dark">The4</span>
            </Col>
            <Col lg={6}>
              <ul id="footer-menu" className="list-unstyled d-flex align-items-center mb-0 justify-content-lg-end">
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

export default FooterOneProductStore