"use client";
import React, { useState } from 'react'
import {  Col, Nav, OverlayTrigger, Row, Tab, Tooltip } from 'react-bootstrap'
import { accessoriestab, bottomtab, jewellerytab, mentab, shoetab, toptab, womentab } from '@src/common/data'
import AddToCardModal from '@src/commonsections/AddToCardModal';
import ProductModal from '@src/commonsections/ProductModal';
import Image from 'next/image';
import Link from 'next/link';

const SellerTab = ({ item }: any) => {

    const [imageUrl, setImageUrl] = useState(item.imageUrl);
    const [isHovered, setIsHovered] = useState(false);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col-md-3 col-6">
                <div
                    className="topbar-product-card"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="position-relative overflow-hidden">
                        {item.newLabel && <span className={`new-label ${item.labelcolor} text-white rounded-circle text-center`}> {item.label} </span>}
                        <Image
                            src={isHovered ? item.hoverImageUrl : imageUrl}
                            alt="image"
                            className="img-fluid"
                        />
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Add to Wishlist</Tooltip>}
                        >
                            <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }}>
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>Add to Wishlist</Tooltip>}
                        >
                            <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                        </OverlayTrigger>

                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                            <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                                <i className="iccl iccl-cart"></i></button>
                        </div>
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-black rounded-pill m-2" style={{ zIndex: 1 }}>
                            <a href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold text-white"></i></a>
                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold text-white"></i></button>
                        </div>

                        <p className="product-size mb-0 text-center text-white fw-medium">{item.sizes}</p>
                    </div>
                    <div className="mt-3 text-center">
                        {item.brand && <p className="text-muted mb-2">{item.brand}</p>}
                        <h6 className="mb-1">
                            <Link href="/product-detail-layout-01" className="main_link">{item.name}</Link>
                        </h6>
                        {item.discount === true ?
                            <p className="mb-0 fs-14 text-muted">
                                <del>{item.price}</del>
                                <span className="text-danger">{item.discountedPrice}</span>
                            </p>
                            :
                            <p className="mb-0 fs-14 text-muted">
                                <span>{item.price}</span>
                            </p>
                        }

                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                            {item.colorOption?.map((color: { imageUrl: any, index: number }, index: number | null | undefined) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    style={{ backgroundImage: `url(${color.imageUrl.src})`, backgroundSize: 'cover' }}
                                    className="d-inline-block rounded-circle"
                                ></Link>
                            ))}
                         
                        </div>
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                            {item.colorOptions?.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    className={`d-inline-block ${color.colorClass} rounded-circle`}
                                ></Link>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    )
}



const BestSeller = () => {

    return (
        <React.Fragment>
            <section className="type_tab_collection">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7} >
                            <div className="text-center">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize line-section-title">
                                        <span>Best Seller Products</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                    tempor!</span>
                            </div>
                        </Col>
                    </Row>

                    <Tab.Container defaultActiveKey="women-tab">
                        <Nav variant="nav nav-underline g-lg-4 justify-content-center mt-4 mb-0" id="pills-tab">
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="women-tab">Women</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="men-tab">Men</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="accessories-tab">Accessories</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="top-tab">Top</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="bottoms-tab">Bottoms</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="shoes-tab">Shoes</Nav.Link>
                            </Nav.Item>
                            <Nav.Item role="presentation">
                                <Nav.Link eventKey="jewellery-tab">Jewellery</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content className='mt-4' id="pills-tabContent">
                            <Tab.Pane eventKey="women-tab" id="women" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2">
                                    {
                                        womentab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                                <div className="text-center mt-4 pt-2">
                                    <Link href="#!" className="btn btn-dark btn-lg min-w-150 px-4 fs-14 py-3 rounded-0">Load More &nbsp;<i className="las la-arrow-down"></i></Link>
                                </div>
                            </Tab.Pane>
                            <Tab.Pane eventKey="men-tab" id="men" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2">
                                    {
                                        mentab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="accessories-tab" id="accessories" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2">
                                    {
                                        accessoriestab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="top-tab" id="top" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2">
                                    {
                                        toptab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="bottoms-tab" id="bottoms" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2">
                                    {
                                        bottomtab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="shoes-tab" id="shoes" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2 justify-content-center">
                                    {
                                        shoetab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                            <Tab.Pane eventKey="jewellery-tab" id="jewellery" className='fade show' tabIndex={0}>
                                <Row className="g-lg-4 g-2 justify-content-center">
                                    {
                                        jewellerytab.map((item: any, index: number) => {
                                            return (
                                                <SellerTab Key={index} item={item} />
                                            )
                                        })
                                    }
                                </Row>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>


                </div>
            </section>
        </React.Fragment>
    )
}

export default BestSeller