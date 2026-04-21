"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import LoginModal from '@src/components/Headers/LoginModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import MainModel from '@src/commonsections/MainModel';
import Image from 'next/image'
import cat from "@assets/images/home-decor/mega-cat.jpg"
import logowhite from "@assets/images/home-decor/head-logo-white.png"
import logo from "@assets/images/home-decor/head-logo.png"
import Link from 'next/link'
import { ProductLayout, ProductDetail, ProductSwatch, ProductFeatures } from '@src/common/Header/headershoes'
import { HeaderLayout, HomePage1, HomePage2, Lookbook, Blog, } from '@src/common/Header/header'

import { ShopFeatures2, ShopPage2 } from '@src/common/Header/header2';
import { shopSwiper } from '@src/common/Header/headerdecor';
import ProductModal from '@src/commonsections/ProductModal';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import MobileHeader from '@src/components/Headers/MobileHeader';
import MobileHeaderSearchModel from '@src/components/Headers/MobileHeaderSearchModel';

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const SwiperCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="topbar-product-card px-3 pt-2" onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="position-relative overflow-hidden shadow rounded">
                    {product.label && (
                        <span className="new-label bg-danger text-white rounded-circle text-center">
                            {product.label}
                        </span>
                    )}
                    <Image
                        src={isHovered ? product.hoverImageUrl : product.imageUrl}
                        alt="image"
                        className="img-fluid"
                    />
                    <Link
                        href="#"
                        className="d-lg-none position-absolute"
                        style={{ zIndex: 1, top: '10px', left: '10px' }}
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
                            onClick={handleShow}
                            data-bs-toggle="modal"
                            className="btn rounded-pill bg-dark text-white fs-14"
                        >
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn rounded-pill bg-dark text-white fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
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
                            onClick={handleShow}
                            data-bs-toggle="modal"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: '36px', height: '36px' }}
                        >
                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: '36px', height: '36px' }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal" onClick={handleAddToCardModalShow}
                        >
                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h6 className="mb-1 text-capitalize fs-16">
                        <Link href="/product-detail-layout-01" className="main_link_teal">
                            {product.title}
                        </Link>
                    </h6>
                    <p className="mb-0 fs-16 text-muted">
                        {product.originalPrice && <del>{product.originalPrice}</del>}
                        <span className="text-danger"> {product.discountedPrice}</span>
                    </p>
                </div>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const HeaderDecor = () => {

    const headerRef = useRef(null)
    const [headerShow, setHeaderShow] = useState(false)
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [showMenuScroll, setShowMenuScroll] = useState(false);
    const [showw, setShoww] = useState<number | any>(null)
    const [show, setShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);

    const [shoppingShow, setShoppingShow] = useState(false);

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

    useEffect(() => {
        const handleScroll = () => {
            setShowMenuScroll(window.pageYOffset > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
            !event.target.closest('.header-decor')
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
        setHeaderShow(true)
        setLoginShow(false)
    }
    const handleLoginShow = () => {
        setLoginShow(true);
        setHeaderShow(false);
    }
    const handleLoginClose = () => setLoginShow(false);
    const handleHeaderClose = () => setHeaderShow(false)

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    const handleSearchShow = () => setShow(true);
    const handleSearchClose = () => setShow(false);
    return (
        <React.Fragment>
            <MainModel />

            <div id="kalles-section-header_top" className="header-decor" ref={headerRef}>
                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center px-lg-3 ${isStickyActive === true ? 'headerFixed' : ""} ${showMenuScroll === true ? "bg-body navbar-scroll shadow-sm" : ""}`}>
                    <div className="container-fluid w-100 d-inline-block">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                        <rect width="30" height="1.5"></rect>
                                        <rect y="7" width="20" height="1.5"></rect>
                                        <rect y="14" width="30" height="1.5"></rect>
                                    </svg>
                                </Link>

                                <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
                                    <div className="d-none d-lg-block mx-auto">
                                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fw-medium fs-16 ${showw === 1 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(1)}>
                                                    Demo
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${showw === 1 ? "show" : ""}`} style={{ width: "720px" }}>
                                                    <Row>
                                                        <Col lg={4}>
                                                            <div className="dropdown-sub-column-item">
                                                                <p className="dropdown-menu-title">Home Pages</p>
                                                                <ul className="sub-column-menu">
                                                                    {
                                                                        HomePage1.map((item: any, index: number) => {
                                                                            return (
                                                                                <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor}>{item.badge}</span></Link>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            </div>
                                                        </Col>
                                                        <Col lg={4}>
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
                                                        <Col lg={4}>
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

                                                    </Row>
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fw-medium fs-16 position-relative ${showw === 2 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                                    Shop
                                                </span>
                                                <div className={`dropdown-menu ms-0 p-3 ${showw === 2 ? "show" : ""}`}>
                                                    <Row className="g-0">
                                                        <Col lg={4}>
                                                            <Row className="g-0">
                                                                <Col lg={6}>
                                                                    <div className="dropdown-sub-column-item">
                                                                        <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                                        <ul className="sub-column-menu">
                                                                            {
                                                                                ShopPage2.map((item: any, index: number) => {
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
                                                                                ShopFeatures2.map((item: any, index: number) => {
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
                                                        <Col lg={8}>
                                                            <Row className="p-4">
                                                                <Col lg={6}>
                                                                    <Swiper
                                                                        slidesPerView={1}
                                                                        className='saleSwiper'>
                                                                        <div className='swiper-wrapper'>
                                                                            {shopSwiper.map((product, idx) => (
                                                                                <SwiperSlide key={idx}>
                                                                                    <SwiperCard key={idx} product={product} />
                                                                                </SwiperSlide>
                                                                            ))}
                                                                        </div>
                                                                    </Swiper>
                                                                </Col>
                                                                <Col lg={6} className='cat-section px-4 py-2'>
                                                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "280px" }}>
                                                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat.src})` }}></div>
                                                                        <div className="cat-grid-button text-body">
                                                                            <div className="cat_grid_item__title">Decor</div>
                                                                        </div>
                                                                    </Link>
                                                                </Col>
                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fw-medium fs-16 ${showw === 3 ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
                                                    Product
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${showw === 3 ? "show" : ""}`}>
                                                    <Row className="me-4">
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

                                            <li className="nav-item dropdown dropdown-mega-lg">
                                                <span className={`nav-link fw-medium fs-16 ${showw === 6 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(6)}>
                                                    Lookbook
                                                </span>
                                                <ul className={`dropdown-menu ms-0 dropdown-sub-column ${showw === 6 ? 'show' : ""}`}>
                                                    {Lookbook.map((item: any, index: number) => {
                                                        return (
                                                            <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                        )
                                                    })}
                                                </ul>
                                            </li>
                                            <li className="nav-item dropdown dropdown-mega-lg">
                                                <span className={`nav-link fw-medium fs-16 ${showw === 7 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
                                                    Blog
                                                </span>
                                                <ul className={`dropdown-menu ms-0 dropdown-sub-column ${showw === 7 ? 'show' : ""}`}>
                                                    {Blog.map((item: any, index: any) => {
                                                        return (
                                                            <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                        )
                                                    })}

                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="text-center">
                                    <Link className="navbar-brand mx-auto" href="/index">
                                        <Image src={logowhite} alt="LogowhiteImg" width="95" className="logo-light" />
                                        <Image src={logo} alt="LogoImg" width="95" className="logo-dark" />
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className="topbar-toolbar d-flex align-items-center gap-3">
                                    <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleSearchShow}><i className="iccl iccl-search" style={{ transform: "rotate(90deg)" }}></i></Link>
                                    <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                                    <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                    <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                </div>
                            </div>
                        </div>
                    </div >
                </nav >
            </div>

            <div className="backdrop-shadow d-none"></div>
            <MobileHeaderSearchModel show={show} handleClose={handleSearchClose} />
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

export default HeaderDecor