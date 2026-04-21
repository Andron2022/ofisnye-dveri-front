"use client";
import React from 'react'
import { Col } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import women from "@assets/images/home-fashion-10/cat-women.jpg"
import men from "@assets/images/home-fashion-10/cat-men.jpg"
import shoes from "@assets/images/home-fashion-10/cat-shoes.jpg"
import accessories from "@assets/images/home-fashion-10/cat-accessories.jpg"
import watch from "@assets/images/home-fashion-10/cat-watch.jpg"

import banner1 from "@assets/images/home-fashion-10/twin-banner-01.jpg"
import banner2 from "@assets/images/home-fashion-10/twin-banner-02.jpg"

const CatSection = () => {
  return (
    <React.Fragment>
        <section className="cat-section pb-0">
        <div className="container">
            <div className="row g-2 g-lg-4">
                <div className='col-lg-3 col-md-4 col-6'>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-2 mb-lg-4">
                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${women.src})`}}></div>
                        <div className="cat-grid-button">
                            <div className="cat_grid_item__title text-body">Women</div>
                        </div>
                    </Link>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${accessories.src})`}}></div>
                        <div className="cat-grid-button">
                            <div className="cat_grid_item__title text-body">Accessories</div>
                        </div>
                    </Link>
                </div>
                <div className='col-lg-3 col-md-4 col-6'>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-2 mb-lg-4">
                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${men.src})`}}></div>
                        <div className="cat-grid-button">
                            <div className="cat_grid_item__title text-body">Men</div>
                        </div>
                    </Link>
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${shoes.src})`}}></div>
                        <div className="cat-grid-button">
                            <div className="cat_grid_item__title text-body">Shoes</div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-4 col-lg-6">
                    <Link href="/shop-right-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                        <div className="h-100 w-100 cat-grid-img" style={{backgroundImage: `url(${watch.src})`, backgroundPosition: "center"}}>
                        </div>
                        <div className="cat-grid-button">
                            <div className="cat_grid_item__title text-body">Watch Collections</div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link href="#!" className="position-relative hover-zoom d-block">
                        <Image src={banner1} alt="Banner1Img" className="img-fluid hover-zoom-img" />
                        <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                            <div className="text-center text-white">
                                <h4 className="fs-24">LOOKBOOK 2021</h4>
                                <h6 className="mb-0">MAKE LOVE THIS LOOK</h6>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="col-md-6">
                    <Link href="#!" className="position-relative hover-zoom d-block">
                        <Image src={banner2} alt="Banner2Img" className="hover-zoom-img img-fluid" />
                        <div className="position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center justify-content-center">
                            <div className="text-center text-white">
                                <h6 className="text-uppercase fs-20 fw-medium mb-2">Huge Sale</h6>
                                <h1 className="mb-0 text-uppercase fs-60">50% off</h1>
                                <h6 className="text-uppercase fs-20 fw-medium mb-0">Hurry up</h6>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    </section>
    </React.Fragment>
  )
}

export default CatSection