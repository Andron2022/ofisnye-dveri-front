"use client";
import React, { useState, useEffect } from 'react';
import { Modal, Button, Tooltip, OverlayTrigger, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

import rectangle from '@assets/images/rectangle_3.jpg'
import recommendedProducts from '@assets/images/products/recommended_products_01.jpg'
import recommendedProducts02 from '@assets/images/products/recommended_products_02.jpg'
import ecommendedProducts03 from '@assets/images/products/recommended_products_03.jpg'
import recommendedProducts04 from '@assets/images/products/recommended_products_04.jpg'


const MainModel = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('CODE15OFF');
        // alert('Code copied to clipboard');
    };

    useEffect(() => {
        setShow(true);
    }, []);

    return (
        <React.Fragment>

            <Modal id="CODE15OFF" className='fade' show={show} onHide={handleClose} centered aria-labelledby="exampleModalLabel" aria-hidden="true" >
                <Modal.Body className="p-0">
                    <button
                        type="button"
                        className="btn-close position-absolute end-0 p-0 lh-lg bg-white rounded-circle"
                        onClick={handleClose}
                        aria-label="Close"
                    />
                    <Row className="g-0">
                        <Col lg={6}>
                            <Link href="#!" className="position-relative d-block h-100 copycode-left">
                                <Image src={rectangle} alt="RectangleImg" className="img-fluid w-100 h-100 recommended_products" />
                                <div className="p-4 position-absolute d-flex top-0 m-auto h-100 w-100 flex-column justify-content-center align-items-center text-white text-center">
                                    <h3 className="fs-32">Wait! before you leave...</h3>
                                    <p className="mb-30">Get 15% off for your first order</p>
                                    <div className="d-flex align-items-center mb-30 copycode">
                                        <Button variant="outline-light" className="rounded-0 fs-16 fw-semibold" onClick={handleCopyCode}>
                                            CODE15OFF
                                        </Button>
                                        <OverlayTrigger
                                            placement="top"
                                            overlay={<Tooltip>Copy to clipboard</Tooltip>}
                                        >
                                            <svg onClick={handleCopyCode} className="bg-primary" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" stroke="currentColor" viewBox="0 0 512 512">
                                                <path d="M448 352H288c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32H396.1c4.2 0 8.3 1.7 11.3 4.7l67.9 67.9c3 3 4.7 7.1 4.7 11.3V320c0 17.7-14.3 32-32 32zM497.9 81.9L430.1 14.1c-9-9-21.2-14.1-33.9-14.1H288c-35.3 0-64 28.7-64 64V320c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V115.9c0-12.7-5.1-24.9-14.1-33.9zM64 128c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H224c35.3 0 64-28.7 64-64V416H256v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32H192V128H64z"></path>
                                            </svg>
                                        </OverlayTrigger>
                                    </div>
                                    <p className="mb-3 px-4">Use above code to get 15% OFF for your first order when checkout</p>
                                    <Button variant="primary" className="btn-lg py-2 px-5 lh-lg rounded-pill fs-18">GRAB THE DISCOUNT</Button>
                                </div>
                            </Link>
                        </Col>
                        <Col lg={6}>
                            <h3 className="p-3 pt-4 border-bottom mb-4 fs-20">Recommended Products</h3>
                            <div className="p-30 pt-0 popup-h">
                                <div className="d-flex mb-4">
                                    <Image className="img-fluid max-w-100" src={recommendedProducts} alt="RecommendedProductsImg" />
                                    <div className="ms-2">
                                        <h6 className="fs-16 ">Amara Reversible Jacket</h6>
                                        <p className="text-muted mt-3">$47.00</p>
                                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Violet</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg_color_violet rounded-circle"></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Pink</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <Image className="img-fluid max-w-100" src={recommendedProducts02} alt="RecommendedProducts02Img" />
                                    <div className="ms-2">
                                        <h6 className="fs-16 ">Anti Slip Exercise Yoga Mat - Cyan</h6>
                                        <p className="text-muted mt-3">$12.00 – $19.00</p>
                                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Black</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg-black rounded-circle"></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Green</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg_color_green rounded-circle"></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Violet</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg_color_violet rounded-circle"></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Red</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg-danger rounded-circle"></Link>
                                            </OverlayTrigger>
                                            <OverlayTrigger placement="top" overlay={<Tooltip>Pink</Tooltip>}>
                                                <Link href="#!" className="d-inline-block bg_color_pink rounded-circle"></Link>
                                            </OverlayTrigger>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex mb-4">
                                    <Image className="img-fluid max-w-100" src={ecommendedProducts03} alt="EcommendedProducts03Img" />
                                    <div className="ms-2">
                                        <h6 className="fs-16 ">Beach Babe - Malibu Bikini</h6>
                                        <p className="text-muted mt-3">$38.00</p>
                                    </div>
                                </div>
                                <div className="d-flex">
                                    <Image className="img-fluid max-w-100" src={recommendedProducts04} alt="RecommendedProducts04Img" />
                                    <div className="ms-2">
                                        <h6 className="fs-16 ">Black Sportwear</h6>
                                        <p className="text-muted mt-3">$129.00</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>


        </React.Fragment>
    )
}
export default MainModel