"use client";
import React, { useState } from 'react'

import metro1 from "@assets/images/home-classic/pr-01.jpg"
import metro3 from "@assets/images/home-classic/pr-03.jpg"
import metro4 from "@assets/images/home-classic/pr-04.jpg"
import metro5 from "@assets/images/home-classic/pr-05.jpg"
import metro6 from "@assets/images/home-classic/pr-06.jpg"
import metro7 from "@assets/images/home-classic/pr-07.jpg"
import metro8 from "@assets/images/home-classic/pr-08.jpg"
import metro19 from "@assets/images/home-classic/pr-19.jpg"
import metro20 from "@assets/images/home-classic/pr-20.jpg"

import metro27 from "@assets/images/home-classic/pr-27.jpg"
import metro28 from "@assets/images/home-classic/pr-28.jpg"
import metro31 from "@assets/images/home-classic/pr-31.jpg"
import metro32 from "@assets/images/home-classic/pr-32.jpg"

import qr1 from "@assets/images/home-metro/pr-q1.jpg"
import qr2 from "@assets/images/home-metro/pr-q2.jpg"
import qr4 from "@assets/images/home-metro/pr-q4.jpg"
import qr5 from "@assets/images/home-metro/pr-q5.jpg"
import qr6 from "@assets/images/home-metro/pr-q6.jpg"
import qr7 from "@assets/images/home-metro/pr-q7.jpg"
import qr8 from "@assets/images/home-metro/pr-q8.jpg"
import qr9 from "@assets/images/home-metro/pr-q9.jpg"
import qr10 from "@assets/images/home-metro/pr-q10.jpg"
import qr11 from "@assets/images/home-metro/pr-q11.jpg"
import qr12 from "@assets/images/home-metro/pr-q12.jpg"
import qr13 from "@assets/images/home-metro/pr-q13.jpg"
import qr14 from "@assets/images/home-metro/pr-q14.jpg"
import qr15 from "@assets/images/home-metro/pr-q15.jpg"

import big24 from "@assets/images/home-classic/pr-big-24.jpg"
import big25 from "@assets/images/home-classic/pr-big-25.jpg"


import Link from 'next/link'

import pr2 from "@assets/images/products/pr-02.jpg"
import Image from 'next/image'
import { Button, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'

const CatSection = () => {

  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);

  const [imageUrl3, setImageUrl3] = useState(qr1);
  const [isHovered3, setIsHovered3] = useState(false);

  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);

  const [imageUrl6, setImageUrl6] = useState(metro6);
  const [isHovered6, setIsHovered6] = useState(false);

  const [isHovered7, setIsHovered7] = useState(false);

  const [imageUrl8, setImageUrl8] = useState(metro31);
  const [isHovered8, setIsHovered8] = useState(false);

  const [isHovered9, setIsHovered9] = useState(false);

  const [isHovered10, setIsHovered10] = useState(false);

  const [isHovered11, setIsHovered11] = useState(false);
  const [isHovered12, setIsHovered12] = useState(false);

  const [imageUrl13, setImageUrl13] = useState(big24);
  const [isHovered13, setIsHovered13] = useState(false);
  const [isHovered14, setIsHovered14] = useState(false);

  const [show, setShow] = useState(false);
  const [cardShow, setCardShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToCardModalShow = () => setCardShow(true);
  const handleAddToCardModalClose = () => setCardShow(false);

  return (
    <React.Fragment>
      <Col md={3} className='col-6'>
        {/* First Product Card */}
        <div
          className="topbar-product-card mb-lg-30"
          onMouseEnter={() => setIsHovered1(true)}
          onMouseLeave={() => setIsHovered1(false)}
        >
          <div className="position-relative overflow-hidden">
            <span className="new-label bg-success text-white rounded-circle">New</span>
            <Image
              src={isHovered1 ? pr2 : metro1}
              alt="image"
              className="img-fluid"
            />
            <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1">
                <Link href="/product-detail-layout-01" className="text-white">Analogue Resin Strap</Link>
              </h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$30.00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Second Product Card */}
        <div
          className="topbar-product-card d-none d-lg-block"
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered2 ? qr5 : qr4}
              alt="image"
              className="img-fluid"
            />
            <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1">
                <Link href="/product-detail-layout-01" className="text-white">Circle Snapback Cap</Link>
              </h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$25.00</span>
              </p>
            </div>
          </div>
        </div>
      </Col>

      <div className="col-lg-6 col-md-3 col-6">
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered3 ? qr2 : imageUrl3}
              alt="image"
              className="img-fluid"
            />
            <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
              <i className="facl facl-heart-o text-white"></i>
            </Link>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1">
                <Link href="/product-detail-layout-01" className="text-white">Mercury Tee</Link>
              </h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$68.00</span>
              </p>
              <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                <Link
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setImageUrl3(qr1);
                    setIsHovered3(false);
                  }}
                  style={{ background: `url(${qr1})`, backgroundSize: 'cover' }}
                  className="d-inline-block bg-body-tertiary rounded-circle"
                ></Link>
                <Link
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    setImageUrl3(qr2);
                    setIsHovered3(false);
                  }}
                  style={{ background: `url(${qr2})`, backgroundSize: 'cover' }}
                  className="d-inline-block bg_color_pink rounded-circle"
                ></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Col md={3} className='col-6'>
        <div
          className="topbar-product-card mb-lg-30"
          onMouseEnter={() => setIsHovered4(true)}
          onMouseLeave={() => setIsHovered4(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered4 ? metro4 : metro3}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>

            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Link>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </button>
            </div>

            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Ridley High Waist</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$36.00</span>
              </p>
            </div>
          </div>
        </div>

        <div
          className="topbar-product-card d-none d-lg-block"
          onMouseEnter={() => setIsHovered5(true)}
          onMouseLeave={() => setIsHovered5(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered5 ? qr7 : qr6}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Crosshatch Backpack</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$30.00</span>
              </p>
            </div>
          </div>
        </div>
      </Col>

      <Col md={3} className='col-6'>
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered6(true)}
          onMouseLeave={() => setIsHovered6(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered6 ? metro5 : imageUrl6}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>

            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <a href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold"></i></a>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal">
                <i className="iccl iccl-cart fw-semibold"></i></button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <a href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }}><i className="iccl iccl-eye fw-semibold"></i></a>
              <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" >
                <i className="iccl iccl-cart fw-semibold"></i></button>
            </div>

            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Blush Beanie</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$15.00</span>
              </p>
              <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl6(metro6); setIsHovered6(false); }} className="d-inline-block bg-body-tertiary rounded-circle"></Link>
                <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl6(metro7); setIsHovered6(false); }} className="d-inline-block bg_color_pink rounded-circle"></Link>
                <Link href="#!" onClick={(e) => { e.preventDefault(); setImageUrl6(metro8); setIsHovered6(false); }} className="d-inline-block bg-dark rounded-circle"></Link>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <Col md={3} className='col-6'>
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered7(true)}
          onMouseLeave={() => setIsHovered7(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered7 ? metro28 : metro27}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip" >
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip" >
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="product-detail-layout-01" className="text-white">City Backpack Black</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$55.00</span>
              </p>
            </div>
          </div>
        </div>
      </Col>

      <Col md={3} className='col-6'>
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered8(true)}
          onMouseLeave={() => setIsHovered8(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered8 ? metro32 : imageUrl8}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Men pants</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$49.00 - $56.00</span>
              </p>
              <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip">
                    Add to Wishlist
                  </Tooltip>}
                >
                  <Link href="#" className="d-inline-block bg_color_blue rounded-circle" onClick={() => { setImageUrl8(metro31); setIsHovered8(false); }}></Link>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip id="button-tooltip">
                    Add to Wishlist
                  </Tooltip>}
                >
                  <Link href="#" className="d-inline-block bg-dark rounded-circle" onClick={() => { setImageUrl8(metro32); setIsHovered8(false); }}></Link>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </Col>

      <Col md={3} className='col-6'>
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered9(true)}
          onMouseLeave={() => setIsHovered9(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered9 ? qr9 : qr8}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Dusk Pom Beanie</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$25.00</span>
              </p>
            </div>
          </div>
        </div>
      </Col>

      <div className="col-lg-6 col-md-3 col-6">
        <div
          className="topbar-product-card"
          onMouseEnter={() => setIsHovered10(true)}
          onMouseLeave={() => setIsHovered10(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered10 ? qr11 : qr10}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="button-tooltip">
                Add to Wishlist
              </Tooltip>}
            >
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Women Black Pants</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$100.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Col md={3} className='col-6'>
        {/* Product Card 1 */}
        <div
          className="topbar-product-card mb-lg-30"
          onMouseEnter={() => setIsHovered11(true)}
          onMouseLeave={() => setIsHovered11(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered11 ? qr13 : qr12}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Large Icon Bag</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$45.00</span>
              </p>
            </div>
          </div>
        </div>

        {/* Product Card 2 */}
        <div
          className="topbar-product-card d-none d-lg-block"
          onMouseEnter={() => setIsHovered12(true)}
          onMouseLeave={() => setIsHovered12(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered12 ? metro20 : metro19}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Cream women pants</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$35.00</span>
              </p>
            </div>
          </div>
        </div>
      </Col>

      <div className="col-md-3 col-6">
        {/* Product Card 1 */}
        <div
          className="topbar-product-card mb-lg-30"
          onMouseEnter={() => setIsHovered13(true)}
          onMouseLeave={() => setIsHovered13(false)}
        >
          <div className="position-relative overflow-hidden">
            <span className="new-label bg-danger text-white rounded-circle"> -34% </span>
            <Image
              src={isHovered13 ? big25 : imageUrl13}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">La Bohème Rose Gold</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <del>$60.00</del>
                <span className="text-danger">$40.00</span>
              </p>
              <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                <Link href="#!" onClick={() => { setImageUrl13(big24); setIsHovered13(false); }} className="d-inline-block bg_color_pink rounded-circle"></Link>
                <Link href="#!" onClick={() => { setImageUrl13(big25); setIsHovered13(false); }} className="d-inline-block bg-dark rounded-circle"></Link>
              </div>
            </div>
          </div>
        </div>

        {/* Product Card 2 */}
        <div
          className="topbar-product-card d-none d-lg-block"
          onMouseEnter={() => setIsHovered14(true)}
          onMouseLeave={() => setIsHovered14(false)}
        >
          <div className="position-relative overflow-hidden">
            <Image
              src={isHovered14 ? qr15 : qr14}
              alt="image"
              className="img-fluid"
            />
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip id="button-tooltip">
              Add to Wishlist
            </Tooltip>}>
              <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute">
                <i className="facl facl-heart-o text-white"></i>
              </Link>
            </OverlayTrigger>
            <div className="bg-overlay"></div>
            <div className="product-button d-none d-lg-flex flex-column gap-2">
              <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                <span>Quick View</span> <i className="iccl iccl-eye"></i>
              </Link>
              <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
              </button>
            </div>
            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-eye fw-semibold"></i>
              </Button>
              <Button variant="light" className="responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                <i className="iccl iccl-cart fw-semibold"></i>
              </Button>
            </div>
            <div className="product-size p-2">
              <h6 className="mb-1"><Link href="/product-detail-layout-01" className="text-white">Sunny Life</Link></h6>
              <p className="mb-0 fs-14 text-white text-opacity-75">
                <span>$68.00</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ProductModal show={show} handleClose={handleClose} />
      <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
    </React.Fragment>
  )
}

export default CatSection