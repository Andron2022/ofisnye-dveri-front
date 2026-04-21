"use client";
import React, { useState, useRef, useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper/modules";
import LoginModal from '@src/components/Headers/LoginModal';
import SearchModal from '@src/components/Headers/SearchModal';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';
import MainModel from '@src/commonsections/MainModel';

import Image from 'next/image'
import Link from 'next/link'

import { Features, HeaderLayout, HomePage1, HomePage2, ShopPage, ShopFeatures, ProductLayout, ProductDetail, ProductSwatch, ProductFeatures, Portfolio, Lookbook, Blog, sale, salesSwiper } from '@src/common/Header/header'

import MobileHeader from '@src/components/Headers/MobileHeader';

import green1 from "@assets/images/home-cosmetics/kalles-green-01.png"
import green2 from "@assets/images/home-cosmetics/kalles-green-02.png"
import banner from '@assets/images/home-cosmetics/mega-banner.jpg'

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


const HeaderCosmetics = () => {

    const headerRef = useRef<HTMLDivElement>(null)
    const [loginShow, setLoginShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);
    const [show, setShow] = useState<any>(null)
    const [searchShow, setSearchShow] = useState(false);
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


    const handleClickOutside = (event: MouseEvent) => {
        if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
            setShow(null);
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside)
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [])

    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);

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


    return (
        <React.Fragment>
            <MainModel />

            <div id="kalles-section-header_top" className="cosmetics-navbar" ref={headerRef}>
                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? 'headerFixed' : ""}`}>
                    <div className="container w-100 d-inline-block">
                        <div className="row align-items-center">
                            <div className="col-lg-5 col">
                                <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                        <rect width="30" height="1.5"></rect>
                                        <rect y="7" width="20" height="1.5"></rect>
                                        <rect y="14" width="30" height="1.5"></rect>
                                    </svg>
                                </Link>
                                <div className="d-none d-lg-block nt-social">
                                    <Link href="#!"><i className="facl facl-facebook"></i></Link>
                                    <Link href="#!"><i className="facl facl-twitter"></i></Link>
                                    <Link href="#!"><i className="facl facl-instagram"></i></Link>
                                    <Link href="#!"><i className="facl facl-linkedin"></i></Link>
                                    <Link href="#!"><i className="facl facl-pinterest"></i></Link>
                                </div>
                            </div>
                            <div className="col-lg-2 col">
                                <div className="text-center">
                                    <Link className="navbar-brand mx-auto" href="/index">
                                        <Image src={green1} alt="Green1Img" className="max-w-160 d-none d-lg-block" style={{height:"40px"}}/>
                                        <Image src={green2} alt="Green2Img" className="max-w-100 d-lg-none d-block" style={{height:"40px"}}/>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-5 col">
                                <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end cosmetics-header">
                                    <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                        <i className="iccl iccl-search"></i>
                                    </Link>
                                    <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                                    <Link href="#!" className="d-none d-md-block"><i className="iccl iccl-heart"></i><span className="tcount bg-lima text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                    <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-lima text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>


                <div className="container">
                    <div className="navbar-collapse " id="navbarSupportedContent">
                        <div className="d-none d-lg-block mx-auto">
                            <ul className="navbar-nav justify-content-center cosmetics-header">
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <Link
                                        className={`nav-link ${show === 1 ? "show" : ""}`}
                                        href="#"
                                        onClick={() => handleClick(1)}
                                    >
                                        Demo
                                    </Link>
                                    <div className={`dropdown-menu ${show === 1 ? "show position-absolute" : ""}`}>
                                        <div className="row">
                                            <div className="col-lg-3">
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
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/home-defaul" className="dropdown-menu-title">Home
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
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="dropdown-sub-column-item">
                                                    <Link href="/home-default" className="dropdown-menu-title">Header
                                                        Layouts</Link>
                                                    <ul className="sub-column-menu">
                                                        {HeaderLayout.map((item: any, index: number) => {
                                                            return (
                                                                <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor}>{item.badge}</span></Link>
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
                                                            Features.map((item: any, index: any) => {
                                                                return (
                                                                    <li key={index}><Link className="text-muted position-relative d-inline-flex" href={item.link}> {item.label} <span className={item.badgeColor} style={item.badgeStyle}>{item.badge}</span></Link>
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
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <Link className={`nav-link position-relative ${show === 2 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                        Shop <span className="badge bg-teal fw-normal">New</span>
                                    </Link>
                                    <div className={`dropdown-menu p-3 ${show === 2 ? "show position-absolute" : ""}`}>
                                        <div className="row g-0">
                                            <div className="col-lg-6">
                                                <div className="row g-0">
                                                    <div className="col-lg-6">
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
                                                    </div>
                                                    <div className="col-lg-6">
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
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 cat-section p-4">
                                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "350px" }}>
                                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${banner.src})` }}></div>
                                                    <div className="cat-grid-button text-body">
                                                        <div className="cat_grid_item__title">Skin Medical</div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown dropdown-mega-xxl">
                                    <Link className={`nav-link ${show === 3 ? "show" : ""}`} href="#" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
                                        Product
                                    </Link>
                                    <div className={`dropdown-menu ${show === 3 ? "show position-absolute" : ""}`}>
                                        <div className="row pe-3">
                                            <div className="col-lg-3">
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
                                            </div>
                                            <div className="col-lg-3">
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
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="nav-item dropdown dropdown-mega-3xl">
                                    <Link className={`nav-link position-relative text-danger ${show === 4 ? 'show' : ""}`} href='#' data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(4)}>
                                        Sale <span className="badge bg-warning fw-normal">Sale</span>
                                    </Link>
                                    <div className={`dropdown-menu ${show === 4 ? "show position-absolute" : ""}`}>
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
                                                        {salesSwiper.map((product: any) => (
                                                            <SwiperSlide key={product.id}>
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
                                    <Link className={`nav-link ${show === 5 ? "show" : ""}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(5)}>
                                        Portfolio
                                    </Link>
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 5 ? "show position-absolute" : ""}`}>
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
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 6 ? 'show position-absolute' : ""}`}>
                                        {Lookbook.map((item: any, index: number) => {
                                            return (
                                                <li key={index}><Link className="text-muted" href={item.link}>{item.lable}</Link></li>
                                            )
                                        })}

                                    </ul>
                                </li>
                                <li className="nav-item dropdown dropdown-mega-lg">
                                    <Link className={`nav-link ${show === 7 ? "show" : ""}`} href="#!" role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
                                        Blog
                                    </Link>
                                    <ul className={`dropdown-menu dropdown-sub-column ${show === 7 ? 'show position-absolute' : ""}`}>
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

            </div>

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

export default HeaderCosmetics