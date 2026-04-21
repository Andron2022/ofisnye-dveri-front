"use client";
import React, { useState } from 'react'
import { Col, Nav, Tab } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

import kid13 from "@assets/images/home-kids/pr-13.jpg"
import kid15 from "@assets/images/home-kids/pr-15.jpg"
import kid21 from "@assets/images/home-kids/pr-21.jpg"
import kid23 from "@assets/images/home-kids/pr-23.jpg"
import kid25 from "@assets/images/home-kids/pr-25.jpg"
import kid26 from "@assets/images/home-kids/pr-26.jpg"
import kid27 from "@assets/images/home-kids/pr-27.jpg"
import kid29 from "@assets/images/home-kids/pr-29.jpg"

import blue from "@assets/images/home-kids/tab-dot-dark-blue.jpg"
import line from "@assets/images/home-kids/tab-dot-stripe-lines.jpg"
import nude from "@assets/images/home-kids/tab-dot-nude.jpg"
import grey from "@assets/images/home-kids/tab-dot-grey.jpg"

const productData = [
  {
    id: 1,
    image: kid21,
    name: 'Monkey Cutie Toy For Baby',
    price: '$29.00',
    rating: 3,
    reviews: 5
  },
  {
    id: 2,
    image: kid29,
    name: 'Baby Pajamas',
    price: '$18.00',
    rating: 3,
    reviews: 8
  },
  {
    id: 3,
    image: kid23,
    name: 'Summer My Fun Sticker Potty',
    price: '$20.00',
    rating: 3,
    reviews: 4
  },
  {
    id: 4,
    image: kid26,
    name: 'Baby Stroller - Grey',
    original_price: '$589.00',
    discounted_price: '$495.00',
    discount: '-34%',
    rating: 3,
    reviews: 4,
    colors: [
      kid25,
      kid26
    ]
  },
  {
    id: 5,
    image: kid27,
    name: "Multi Color Sailboat Toy",
    price: "$6.00",
    rating: 3,
    reviews: 1
  },
  {
    id: 6,
    image: kid15,
    name: "Baby Pajamas",
    price: "$18.00",
    discount: "-40%",
    rating: 3,
    reviews: 8
  },
  {
    id: 7,
    image: kid13,
    name: "Little Princess Rose Gold",
    price: "$8.00",
    discount: "-40%",
    rating: 3,
    reviews: 1
  },
  {
    id: 8,
    image: kid15,
    name: "Cosatto Baby Fleece Troller",
    priceRange: "$99.00 – $145.00",
    discount: "-21%",
    rating: 3,
    reviews: 4,
    colors: [
      blue,
      line,
      nude,
      grey,
      line,
      blue
    ]
  }
];
const productData2 = [
  {
    id: 1,
    image: kid29,
    name: 'Baby Pajamas',
    price: '$18.00',
    rating: 3,
    reviews: 8
  },
  {
    id: 2,
    image: kid23,
    name: 'Summer My Fun Sticker Potty',
    price: '$20.00',
    rating: 3,
    reviews: 4
  },
  {
    id: 3,
    image: kid21,
    name: 'Monkey Cutie Toy For Baby',
    price: '$29.00',
    rating: 3,
    reviews: 5
  },
  {
    id: 4,
    image: kid26,
    name: 'Baby Stroller - Grey',
    original_price: '$589.00',
    discounted_price: '$495.00',
    discount: '-34%',
    rating: 3,
    reviews: 4,
    colors: [
      kid25,
      kid26
    ]
  },
  {
    id: 5,
    image: kid27,
    name: "Multi Color Sailboat Toy",
    price: "$6.00",
    rating: 3,
    reviews: 1
  },
  {
    id: 6,
    image: kid15,
    name: "Baby Pajamas",
    price: "$18.00",
    discount: "-40%",
    rating: 3,
    reviews: 8
  },
  {
    id: 7,
    image: kid13,
    name: "Little Princess Rose Gold",
    price: "$8.00",
    discount: "-40%",
    rating: 3,
    reviews: 1
  },
  {
    id: 8,
    image: kid15,
    name: "Cosatto Baby Fleece Troller",
    priceRange: "$99.00 – $145.00",
    discount: "-21%",
    rating: 3,
    reviews: 4,
    colors: [
      blue,
      line,
      nude,
      grey,
      line,
      blue
    ]
  }
];
const productData3 = [
  {
    id: 4,
    image: kid26,
    name: 'Baby Stroller - Grey',
    original_price: '$589.00',
    discounted_price: '$495.00',
    discount: '-34%',
    rating: 3,
    reviews: 4,
    colors: [
      kid25,
      kid26
    ]
  },
  {
    id: 5,
    image: kid27,
    name: "Multi Color Sailboat Toy",
    price: "$6.00",
    rating: 3,
    reviews: 1
  },
  {
    id: 1,
    image: kid21,
    name: 'Monkey Cutie Toy For Baby',
    price: '$29.00',
    rating: 3,
    reviews: 5
  },
  {
    id: 2,
    image: kid29,
    name: 'Baby Pajamas',
    price: '$18.00',
    rating: 3,
    reviews: 8
  },
  {
    id: 3,
    image: kid23,
    name: 'Summer My Fun Sticker Potty',
    price: '$20.00',
    rating: 3,
    reviews: 4
  },
  {
    id: 6,
    image: kid15,
    name: "Baby Pajamas",
    price: "$18.00",
    discount: "-40%",
    rating: 3,
    reviews: 8
  },
  {
    id: 7,
    image: kid13,
    name: "Little Princess Rose Gold",
    price: "$8.00",
    discount: "-40%",
    rating: 3,
    reviews: 1
  },
  {
    id: 8,
    image: line,
    name: "Cosatto Baby Fleece Troller",
    priceRange: "$99.00 – $145.00",
    discount: "-21%",
    rating: 3,
    reviews: 4,
    colors: [
      blue,
      line,
      nude,
      grey,
      line,
      blue
    ]
  }
];

const ProductCard = ({ product }: any) => {
  const [imageUrl, setImageUrl] = useState(product.image);
  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);
  return (
    <>
      <div className="col-6 col-lg-3">
        <div className="topbar-product-card desgin_1 bg-muted">
          <div className="position-relative overflow-hidden">
            {product.discount && <span className="new-label bg-blue-dark text-white rounded-circle">{product.discount}</span>}
            <Image src={imageUrl} alt={product.name} className="img-fluid w-100" />
            <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o"></i>
            </Link>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
              <button type="button" className="btn rounded-pill fs-14 text-black" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                <i className="iccl iccl-cart"></i></button>
            </div>
            <div className="product2-button position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i></button>
            </div>
          </div>
          <div className="my-3">
            <h6 className="fs-16 fw-medium mb-1">
              <Link className="main_link_primary font-futura text-blue-dark" href="product-detail-layout-01.html">
                {product.name}
              </Link>
            </h6>
            <p className="pb-1 mb-0 fs-15 text-pink">
              {product.original_price && <del className="text-muted">{product.original_price}</del>}
              {product.price ? product.price : product.discounted_price}
            </p>
            <div className="kalles-rating-result">
              <span className="kalles-rating-result__pipe">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} className={`kalles-rating-result__start ${i < product.rating ? 'active' : ''}`}></span>
                ))}
              </span>
              <span className="kalles-rating-result__number text-muted">({product.reviews})</span>
            </div>
          </div>
          {product.colors && (
            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
              {product.colors.map((color: any, i: React.Key | null | undefined) => (
                <Link key={i} href="#!" onMouseOver={() => setImageUrl(color)} onClick={(e) => e.preventDefault()} className="d-inline-block bg_color_blue rounded-circle" style={{ background: `url(${color.src})`, backgroundSize: 'cover' }}></Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
    </>
  );
};

const HandPickedProduct = () => {
  return (
    <React.Fragment>
      <section className="type_tab_collection kids-deal-section pt-0 border-0">
        <div className="container-fluid px-4 bg-white pt-5">
          <div className="row justify-content-center">
            <Col lg={7}>
              <div className="text-center">
                <div className="mt-3">
                  <h2 className="position-relative kids-header lh-lg">
                    <span>Handpicked Products</span>
                  </h2>
                  <p className="m-0 text-muted">Buy High Quality Products To Ensure The Best Quality For Your Health</p>
                </div>
              </div>
            </Col>
          </div>
          <div className="pt-4">
            <Tab.Container id="custom-tabs-example" defaultActiveKey="best-seller">
              <Nav className="tab_header gap-lg-2 justify-content-center mt-4 mb-0" >
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="best-seller" className="nav-link rounded-pill">Best Seller</Nav.Link>
                </Nav.Item>
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="featured" className="rounded-pill">Featured</Nav.Link>
                </Nav.Item>
                <Nav.Item role="presentation">
                  <Nav.Link eventKey="sale" className="rounded-pill">Sale</Nav.Link>
                </Nav.Item>
              </Nav>
              <div className="row justify-content-center">
                <div className="col-lg-10">
                  <Tab.Content className='mt-4' id="pills-tabContent">
                    <Tab.Pane eventKey="best-seller" className='fade show' tabIndex={0}>
                      <div className="row g-4">
                        {productData.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="featured" className='fade' tabIndex={0}>
                      <div className="row g-4">
                        {productData2.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="sale" className='fade' tabIndex={0}>
                      <div className="row g-4">
                        {productData3.map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </div>
              </div>
            </Tab.Container>
          </div>
        </div>
      </section >
    </React.Fragment >
  )
}

export default HandPickedProduct