"use client";
import React from "react";
import { Modal } from "react-bootstrap";
import Image from "next/image";
import homekids from '@assets/images/home-kids/pr-15.jpg'
import Link from "next/link";

const KidsModel = ({show,handleKisdModelClose}:any) => {
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleKisdModelClose} centered className="modal-overl pin_popup">
                <Modal.Body className="p-20">
                    <div className="topbar-product-card">
                        <div className="position-relative overflow-hidden">
                            <Image src={homekids} alt="HomekidsImg" className="img-fluid" />
                            <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o"></i></Link>

                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14"><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                                <button type="button" className="btn rounded-pill fs-14 text-black" data-bs-toggle="modal" data-bs-target="#cardModal"><span>Quick Shop</span>
                                    <i className="iccl iccl-cart"></i></button>
                            </div>
                            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                                <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold"></i></Link>
                                <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" >
                                    <i className="iccl iccl-cart fw-semibold"></i></button>
                            </div>
                        </div>
                        <div className="mt-3 text-center">
                            <h6 className="mb-2"><Link href="/product-detail-layout-01" className="product-title">Baby
                                Pajamas</Link></h6>
                            <p className="mb-1 fs-14 text-muted">
                                <span className="text-pink">$18.00</span>
                            </p>
                            <div className="kalles-rating-result justify-content-center">
                                <span className="kalles-rating-result__pipe">
                                    <span className="kalles-rating-result__start"></span>
                                    <span className="kalles-rating-result__start"></span>
                                    <span className="kalles-rating-result__start"></span>
                                    <span className="kalles-rating-result__start"></span>
                                    <span className="kalles-rating-result__start active"></span>
                                </span>
                                <span className="kalles-rating-result__number cp text-muted">(6)</span>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>
        </React.Fragment >
    )
}
export default KidsModel