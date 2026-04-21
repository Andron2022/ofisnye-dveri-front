"use client";
import React, { useState } from "react";
import { Modal, Button, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import product from '@assets/images/quick_shop/p_qs_01.jpg'
import Image from "next/image";
import Link from "next/link";

const AddToCardModal = ({ cardShow, handleAddToCardModalClose }: any) => {
    const [color, setColor] = useState('Grey');
    const [size, setSize] = useState('M');
    const [quantity, setQuantity] = useState(1);

    const handleColorClick = (newColor: string) => {
        setColor(newColor);
    };

    const handleSizeClick = (newSize: string) => {
        setSize(newSize);
    };

    const handleQuantityChange = (change: number) => {
        setQuantity((prev) => Math.max(1, prev + change)); // Ensure quantity is at least 1
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(1, Math.min(100, Number(event.target.value))); // Ensure quantity is at least 1
        setQuantity(value);
    };

    return (
        <Modal show={cardShow} onHide={handleAddToCardModalClose} centered className="fade modal-overl mx-auto quickViewModall">
            <Modal.Body>
                <span className="fs-35 close position-absolute top-0 end-0" aria-label="Close" onClick={handleAddToCardModalClose}>
                    <i className="pe-7s-close pegk"></i>
                </span>

                <Row>
                    <div className="col-4">
                        <Image src={product} className="img-fluid" alt="Product Image" />
                    </div>
                    <div className="col-8">
                        <h6>
                            <Link className="cd chp" href="/product-detail-layout-01">
                                Cluse La Boheme Rose Gold
                            </Link>
                        </h6>
                        <div className="d-flex mb-2 align-items-center">
                            <div className="fs-16 me-1">
                                <del className="text-muted">$60.00</del>&nbsp;
                                <span className="text-danger">$45.00</span>
                            </div>
                            <span className="bg-danger text-white p-1">-25%</span>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <div>
                            <h6 className="text-uppercase fw-bold mb-3">
                                Color: <span>{color}</span>
                            </h6>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                                {/* <OverlayTrigger placement="top" overlay={<Tooltip>Pink</Tooltip>}>
                                    <Button
                                        variant="link"
                                        className={`d-inline-block bg_color_pink rounded-circle square-xs ${color === 'Pink' ? 'active' : ''}`}
                                        onClick={() => handleColorClick('Pink')}
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Grey</Tooltip>}>
                                    <Button
                                        variant="link"
                                        className={`d-inline-block bg-secondary bg-opacity-50 rounded-circle ${color === 'Grey' ? 'active' : ''} square-xs`}
                                        onClick={() => handleColorClick('Grey')}
                                    />
                                </OverlayTrigger>
                                <OverlayTrigger placement="top" overlay={<Tooltip>Black</Tooltip>}>
                                    <Button
                                        variant="link"
                                        className={`d-inline-block bg-dark rounded-circle ${color === 'Black' ? 'active' : ''} square-xs`}
                                        onClick={() => handleColorClick('Black')}
                                    />
                                </OverlayTrigger> */}
                                <OverlayTrigger
                                    key="tooltip-pink"
                                    placement="top"
                                    overlay={<Tooltip id={`tooltip-pink`}>Pink</Tooltip>}
                                >
                                    <Link
                                        href="#!"
                                        className={`d-inline-block bg_color_pink rounded-circle square-xs ${color === 'Pink' ? 'active' : ''}`}
                                        onClick={() => handleColorClick('Pink')}
                                    ></Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key="tooltip-black"
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-black">Grey</Tooltip>}
                                >
                                    <Link
                                        href="#!"
                                        className={`d-inline-block bg-secondary bg-opacity-50 rounded-circle ${color === 'Grey' ? 'active' : ''} square-xs`}
                                        onClick={() => handleColorClick('Grey')}
                                    ></Link>
                                </OverlayTrigger>
                                <OverlayTrigger
                                    key="tooltip-black"
                                    placement="top"
                                    overlay={<Tooltip id="tooltip-black">Black</Tooltip>}
                                >
                                    <Link
                                        href="#!"
                                        className={`d-inline-block bg-dark rounded-circle square-xs ${color === 'Black' ? 'active' : ''} square-xs`}
                                        onClick={() => handleColorClick('Black')}
                                    ></Link>
                                </OverlayTrigger>

                            </div>
                        </div>

                        <div className="mb-4 pt-2">
                            <h6 className="text-uppercase fw-bold mt-3">
                                Size: <span>{size}</span>
                            </h6>
                            <div className="product-color-list size mt-2 gap-2 d-flex align-items-center justify-content-center">
                                <Link href="#!"
                                    className={`d-inline-block rounded-circle square-xs d-flex align-items-center justify-content-center ${size === "S" ? 'active' : ""}`}
                                    onClick={() => handleSizeClick("S")}
                                >S</Link>

                                <Link href="#!"
                                    className={`d-inline-block rounded-circle square-xs d-flex align-items-center justify-content-center ${size === "M" ? "active" : ""}`}
                                    onClick={() => handleSizeClick("M")}
                                >S</Link>

                                <Link href="#!"
                                    className={`d-inline-block rounded-circle square-xs d-flex align-items-center justify-content-center ${size === "L" ? "active" : ""}`}
                                    onClick={() => handleSizeClick("L")}
                                >L</Link>
                            </div>
                        </div>
                        <div className="input-step border border-dark rounded-pill">
                            <button type="button" className="minus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(-1)}>
                                –
                            </button>
                            <input
                                type="number"
                                className="product-quantity fw-bold fs-6"
                                value={quantity}
                                onChange={handleChange}
                            />
                            <button type="button" className="plus material-shadow text-dark fw-bold" onClick={() => handleQuantityChange(1)}>
                                +
                            </button>
                        </div>
                        <div className="my-3">
                            <Button type="submit" className="btn w-100 btn-teal rounded-pill text-uppercase px-4 fw-semibold">
                                Add to cart
                            </Button>
                        </div>
                        <Link href="/product-detail-layout-01" className="btn fs-16 fw-semibold detail_link">
                            View full details
                            <i className="facl facl-right ms-1"></i>
                        </Link>
                    </div>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default AddToCardModal;