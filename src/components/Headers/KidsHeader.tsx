"use client";
import React, { useState, useEffect, useRef } from "react";
import { country2 } from "@src/common/Header/mobileHeader";
import Image from "next/image";
import Link from "next/link";
import { HomePage1, HomePage2, HeaderLayout, Features, ProductLayout, ProductSwatch, ProductFeatures, LayoutHeaderDataCatogory, Lookbook, Blog, ShopPage2, ShopFeatures2, ProductDetail2 } from "@src/common/Header/headerkids";
import usd from '@assets/images/svg/usd.svg'
import { Col, Dropdown, Row } from "react-bootstrap";
import logo from '@assets/images/svg/kalles.svg'
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import LoginModal from "@src/components/Headers/LoginModal";
import MobileHeader from "@src/components/Headers/MobileHeader";
import cat1 from '@assets/images/home-kids/megamenu-cat-01.jpg'
import cat2 from '@assets/images/home-kids/megamenu-cat-02.jpg'
import SearchModal from "./SearchModal";

const KidsHeader = () => {

    const dropdownref = useRef(null)
    const [showw, setShoww] = useState<number | any>(null)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [loginShow, setLoginShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [searchShow, setSearchShow] = useState(false);

    const handleMenuClick = (id: any) => {
        if (showw === id) {
            setShoww(null)
        } else {
            setShoww(id)
        }
    }
    const handleClickOutSide = (event: any) => {
        if (dropdownref.current &&
            !event.target.closest('.demo')
        ) {
            setShoww(false)
        }
    }
    useEffect(() => {
        window.addEventListener('click', handleClickOutSide)
        return () => {
            window.removeEventListener('click', handleClickOutSide)
        }
    }, [])
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
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
    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

    return (
        <React.Fragment>
            <div id="kalles-section-header_top ">
                <div className="h__top text-white d-flex align-items-center bg-pink2">
                    <div className="container">
                        <Row className="align-items-center justify-content-center py-3 py-xl-0">
                            <Col md={5} lg={3} className="col-12">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <p className="mb-0"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i> +01 23456789</p>
                                    <p className="mb-0 ms-2"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com
                                    </p>
                                </div>
                            </Col>
                            <Col md={5} lg={6} className="col-12">
                                <div className="header-text text-center fs-12 py-1 py-lg-0">
                                    Summer sale discount off <span className="fw-bold">50% </span> <Link href="/shop" className="text-reset">Shop Now</Link>
                                </div>
                            </Col>
                            <Col md={2} lg={3} className="col-12">
                                <div className="dropdown text-md-end text-center position-relative">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="link" id="dropdown-currency" className="fs-12 text-reset currency-button p-0">
                                            <Image src={usd} alt="UsdImg" height="12" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="p-3 dropdown-currency">
                                            {
                                                country2.map((item, index) => (
                                                    <Dropdown.Item key={index} as={Link} href="#!">
                                                        <Image src={item.image} alt="ItemImg" height="12" className="me-1" />
                                                        {item.name}
                                                    </Dropdown.Item>
                                                ))
                                            }
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>

                <nav className="navbar navbar-expand-lg navbar-custom pt-4 pb-0 d-block align-items-center">
                    <div className="container">
                        <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>
                        <Link className="navbar-brand d-lg-none" href="#"><Image src={logo} alt="LogoImg" width="95" /></Link>
                        <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
                            <div className="d-none d-lg-block w-100">
                                <Row>
                                    <div className="col-3">
                                        <Link className="navbar-brand" href="#"><Image src={logo} alt="LogoImg" width="95" /></Link>
                                    </div>
                                    <div className="col-6 mb-lg-3">
                                        <form action="#" method="get" className="electrict-input" role="search">
                                            <div className="footer-subscribe position-relative electrict-input ps-2">
                                                <input type="text" name="email" placeholder="I'm shopping for..." className="ps-4 input-text input-search form-control w-100 rounded-pill" readOnly />
                                                <button type="submit" className="btn btn-pink2 position-absolute search-btn rounded-pill top-0 end-0">
                                                    <span>Search</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="mt-2 col-3">
                                        <div className="topbar-toolbar d-flex justify-content-end align-items-center gap-3">
                                            <Link className="main_link_primary" data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                                            <Link className="main_link_primary d-md-block d-none" href="#!">
                                                <i className="iccl iccl-heart"></i>
                                                <span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span>
                                            </Link>
                                            <Link className="main_link_primary" data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                        </div>
                                    </div>
                                </Row>
                            </div>

                        </div>
                        <div className="topbar-toolbar d-flex align-items-center gap-3 d-lg-none">
                            <Link className="main_link_primary" data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="iccl iccl-search"></i></Link>
                            <Link className="main_link_primary" data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                    </div>

                    <div className="bg-blue-dark text-white d-none d-lg-block demo" ref={dropdownref}>
                        <div className="container">

                            <div className="d-flex justify-content-between">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item dropdown dropdown-mega-lg">
                                        <Dropdown>
                                            <Dropdown.Toggle
                                                as="a"
                                                className="nav-link text-uppercase text-white d-flex align-items-center fw-medium bg-pink2"
                                                href="#"
                                                id="dropdown-shop-by-category"
                                                role="button"
                                                style={{ height: "50px" }}
                                            >
                                                <div className="nav-link text-uppercase text-white align-items-center fw-medium">
                                                    <i className="las la-bars mr__5 fs-18 me-1"></i> Shop by category
                                                </div>
                                            </Dropdown.Toggle>

                                            <Dropdown.Menu className="dropdown-sub-column p-2">
                                                {LayoutHeaderDataCatogory.map((item, index) => (
                                                    <Dropdown.Item as="li" key={index}>
                                                        <Link href="/home-lookbook" className="border-bottom px-0 py-2">
                                                            <i className={item.icon}></i> {item.label}
                                                        </Link>
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <Link className={`nav-link text-white ${showw === 1 ? 'show' : ''}`} style={{ height: "50px" }} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(1)}>
                                            Demo
                                        </Link>
                                        <div className={`dropdown-menu ${showw === 1 ? 'show' : ''}`}>
                                            <Row>
                                                <Col lg={3}>
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="#!" className="dropdown-menu-title">Home Pages</Link>
                                                        <ul className="sub-column-menu">
                                                            {
                                                                HomePage1.map((item: any, index: number) => {
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
                                                        <Link href="#" className="dropdown-menu-title">Home
                                                            Pages</Link>
                                                        <ul className="sub-column-menu">

                                                            {
                                                                HomePage2.map((item: any, index: number) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <Link className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}<span className={item.badgeColor}>{item.badge}</span></Link>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </Col>
                                                <Col lg={3}>
                                                    <div className="dropdown-sub-column-item">
                                                        <a href="/home-default" className="dropdown-menu-title">Header
                                                            Layouts</a>
                                                        <ul className="sub-column-menu">
                                                            {
                                                                HeaderLayout.map((item: any, index: number) => {
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
                                                        <a href="#!" className="dropdown-menu-title">FEATURES</a>
                                                        <ul className="sub-column-menu">

                                                            {
                                                                Features.map((item: any, index: number) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <Link className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}
                                                                                <span className={item.badgeColor} style={item.badgeStyle}>{item.badge}</span></Link>
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
                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <Link className={`nav-link position-relative text-white ${showw === 2 ? 'show' : ''}`} style={{ height: "50px" }} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(2)}>
                                            Shop
                                        </Link>
                                        <div className={`dropdown-menu p-3 ${showw === 2 ? 'show' : ''}`}>
                                            <Row className="g-0">
                                                <Col lg={5} >
                                                    <Row className="g-0">
                                                        <Col lg={6}>
                                                            <div className="dropdown-sub-column-item">
                                                                <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                                <ul className="sub-column-menu">

                                                                    {ShopPage2.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link className="text-muted" href={item.link}>{item.label}</Link>
                                                                            </li>
                                                                        )
                                                                    })}

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
                                                                                <li key={index}><a className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}
                                                                                    <span className={item.badgeColor}>{item.badge}</span></a></li>
                                                                            )
                                                                        })
                                                                    }

                                                                </ul>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col lg={7} className="p-4">
                                                    <Row className="g-0">
                                                        <Col lg={6} className="p-0">
                                                            <div className="dropdown-sub-column-item position-relative cat_grid_item overflow-hidden h-100">
                                                                <Image src={cat1} alt="Cat1Img" className="img-fluid" />
                                                                <Link href="/shop-left-sidebar" className="btn bg-white px-5 fw-medium mb-4 position-absolute bottom-0 start-50 translate-middle-x" style={{ whiteSpace: "nowrap" }}>
                                                                    Girls Fashion
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                        <Col lg={6} className="cat-section p-0">
                                                            <div className="dropdown-sub-column-item position-relative cat_grid_item overflow-hidden h-100">
                                                                <Image src={cat2} alt="Cat2Img" className="img-fluid" />
                                                                <Link href="/shop-left-sidebar" className="btn bg-white px-5 fw-medium mb-4 position-absolute bottom-0 start-50 translate-middle-x">
                                                                    Accessories
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <Link className={`nav-link text-white ${showw === 3 ? 'show' : ''}`} style={{ height: "50px" }} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(3)}>
                                            Product
                                        </Link>
                                        <div className={`dropdown-menu ${showw === 3 ? 'show' : ''}`}>
                                            <Row className="pe-3">
                                                <Col lg={3}>
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="/product-detail-layout-01" className="dropdown-menu-title">PRODUCT LAYOUT</Link>
                                                        <ul className="sub-column-menu">
                                                            {
                                                                ProductLayout.map((item: any, index: number) => {
                                                                    return (
                                                                        <li key={index}>
                                                                            <Link className="text-muted position-relative d-inline-flex" href={item.link}>
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
                                                                ProductDetail2.map((item: any, index: number) => {
                                                                    return (
                                                                        <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}>{item.label}
                                                                            <span className={item.badgeColor}>{item.badge}</span></Link></li>
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
                                                                            <Link className="text-muted position-relative d-inline-flex" href={item.link} style={item.badgeStyle}>{item.lable}
                                                                                <span className={item.badgeColor2} style={item.badstyle2}>{item.badge2}</span>
                                                                            </Link>
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
                                    <li className="nav-item dropdown dropdown-mega-lg nav-electric-item">
                                        <Link className={`nav-link text-white ${showw === 4 ? 'show' : ''}`} style={{ height: "50px" }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(4)}>
                                            Lookbook
                                        </Link>
                                        <ul className={`dropdown-menu dropdown-sub-column ${showw === 4 ? 'show' : ''}`}>
                                            {Lookbook.map((item: any, index: number) => {
                                                return (
                                                    <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                )
                                            })
                                            }

                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-lg nav-electric-item">
                                        <Link className={`nav-link text-white ${showw === 5 ? 'show' : ''}`} style={{ height: "50px" }} href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(5)}>
                                            Blog
                                        </Link>
                                        <ul className={`dropdown-menu dropdown-sub-column ${showw === 5 ? 'show' : ''}`}>
                                            {
                                                Blog.map((item: any, index: number) => {
                                                    return (
                                                        <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </li>
                                </ul>
                                <div className="d-flex align-items-xl-center justify-content-center justify-content-md-start gap-3">
                                    <Link href="mailto:Kalles@domain.com" className="mb-0 text-white fs-12"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> contact</Link>
                                    <Link href="mailto:Kalles@domain.com" className="mb-0 text-white fs-12"><i className="las la-clock "></i>
                                        08:00 - 17:00</Link>
                                    <Link href="tel:+01 23456789" className="mb-0 text-white fs-12"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i>
                                        +01 23456789</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </nav>

            </div>
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
            <SearchModal show={searchShow} handleClose={handleClose} />
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
        </React.Fragment>
    )
}
export default KidsHeader