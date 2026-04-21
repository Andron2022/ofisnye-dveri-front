"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Dropdown, Row } from 'react-bootstrap'

import Image from 'next/image'
import Link from 'next/link'

import logo from "@assets/images/svg/kalles.svg"
import { Blog, HeaderLayout, Lookbook, Portfolio, ProductDetail, ProductFeatures, ProductLayout, ProductSwatch, ShopFeatures, ShopPage } from '@src/common/Header/header'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { featuresflower, homePage2, homePageflower, saleflower, slidesData } from '@src/common/Header/headerflower'

import banner1 from "@assets/images/home-flower/mega-banner-01.jpg"
import banner2 from "@assets/images/home-flower/mega-banner-02.jpg"
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import SearchModal from '@src/components/Headers/SearchModal'
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

const country = [
    {
        name: "AUD",
        image: AUD
    },
    {
        name: "CAD",
        image: CAD
    },
    {
        name: "DKK",
        image: DKK
    },
    {
        name: "EUR",
        image: EUR
    },
    {
        name: "GBP",
        image: GBP
    },
    {
        name: "HKD",
        image: HKD
    },
    {
        name: "JPY",
        image: JPY
    },
    {
        name: "NZD",
        image: NZD
    },
    {
        name: "SGD",
        image: SGD
    },
    {
        name: "USD",
        image: USD
    },
]

const ProductSlide = ({ slide }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(slide.imageUrl);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <div className="topbar-product-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                <div className="position-relative overflow-hidden">
                    {slide.discount && <span className="new-label bg-danger text-white rounded-circle">{slide.discount}</span>}
                    {slide.soldOutLabel && <span className="new-label bg-success text-white rounded-circle text-center">{slide.soldOutLabel}</span>}
                    {/* <Image src={isHovered ? slide.hoverImageUrl :imageUrl} alt="image" className="img-fluid" /> */}
                    {
                        slide.hoverImageUrl ?
                            <Image
                                src={isHovered ? slide.hoverImageUrl : imageUrl}
                                alt="image"
                                className="img-fluid"
                            />
                            :
                            <Image
                                src={imageUrl}
                                alt="ImageUrlImg"
                                className="img-fluid"
                            />
                    }
                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>
                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn rounded-pill bg-pink2 text-white fs-14">
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button type="button" className="btn bg-pink2 text-white rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" onClick={handleShow} data-bs-toggle="modal" className="btn bg-pink2 text-white responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }}>
                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                        </Link>
                        <button type="button" className="btn responsive-cart bg-pink2 rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <h6 className="mb-2 fw-normal"><Link href="/product-detail-layout-01" className="text-pink2">{slide.title}</Link></h6>
                    {slide.originalPrice ? (
                        <p className="mb-0 fs-14 text-muted">
                            <del>{slide.originalPrice}</del> <span className="text-danger">{slide.discountedPrice}</span>
                        </p>
                    ) : (
                        <p className="mb-0 fs-14 text-muted">
                            <span>{slide.price}</span>
                        </p>
                    )}
                    {/* <div className="product-color-list mt-2 gap-2 d-flex align-items-center">

                        {slide.colorVariants && slide.colorVariants.map((color: any, index: number) => {
                            return (
                                <Link
                                    href="#!"
                                    key={index}
                                    onMouseOver={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.img);
                                        setIsHovered(false);
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                />
                            )
                        })}
                    </div> */}
                    {slide.colors ?
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {slide.colors && slide.colors.map((color: any, index: number) => (
                                <Link
                                    key={index}
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                    }}
                                    style={{
                                        background: `url('${color.imageUrl.src}')`,
                                        backgroundSize: 'cover'
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                        :
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">

                            {slide.color && slide.color.map((color: any, index: number) => {
                                return (
                                    <Link
                                        href="#!"
                                        key={index}
                                        onMouseOver={(e) => {
                                            e.preventDefault();
                                            setImageUrl(color.imageUrl);
                                            setIsHovered(false);
                                        }}
                                        className={`d-inline-block ${color.color} rounded-circle`}
                                    />
                                )
                            })}
                        </div>
                    }
                </div>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment>
    );
};


const HeaderFlower = () => {

    const headerRef = useRef(null)
    const [headerShow, setHeaderShow] = useState(false)
    const [show, setShow] = useState<number | any>(null)
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
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
    const [searchShow, setSearchShow] = useState(false);
    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

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

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className="navbar-green demo" ref={headerRef}>
                <div className="h__top d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="row align-items-center justify-content-center py-3 py-xl-0">
                            <div className="col-md-5 col-lg-4 col-12 d-none d-md-block">
                                <div className="d-flex align-items-xl-center justify-content-center justify-content-md-start gap-3">
                                    <Link href="tel:+01 23456789" className="mb-0 text-muted"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i>
                                        +01 23456789</Link>
                                    <Link href="mailto:Kalles@domain.com" className="mb-0 text-muted"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com</Link>
                                </div>
                            </div>
                            <div className="col-md-5 col-lg-4 col-12">
                                <div className="header-text text-center fs-12 py-1 py-lg-0">
                                    Summer sale discount off <span className="cr">50%</span>! <Link href="/shop" className="text-reset">Shop Now</Link>
                                </div>
                            </div>

                            <div className="col-md-2 col-lg-4 col-12">
                                <Dropdown className="text-md-end text-center position-relative">
                                    <Dropdown.Toggle variant="link" className="fs-12 text-reset currency-button" id="dropdown-currency">
                                        <Image src={USD} alt="USDImg" height="12" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="p-3 dropdown-currency">
                                        {
                                            country.map((item: any, index: number) => {
                                                return (
                                                    <Dropdown.Item href="#!" key={index}>
                                                        <Image src={item.image} alt="ItemImg" height="12" className="me-1" /> {item.name}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? 'headerFixed' : ""}`}>
                    <Container fluid>
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
                            <div className="d-none d-lg-block mx-auto">
                                <ul className="navbar-nav me-auto">

                                    {/* demo */}
                                    <li className="nav-item dropdown dropdown-mega-xxl">
                                        <span className={`nav-link ${show === 1 ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(1)}>
                                            Demo
                                        </span>
                                        <div className={`dropdown-menu ${show === 1 ? "show" : ""}`}>
                                            <Row>
                                                <Col lg={3}>
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="#!" className="dropdown-menu-title">Home Pages</Link>
                                                        <ul className="sub-column-menu">
                                                            {
                                                                homePageflower.map((item: any, index: number) => {
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
                                                                homePage2.map((item: any, index: number) => {
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
                                                                featuresflower.map((item: any, index: any) => {
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
                                        <span className={`nav-link position-relative ${show === 2 ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                            Shop <span className="badge bg-green2 fw-normal">New</span>
                                        </span>
                                        <div className={`dropdown-menu p-3 ${show === 2 ? "show" : ""}`}>
                                            <Row>
                                                <Col lg={5}>
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
                                                <Col lg={7}>
                                                    <Row className="p-4">
                                                        <div className="col-lg-6 cat-section p-0">
                                                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner1.src})` }}></div>
                                                                <div className="cat-grid-button text-body">
                                                                    <div className="cat_grid_item__title">Celebrations</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="col-lg-6 cat-section ps-4 p-0">
                                                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner2.src})` }}></div>
                                                                <div className="cat-grid-button text-body">
                                                                    <div className="cat_grid_item__title">Home decor</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    </li>

                                    <li className="nav-item dropdown dropdown-mega-xxl">
                                        <span className={`nav-link ${show === 3 ? "show" : ""}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
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
                                        <span className={`nav-link position-relative text-danger ${show === 4 ? 'show' : ""}`} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(4)}>
                                            Sale <span className="badge bg-warning fw-normal">Sale</span>
                                        </span>
                                        <div className={`dropdown-menu ${show === 4 ? "show" : ""}`}>
                                            <Row>
                                                <Col lg={2}>
                                                    <div className="dropdown-sub-column-item">
                                                        {saleflower.map((item: any, index: number) => {
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
                                                            {slidesData.map((slide: any, index: any) => (
                                                                <SwiperSlide key={index}>
                                                                    <ProductSlide slide={slide} />
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
                                        <span className={`nav-link ${show === 5 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(5)}>
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
                                        <span className={`nav-link ${show === 6 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(6)}>
                                            Lookbook
                                        </span>
                                        <ul className={`dropdown-menu dropdown-sub-column ${show === 6 ? 'show' : ""}`}>
                                            {Lookbook.map((item: any, index: number) => {
                                                return (
                                                    <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-lg">
                                        <span className={`nav-link ${show === 7 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
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
                        </div>

                        <div className="topbar-toolbar d-flex align-items-center gap-3">
                            <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas"
                                onClick={handleShow}
                            ><i className="iccl iccl-search"></i></Link>
                            <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                            <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>


                    </Container>
                </nav>

                <div className="backdrop-shadow d-none"></div>
                <SearchModal show={searchShow} handleClose={handleClose} />
                <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
                <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

                <MobileHeader headerShow={headerShow}
                    handleHeaderClose={handleHeaderClose}
                    loginShow={loginShow}
                    handleLoginClose={handleLoginClose}
                    handleLoginShow={handleLoginShow} />


            </div>

        </React.Fragment >
    )
}

export default HeaderFlower