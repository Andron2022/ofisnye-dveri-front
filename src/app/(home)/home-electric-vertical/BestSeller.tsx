"use client";
import React, { useState } from 'react'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pr1 from "@assets/images/home-electronic/pr-01.jpg"
import pr2 from "@assets/images/home-electronic/pr-02.jpg"
import pr3 from "@assets/images/home-electronic/pr-03.jpg"
import pr4 from "@assets/images/home-electronic/pr-04.jpg"
import pr5 from "@assets/images/home-electronic/pr-05.jpg"
import pr6 from "@assets/images/home-electronic/pr-06.jpg"
import pr7 from "@assets/images/home-electronic/pr-07.jpg"
import pr8 from "@assets/images/home-electronic/pr-08.jpg"
import pr14 from "@assets/images/home-decor-2/pr-14.jpg"
import pr15 from "@assets/images/home-decor-2/pr-15.jpg"
import pr16 from "@assets/images/home-decor-2/pr-16.jpg"
import pr17 from "@assets/images/home-decor-2/pr-17.jpg"
import pr20 from "@assets/images/home-decor-2/pr-20.jpg"
import pr21 from "@assets/images/home-decor-2/pr-21.jpg"
import pr26 from "@assets/images/home-decor-2/pr-26.jpg"
import pr27 from "@assets/images/home-decor-2/pr-27.jpg"
import Image from 'next/image'
import Link from 'next/link'

const sellerdata = [
    {
        "id": 1,
        "discount_label": "-29%",
        "image_url_default": pr1,
        "image_url_hover": pr2,
        "name": "Ysamsung Camera",
        "price_discount": "$35.00",
        "price_discounted": "$25.00",
        "labelClass": "bg-danger"
    },
    {
        "id": 2,
        "image_url_default": pr3,
        "image_url_hover": pr4,
        "name": "Beats Solo3 Wireless",
        "price": "$35.00",
    },
    {
        "id": 3,
        "image_url_default": pr5,
        "image_url_hover": pr6,
        "name": "Lomo Sanremo Edition",
        "price": "$35.00",
    },
    {
        "id": 4,
        "image_url_default": pr7,
        "image_url_hover": pr8,
        "name": "Ygoogle Speaker",
        "price": "$65.00",
    },
    {
        "id": 5,
        "image_url_default": pr14,
        "image_url_hover": pr15,
        "name": "Ybeoplay H9i",
        "price": "$55.00",
    },
    {
        "id": 6,
        "image_url_default": pr16,
        "image_url_hover": pr17,
        "name": "YApple MacBook",
        "price": "$55.00",
    },
    {
        "id": 7,
        "new_label": "New",
        "image_url_default": pr20,
        "image_url_hover": pr21,
        "name": "Contemporary design classic",
        "price": "$25.00",
    },
    {
        "id": 8,
        "image_url_default": pr26,
        "image_url_hover": pr27,
        "name": "Yapple Watch Nike Series 4",
        "price": "$49.00",
    }
]

const BestSeller = () => {

    const [hovered, setHovered] = useState<null | number>(null)
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <section className="type_tab_collection py-0">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex">
                                        <span>BEST SELLER</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">
                                    Top seller in the week
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4">
                        {sellerdata.map(item => (
                            <div className="col" key={item.id}>
                                <div className="topbar-product-card" onMouseEnter={() => setHovered(item.id)} onMouseLeave={() => setHovered(null)}>
                                    <div className="position-relative overflow-hidden shadow rounded">
                                        {item.discount_label && <span className={`new-label ${item.labelClass} text-white rounded-circle text-center`}>{item.discount_label}</span>}
                                        <Image src={hovered === item.id ? item.image_url_hover : item.image_url_default} alt="image" className="img-fluid" />
                                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                            <i className="facl facl-heart-o text-white"></i>
                                        </Link>
                                        <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                                            <i className="facl facl-heart-o text-white"></i>
                                        </Link>
                                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                                                <span>Quick View</span> <i className="iccl iccl-eye"></i>
                                            </Link>
                                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                            </button>
                                        </div>
                                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                                                <i className="iccl iccl-eye fw-semibold"></i>
                                            </Link>
                                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                                <i className="iccl iccl-cart fw-semibold"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-center">
                                        <h6 className="mb-1 text-capitalize fs-14 fw-medium">
                                            <Link href="/product-detail-layout-01" className="main_link_teal">{item.name}</Link>
                                        </h6>
                                        <p className="mb-0 fs-14 text-muted">
                                            {item.price_discount
                                                ?
                                                <del>{item.price_discount}</del>
                                                :
                                                <span>{item.price}</span>
                                            }{" "}
                                            <span className="text-danger">{item.price_discounted}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4 pt-2">
                        <Link href="#!" className="btn btn-dark btn-lg btn_icon_true min-w-150 px-5 fs-14 py-3 rounded-0">Load More</Link>
                    </div>
                </div>
            </section>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    )
}

export default BestSeller