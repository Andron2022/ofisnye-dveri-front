"use client";
import React, { useState } from "react";
import {  Offcanvas } from "react-bootstrap";
import { HomePage, HomeLayout, Shop, Product, Portfolio, Lookbook, Categories, Country } from "@src/common/Header/mobileHeader";
import Link from "next/link";
import Image from "next/image";
import MobileHeaderSearchModel from "@src/components/Headers/MobileHeaderSearchModel";
import LoginModal from "@src/components/Headers/LoginModal";

const MobileHeader = ({ headerShow, handleHeaderClose, loginShow, handleLoginClose, handleLoginShow }: any) => {
    const [open, setOpen] = useState<any | number>(1)
    const handleClick = (id: any) => {
        if (open === id) {
            setOpen(null)
        } else {
            setOpen(id)
        }
    }
    const [show, setShow] = useState(false);
    const [demoMenu, setDemoMenu] = useState(false)
    const [shop, setShop] = useState(false)
    const [portfolio, setPortfolio] = useState(false)
    const [homeMenu, setHomeMenu] = useState(false)
    const [layout, setlayout] = useState(false)
    const [product, setProduct] = useState(false)
    const [lookbook, setLookbook] = useState(false)
    const [country, setCountry] = useState(false)

    const handelDemo = () => setDemoMenu(!demoMenu)
    const handleShop = () => setShop(!shop)
    const handleProduct = () => setProduct(!product)
    const handleHomeMenu = () => setHomeMenu(!homeMenu)
    const handlelayout = () => setlayout(!layout)
    const handlePortfolio = () => setPortfolio(!portfolio)
    const handleLookbook = () => setLookbook(!lookbook)
    const handleCountry = () => setCountry(!country)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



    return (
        <React.Fragment>
            <Offcanvas className="header-offcanvas" show={headerShow} onHide={handleHeaderClose} placement="start">
                <Link href="#!" className="btn offcanvas-close  text-reset" data-bs-dismiss="offcanvas" onClick={handleHeaderClose}>
                    <i className="las la-times"></i>
                </Link>
                <div className="offcanvas-body p-0">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item " role="presentation">
                            <button className={`nav-link text-uppercase ${open === 1 ? 'active' : ''}`} id="pills-menu-tab" data-bs-toggle="pill" data-bs-target="#pills-menu" type="button" role="tab" aria-controls="pills-menu" aria-selected="true" onClick={() => handleClick(1)}>Menu</button>
                        </li>
                        <li className="nav-item col-6 p-0" role="presentation">
                            <button className={`nav-link text-uppercase ${open === 2 ? 'active' : ''}`} id="pills-categories-tab" data-bs-toggle="pill" data-bs-target="#pills-categories" type="button" role="tab" aria-controls="pills-categories" aria-selected="false" onClick={() => handleClick(2)}>categories</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="pills-tabContent">
                        <div className={`tab-pane fade ${open === 1 ? 'show active' : ""}`} id="pills-menu" role="tabpanel" aria-labelledby="pills-menu-tab" tabIndex={0}>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                                <div className="accordion-item rounded-0">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                                        <button className={`accordion-button  ${demoMenu === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapse-05" aria-expanded="false" aria-controls="panelsStayOpen-collapse-05" onClick={handelDemo}>
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
                                        <button className={`accordion-button  ${shop === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" onClick={handleShop}>
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
                                        <button className={`accordion-button ${product === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree" onClick={handleProduct}>
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
                                <Link href="#!" className="pill-item col-6 p-0" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Sale</button>
                                </Link>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingFour">
                                        <button className={`accordion-button ${portfolio === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="false" aria-controls="panelsStayOpen-collapseFour" onClick={handlePortfolio}>
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
                                        <button className={`accordion-button ${lookbook === true ? '' : "collapsed"}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFive" aria-expanded="false" aria-controls="panelsStayOpen-collapseFive" onClick={handleLookbook}>
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
                                <Link href="#!" className="pill-item col-6 p-0" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Blog</button>
                                </Link>
                                <Link href="/wishlist" className="pill-item col-6 p-0" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> <i className="iccl iccl-heart fw-medium me-1"></i> Wishlist</button>
                                </Link>
                                <Link href="#!" className="pill-item col-6 p-0" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> <i className="iccl iccl-search fw-medium me-1"></i> Search</button>
                                </Link>
                                <Link href="#accountOffcanvas" data-bs-toggle="offcanvas" className="pill-item col-6 p-0" role="presentation" onClick={handleLoginShow}>

                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> <i className="iccl iccl-user fw-medium me-1"></i> Login /
                                        Register</button>
                                </Link>

                                <div className="pill-item col-6 p-0 w-100" role="presentation">
                                    <button className="nav-link border-0" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Need Help?</button>
                                    <ul className="list-unstyled need-help mb-0">
                                        <li>
                                            <Link href="#!" className="d-flex align-items-center">
                                                <i className="pegk pe-7s-call me-1"></i>
                                                <p className="mb-0">+01 23456789</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="mailto:claue@domain.com" className="d-flex mt-2 align-items-center">
                                                <i className="pegk pe-7s-mail fwb me-2"></i>
                                                <p className="mb-0">claue@domain.com</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="panelsStayOpen-headingSeven">
                                        <button className={`accordion-button ${country === true ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseSeven" aria-expanded="false" aria-controls="panelsStayOpen-collapseSeven" onClick={handleCountry}>
                                            USD
                                        </button>
                                    </h2>
                                    <div id="panelsStayOpen-collapseSeven" className={`accordion-collapse collapse ${country === true ? 'show' : ''}`} aria-labelledby="panelsStayOpen-headingSeven">
                                        <ul className="accordion-nav-list list-unstyled mb-0">
                                            <ul className="accordion-nav-list list-unstyled mb-0">
                                                {
                                                    Country.map((item: any, index: number) => {
                                                        return (
                                                            <li key={index}>
                                                                <Link href="#!">
                                                                    <Image src={item.image} className="map-img" alt="ItemImg" priority/>{item.name}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })
                                                }

                                            </ul>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`tab-pane fade ${open === 2 ? 'show active' : ""}`} id="pills-categories" role="tabpanel" aria-labelledby="pills-categories-tab" tabIndex={0}>
                            <ul className="accordion-nav-list accordion-navs-list list-unstyled mb-0">
                                {
                                    Categories.map((item: any, index: number) => {
                                        return (
                                            <li key={index}>
                                                <Link href="#"><i className={item.icon}></i>{item.category}</Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Offcanvas>
            <MobileHeaderSearchModel show={show} handleClose={handleClose} />
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
        </React.Fragment>
    )
}
export default MobileHeader