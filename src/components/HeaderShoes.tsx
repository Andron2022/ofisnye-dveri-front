"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import LoginModal from '@src/components/Headers/LoginModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import MainModel from '@src/commonsections/MainModel';
import Image from 'next/image'
import logo from '@assets/images/svg/kalles.svg'
import cat from "@assets/images/home-shoes/mega-menu-cat.jpg"
import Link from 'next/link'
import { ProductLayout, ProductDetail, ProductSwatch, ProductFeatures } from '@src/common/Header/headershoes'
import { Features, HeaderLayout, Layout4HomePape1, HomePage2, ShopPage, ShopFeatures, Portfolio, Lookbook, Blog, sale } from '@src/common/Header/header'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

import MobileHeader from '@src/components/Headers/MobileHeader';
import { shoeSwiper } from '@src/common/Header/headershoe';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import MobileHeaderSearchModel from '@src/components/Headers/MobileHeaderSearchModel';

const HeaderCard = ({ product }: String | any) => {
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false)

    return (
        <>
            <div
                className="topbar-product-card overlay-hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden main">
                    {product.discount &&
                        <span className="new-label bg-danger text-white rounded-circle">
                            {product.discount}
                        </span>
                    }
                    <Image
                        src={isHovered ? product.hoverImageUrl : product.imageUrl}
                        alt="image"
                        className="img-fluid"
                    />
                    <Link href="#!" className="wishlistadd position-absolute">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>
                    <Link href="#!" className="compare_add position-absolute">
                        <i className="las la-sync text-white"></i>
                    </Link>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill fs-14">
                            <span>Quick View</span>
                            <i className="iccl iccl-eye text-white"></i>
                        </Link>
                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                        style={{ zIndex: "1", boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}>
                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: "36px", height: "36px" }}><i
                                className="iccl iccl-eye fw-semibold"></i></Link>
                        <button type="button"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: "36px", height: "36px" }} data-bs-toggle="modal"
                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i></button>
                    </div>
                </div>
                <div className="mt-4">
                    <h6 className="mb-1 fw-medium lh-base">
                        <Link href="/product-detail-layout-01" className="main_link_red">
                            {product.productName}
                        </Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        {product.originalPrice && <del>{product.originalPrice}</del>}
                        <span className={product.originalPrice ? "text-danger" : ""}>{product.price}</span>
                    </p>
                </div>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    )
}

const HeaderShoes = () => {

    const headerRef = useRef(null)
    const [show, setShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)

    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const [showw, setShoww] = useState<number | any>(null)
    const [searchShow, setSearchShow] = useState(false);

    const [loginShow, setLoginShow] = useState(false);

    const [shoppingShow, setShoppingShow] = useState(false);

    const handlesearchShow = () => setShow(true);
    const handleSearcClose = () => setShow(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop < lastScrollTop && scrollTop > 400) {
                setIsStickyActive(true);
            } else {
                setIsStickyActive(false);
            }

            setLastScrollTop(scrollTop);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollTop]);

    const handleClick = (id: any) => {
        if (showw === id) {
            setShoww(null)
        } else {
            setShoww(id)
        }
    }

    const handleClickOutside = (event: any) => {
        if (
            headerRef.current &&
            !event.target.closest('.shoes-header')
        ) {
            setShoww(null)

        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleHeader = () => {
        setHeaderShow(!headerShow)
    }

    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);
    const handleLoginClose = () => setLoginShow(false);

    const handleLoginShow = () => {
        setLoginShow(true);
        setHeaderShow(false);
    }
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    const handleHeaderClose = () => setHeaderShow(false)

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className='shoes-header' ref={headerRef}>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center px-lg-3 ${isStickyActive === true ? 'headerFixed' : ""}`}>
                    <div className="container-fluid">
                        <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>

                        <Link className="navbar-brand" href="/index">
                            <Image src={logo} alt="LogoImg" width="95" />
                        </Link>

                        <div className="collapse navbar-collapse mobile-menu-navbar" id="navbarSupportedContent">

                            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 shoes-header">
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link text-uppercase ${showw === 1 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(1)}>
                                        Demo
                                    </span>
                                    <div className={`dropdown-menu ${showw === 1 ? "show" : ""}`}>
                                        <Row>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="#!" className="dropdown-menu-title">Home Pages</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            Layout4HomePape1.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor}>{item.badge}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/home-default" className="dropdown-menu-title">Home
                                                        Pages</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            HomePage2.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor}>{item.badge}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/home-default" className="dropdown-menu-title">Header
                                                        Layouts</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            HeaderLayout.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor}>{item.badge}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="#!" className="dropdown-menu-title">FEATURES</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            Features.map((item: any, index: any) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor} style={item.badgeStyle}>{item.badge}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link text-uppercase position-relative ${showw === 2 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                        Shop <span className="badge bg-success-light">New</span>
                                    </span>
                                    <div className={`dropdown-menu p-3 ${showw === 2 ? "show" : ""}`}>
                                        <Row className="g-0">
                                            <Col lg={7}>
                                                <Row className="g-0">
                                                    <Col lg={6}>
                                                        <div className="dropdown-sub-column-item">
                                                            <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                            <ul className="sub-column-menu">
                                                                {
                                                                    ShopPage.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link className="text-muted" href={item.link}>{item.label}</Link>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                    <Col lg={6}>
                                                        <div className="dropdown-sub-column-item">
                                                            <Link href="/shop-filter-sidebar" className="dropdown-menu-title">FEATURES</Link>
                                                            <ul className="sub-column-menu">
                                                                {
                                                                    ShopFeatures.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}
                                                                                <span className={item.badgeColor}>{item.badge}</span></Link></li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={5} className='cat-section p-4 p-0'>
                                                <Link href="/shop-left-sidebar"
                                                    className="d-block position-relative cat_grid_item overflow-hidden "
                                                    style={{ height: "350px" }}>
                                                    <div className="h-100 w-100 cat-grid-img"
                                                        style={{ backgroundImage: `url(${cat.src})` }}>
                                                    </div>
                                                    <div className="cat-grid-button text-body">
                                                        <div className="cat_grid_item__title">Shoes</div>
                                                    </div>
                                                </Link>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link text-uppercase ${showw === 3 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
                                        Product
                                    </span>
                                    <div className={`dropdown-menu ${showw === 3 ? "show" : ""}`}>
                                        <Row className="pe-3">
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/product-detail-layout-01" className="dropdown-menu-title">PRODUCT LAYOUT</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            ProductLayout.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}>
                                                                        {item.label}<span className={item.badgeColor}>{item.badge}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/product-detail-layout-01" className="dropdown-menu-title">PRODUCT DETAIL</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            ProductDetail.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}
                                                                            <span className={item.badgeColor}>{item.badge}</span>
                                                                        </Link>
                                                                    </li>

                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/product-detail-layout-01" className="dropdown-menu-title">PRODUCT SWATCH</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            ProductSwatch.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link className="text-muted" href={item.link}>{item.label}</Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                            <Col lg={3}>
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/product-detail-layout-01" className="dropdown-menu-title">PRODUCT FEATURES</Link>
                                                    <ul className="sub-column-menu">
                                                        {
                                                            ProductFeatures.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link className="text-muted position-relative d-inline-flex" href={item.link} style={item.badgeStyle}>{item.lable}<span className={item.badgeColor2}>{item.badge2}</span></Link>
                                                                    </li>
                                                                )
                                                            })
                                                        }
                                                    </ul>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-3xl">
                                    <span className={`nav-link text-uppercase position-relative ${showw === 4 ? 'show' : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(4)}>
                                        Sale <span className="badge bg-danger-dark">Sale</span>
                                    </span>
                                    <div className={`dropdown-menu ${showw === 4 ? "show" : ""}`}>
                                        <Row>
                                            <Col lg={2}>
                                                <div className="dropdown-sub-column-item">
                                                    {sale.map((item: any, index: number) => {
                                                        return (
                                                            <Link key={index} href={item.link} className="dropdown-menu-title">{item.lable}</Link>
                                                        )
                                                    })}
                                                </div>
                                            </Col>
                                            <Col lg={10}>
                                                <Swiper
                                                    slidesPerView={1}
                                                    spaceBetween={30}
                                                    navigation={{
                                                        nextEl: ".swiper-button-next",
                                                        prevEl: ".swiper-button-prev",
                                                    }}
                                                    breakpoints={{
                                                        640: {
                                                            slidesPerView: 2,
                                                        },
                                                        768: {
                                                            slidesPerView: 3,
                                                        },
                                                        1024: {
                                                            slidesPerView: 4,
                                                        },
                                                    }}
                                                    modules={[Navigation]}
                                                    className='mySwiper'>
                                                    <div className='swiper-wrapper'>
                                                        {shoeSwiper.map((product: any, index: number) => (
                                                            <SwiperSlide key={index}>
                                                                <HeaderCard product={product} />
                                                            </SwiperSlide>
                                                        ))}
                                                    </div>
                                                    <div className="swiper-button-next"></div>
                                                    <div className="swiper-button-prev"></div>
                                                </Swiper>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <span className={`nav-link text-uppercase ${showw === 5 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(5)}>
                                        Portfolio
                                    </span>
                                    <ul className={`dropdown-menu dropdown-sub-column ${showw === 5 ? "show" : ""}`}>
                                        {
                                            Portfolio.map((item: any, index: number) => {
                                                return (
                                                    <li key={index}><Link className="text-muted" href={item.link}>{item.label}</Link></li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <span className={`nav-link text-uppercase ${showw === 6 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(6)}>
                                        Lookbook
                                    </span>
                                    <ul className={`dropdown-menu dropdown-sub-column ${showw === 6 ? 'show' : ""}`}>
                                        {Lookbook.map((item: any, index: number) => {
                                            return (
                                                <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </li>

                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <span className={`nav-link text-uppercase ${showw === 7 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
                                        Blog
                                    </span>
                                    <ul className={`dropdown-menu dropdown-sub-column ${showw === 7 ? 'show' : ""}`}>
                                        {Blog.map((item: any, index: any) => {
                                            return (
                                                <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                            )
                                        })}

                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div className="topbar-toolbar d-flex align-items-center gap-3 shoes-header">
                            <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handlesearchShow}>
                                <i className="iccl iccl-search fw-medium" style={{ transform: "rotate(90deg)" }}></i>
                            </Link>
                            <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                            <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                    </div >
                </nav >
            </div >

            <div className="backdrop-shadow d-none"></div>
            <MobileHeaderSearchModel show={show} handleClose={handleSearcClose} />
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />

        </React.Fragment>
    )
}

export default HeaderShoes