"use client";
import React from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import pr1 from "@assets/images/home-fashion-9/pr-s-01.jpg"
import pr2 from "@assets/images/home-fashion-9/pr-s-02.jpg"
import pr3 from "@assets/images/home-fashion-9/pr-s-03.jpg"
import pr4 from "@assets/images/home-fashion-9/pr-s-04.jpg"
import pr5 from "@assets/images/home-fashion-9/pr-s-05.jpg"
import pr6 from "@assets/images/home-fashion-9/pr-s-06.jpg"
import pr7 from "@assets/images/home-fashion-9/pr-s-07.jpg"
import pr8 from "@assets/images/home-fashion-9/pr-s-08.jpg"
import pr9 from "@assets/images/home-fashion-9/pr-s-09.jpg"
import pr10 from "@assets/images/home-fashion-9/pr-s-10.jpg"
import pr11 from "@assets/images/home-fashion-9/pr-s-11.jpg"
import pr12 from "@assets/images/home-fashion-9/pr-s-12.jpg"
import pr13 from "@assets/images/home-fashion-9/pr-s-13.jpg"
import pr14 from "@assets/images/home-fashion-9/pr-s-14.jpg"
import pr15 from "@assets/images/home-fashion-9/pr-s-15.jpg"
import pr16 from "@assets/images/home-fashion-9/pr-s-16.jpg"

const modaldata = [
    {
        "imgSrc": pr1,
        "title": "Analogue Resin Strap",
        "originalPrice": "$30.00"
    },
    {
        "imgSrc": pr2,
        "title": "Ridley High Waist",
        "originalPrice": "$36.00"
    },
    {
        "imgSrc": pr3,
        "title": "Blush Beanie",
        "originalPrice": "$15.00"
    },
    {
        "imgSrc": pr4,
        "title": "Cluse La Boheme Rose ",
        "originalPrice": "$60.00",
        "salePrice": "$45.00",
        "discount": "-25%"
    },
    {
        "imgSrc": pr5,
        "title": "Mercury Tee",
        "originalPrice": "$68.00"
    },
    {
        "imgSrc": pr6,
        "title": "La Bohème Rose Gold",
        "originalPrice": "$60.00",
        "salePrice": "$40.00",
        "discount": "-34%"
    },
    {
        "imgSrc": pr7,
        "title": "Cream women pants",
        "originalPrice": "$35.00"
    },
    {
        "imgSrc": pr8,
        "title": "Black mountain hat",
        "originalPrice": "$50.00"
    },
    {
        "imgSrc": pr9,
        "title": "Short Sleeved Hoodie",
        "originalPrice": "$45.00",
        "salePrice1": "$30.00",
        "salePrice2": "$34.00"
    },
    {
        "imgSrc": pr10,
        "title": "Black mountain hat",
        "originalPrice": "$35.00"
    },
    {
        "imgSrc": pr11,
        "title": "Men pants",
        "originalPrice": "$49.00–$56.00"
    },
    {
        "imgSrc": pr12,
        "title": "Skin Sweatpans",
        "originalPrice": "$75.00",
        "salePrice1": "$45.00",
        "salePrice2": "$40.00"
    },
    {
        "imgSrc": pr13,
        "title": "Simple Skin T-shirt",
        "originalPrice": "$56.00"
    },
    {
        "imgSrc": pr14,
        "title": "Sunny Life",
        "originalPrice": "$68.00"
    },
    {
        "imgSrc": pr15,
        "title": "Leather White Trainers",
        "originalPrice": "$20.00"
    },
    {
        "imgSrc": pr16,
        "title": "Stripe Long Sleeve Top",
        "originalPrice": "$15.00"
    }
]

const SearchModal2 = ({ show, handleClose }: any) => {
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} className="fade modal-overl " id="searchModal" dialogClassName="modal-fullscreen header-search-model" >
                <Modal.Body className="p-0 mb-4">
                    <Form className="row g-2 mx-2 mx-md-5 my-4 pb-3 pt-4">
                        <Col md={3}>
                            <select className="form-select rounded-pill w-100">
                                <option value="*">All Categories</option>
                                <option value="Accessories">Accessories</option>
                                <option value="Bag">Bag</option>
                                <option value="Camera">Camera</option>
                                <option value="Decor">Decor</option>
                                <option value="Earphones">Earphones</option>
                                <option value="Electric">Electric</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Headphone">Headphone</option>
                                <option value="Men">Men</option>
                                <option value="Shoes">Shoes</option>
                                <option value="Speaker">Speaker</option>
                                <option value="Watch">Watch</option>
                                <option value="Women">Women</option>
                            </select>
                        </Col>
                        <Col md={9}>
                            <div className="search-box position-relative">
                                <input type="text" className="form-control rounded-pill" id="" placeholder="Search for products" />
                                <button type="submit" className="btn"><i className="iccl iccl-search"></i></button>
                            </div>
                        </Col>
                    </Form>
                    <p className="need-sec fs-16 fw-medium p-2 text-center">Need some inspiration?</p>
                    <Row className="g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-auto mx-auto mt-4 justify-content-center px-lg-5">
                        {modaldata.map((product, index) => (
                            <Col key={index}>
                                <Image src={product.imgSrc} alt={product.title} />
                                <div className="mt-4 text-center">
                                    <h6 className="mb-1 text-capitalize fs-14 fw-medium">
                                        <Link href="/product-detail-layout-01" className="main_link_teal">
                                            {product.title}
                                        </Link>
                                    </h6>
                                    <p className="mb-0 fs-14 text-muted">
                                        <del>{product.originalPrice}</del>{" "}
                                        {product.salePrice && <><span className="text-danger">{product.salePrice}</span>{" "}<span className="badge bg-danger fw-normal text-white rounded-0">{product.discount}</span></>}{" "}
                                        {product.salePrice1 && <span className="text-danger">{product.salePrice1}</span>}{" "}
                                        {product.salePrice2 && <span className="text-danger">{product.salePrice2}</span>}{" "}
                                    </p>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    <button type="button" className="btn search-model-close" onClick={handleClose}>
                        <i className="las la-times"></i>
                    </button>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export default SearchModal2