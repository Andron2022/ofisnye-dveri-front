"use client";
import React from 'react'
import { Col, Container } from 'react-bootstrap'
import Link from 'next/link'

import banner1 from "@assets/images/home-hand-made/grid-banner-01.png"
import banner2 from "@assets/images/home-hand-made/grid-banner-02.jpg"
import banner3 from "@assets/images/home-hand-made/grid-banner-03.jpg"
import banner4 from "@assets/images/home-hand-made/grid-banner-04.jpg"
import banner5 from "@assets/images/home-hand-made/grid-banner-05.jpg"
import banner6 from "@assets/images/home-hand-made/grid-banner-06.jpg"

const CatSection = () => {
  return (
    <React.Fragment>
      <section className="cat-section pb-0">
        <Container>
          <div className="row g-4">
            <Col md={6}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner1.src})` }}></div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-center text-body m-4 p-2">
                  <div>
                    <h4 className="text-body font-avenir">Kalles is an online shop for handicrafts.</h4>
                    <p className="text-muted mb-0">Crafting beautiful stuff with our own hands and the help from
                      useful tools is a wonderful process.</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={3}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner2.src})`, backgroundSize: "cover" }}>
                </div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-center text-muted text-center justify-content-center m-4 p-2">
                  <div>
                    <p>Spring sale</p>
                    <h4 className="fw-medium fs-24 my-4">Sale up to 10% all</h4>
                    <p className="text-muted mb-0">SHOP NOW</p>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={3}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner3.src})`, backgroundSize: "cover" }}>
                </div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-end text-muted mx-4 py-3">
                  <div>
                    <h4 className="fw-medium fs-25 my-0">Home Decor</h4>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={3}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner4.src})`, backgroundSize: "cover" }}>
                </div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-end text-muted m-4">
                  <div>
                    <h4 className="fw-medium fs-25 mb-2">Gift ideas</h4>
                    <h4 className="fw-normal fs-16 mb-0">16 items</h4>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={6}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner5.src})` }}></div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-end text-muted m-4">
                  <div>
                    <h4 className="fw-medium fs-25 mb-2">Toys</h4>
                    <h4 className="fw-normal fs-16 mb-0">6 items</h4>
                  </div>
                </div>
              </Link>
            </Col>
            <Col md={3}>
              <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-250">
                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner6.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                </div>
                <div className="position-absolute start-0 bottom-0 end-0 top-0 end-0 d-flex align-items-center text-muted text-center justify-content-center m-4 p-2">
                  <div>
                    <i className="fs-50 text-sea lab la-instagram text-opacity-50"></i>
                    <p className="mt-2">Follow us on Instagram</p>
                    <h4 className="fw-medium fs-24 mb-0">@kalles_store</h4>
                  </div>
                </div>
              </Link>
            </Col>
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default CatSection