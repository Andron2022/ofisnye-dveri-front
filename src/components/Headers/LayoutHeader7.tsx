"use client";
import React, { useState } from "react";
import usd from '@assets/images/svg/usd.svg'
import Image from "next/image";
import Link from "next/link";
import { Col, Dropdown, Row } from "react-bootstrap";
import { HomePage, HomeLayout, Shop, Product, Portfolio, Lookbook, Blog } from '@src/common/Header/mobileHeader'
import logo from '@assets/images/svg/kalles.svg'
import MobileHeader from "./MobileHeader";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import SearchModal from "@src/components/Headers/SearchModal";
import MobileHeaderSearchModel from "@src/components/Headers/MobileHeaderSearchModel";
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

const LayoutHeader7 = () => {

    const [show, setShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [loginShow, setLoginShow] = useState(false);
    const [demoMenu, setDemoMenu] = useState(false)
    const [shop, setShop] = useState(false)
    const [portfolio, setPortfolio] = useState(false)
    const [homeMenu, setHomeMenu] = useState(false)
    const [layout, setlayout] = useState(false)
    const [product, setProduct] = useState(false)
    const [lookbook, setLookbook] = useState(false)
    const [blog, setBolg] = useState(false)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

    const handelDemo = () => setDemoMenu(!demoMenu)
    const handleShop = () => setShop(!shop)
    const handleProduct = () => setProduct(!product)
    const handleHomeMenu = () => setHomeMenu(!homeMenu)
    const handlelayout = () => setlayout(!layout)
    const handlePortfolio = () => setPortfolio(!portfolio)
    const handleLookbook = () => setLookbook(!lookbook)
    const handleBolg = () => setBolg(!blog)

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
    const handleSearchClose = () => setSearchShow(false);
    const handlesearchShow = () => setSearchShow(true);

    return (
        <React.Fragment>
            <div id="kalles-section-header_top" className="{{ class-name }}">
                <div className="h__top d-flex align-items-center vertical-wrpper">
                    <div className="container-fluid">
                        <Row className="py-1 align-items-center py-0 py-md-0">
                            <Col md={5} lg={4} className="col-12">
                                <div className="d-flex align-items-center gap-3 justify-content-center justify-content-md-start">
                                    <p className="mb-0"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i> +01 23456789</p>
                                    <p className="mb-0"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com</p>
                                </div>
                            </Col>
                            <Col md={5} lg={4} className="col-12">
                                <div className="header-text text-center fs-12 py-1 py-md-0">
                                    Summer sale discount off <span className="cr">50%</span>! <Link href="/shop" className="text-reset">Shop Now</Link>
                                </div>
                            </Col>
                            <Col md={2} lg={4} className="col-12">
                                <Dropdown className="text-center text-md-end position-relative">
                                    <Dropdown.Toggle variant="link" className="fs-12 text-reset currency-button p-0" id="currency-dropdown">
                                        <Image src={usd} alt="USD" height="12" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="p-3 dropdown-currency">
                                        {country.map((item, index) => (
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

                <nav className="navbar navbar-expand-lg navbar-custom py-5 align-items-start vertical-menu d-none d-lg-block">
                    <div className="container-fluid">
                        <Link className="navbar-brand" href="/"><Image src={logo} alt="LogoImg" width="95" /></Link>
                        <div className="topbar-toolbar d-flex align-items-center gap-3 pt-4">
                            <Link data-bs-toggle="offcanvas" href="#searchOffcanvas" aria-controls="searchOffcanvas" onClick={handlesearchShow}><i className="iccl iccl-search"></i></Link>
                            <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                            <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                        <div className="text-end position-relative pt-3 pb-4">
                            <Dropdown>
                                <Dropdown.Toggle variant="link" className="fs-12 text-reset currency-button p-0" id="currency-dropdown">
                                    <Image src={usd} alt="USD" height="12" className="me-1" /> USD <i className="facl facl-angle-down"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="p-3 dropdown-currency">
                                    {country.map((item, index) => (
                                        <Dropdown.Item href="#!" key={index}>
                                            <Image src={item.image} alt={item.name} height="12" className="me-1" /> {item.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>


                        <div className="navbar-nav w-100 header-offcanvas collapse navbar-collapse border-e" id="navbarSupportedContent">
                            <div className="tab-content w-100" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-menu" role="tabpanel" aria-labelledby="pills-menu-tab" tabIndex={0}>
                                    <div className="accordion" id="accordionPanelsStayOpenExample">
                                        <div className="accordion-item rounded-0">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                                <button className={`accordion-button px-1  ${demoMenu === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse-05" aria-expanded="false" aria-controls="panelsStayOpen-collapse-05" onClick={handelDemo}>
                                                    Demo
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapse-05" className={`accordion-collapse collapse ${demoMenu === true ? 'show' : ""}`} aria-labelledby="panelsStayOpen-heading-05">
                                                <div className="accordion" id="accordi-05xample">
                                                    <div className="accordion-item rounded-0">
                                                        <h2 className="accordion-header" id="heading-05">
                                                            <button className={`accordion-button  ${homeMenu === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapse-05" aria-expanded="true" aria-controls="collapse-05" onClick={handleHomeMenu}>
                                                                Home Page
                                                            </button>
                                                        </h2>
                                                        <div id="collapse-05" className={`accordion-collapse collapse ${homeMenu === true ? 'show' : ''}`} aria-labelledby="heading-05" data-bs-parent="#accordi-05xample">
                                                            {/* <!-- Updated data-bs-parent --> */}
                                                            <ul className="accordion-nav-list list-unstyled mb-0">
                                                                {
                                                                    HomePage.map((item: any, index: any) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link href={item.link}>{item.label}
                                                                                    <span className={item.badgeColor}>{item.badge}</span>
                                                                                </Link>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="accordion-item border-0 rounded-0">
                                                        <h2 className="accordion-header" id="heading-06">
                                                            <button className={`accordion-button  ${layout === true ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapse-06" aria-expanded="true" aria-controls="collapse-06" onClick={handlelayout}>
                                                                Home Layouts
                                                            </button>
                                                        </h2>
                                                        <div id="collapse-06" className={`accordion-collapse collapse ${layout === true ? 'show' : ''}`} aria-labelledby="heading-06" data-bs-parent="#accordi-05xample">
                                                            {/* <!-- Updated data-bs-parent --> */}
                                                            <ul className="accordion-nav-list list-unstyled mb-0">
                                                                {
                                                                    HomeLayout.map((item: any, index: number) => {
                                                                        return (
                                                                            <li key={index}>
                                                                                <Link href={item.link}>{item.label}</Link>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                                                <button className={`accordion-button px-1  ${shop === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" onClick={handleShop}>
                                                    Shop
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseTwo" className={`accordion-collapse collapse ${shop === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingTwo">
                                                <ul className="accordion-nav-list list-unstyled mb-0">
                                                    {
                                                        Shop.map((item: any, index: number) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link href={item.link}>{item.label}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                                                <button className={`accordion-button px-1 ${product === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree" onClick={handleProduct}>
                                                    Product
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseThree" className={`accordion-collapse collapse ${product === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingThree">
                                                <ul className="accordion-nav-list list-unstyled mb-0">
                                                    {
                                                        Product.map((item: any, index: number) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link href={item.link}>{item.label}
                                                                        <span className={item.badgeColor}>{item.badge}</span>
                                                                    </Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="accordion-item py-3">
                                            <Link href="#!" className="d-block pill-item col-6 px-1 text-danger lh-sm" role="presentation">
                                                Sale <span className="badge bg-warning rounded-pill fw-normal">Sale</span>
                                            </Link>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                                <button className={`accordion-button px-1 ${portfolio === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour" onClick={handlePortfolio}>
                                                    Portfolio
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFour" className={`accordion-collapse collapse ${portfolio === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingFour">
                                                <ul className="accordion-nav-list list-unstyled mb-0">
                                                    {
                                                        Portfolio.map((item: any, index: number) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link href={item.link}>{item.label}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingFive">
                                                <button className={`accordion-button px-1 ${lookbook === true ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive" onClick={handleLookbook}>
                                                    Lookbook
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseFive" className={`accordion-collapse collapse ${lookbook === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingFive">
                                                <ul className="accordion-nav-list list-unstyled mb-0">
                                                    {
                                                        Lookbook.map((item: any, index: number) => {
                                                            return (
                                                                <li key={index}>
                                                                    <Link href={item.link}>{item.label}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="accordion-item">
                                            <h2 className="accordion-header" id="panelsStayOpen-headingNight">
                                                <button className={`accordion-button px-1 ${blog === true ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseNight" aria-expanded="false" aria-controls="panelsStayOpen-collapseNight" onClick={handleBolg}>
                                                    Blog
                                                </button>
                                            </h2>
                                            <div id="panelsStayOpen-collapseNight" className={`accordion-collapse collapse ${blog === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingNight">
                                                <ul className="accordion-nav-list list-unstyled mb-0">
                                                    {Blog.map((item: any, index: number) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link href={item.link}>{item.lable}</Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex={0}>
                                    <ul className="accordion-nav-list accordion-navs-list list-unstyled mb-0">
                                        <li>
                                            <a href="#"><i className="las la-female me-2"></i>Women’s Clothing</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="nt-social mt-3 mb-5">
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
                    </div>
                </nav>

            </div>

            <nav className="navbar navbar-expand-lg navbar-custom py-2 d-flex align-items-center d-lg-none">
                <div className="container-fluid">
                    <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                            <rect width="30" height="1.5"></rect>
                            <rect y="7" width="20" height="1.5"></rect>
                            <rect y="14" width="30" height="1.5"></rect>
                        </svg>
                    </Link>
                    <Link className="navbar-brand" href="/"><Image src={logo} alt="LogoImg" width="95" /></Link>
                    <MobileHeader headerShow={headerShow}
                        handleHeaderClose={handleHeaderClose}
                        loginShow={loginShow}
                        handleLoginClose={handleLoginClose}
                        handleLoginShow={handleLoginShow} />

                    <div className="topbar-toolbar d-flex align-items-center gap-3" onClick={handleShow}>
                        <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal">
                            <i className="iccl iccl-search"></i>
                        </Link>
                        <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas"><i className="iccl iccl-user"></i></Link>
                        <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                        <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                    </div>
                </div>
            </nav>
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
            <MobileHeaderSearchModel show={show} handleClose={handleClose} />
            <SearchModal show={searchShow} handleClose={handleSearchClose} />
        </React.Fragment>
    )
}
export default LayoutHeader7
