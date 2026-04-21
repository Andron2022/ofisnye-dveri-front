"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import LoginModal from '@src/components/Headers/LoginModal';
import SearchModal from '@src/components/Headers/SearchModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import MainModel from '@src/commonsections/MainModel';
import shop1 from '@assets/images/home-jewelry/mega-shop-01.jpg'
import shop2 from '@assets/images/home-jewelry/mega-shop-02.jpg'
import Image from 'next/image'
import logo from '@assets/images/svg/kalles.svg'
import Link from 'next/link'
import MobileHeader from '@src/components/Headers/MobileHeader';
import { ProductLayout } from '@src/common/Header/headershoes'
import { Features, HeaderLayout, HomePage1, HomePage2, layout2ShopPage, Layout2ProductDetail, Layout2ShopFeatures, ProductSwatch, ProductFeatures, Lookbook, Blog, jewelryHeaderSwiper } from '@src/common/Header/header'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";


const HeaderCard = ({ product }: String | any) => {
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div
                className="topbar-product-card overlay-hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden main">
                    {
                        product.hoverImageUrl ?
                            <Image
                                src={isHovered ? product.hoverImageUrl : imageUrl}
                                alt="image"
                                className="img-fluid"
                            /> :
                            <Image src={imageUrl} alt="ImageUrlImg" />
                    }

                    <Link
                        href="#"
                        className="wishlistadd position-absolute text-white dark"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Add to Wishlist"
                    >
                        <i className="facl facl-heart-o"></i>
                    </Link>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn bg-orange text-white fs-14">
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn bg-orange text-white fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"

                        >
                            <span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-orange m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                            <i className="iccl iccl-eye fw-semibold text-white"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn responsive-cart fs-14 p-2"
                            style={{ width: '36px', height: '36px' }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                        >
                            <i className="iccl iccl-cart fw-semibold text-white"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3 text-center">
                    <h6 className="mb-1 font-montserrat fw-medium fs-14">
                        <Link href="/product-detail-layout-01" className="main_link_orange">
                            {product.title}
                        </Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        {product.del && <del>{product.del}</del>}
                        <span>{product.price}</span>
                    </p>
                    {product.color && (
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center justify-content-center">
                            {product.color.map((colorItem: any, index: any) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(colorItem.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    className={`d-inline-block ${colorItem.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}


const HomeJewelryHeader = () => {

    const headerRef = useRef(null)
    const [showw, setShoww] = useState<number | any>(null)
    const [searchShow, setSearchShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [loginShow, setLoginShow] = useState(false);
    const [shoppingShow, setShoppingShow] = useState(false);
    const [showMenuScroll, setShowMenuScroll] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const handleScroll = () => {
        setShowMenuScroll(window.pageYOffset > 0);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className="header-lingeries demo" ref={headerRef}>
                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${showMenuScroll ? 'bg-body shadow-sm' : ''}`}>
                    <div className="container-fluid w-100 d-inline-block">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-lg-5 col-auto">
                                <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                        <rect width="30" height="1.5"></rect>
                                        <rect y="7" width="20" height="1.5"></rect>
                                        <rect y="14" width="30" height="1.5"></rect>
                                    </svg>
                                </Link>
                                <div className="collapse navbar-collapse flex-grow-1" id="navbarSupportedContent">
                                    <div className="d-none d-lg-block">
                                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fs-16 fw-medium ${showw === 1 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(1)} >
                                                    Demo
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${showw === 1 ? "show" : ""}`}>
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
                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fs-16 position-relative fw-medium ${showw === 2 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(2)}>
                                                    Shop
                                                </span>
                                                <div className={`dropdown-menu ms-0 p-3 ${showw === 2 ? "show" : ""}`}>
                                                    <Row className="g-0">
                                                        <Col lg={5}>
                                                            <Row className="p-4">
                                                                <Col lg={6}>
                                                                    <div className="dropdown-sub-column-item">
                                                                        <Link href="/shop-filter-sidebar" className="dropdown-menu-title">SHOP PAGES</Link>
                                                                        <ul className="sub-column-menu">
                                                                            {
                                                                                layout2ShopPage.slice(0, 9).map((item: any, index: number) => {
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
                                                        <div className="col-lg-7">
                                                            <div className="row p-4">
                                                                <div className="col-lg-6 p-0">
                                                                    <div className="dropdown-sub-column-item position-relative cat_grid_item overflow-hidden h-100">
                                                                        <Image src={shop1} alt="Shop1Img" className="img-fluid" />
                                                                        <Link href="/shop-left-sidebar" className="btn bg-white px-5 fw-medium mb-4 position-absolute bottom-0 start-50 translate-middle-x">
                                                                            Braceletes
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 p-0 ps-4">
                                                                    <div className="dropdown-sub-column-item position-relative cat_grid_item overflow-hidden h-100">
                                                                        <Image src={shop2} alt="Shop2Img" className="img-fluid" />
                                                                        <Link href="/shop-left-sidebar" className="btn bg-white px-5 fw-medium mb-4 position-absolute bottom-0 start-50 translate-middle-x">
                                                                            Jewellery
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fs-16 fw-medium ${showw === 3 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(3)}>
                                                    Product
                                                </span>
                                                <div className={`dropdown-menu ms-0  ${showw === 3 ? "show" : ""}`}>
                                                    <Row>
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

                                            <li className="nav-item dropdown dropdown-mega-3xl">
                                                <span className={`nav-link fs-16 fw-medium position-relative ${showw === 5 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(5)}>
                                                    Sale
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${showw === 5 ? "show" : ""}`}>
                                                    <div className="row">
                                                        <div className="col-lg-2">
                                                            <div className="dropdown-sub-column-item">
                                                                <Link href="#!" className="dropdown-menu-title">Categories</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Gift ideas</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Women</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Home Decor</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Kids & Babies</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Kniting & Sewing</Link>
                                                                <Link href="#!" className="dropdown-menu-title">Kitchen</Link>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-10">
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
                                                                    {jewelryHeaderSwiper.map((product: any) => (
                                                                        <SwiperSlide key={product.id}>
                                                                            <HeaderCard product={product} />
                                                                        </SwiperSlide>
                                                                    ))}
                                                                </div>
                                                                <div className="swiper-button-next"></div>
                                                                <div className="swiper-button-prev"></div>
                                                            </Swiper>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>



                                            <li className="nav-item dropdown dropdown-mega-lg">
                                                <span className={`nav-link fs-16 fw-medium ${showw === 6 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(6)}>
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
                                                <span className={`nav-link  fs-16 fw-medium ${showw === 7 ? "show" : ""}`} role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(7)}>
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
                                </div>
                            </div>
                            <div className="col-lg-2 col-auto">
                                <div className="text-center">
                                    <a className="navbar-brand mx-auto" href="index.html"><Image src={logo} alt="LogoImg" width="95" /></a>
                                </div>
                            </div>
                            <div className="col-lg-5 col-auto">
                                <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end">
                                    <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="las la-search fs-28"></i></Link>
                                    <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas"><i className="las la-user fs-28" onClick={handleLoginShow}></i></Link>
                                    <Link href="#!"><i className="lar la-heart fs-28"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                    <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas"><i className="las la-shopping-cart fs-28" onClick={handleShoppingShow}></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <SearchModal show={searchShow} handleClose={handleClose} />
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
        </React.Fragment >
    )
}
export default HomeJewelryHeader