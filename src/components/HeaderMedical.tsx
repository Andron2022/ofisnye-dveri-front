"use client";
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import { Blog, Features, HeaderLayout, HomePage1, HomePage2, Lookbook, Portfolio, ProductLayout, ProductSwatch, sale, salesSwiper } from '@src/common/Header/header'
import { ProductDetail2, ProductFeatures2 } from '@src/common/Header/header2'
import { Sale3, salesSwiper3, ShopPage3 } from '@src/common/Header/headermedical'
import promot1 from "@assets/images/home-medical/megamenu1-promotion-01.png"
import promot2 from "@assets/images/home-medical/megamenu1-promotion-02.png"
import LoginModal from '@src/components/Headers/LoginModal'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'
import MobileHeader from '@src/components/Headers/MobileHeader'
import MainModel from '@src/commonsections/MainModel'

import AUD from '@assets/images/svg/aud.svg'
import CAD from '@assets/images/svg/cad.svg'
import DKK from '@assets/images/svg/dkk.svg'
import EUR from '@assets/images/svg/eur.svg'
import GBP from '@assets/images/svg/gbp.svg'
import HKD from '@assets/images/svg/hkd.svg'
import JPY from '@assets/images/svg/jpy.svg'
import NZD from '@assets/images/svg/nzd.svg'
import SGD from '@assets/images/svg/sgd.svg'
import USD from '@assets/images/svg/usd.svg'
import logo from "@assets/images/home-medical/kalles-medical-170.png"
import SearchModal from './Headers/SearchModal'

const HeaderMedical = () => {

    const headerRef = useRef(null)
    const [headerShow, setHeaderShow] = useState(false)
    const [show, setShow] = useState<number | any>(null)
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [loginShow, setLoginShow] = useState(false);
    const [shoppingShow, setShoppingShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

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
        if (show === id) {
            setShow(null)
        } else {
            setShow(id)
        }
    }

    const handleClickOutside = (event: any) => {
        if (
            headerRef.current &&
            !event.target.closest('.demo')
        ) {
            setShow(null)

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
    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className="medical-navbar demo" ref={headerRef}>

                <div className="h__top d-flex align-items-center border-bottom">
                    <div className="container">
                        <div className="row align-items-center align-items-md-start">
                            <div className="col-xl-4 col-lg-5 col-12 col-md-12">
                                <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-3">
                                    <p className="mb-0"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i> +01 23456789</p>
                                    <p className="mb-0"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-5 col-12 col-md-12 d-none d-lg-block">
                                <div className="header-text text-center fs-12">
                                    <span className="badge d-inline-block fs-12 fw-normal">COVID-19 UPDATE</span> We are open with
                                    limited hours and staff.
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-2 col-12 col-md-12 d-none d-lg-block">
                                <div className="dropdown text-end position-relative">
                                    <Link href="#!" className={`fs-12 text-reset currency-button  ${show === 8 ? "show" : ""}`} type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(8)}>
                                        <Image src={USD} alt="USDImg" height="12" width="16" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                    </Link>
                                    <ul className={`dropdown-menu p-3 dropdown-currency ${show === 8 ? 'show drop' : ''}`}>
                                        <li><a href="#!"><Image src={AUD} alt="AUDImg" height="12" width="12" className="me-2" />
                                            AUD</a></li>
                                        <li><a href="#!"><Image src={CAD} alt="CADImg" height="12" width="12" className="me-2" />
                                            CAD</a></li>
                                        <li><a href="#!"><Image src={DKK} alt="DKKImg" height="12" width="12" className="me-2" />
                                            DKK</a></li>
                                        <li><a href="#!"><Image src={EUR} alt="EURImg" height="12" width="12" className="me-2" />
                                            EUR</a></li>
                                        <li><a href="#!"><Image src={GBP} alt="GBPImg" height="12" width="12" className="me-2" />
                                            GBP</a></li>
                                        <li><a href="#!"><Image src={HKD} alt="HKDImg" height="12" width="12" className="me-2" />
                                            HKD</a></li>
                                        <li><a href="#!"><Image src={JPY} alt="JPYImg" height="12" width="12" className="me-2" />
                                            JPY</a></li>
                                        <li><a href="#!"><Image src={NZD} alt="NZDImg" height="12" width="12" className="me-2" />
                                            NZD</a></li>
                                        <li><a href="#!"><Image src={SGD} alt="SGDImg" height="12" width="12" className="me-2" />
                                            SGD</a></li>
                                        <li><a href="#!"><Image src={USD} alt="USDImg" height="12" width="12" className="me-2" />
                                            USD</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? 'headerFixed' : ""}`}>
                    <Container>
                        <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>

                        <Link className="navbar-brand" href="/index">
                            <Image src={logo} alt="LogoImg" width="130" />
                        </Link>

                        <div className="collapse navbar-collapse mobile-menu-navbar" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto">

                                {/* demo */}
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link ${show === 1 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(1)}>
                                        Demo
                                    </span>
                                    <div className={`dropdown-menu ${show === 1 ? "show" : ""}`}>
                                        <Row>
                                            <Col lg={3}>
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

                                {/* shop */}
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link position-relative ${show === 2 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                        Shop <span className="badge bg-teal fw-normal">New</span>
                                    </span>
                                    <div className={`dropdown-menu p-3 ${show === 2 ? "show" : ""}`}>
                                        <Row className="g-0">
                                            <Col lg={5}>
                                                <Row className="g-0">
                                                    <Col lg={6}>
                                                        <div className="dropdown-sub-column-item">
                                                            <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                            <ul className="sub-column-menu">
                                                                {
                                                                    ShopPage3.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link className="text-muted" href="#!">{item.label}</Link>
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
                                                                    ShopPage3.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link className="text-muted" href="#!">{item.label}</Link>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col lg={7}>
                                                <Row className="p-4">
                                                    <div className="col-lg-6 cat-section p-0">
                                                        <Link href="/home-medical" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${promot1.src})` }}></div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-lg-6 cat-section ps-4 p-0">
                                                        <Link href="/home-medical" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                            <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${promot2.src})` }}></div>
                                                        </Link>
                                                    </div>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>

                                {/* product */}
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <span className={`nav-link ${show === 3 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
                                        Product
                                    </span>
                                    <div className={`dropdown-menu ${show === 3 ? "show" : ""}`}>
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
                                                            ProductDetail2.map((item: any, index: number) => {
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
                                                            ProductFeatures2.map((item: any, index: number) => {
                                                                return (
                                                                    <li key={index}>
                                                                        <Link className="text-muted position-relative d-inline-flex" href={item.link} style={item.badgeStyle}>{item.lable}<span className={item.badgeColor}>{item.badge}</span></Link>
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
                                    <span className={`nav-link position-relative text-danger ${show === 4 ? 'show' : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(4)}>
                                        Sale <span className="badge bg-warning fw-normal">Sale</span>
                                    </span>
                                    <div className={`dropdown-menu ${show === 4 ? "show" : ""}`}>
                                        <Row>
                                            <Col lg={2}>
                                                <div className="dropdown-sub-column-item">
                                                    {Sale3.map((item: any, index: number) => {
                                                        return (
                                                            <Link key={index} href="#!" className="dropdown-menu-title">{item.label}</Link>
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
                                                        {salesSwiper3.map((product: any, idx: number) => (
                                                            <SwiperSlide key={idx}>
                                                                <div className="img-zoom">
                                                                    <Link href="/shop-left-sidebar" className="overflow-hidden d-inline-block">
                                                                        <Image src={product.image} alt="ProductImg" className="img-fluid" />
                                                                    </Link>
                                                                    <div className="p-10 text-center">
                                                                        <h5 className="fw-medium mb-2"><Link href="/shop-left-sidebar" className="text-reset">{product.title}</Link></h5>
                                                                        <p className="mb-0">{product.products} Products</p>
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        ))}
                                                        <div className="swiper-button-next"></div>
                                                        <div className="swiper-button-prev"></div>
                                                    </div>
                                                </Swiper>
                                            </Col>
                                        </Row>
                                    </div>
                                </li>


                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <span className={`nav-link ${show === 5 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(5)}>
                                        Portfolio
                                    </span>
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 5 ? "show" : ""}`}>
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
                                    <Link className={`nav-link ${show === 6 ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(6)}>
                                        Lookbook
                                    </Link>
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 6 ? 'show' : ""}`}>
                                        {Lookbook.map((item: any, index: number) => {
                                            return (
                                                <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                            )
                                        })}
                                    </ul>
                                </li>
                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <span className={`nav-link ${show === 7 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
                                        Blog
                                    </span>
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 7 ? 'show' : ""}`}>
                                        {Blog.map((item: any, index: any) => {
                                            return (
                                                <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                            )
                                        })}

                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <div className="topbar-toolbar d-flex align-items-center gap-3">
                            <Link className="d-block d-xl-none" data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="iccl iccl-search"></i></Link>
                            <form className="search_header position-relative d-none d-xl-block" role="search">
                                <input className="form-control rounded-pill" autoComplete="off" type="text" name="q" placeholder="Search for products" />
                                <button className="btn btn-link rounded-pill text-body" type="submit">
                                    <i className="iccl iccl-search fw-bold"></i></button>
                            </form>
                            <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="las la-user fs-28"></i></Link>
                            <Link href="#!"><i className="lar la-heart fs-28"></i><span className="tcount bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                            <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="las la-shopping-cart fs-28"></i><span className="tcount bg-primary text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>

                    </Container>
                </nav>
            </div>

            <div className="backdrop-shadow d-none"></div>
            <SearchModal show={searchShow} handleClose={handleClose} />
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

export default HeaderMedical