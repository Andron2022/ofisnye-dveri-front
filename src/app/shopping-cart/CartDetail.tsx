"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import thumb1 from '@assets/images/shopping-cart/thumb-01.jpg'
import thumb2 from '@assets/images/shopping-cart/thumb-02.png'

const CartDetail = () => {
    const [quantity, setQuantity] = useState(1);
    const [quantity2, setQuantity2] = useState(1);

    const handleIncrements = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
    };
    // Handler for decrementing quantity
    const handleDcrements = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };
    // Handler for manual input change
    const handleChange = (event: any) => {
        const value = Math.max(0, Math.min(100, Number(event.target.value)));
        setQuantity(value);
    };

    const handleIncrements2 = () => {
        setQuantity2((prevQuantity) => Math.min(prevQuantity + 1, 100));
    };
    // Handler for decrementing quantity
    const handleDcrements2 = () => {
        setQuantity2((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };
    // Handler for manual input change
    const handleChange2 = (event: any) => {
        const value = Math.max(0, Math.min(100, Number(event.target.value)));
        setQuantity2(value);
    };

    return (
        <React.Fragment>
            <Row className="d-none d-lg-flex  border-bottom">
                <div className="col-6">
                    <h6>PRODUCT</h6>
                </div>
                <div className="col-2">
                    <h6>PRICE</h6>
                </div>
                <div className="col-2">
                    <h6 className="text-center">QUALITY</h6>
                </div>
                <div className="col-2">
                    <h6 className="text-end">TOTAL</h6>
                </div>
            </Row>
            <Row className="g-0 border-bottom align-items-center py-3 border-bottom">
                <Col md={6}>
                    <div className="d-flex gap-3 align-items-start align-items-md-center">
                        <Image src={thumb1} alt="Thumb1Img" />
                        <div className="w-100">
                            <div className="px-2 pb-2">
                                <h6 className="fs-16 ">Cream women pants</h6>
                                <div className="mt-3">
                                    <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="border-bottom border-top border-dotted p-2 d-md-none">
                                <p className="text-muted m-0">$35.00</p>
                            </div>
                            <div className="input-step m-2 border border-dark rounded-pill d-md-none">
                                <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements}>–</button>
                                <input type="number" className="product-quantity fw-bold fs-6" value={quantity} onChange={handleChange} />
                                <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements}>+</button>
                            </div>
                            <div className="border-top border-dotted p-2 d-md-none">
                                <p className="m-0">$35.00</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="justify-content-between d-none d-md-flex align-items-center">
                    <p className="text-muted">$35.00</p>
                    <div className="input-step border border-dark rounded-pill">
                        <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements}>–</button>
                        <input type="number" className="product-quantity fw-bold fs-6" value={quantity} onChange={handleChange} />
                        <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements}>+</button>
                    </div>
                    <p className="text-black text-end">$35.00</p>
                </Col>

            </Row>
            <Row className="g-0 border-bottom align-items-center py-3 border-bottom">
                <Col md={6}>
                    <div className="d-flex gap-3 align-items-start align-items-md-center">
                        <Image src={thumb2} alt="Thumb2Img" />
                        <div className="w-100">
                            <div className="px-2 pb-2">
                                <h6 className="fs-16 ">Black mountain hat</h6>
                                <div className="mt-3">
                                    <svg width="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6"></polyline>
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                        </path>
                                        <line x1="10" y1="11" x2="10" y2="17"></line>
                                        <line x1="14" y1="11" x2="14" y2="17"></line>
                                    </svg>
                                </div>
                            </div>
                            <div className="border-bottom border-top p-2 d-md-none">
                                <p className="text-muted m-0">$35.00</p>
                            </div>
                            <div className="input-step m-2 border border-dark rounded-pill d-md-none">
                                <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements2}>–</button>
                                <input type="number" className="product-quantity fw-bold fs-6" value={quantity2} min="0" max="100" onChange={handleChange2} />
                                <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements2}>+</button>
                            </div>
                            <div className="border-top p-2 d-md-none">
                                <p className="m-0">$35.00</p>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col md={6} className="justify-content-between d-none d-md-flex align-items-center">
                    <p className="text-muted">$50.00</p>
                    <div className="quantity pr mr__10 qty__true position-relative">
                        <div className="input-step border border-dark rounded-pill">
                            <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements2}>–</button>
                            <input type="number" className="product-quantity fw-bold fs-6" value={quantity2} min="0" max="100" onChange={handleChange2} />
                            <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements2}>+</button>
                        </div>
                    </div>
                    <p className="text-black text-end">$50.00</p>
                </Col>

            </Row>
        </React.Fragment>
    )
}
export default CartDetail