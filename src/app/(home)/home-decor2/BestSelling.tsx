"use client";
import React, { useState } from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import pr1 from "@assets/images/home-decor/pr-01.jpg"
import pr2 from "@assets/images/home-decor/pr-02.jpg"
import pr3 from "@assets/images/home-decor/pr-03.jpg"
import pr4 from "@assets/images/home-decor/pr-04.jpg"
import pr5 from "@assets/images/home-decor/pr-05.jpg"
import pr6 from "@assets/images/home-decor/pr-06.jpg"
import pr7 from "@assets/images/home-decor/pr-07.jpg"
import pr8 from "@assets/images/home-decor/pr-08.jpg"
import pr9 from "@assets/images/home-decor/pr-09.jpg"
import pr10 from "@assets/images/home-decor/pr-10.jpg"
import pr11 from "@assets/images/home-decor/pr-11.jpg"
import pr12 from "@assets/images/home-decor/pr-12.jpg"
import pr13 from "@assets/images/home-decor/pr-13.jpg"
import pr14 from "@assets/images/home-decor/pr-14.jpg"
import pr15 from "@assets/images/home-decor/pr-15.jpg"
import pr16 from "@assets/images/home-decor/pr-16.jpg"
import pr17 from "@assets/images/home-decor/pr-17.jpg"
import pr18 from "@assets/images/home-decor/pr-18.jpg"
import pr19 from "@assets/images/home-decor/pr-19.jpg"
import pr20 from "@assets/images/home-decor/pr-20.jpg"
import pr21 from "@assets/images/home-decor/pr-21.jpg"
import pr22 from "@assets/images/home-decor/pr-22.jpg"
import pr23 from "@assets/images/home-decor/pr-23.jpg"
import pr24 from "@assets/images/home-decor/pr-24.jpg"


const bestSell = [
  {
    imageUrl: pr9,
    hoverImageUrl: pr10,
    name: "form egg slicer",
    price: "$35.00"
  },
  {
    imageUrl: pr1,
    hoverImageUrl: pr2,
    name: "cymbal pendant",
    price: "$25.00",
    originalPrice: "$35.00",
    discount: "-29%"
  },
  {
    imageUrl: pr3,
    hoverImageUrl: pr4,
    name: "Chair Wood Legs",
    price: "$30.00"
  },
  {
    imageUrl: pr5,
    hoverImageUrl: pr6,
    name: "light oil lamp",
    price: "$65.00"
  },
  {
    imageUrl: pr7,
    hoverImageUrl: pr8,
    name: "Line Cocktail Shaker",
    price: "$65.00",
  },
  {
    imageUrl: pr11,
    hoverImageUrl: pr12,
    name: "Piep Show",
    price: "$15.00",
  },
  {
    imageUrl: pr13,
    hoverImageUrl: pr14,
    name: "Herit Chair",
    price: "$55.00",
  },
  {
    imageUrl: pr15,
    hoverImageUrl: pr16,
    name: "buddy table lamp",
    price: "$35.00",
  },
  {
    imageUrl: pr17,
    hoverImageUrl: pr18,
    name: "picto wall clock",
    price: "$15.00",
  },
  {
    imageUrl: pr19,
    hoverImageUrl: pr20,
    name: "brush set small",
    price: "$65.00",
    newLabel: "New"
  },
  {
    imageUrl: pr21,
    hoverImageUrl: pr22,
    name: "cru thermos jug",
    price: "$45.00",
  },
  {
    imageUrl: pr23,
    hoverImageUrl: pr24,
    name: "urkiola bowl",
    price: "$85.00",
  }
]

const ProductCard = ({ product }: any) => {

  const [isHovered, setIsHovered] = React.useState(false);
  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);
  return (
    <>
      <div className="col">
        <div
          className="topbar-product-card overlay-hover"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="topbar-product-card overlay-hover">
            <div className="position-relative overflow-hidden shadow rounded main">
              <Image
                src={isHovered ? product.hoverImageUrl : product.imageUrl}
                alt="image"
                className="img-fluid"
              />
              <Link
                href="#"
                className="d-lg-none position-absolute"
                style={{ zIndex: 1, top: "10px", left: "10px" }}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add to Wishlist"
              >
                <i className="facl facl-heart-o text-white"></i>
              </Link>
              <Link
                href="#"
                className="wishlistadd d-none d-lg-flex position-absolute"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Add to Wishlist"
              >
                <i className="facl facl-heart-o text-white"></i>
              </Link>
              <div className="product-button d-none d-lg-flex flex-column gap-2">
                <Link
                  href="#exampleModal"
                  data-bs-toggle="modal"
                  className="btn rounded-pill bg-dark text-white fs-14"
                  onClick={handleShow}
                >
                  <span>Quick View</span> <i className="iccl iccl-eye"></i>
                </Link>
                <button
                  type="button"
                  className="btn rounded-pill bg-dark text-white fs-14"
                  data-bs-toggle="modal"
                  data-bs-target="#cardModal"
                  onClick={handleAddToCardModalShow}
                >
                  <span>Quick Shop</span>
                  <i className="iccl iccl-cart text-white"></i>
                </button>
              </div>
              <div
                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-dark rounded-pill m-2"
                style={{ zIndex: 1 }}
              >
                <Link
                  href="#exampleModal"
                  data-bs-toggle="modal"
                  className="btn responsive-cart rounded-pill fs-14 p-2"
                  style={{ width: "36px", height: "36px" }}
                  onClick={handleShow}
                >
                  <i className="iccl iccl-eye fw-semibold text-white"></i>
                </Link>
                <button
                  type="button"
                  className="btn responsive-cart rounded-pill fs-14 p-2"
                  style={{ width: "36px", height: "36px" }}
                  data-bs-toggle="modal"
                  data-bs-target="#cardModal"
                  onClick={handleAddToCardModalShow}
                >
                  <i className="iccl iccl-cart fw-semibold text-white"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h6 className="mb-1 text-capitalize fs-16">
              <Link href="/product-detail-layout-01" className="main_link_teal">
                {product.name}
              </Link>
            </h6>
            <p className="mb-0 fs-16 text-muted">
              {product.originalPrice && <del>{product.originalPrice}</del>}
              <span className={product.discount ? "text-danger" : ""}>
                {product.price}
              </span>
            </p>
          </div>
        </div>
      </div>
      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
    </>
  );
};

const BestSelling = () => {
  return (
    <React.Fragment>

      <section className="type_tab_collection pb-5">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9}>
              <div className="text-center">
                <div className="mb-4">
                  <h3 className="position-relative flex text-capitalize line-section-title">
                    <span>best selling products</span>
                  </h3>
                </div>
                <p className="fs-14 text-muted mb-0">Dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor!</p>
              </div>
            </Col>
          </Row>

          <div className="mt-4">
            <Tab.Container id="custom-tabs-example" defaultActiveKey="best-seller">
              <Nav className="tab_header gap-4 justify-content-center mt-4 mb-0" id="pills-tab">
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="best-seller" className="rounded-pill">furniture</Nav.Link>
                </Nav.Item>
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="featured" className="rounded-pill">kichen&dinning</Nav.Link>
                </Nav.Item>
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="sale" className="rounded-pill">lighting</Nav.Link>
                </Nav.Item>
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="top-sale" className="rounded-pill">techs</Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content className='mt-4' id="pills-tabContent">
                <Tab.Pane eventKey="best-seller" className='fade show' tabIndex={0}>
                  <Row className="g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4">
                    {bestSell.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="featured" className='fade' tabIndex={0}>
                  <Row className="g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4">
                    {bestSell.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="sale" className='fade' tabIndex={0}>
                  <Row className="g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4">
                    {bestSell.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="top-sale" className='fade' tabIndex={0}>
                  <Row className="g-4 row-cols-2 row-cols-md-3 row-cols-lg-4 mt-4">
                    {bestSell.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default BestSelling