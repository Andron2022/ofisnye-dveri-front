"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Col, Dropdown, Row } from "react-bootstrap";
import banner from '@assets/images/home-classic/mega-banner-01.jpg'
import { ShopPage2, ShopFeatures2, ProductDetail2 } from '@src/common/Header/header2'
import { HomePage1, HomePage2, HeaderLayout, Features, ProductLayout, ProductSwatch, ProductFeatures, LayoutHeaderDataCatogory, Lookbook, Blog, ElectricVerticalSwiper, salesSwiper } from '@src/common/Header/header'
import { country2 } from '@src/common/Header/mobileHeader'
import { Navigation } from "swiper/modules";
import { shopSlider2 } from "@src/common/Header/header";
import SearchModal from "@src/components/Headers/SearchModal";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import MobileHeader from "@src/components/Headers/MobileHeader";
import Image from "next/image";
import Link from "next/link";

import logo from '@assets/images/svg/kalles.svg'
import usd from '@assets/images/svg/usd.svg'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="topbar-product-card overlay-hover"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="position-relative overflow-hidden shadow rounded main">
                <Image
                    src={isHovered ? product.OverUrl : product.imgUrl}
                    alt="image"
                    className="img-fluid"
                />
                <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                    <i className="facl facl-heart-o text-white"></i>
                </Link>
                <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" title="Add to Wishlist">
                    <i className="facl facl-heart-o text-white"></i>
                </Link>
                <div className="product-button d-none d-lg-flex flex-column gap-2">
                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14">
                        <span>Quick View</span> <i className="iccl iccl-eye"></i>
                    </Link>
                    <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal">
                        <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                    </button>
                </div>
                <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                    <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }}>
                        <i className="iccl iccl-eye fw-semibold"></i>
                    </Link>
                    <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal">
                        <i className="iccl iccl-cart fw-semibold"></i>
                    </button>
                </div>
            </div>
            <div className="mt-4 text-center">
                <h6 className="mb-1 text-capitalize fs-14 fw-medium">
                    <Link href={product.link} className="main_link_teal">{product.title}</Link>
                </h6>
                {product.del ? (
                    <p className="mb-0 fs-14 text-muted">
                        <del>{product.del}</del><span className="text-danger"> {product.price}</span>
                    </p>
                ) : (
                    <p className="mb-0 fs-14 text-muted">{product.price}</p>
                )}
            </div>
        </div>
    );
};



const LayoutHeader8 = () => {

    const headerRef = useRef(null)
    const [showw, setShoww] = useState<number | any>(null)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [headerShow, setHeaderShow] = useState(false)
    const [loginShow, setLoginShow] = useState(false);

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

    const handleClickOutSide = (event: any) => {
        if (headerRef.current &&
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


    const handleHeader = () => {
        setHeaderShow(true)
        setLoginShow(false)
    }
    const handleLoginShow = () => {
        setLoginShow(true);
        setHeaderShow(false);
    }
    const handleHeaderClose = () => setHeaderShow(false)

    const handleLoginClose = () => setLoginShow(false);


    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

    return (
        <React.Fragment>
            <div id="kalles-section-header_top" className="demo">
                <div className="h__top d-flex align-items-center">
                    <div className="container">
                        <Row className="align-items-center justify-content-center py-3 py-xl-0">
                            <Col md={5} lg={3} className="col-12">
                                <div className="nt-social text-center text-lg-start">
                                    <Link href="#" className="facebook cb ttip_nt tooltip_bottom_right text-black fs-16 me-3">
                                        <i className="facl facl-facebook"></i>
                                    </Link>
                                    <Link href="#" className="twitter cb ttip_nt tooltip_bottom_right text-black fs-16 me-3">&nbsp;
                                        <i className="facl facl-twitter"></i>
                                    </Link>
                                    <Link href="#" className="instagram cb ttip_nt tooltip_bottom_right text-black fs-16 me-3">&nbsp;
                                        <i className="facl facl-instagram"></i>
                                    </Link>
                                    <Link href="#" className="linkedin cb ttip_nt tooltip_bottom_right text-black fs-16 me-3">&nbsp;
                                        <i className="facl facl-linkedin"></i>
                                    </Link>
                                    <Link href="#" className="pinterest cb ttip_nt tooltip_bottom_right text-black fs-16 me-3">&nbsp;
                                        <i className="facl facl-pinterest"></i>
                                    </Link>
                                </div>
                            </Col>
                            <Col md={5} lg={6} className="col-12">
                                <div className="header-text text-center fs-12 py-1 py-lg-0">
                                    Summer sale discount off <span className="cr">20%</span>use code “SUMMER20”! <Link href="shop.html" className="text-reset"><span className="text-danger">Shop Now</span></Link>
                                </div>
                            </Col>
                            <Col md={2} lg={3} className="col-12">
                                <Dropdown className="text-center text-md-end position-relative">
                                    <Dropdown.Toggle variant="link" className="fs-12 text-reset currency-button p-0" id="currency-dropdown">
                                        <Image src={usd} alt="USD" height="12" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="p-3 dropdown-currency">
                                        {country2.map((item, index) => (
                                            <Dropdown.Item href="#!" key={index}>
                                                <Image src={item.image} alt={item.name} height="12" className="me-1" /> {item.name}
                                            </Dropdown.Item>
                                        ))}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </div>
                </div>

                <nav className={`navbar navbar-expand-lg navbar-custom pt-4 pb-0 d-block align-items-center demo ${isStickyActive === true ? 'headerFixed' : ""}`} ref={headerRef}>
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
                                <div className="row">
                                    <div className="col-3">
                                        <Link className="navbar-brand" href="/index"><Image src={logo} alt="LogoImg" width="95" /></Link>
                                    </div>
                                    <div className="col-6 mb-lg-3">
                                        <form action="#" method="get" className="electrict-input" role="search">
                                            <div className="footer-subscribe position-relative electrict-input">
                                                <select name="product_type" className="position-absolute top-0 left-0 categories text-muted">
                                                    <option value="*">All Categories</option>
                                                    <option value="Acessories">Acessories</option>
                                                    <option value="Bag">Bag</option>
                                                    <option value="Camera">Camera</option>
                                                    <option value="Decor">Decor</option>
                                                    <option value="Earphones">Earphones</option>
                                                    <option value="Electric">Electric</option>
                                                    <option value="Furniture">Furniture</option>
                                                    <option value="Headphone">Headphone</option>
                                                    <option value="Men">Men</option>
                                                    <option value="Shoes">Shoes</option>
                                                    <option value="Speaker">Speaker</option>
                                                    <option value="Watch">Watch</option>
                                                    <option value="Women">Women</option>
                                                </select>
                                                <div>
                                                    <input type="text" name="email" placeholder="I'm shopping for..." data-bs-toggle="dropdown"  className={`input-text input-search form-control w-100 rounded-pill dropdown-toggle ${showw === 7 ? 'show' : ""}`} autoComplete="off" required onClick={() => handleMenuClick(7)} />
                                                    <div className={`dropdown-menu start-0 end-0 overflow-x-hidden overflow-y-auto  ${showw === 7 ? 'show' : ""}`} style={{ maxHeight: "50vh", marginTop: "2px" }}>
                                                        {
                                                            shopSlider2.map((item: any, index: number) => {
                                                                return (
                                                                    <div key={index} className="d-flex flex-wrap align-items-center">
                                                                        <div className="flex-shrink-0">
                                                                            <Link href={item.link}>
                                                                                <Image src={item.imgUrl} data-src={item.imgUrl} height={80} width={80} className="img-fuild" alt="Ysamsung Camera" />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="flex-grow-1 ms-2">
                                                                            <Link className="product-title" href={item.link}>{item.title}</Link>
                                                                            <div>
                                                                                <del className="text-muted">{item.del}</del>
                                                                                <span className="text-danger">{item.price1}</span>
                                                                                <span className="text-muted">{item.price}</span>
                                                                                <span className={item.labelcolor}>{item.label}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                        <Link href="#" className="btn detail_link">View All(107)
                                                            <i className="facl facl-right"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-teal position-absolute search-btn rounded-pill top-0 end-0">
                                                    <span>Search</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-3">
                                        <div className="topbar-toolbar d-flex justify-content-end align-items-center gap-3">
                                            <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="iccl iccl-search"></i></Link>

                                            <Link className="d-md-block d-none" href="#!"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="topbar-toolbar d-flex align-items-center gap-3 d-lg-none">
                            <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="iccl iccl-search"></i></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                    </div>



                    <div className="bg-teal text-white d-none d-lg-block">
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <ul className="navbar-nav mb-2 mb-lg-0">
                                    <li className="nav-item dropdown dropdown-mega-lg">
                                        <Link className={`nav-link text-uppercase text-white d-flex align-items-center fw-medium ${showw === 1 ? 'show' : ''}`} style={{ backgroundColor: "#007e91", height: "50px" }} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(1)}>
                                            <i className="las la-bars mr__5 fs-18 me-1"></i> Shop by category
                                        </Link>
                                        <ul className={`dropdown-menu dropdown-sub-column p-2 ${showw === 1 ? 'show' : ''}`}>
                                            {
                                                LayoutHeaderDataCatogory.map((item: any, index: number) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link href="/home-lookbook" className="border-bottom px-0 py-2">
                                                                <i className={item.icon}></i>{item.label}
                                                            </Link>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </li>

                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <span className={`nav-link text-white ${showw === 2 ? 'show' : ""}`} style={{ height: "50px" }} data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(2)}>
                                            Demo
                                        </span>
                                        <div className={`dropdown-menu ${showw === 2 ? 'show' : ""}`}>
                                            <div className="row">
                                                <div className="col-lg-3">
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
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="/home-default" className="dropdown-menu-title">Home
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
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="/home-default" className="dropdown-menu-title">Header
                                                            Layouts</Link>
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
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="#!" className="dropdown-menu-title">FEATURES</Link>
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
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <span className={`nav-link position-relative text-white ${showw === 3 ? 'show' : ""}`} style={{ height: "50px" }}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(3)}>
                                            Shop
                                        </span>
                                        <div className={`dropdown-menu p-3 ${showw === 3 ? 'show' : ''}`}>
                                            <div className="row g-0">
                                                <div className="col-lg-5">
                                                    <div className="row g-0">
                                                        <div className="col-lg-6">
                                                            <div className="dropdown-sub-column-item">
                                                                <Link href="shop-filter-sidebar.html" className="dropdown-menu-title">SHOP PAGES</Link>
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
                                                        </div>
                                                        <div className="col-lg-6">
                                                            <div className="dropdown-sub-column-item">

                                                                <Link href="shop-filter-sidebar.html" className="dropdown-menu-title">FEATURES</Link>
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
                                                        </div>
                                                    </div>
                                                </div>
                                                <Col lg={7}>
                                                    <Row className="p-4">
                                                        <Col lg={6} className="p-0">
                                                            <Swiper
                                                                slidesPerView={1}
                                                                spaceBetween={30}
                                                                navigation={{
                                                                    nextEl: ".swiper-button-next",
                                                                    prevEl: ".swiper-button-prev",
                                                                }}
                                                                modules={[Navigation]}
                                                                className='mySwiper'>
                                                                <div className='swiper-wrapper'>
                                                                    {ElectricVerticalSwiper.map((product: any, index: number) => (
                                                                        <SwiperSlide key={index}>
                                                                            <ProductCard product={product} />
                                                                        </SwiperSlide>
                                                                    ))}
                                                                </div>
                                                                <div className="swiper-button-next"></div>
                                                                <div className="swiper-button-prev"></div>
                                                            </Swiper>
                                                        </Col>
                                                        <div className="col-lg-6 cat-section p-0 ps-4">
                                                            <Link href="shop-left-sidebar.html" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "280px" }}>
                                                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner.src})` }}></div>
                                                                <div className="cat-grid-button text-body">
                                                                    <div className="cat_grid_item__title">Women</div>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </Row>
                                                </Col>
                                            </div>
                                        </div>
                                    </li>


                                    <li className="nav-item dropdown dropdown-mega-xxl nav-electric-item">
                                        <span className={`nav-link text-white ${showw === 4 ? 'show' : ''}`} style={{ height: "50px" }}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(4)}>
                                            Product
                                        </span>
                                        <div className={`dropdown-menu ${showw === 4 ? 'show' : ""}`}>
                                            <div className="row">
                                                <div className="col-lg-3">
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
                                                </div>
                                                <div className="col-lg-3">
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
                                                </div>
                                                <div className="col-lg-3">
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
                                                </div>
                                                <div className="col-lg-3">
                                                    <div className="dropdown-sub-column-item">
                                                        <Link href="product-detail-layout-01.html" className="dropdown-menu-title">PRODUCT FEATURES</Link>
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
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-lg nav-electric-item">
                                        <span className={`nav-link text-white ${showw === 5 ? 'show' : ''}`} style={{ height: "50px" }}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(5)}>
                                            Lookbook
                                        </span>
                                        <ul className={`dropdown-menu dropdown-sub-column ${showw === 5 ? 'show' : ''}`}>
                                            {Lookbook.map((item: any, index: number) => {
                                                return (
                                                    <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                                )
                                            })
                                            }
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown-mega-lg nav-electric-item">
                                        <span className={`nav-link text-white ${showw === 6 ? 'show' : ''}`} style={{ height: "50px" }}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleMenuClick(6)}>
                                            Blog
                                        </span>
                                        <ul className={`dropdown-menu dropdown-sub-column ${showw === 6 ? 'show' : ""}`}>
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
            </div >
            <SearchModal show={searchShow} handleClose={handleClose} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
        </React.Fragment >
    )
}
export default LayoutHeader8