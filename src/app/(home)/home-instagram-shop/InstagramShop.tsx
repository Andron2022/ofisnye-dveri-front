"use client";
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'

import pin1 from "@assets/images/home-instagram-shop/bg-pin-01.jpg"
import pin2 from "@assets/images/home-instagram-shop/bg-pin-02.jpg"
import pin3 from "@assets/images/home-instagram-shop/bg-pin-03.jpg"
import pin4 from "@assets/images/home-instagram-shop/bg-pin-04.jpg"
import pin5 from "@assets/images/home-instagram-shop/bg-pin-05.jpg"
import pin6 from "@assets/images/home-instagram-shop/bg-pin-06.jpg"
import pin7 from "@assets/images/home-instagram-shop/bg-pin-07.jpg"
import pin8 from "@assets/images/home-instagram-shop/bg-pin-08.jpg"


const InstagramShop = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <React.Fragment>
            <section className="mt-30">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span>Instgram Shop</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">Make your
                                    Instagram shop</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin1} alt="Pin1Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-03 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin2} alt="Pin2Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-05 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>2</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin3} alt="Pin3Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-08 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin4} alt="Pin4Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-07 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin5} alt="Pin5Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin6} alt="Pin6Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin7} alt="Pin7Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-02 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="insta-card position-relative rounded">
                                <Image src={pin8} alt="Pin8Img" className="img-fluid" />
                                <Link href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal" className="card-spin position-06 position-absolute fs-14 bg-dark text-white rounded-circle fw-semibold" onClick={handleShow}>1</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ProductModal show={show} handleClose={handleClose} />
        </React.Fragment>
    )
}
export default InstagramShop