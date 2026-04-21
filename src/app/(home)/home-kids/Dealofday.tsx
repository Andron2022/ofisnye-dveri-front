"use client";
import React, { useState,useEffect, useRef } from 'react'
import { ProgressBar } from 'react-bootstrap';

import pr9 from '@assets/images/home-kids/pr-09.jpg'
import pr11 from '@assets/images/home-kids/pr-11.jpg'
import pr13 from '@assets/images/home-kids/pr-13.jpg'
import Image from 'next/image';

import 'flickity/css/flickity.css';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import Link from 'next/link';


const productData = [
  {
    title: "Glitter Pink Mini Backpack",
    price: "$29.00",
    rating: 3,
    reviews: 5,
    imageUrl: pr9,
    sold: 30,
    available: 46
  },
  {
    title: "Low Blush Beanie",
    price: "$24.00",
    rating: 3,
    reviews: 6,
    imageUrl: pr11,
    sold: 25,
    available: 75
  },
  {
    title: "Little Princess Rose Gold",
    price: "$8.00",
    rating: 3,
    reviews: 9,
    imageUrl: pr13,
    sold: 52,
    available: 48
  },
  {
    title: "Striped Polo T-Shirt",
    price: "$12.00",
    oldPrice: "$19.99",
    rating: 3,
    reviews: 12,
    imageUrl: pr13,
    sold: 32,
    available: 36
  }
];

const ProductCard = ({ product }: any) => {

  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);

  const stars = Array(5).fill(0).map((_, i) => (
    <span key={i} className={`kalles-rating-result__start ${i < product.rating ? 'active' : ''}`}></span>
  ));

  return (
    <div className="col-6 col-lg-3 px-2">
      <div>
        <div className="my-3">
          <h6 className="fs-16 fw-medium mb-1">
            <a className="main_link_primary font-futura text-blue-dark" href="product-detail-layout-01.html">{product.title}</a>
          </h6>
          <p className="pb-1 mb-0 fs-15 text-pink">
            {product.oldPrice && <del className="text-muted">{product.oldPrice}</del>} {product.price}
          </p>
          <div className="kalles-rating-result">
            <span className="kalles-rating-result__pipe">
              {stars}
            </span>
            <span className="kalles-rating-result__number text-muted">({product.reviews})</span>
          </div>
        </div>
        <div className="topbar-product-card desgin_1 bg-muted">
          <div className="position-relative overflow-hidden">
            <Image src={product.imageUrl} alt="ProductImg" className="img-fluid w-100" />
            <div className="bg-overlay"></div>
            <a href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist"><i className="facl facl-heart-o"></i></a>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
              <button type="button" className="btn rounded-pill fs-14 text-black" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                <i className="iccl iccl-cart"></i></button>
            </div>
            <div className="product2-button position-absolute d-lg-none bottom-0 end-0 d-flex flex-column rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i></button>
            </div>
          </div>
        </div>
        <div className="loop-product-stock mt-3">
          <ProgressBar className='rounded-pill' now={product.sold} />
          <div className="d-flex mt-2 fs-15">
            <p className="mb-0 flex-grow-1">Sold: {product.sold}</p>
            <p className="mb-0 flex-shrink-0">Available: {product.available}</p>
          </div>
        </div>
      </div>
      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
    </div>
  );
};

const Dealofday = () => {

  const flickityRef = useRef<Flickity | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize Flickity
      const FlickityClass = require('flickity');
      flickityRef.current = new FlickityClass('.blog-arrow', {
        cellAlign: 'left',
        imagesLoaded: false,
        wrapAround: true,
        autoPlay: false,
        pauseAutoPlayOnHover: true,
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        adaptiveHeight: false,
        groupCells: "100%",
        dragThreshold: 5,
        percentPosition: true,
      });

      // Initialize AOS (Animate On Scroll)
      // AOS.init();
    }

    // Cleanup Flickity on unmount
    return () => {
      if (flickityRef.current) {
        flickityRef.current.destroy();
      }
    };
  }, []);
  return (
    <React.Fragment>
      <div className="container-fluid bg-white px-4 py-5 ">
        <div className="kalles-medical-deal-section kids-deal-section">
          <h4 className="product-cd-header text-center text-sm-start  font-futura text-blue-dark fs-26 d-inline-flex bg-body align-items-center mb-0">
            Daily Deal Of The Day</h4>
          <div className="row blog-arrow">
            {productData.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Dealofday