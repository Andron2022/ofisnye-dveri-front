"use client";
import React, { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import MainModel from '@src/commonsections/MainModel'
import Image from 'next/image'
import Link from 'next/link'
import { Blog, Features, HeaderLayout, HomePage1, HomePage2, Lookbook, ProductDetail, ProductFeatures, ProductLayout, ProductSwatch, ShopFeatures, ShopPage } from '@src/common/Header/header'
import MobileHeader from '@src/components/Headers/MobileHeader'
import SearchModal from '@src/components/Headers/SearchModal'
import LoginModal from '@src/components/Headers/LoginModal'
import cat1 from '@assets/images/home-lingerie/mega-menu-cat-01.jpg'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'
import logo from '@assets/images/svg/kalles.svg'

const HeaderLingeries = () => {

    const headerRef = useRef(null)
    const [headerShow, setHeaderShow] = useState(false)

    const [isStickyActive, setIsStickyActive] = useState(false);
    const [lastScrollTop, setLastScrollTop] = useState(0);

    const [show, setShow] = useState<number | any>(null)
    const [searchShow, setSearchShow] = useState(false);

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

    const handleHeader = () => {
        setHeaderShow(!headerShow)
    }
    const handleHeaderClose = () => setHeaderShow(false)

    const handleClose = () => setSearchShow(false);
    const handleShow = () => setSearchShow(true);
    const handleLoginClose = () => setLoginShow(false);

    const handleLoginShow = () => {
        setLoginShow(true);
        setHeaderShow(false);
    }
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    const [showMenuScroll, setShowMenuScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowMenuScroll(window.pageYOffset > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <MainModel />
            <div id="kalles-section-header_top" className='header-lingeries demo' ref={headerRef}>

                <nav className={`navbar navbar-expand-lg navbar-custom py-0 d-flex align-items-center ${isStickyActive === true ? 'headerFixed' : ""} ${showMenuScroll ? 'bg-white shadow-sm' : ''}`}>
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
                                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 lingeries-header">
                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fs-16 fw-medium   ${show === 1 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(1)}>
                                                    Demo
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${show === 1 ? "show" : ""}`}>
                                                    <Row>
                                                        <Col lg={3}>
                                                            <div className="dropdown-sub-column-item">
                                                                <Link href="" className="dropdown-menu-title">Home Pages</Link>
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
                                                <span className={`nav-link fs-16 position-relative fw-medium ${show === 2 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(2)}>
                                                    Shop
                                                </span>
                                                <div className={`dropdown-menu ms-0 p-3 ${show === 2 ? "show" : ""}`}>
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
                                                        <div className="col-lg-7 p-4">
                                                            <div className="row ">
                                                                <div className="col-lg-6 cat-section p-0">
                                                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "370px" }}>
                                                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat1.src})` }}></div>
                                                                        <div className="cat-grid-button text-body">
                                                                            <div className="cat_grid_item__title">Strapless</div>
                                                                        </div>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-lg-6 cat-section ps-4 p-0">
                                                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden " style={{ height: "370px" }}>
                                                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat1.src})` }}></div>
                                                                        <div className="cat-grid-button text-body">
                                                                            <div className="cat_grid_item__title">Trikini</div>
                                                                        </div>
                                                                    </Link>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </Row>
                                                </div>
                                            </li>

                                            <li className="nav-item dropdown dropdown-mega-xxl">
                                                <span className={`nav-link fs-16 fw-medium   ${show === 3 ? "show" : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(3)}>
                                                    Product
                                                </span>
                                                <div className={`dropdown-menu ms-0 ${show === 3 ? "show" : ""}`}>
                                                    <Row className="pe-4">
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
                                                                                        <span className={item.homebagbadgeColor}>{item.homebagbadge}</span>
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

                                            <li className="nav-item dropdown dropdown-mega-lg">
                                                <span className={`nav-link fs-16 fw-medium   ${show === 6 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(6)}>
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
                                                <span className={`nav-link fs-16 fw-medium   ${show === 7 ? "show" : ""}`}  role="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(7)}>
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
                                            <li className="nav-item dropdown dropdown-mega-3xl">
                                                <span className={`nav-link fs-16 position-relative fw-medium ${show === 4 ? 'show' : ""}`}  data-bs-toggle="dropdown" aria-expanded="false" onClick={() => handleClick(4)}>
                                                    Sale
                                                </span>

                                            </li>
                                        </ul>
                                    </div>
                                    <MobileHeader headerShow={headerShow} handleHeaderClose={handleHeader} />
                                </div>

                            </div>
                            <div className="col-lg-2 col-auto">
                                <div className="text-center">
                                    <Link className="navbar-brand mx-auto" href="/index">
                                        <Image src={logo} alt="LogoImg" width="95" />
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-5 col-auto">
                                <div className="topbar-toolbar ms-auto d-flex align-items-center gap-3 justify-content-end lingeries-header">
                                    <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handleShow}><i className="las la-search fs-28"></i></Link>
                                    <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="las la-user fs-28"></i></Link>
                                    <Link href="#!"><i className="lar la-heart fs-28"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                                    <Link className="d-none d-md-block" data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="las la-shopping-cart fs-28"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                                </div>
                            </div>

                        </div>

                    </div>
                </nav>

            </div>
            <div className="position-fixed bottom-0 bg-body start-0 end-0 z-1" style={{ boxShadow: "0 0 9px rgba(0, 0, 0, 0.12)" }}>
                <div className="container">
                    <div className="d-md-flex text-center align-items-center justify-content-between py-3">
                        <p className="text-muted mb-0">We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</p>
                        <div className="mt-3 mt-md-0">
                            <button data-bs-toggle="offcanvas" data-bs-target="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" className="btn btn-teal text-uppercase rounded-0 min-w-150" onClick={handleShoppingShow}>
                                accept
                            </button>
                        </div>

                    </div>
                </div>
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

export default HeaderLingeries