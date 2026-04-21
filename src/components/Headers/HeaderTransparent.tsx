"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import Image from 'next/image'
import Link from 'next/link'
import MobileHeader from '@src/components/Headers/MobileHeader';
import MobileHeaderSearchModel from '@src/components/Headers/MobileHeaderSearchModel';
import { HeaderLayout, HomePage1, HomePage2, layout2ShopPage, Layout2ProductDetail, Layout2ShopFeatures, ProductLayout, ProductSwatch, ProductFeatures,Lookbook, Blog } from '@src/common/Header/header'

import logo from '@assets/images/home-decor/head-logo-white.png'
import headerLogo from '@assets/images/home-decor/head-logo.png'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const HeaderTransparet = () => {
    const headerRef = useRef(null)
    const [show, setShow] = useState(false);
    const [showw, setShoww] = useState<number | any>(null)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [showMenuScroll, setShowMenuScroll] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [loginShow, setLoginShow] = useState(false);

    const handleMenuClick = (id: any) => {
        if (showw === id) {
            setShoww(null)
        } else {
            setShoww(id)
        }
    }

    const handleClickOutside = (event: any) => {
        if (
            headerRef.current &&
            !event.target.closest('.demo')
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
    const handleScroll = () => {
        setShowMenuScroll(window.pageYOffset > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    const handleHeader = () => {
        setHeaderShow(true)
        setLoginShow(false)
    }
    const handleHeaderClose = () => setHeaderShow(false)

    const handleLoginClose = () => setLoginShow(false);

    const handleLoginShow = () => {
        setLoginShow(true);
        setHeaderShow(false);
    }
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <React.Fragment>
            <div id="kalles-section-header_top" className="header-decor demo" ref={headerRef}>
                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center px-lg-3 ${showMenuScroll ? 'bg-body navbar-scroll shadow-sm' : ''}`}>                <div className="container-fluid w-100 d-inline-block">
                    <div className="d-flex justify-content-between align-items-center">


                        <div>
                            <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="header-toggle" width="30" height="16" viewBox="0 0 30 16">
                                    <rect width="30" height="1.5"></rect>
                                    <rect y="7" width="20" height="1.5"></rect>
                                    <rect y="14" width="30" height="1.5"></rect>
                                </svg>
                            </Link>
                            <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
                                <div className="d-none d-lg-block mx-auto">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item dropdown dropdown-mega-xxl">
                                            <Link className={`nav-link fs-16 fw-medium ${showw === 1 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(1)} >
                                                Demo
                                            </Link>
                                            <div className={`dropdown-menu ms-0 ${showw === 1 ? "show" : ""}`} style={{ width: "720px" }}>
                                                <Row>
                                                    <Col lg={4}>
                                                        <div className="dropdown-sub-column-item">
                                                            <Link href="#!" className="dropdown-menu-title">Home Pages</Link>
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
                                            <Link className={`nav-link fs-16 position-relative fw-medium ${showw === 2 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(2)}>
                                                Shop
                                            </Link>
                                            <div className={`dropdown-menu ms-0 p-3 ${showw === 2 ? "show" : ""}`}>
                                                <Row className="g-0">
                                                    <Col lg={4}>
                                                        <Row className="g-0">
                                                            <Col lg={6}>
                                                                <div className="dropdown-sub-column-item">
                                                                    <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                                    <ul className="sub-column-menu">
                                                                        {
                                                                            layout2ShopPage.map((item: any, index: number) => {
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
                                                                            Layout2ShopFeatures.map((item: any, index: number) => {
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
                                                   
                                                </Row>
                                            </div>
                                        </li>
                                        <li className="nav-item dropdown dropdown-mega-xxl">
                                            <Link className={`nav-link fs-16 fw-medium ${showw === 3 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(3)}>
                                                Product
                                            </Link>
                                            <div className={`dropdown-menu ms-0 pe-3 ${showw === 3 ? "show" : ""}`}>
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
                                                            <Link href="/roduct-detail-layout-01" className="dropdown-menu-title">PRODUCT DETAIL</Link>
                                                            <ul className="sub-column-menu">
                                                                {
                                                                    Layout2ProductDetail.map((item: any, index: number) => {
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
                                                                                <Link className="text-muted position-relative d-inline-flex" href={item.link} style={item.badgeStyle}>{item.lable}<span className={item.badgeColor2} style={item.badstyle2}>{item.badge2}</span></Link>
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
                                            <Link className={`nav-link fs-16 fw-medium ${showw === 6 ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(6)}>
                                                Lookbook
                                            </Link>
                                            <ul className={`dropdown-menu dropdown-sub-column ${showw === 6 ? 'show' : ""}`}>
                                                {Lookbook.map((item: any, index: number) => {
                                                    return (
                                                        <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                    )
                                                })}
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown dropdown-mega-lg">
                                            <Link className={`nav-link  fs-16 fw-medium ${showw === 7 ? "show" : ""}`} href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(7)}>
                                                Blog
                                            </Link>
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
                                <MobileHeader headerShow={headerShow}
                                    handleHeaderClose={handleHeaderClose}
                                    loginShow={loginShow}
                                    handleLoginClose={handleLoginClose}
                                    handleLoginShow={handleLoginShow} />
                            </div>
                        </div>
                        <div>
                            <div className="text-center">
                                <Link className="navbar-brand mx-auto" href="/">
                                    <Image src={logo} alt="LogoImg" width="95" className="logo-light" />
                                    <Image src={headerLogo} alt="HeaderLogoImg" width="95" className="logo-dark" />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end ">
                                <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                    <i className="iccl iccl-search" style={{ transform: "rotate(90deg)" }}></i>
                                </Link>
                                <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                                <Link className="d-md-block d-none" href="#!"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                            </div>
                        </div>

                    </div>
                </div>
                </nav>
            </div>
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
            <MobileHeaderSearchModel show={show} handleClose={handleClose} />
        </React.Fragment>
    )
}
export default HeaderTransparet