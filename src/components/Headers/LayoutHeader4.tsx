"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LoginModal from '@src/components/Headers/LoginModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import MainModel from '@src/commonsections/MainModel';
import Image from 'next/image'
import Link from 'next/link'
import { Features, HeaderLayout, HomePage2, ShopPage, Layout4HomePape1, ShopFeatures, ShopImage, ProductLayout, ProductDetail, ProductSwatch, ProductFeatures, Portfolio, Lookbook, Blog, sale, salesSwiper } from '@src/common/Header/header'
import MobileHeader from '@src/components/Headers/MobileHeader';
import MobileHeaderSearchModel from '@src/components/Headers/MobileHeaderSearchModel';

import logo from '@assets/images/svg/kalles.svg'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const HeaderCard = ({ product }: String | any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    return (
        <>
            <div className="topbar-product-card pb-3">
                <div className="position-relative">
                    {product.label && (
                        <span className={`new-label text-white rounded-circle ${product.labelClass}`}>
                            {product.label}
                        </span>
                    )}

                    {
                        product.hoverImageUrl ?
                            <Image
                                src={isHovered ? product.hoverImageUrl : imageUrl}
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

                    <Link href="#" className="wishlistadd position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o"></i>
                    </Link>
                    <div className="product-button d-flex flex-column gap-2">
                        <Link href="#!" className="btn rounded-pill fs-14">
                            <span>Quick View</span> <i className="iccl iccl-eye"></i>
                        </Link>
                        <Link href="#!" className="btn rounded-pill fs-14">
                            <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                        </Link>
                    </div>
                    <p className="product-size mb-0 text-center text-white fw-medium">
                        {product.size}
                    </p>
                </div>
                <div className="mt-3">
                    <h6 className="mb-1">
                        <Link href="#!" className="product-title">{product.title}</Link>
                    </h6>
                    {
                        product.del ?
                            <p className="mb-0 fs-14 text-muted">
                                <del>{product.del}</del>
                                <span className="text-danger"> {product.price}</span>
                            </p>
                            :
                            <p className="mb-0 fs-14 text-muted"> {product.price}</p>
                    }

                    {product.colors ?
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {product.colors && product.colors.map((color: any, index: number) => (
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

                            {product.color && product.color.map((color: any, index: number) => {
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

        </>
    )
}


const LayoutHeader4 = () => {
    // const [thumbsSwiper, sethumbsSwiper] = useState<any>(null)
    const headerRef = useRef(null)
    const [show, setShow] = useState(false);
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [showw, setShoww] = useState<number | any>(null)
    const [headerShow, setHeaderShow] = useState(false)
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
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className='demo' ref={headerRef}>
                <div className="h__top d-flex align-items-center">
                    <div className="container-fluid">
                        <div className="row py-2">
                            <div className="col-md-6 col-lg-4">
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <p className="mb-0"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i> +01 23456789</p>
                                    <p className="mb-0 ms-2"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 header-text text-center fs-12 py-1 py-md-0">
                                Summer sale discount off <span className="cr">50%</span>! <a href="shop.html" className="text-reset">Shop
                                    Now</a>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? 'headerFixed' : ""}`}>
                    <div className="container-fluid">
                        <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>

                        <Link className="navbar-brand nav-link me-0 d-lg-none" href="/index">
                            <Image src={logo} alt="LogoImg" width="95" />
                        </Link>
                        <div className="topbar-toolbar d-flex align-items-center gap-3 d-lg-none">
                            <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal">
                                <i className="iccl iccl-search"></i>
                            </Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas"><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <div className="w-100">
                                <div className="d-none d-lg-flex justify-content-between align-items-center py-2 border-bottom">
                                    <div className="nt-social">
                                        <Link href="#" className="facebook text-black fs-14 mx-1">
                                            <i className="facl facl-facebook"></i>
                                        </Link>
                                        <Link href="#" className="twitter text-black fs-14 mx-1">&nbsp;
                                            <i className="facl facl-twitter"></i>
                                        </Link>
                                        <Link href="#" className="instagram text-black fs-14 mx-1">&nbsp;
                                            <i className="facl facl-instagram"></i>
                                        </Link>
                                        <Link href="#" className="linkedin text-black fs-14 mx-1">&nbsp;
                                            <i className="facl facl-linkedin"></i>
                                        </Link>
                                        <Link href="#" className="pinterest text-black fs-14 mx-1">&nbsp;
                                            <i className="facl facl-pinterest"></i>
                                        </Link>
                                    </div>
                                    <Link className="navbar-brand nav-link me-0" href="#"><Image src={logo} alt="LogoImg" width="95" /></Link>
                                    <div className="topbar-toolbar d-flex align-items-center gap-3">
                                        <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                            <i className="iccl iccl-search"></i>
                                        </Link>
                                        <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                                        <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                        <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                    </div>
                                </div>
                                <div className="d-none d-lg-block mx-auto w-100">
                                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0 justify-content-center">
                                        <li className="nav-item dropdown dropdown-mega-xxl">
                                            <Link className={`nav-link ${showw === 1 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(1)}>
                                                Demo
                                            </Link>
                                            <div className={`dropdown-menu ${showw === 1 ? "show" : ""}`}>
                                                <Row className="row">
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
                                            <Link className={`nav-link position-relative ${showw === 2 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(2)}>
                                                Shop <span className="badge bg-teal fw-normal">New</span>
                                            </Link>
                                            <div className={`dropdown-menu p-3 ${showw === 2 ? "show" : ""}`}>
                                                <Row className="g-0">
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
                                                    <Col lg={7}>
                                                        <Row className="p-4">
                                                            {
                                                                ShopImage.map((item: any, index: number) => {
                                                                    return (
                                                                        <Col lg={6} className="cat-section p-0" key={index}>
                                                                            <Link href={item.link} className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${item.img.src})` }}></div>
                                                                                <div className="cat-grid-button text-body">
                                                                                    <div className="cat_grid_item__title">{item.label}</div>
                                                                                </div>
                                                                            </Link>
                                                                        </Col>
                                                                    )
                                                                })
                                                            }
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </li>

                                        <li className="nav-item dropdown dropdown-mega-xxl">
                                            <Link className={`nav-link ${showw === 3 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(3)}>
                                                Product
                                            </Link>
                                            <div className={`dropdown-menu ${showw === 3 ? "show" : ""}`}>
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
                                            <Link className={`nav-link position-relative text-danger ${showw === 4 ? 'show' : ""}`} href='#' data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(4)}>
                                                Sale <span className="badge bg-warning fw-normal">Sale</span>
                                            </Link>

                                        </li>


                                        <li className="nav-item dropdown dropdown-mega-lg">
                                            <Link className={`nav-link ${showw === 5 ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(5)}>
                                                Portfolio
                                            </Link>
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
                                            <Link className={`nav-link ${showw === 6 ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(6)}>
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
                                            <Link className={`nav-link ${showw === 7 ? "show" : ""}`} href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(7)}>
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
                            </div>
                        </div>

                    </div >
                </nav >
            </div >

            <div className="backdrop-shadow d-none"></div>
            {/* <SearchModal show={searchShow} handleClose={handleClose} /> */}
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
            <MobileHeaderSearchModel show={show} handleClose={handleClose} />
        </React.Fragment >
    )
}

export default LayoutHeader4