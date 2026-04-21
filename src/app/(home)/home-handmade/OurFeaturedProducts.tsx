"use client";
import React,{useState} from 'react'
import { Button, Col, Nav, OverlayTrigger, Tab, Tooltip } from 'react-bootstrap'
import Image from 'next/image';
import Link from 'next/link';

import pr1 from "@assets/images/home-hand-made/pr-01.jpg"
import pr2 from "@assets/images/home-hand-made/pr-02.jpg"
import pr3 from "@assets/images/home-hand-made/pr-03.jpg"
import pr4 from "@assets/images/home-hand-made/pr-04.jpg"
import pr5 from "@assets/images/home-hand-made/pr-05.jpg"
import pr6 from "@assets/images/home-hand-made/pr-06.jpg"
import pr8 from "@assets/images/home-hand-made/pr-08.jpg"
import pr9 from "@assets/images/home-hand-made/pr-09.jpg"
import pr10 from "@assets/images/home-hand-made/pr-10.jpg"
import pr11 from "@assets/images/home-hand-made/pr-11.jpg"
import pr12 from "@assets/images/home-hand-made/pr-12.jpg"
import pr13 from "@assets/images/home-hand-made/pr-13.jpg"
import pr14 from "@assets/images/home-hand-made/pr-14.png"

import one9 from "@assets/images/home-one-product-store/pr-09.png"
import one10 from "@assets/images/home-one-product-store/pr-10.png"
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';


const productData = [
    {
        imageUrl: pr1,
        hoverImageUrl: pr1,
        name: "Pendant Key Ornaments",
        price: "35.00",
    },
    {
        imageUrl: pr2,
        hoverImageUrl: pr3,
        name: "Abstract Folded Pots",
        price: "52.00",
    },
    {
        imageUrl: pr4,
        hoverImageUrl: pr5,
        name: "Adhesive Tape Dispenser",
        price: "15.00",
    },
    {
        imageUrl: pr6,
        hoverImageUrl: pr6,
        name: "Antique Sewing Scissors",
        price: "15.00",
        discountedPrice: "12.00",
        discount: "-20%"
    },
    {
        imageUrl: pr8,
        hoverImageUrl: pr5,
        name: "Bouncer Measuring Cup",
        price: "350.00",
    },
    {
        imageUrl: pr9,
        hoverImageUrl: pr9,
        productName: "Digital Camera System",
        price: "350.00",
    },
    {
        imageUrl: pr10,
        hoverImageUrl: pr11,
        productName: "LCD Writing Tablet",
        price: "250.00",
    },
    {
        imageUrl: one9,
        hoverImageUrl: one10,
        productName: "Motorized Tricycle",
        price: "$35.00",
    },
    {
        imageUrl: pr12,
        hoverImageUrl: pr13,
        productName: "Modern Camera",
        price: "380.00",
    },
    {
        imageUrl: pr14,
        hoverImageUrl: pr14,
        productName: "Minimalist Ceramic Pot",
        price: "120.00",
    }
];
const productData2 = [
    {
        imageUrl: pr1,
        hoverImageUrl: pr1,
        name: "Pendant Key Ornaments",
        price: 35.00,
    },
    {
        imageUrl: pr9,
        hoverImageUrl: pr9,
        productName: "Digital Camera System",
        price: "$350.00",
    },
    {
        imageUrl: pr4,
        hoverImageUrl: pr5,
        name: "Adhesive Tape Dispenser",
        price: "15.00",
    },
    {
        imageUrl: one9,
        hoverImageUrl: one10,
        productName: "Motorized Tricycle",
        price: "35.00",
    },
    {
        imageUrl: pr14,
        hoverImageUrl: pr14,
        productName: "Minimalist Ceramic Pot",
        price: "120.00",
    },
    {
        imageUrl: pr2,
        hoverImageUrl: pr3,
        name: "Abstract Folded Pots",
        price: "52.00",
    },
    {
        imageUrl: pr6,
        hoverImageUrl: pr6,
        name: "Antique Sewing Scissors",
        price: "15.00",
        discountedPrice: "12.00",
        discount: "-20%"
    },
    {
        imageUrl: pr8,
        hoverImageUrl: pr5,
        name: "Bouncer Measuring Cup",
        price: "350.00",
    },

    {
        imageUrl: pr10,
        hoverImageUrl: pr11,
        productName: "LCD Writing Tablet",
        price: "250.00",
    },

    {
        imageUrl: pr12,
        hoverImageUrl: pr13,
        productName: "Modern Camera",
        price: "380.00",
    }
];
const productData3 = [
    {
        imageUrl: one9,
        hoverImageUrl: one10,
        productName: "Motorized Tricycle",
        price: "35.00",
    },
    {
        imageUrl: pr9,
        hoverImageUrl: pr9,
        productName: "Digital Camera System",
        price: "350.00",
    },
    {
        imageUrl: pr14,
        hoverImageUrl: pr14,
        productName: "Minimalist Ceramic Pot",
        price: "120.00",
    },
    {
        imageUrl: pr2,
        hoverImageUrl: pr3,
        name: "Abstract Folded Pots",
        price: "52.00",
    },
    {
        imageUrl: pr12,
        hoverImageUrl: pr13,
        productName: "Modern Camera",
        price: "380.00",
    },
    {
        imageUrl: pr1,
        hoverImageUrl: pr1,
        name: "Pendant Key Ornaments",
        price: "35.00",
    },
    {
        imageUrl: pr4,
        hoverImageUrl: pr5,
        name: "Adhesive Tape Dispenser",
        price: "15.00",
    },
    {
        imageUrl: pr6,
        hoverImageUrl: pr6,
        name: "Antique Sewing Scissors",
        price: "15.00",
        discountedPrice: "12.00",
        discount: "-20%"
    },
    {
        imageUrl: pr8,
        hoverImageUrl: pr5,
        name: "Bouncer Measuring Cup",
        price: "350.00",
    },
    {
        imageUrl: pr10,
        hoverImageUrl: pr11,
        productName: "LCD Writing Tablet",
        price: "250.00",
    }
];

const ProductCard = ({ product }: any) => {

    const renderTooltip = (props: any) => (
        <Tooltip id="button-tooltip" {...props}>
            Add to Wishlist
        </Tooltip>
    );
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);
    return (
        <>
            <Col>
                <div className="topbar-product-card overlay-hover">
                    <div className="position-relative overflow-hidden main">
                        <Image alt="ProductImg" src={product.imageUrl} className="img-fluid" />
                        {product.discount && (
                            <span className="new-label bg-danger text-white rounded-circle"> {product.discount} </span>
                        )}
                        <OverlayTrigger placement="top" overlay={renderTooltip}>
                            <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                        </OverlayTrigger>
                        <div className="product-button d-none d-lg-flex flex-column gap-2">
                            <Button variant="light" className="rounded-pill fs-14" onClick={handleShow}>
                                <span>Quick View</span> <i className="iccl iccl-eye"></i>
                            </Button>
                            <Button variant="light" className="rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                            </Button>
                        </div>
                        <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: "1" }}>
                            <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                            <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                <i className="iccl iccl-cart fw-semibold"></i></button>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h6 className="mb-1 fs-16 fw-medium font-avenir">
                            <Link href="/product-detail-layout-01" className="text-reset">{product.name}</Link>
                        </h6>
                        <p className="mb-0 fs-15 text-muted">
                            {product.discountedPrice ? (
                                <>
                                    <del>${product.price}</del> <span className="text-danger">${product.discountedPrice}</span>
                                </>
                            ) : (
                                <span>${product.price}</span>
                            )}
                        </p>
                    </div>
                </div>
            </Col>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const OurFeaturedProducts = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative fw-semibold font-avenir">
                                        <span>Our Featured Products</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Don&apos;t miss any featured product by categories.</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 pb-2">
                        <Tab.Container id="custom-tabs-example" defaultActiveKey="gift-ideas-tab">
                            <Nav className="tab_header gap-md-4 justify-content-center mt-4 mb-0" >
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="gift-ideas-tab" className="nav-link rounded-pill">Gift ideas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="kids_babies-tab" className="rounded-pill">Kids &_Babies</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="kniting_sewing-tab" className="rounded-pill">Kniting & Sewing</Nav.Link>
                                </Nav.Item>
                                <Nav.Item role="presentation">
                                    <Nav.Link eventKey="toys-tab" className="rounded-pill">Toys</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content className='mt-4' id="pills-tabContent">
                                <Tab.Pane eventKey="gift-ideas-tab" className='fade show' tabIndex={0}>
                                    <div className="row g-md-4 row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
                                        {productData.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="kids_babies-tab" className='fade' tabIndex={0}>
                                    <div className="row g-md-4 row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
                                        {productData2.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="kniting_sewing-tab" className='fade' tabIndex={0}>
                                    <div className="row g-md-4 row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
                                        {productData.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                                <Tab.Pane eventKey="toys-tab" className='fade' tabIndex={0}>
                                    <div className="row g-md-4 row-cols-2 row-cols-md-3 row-cols-lg-5 justify-content-center">
                                        {productData3.map((product, index) => (
                                            <ProductCard key={index} product={product} />
                                        ))}
                                    </div>
                                </Tab.Pane>
                            </Tab.Content>
                        </Tab.Container>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default OurFeaturedProducts