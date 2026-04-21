"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LoginModal from '@src/components/Headers/LoginModal'
import logo from '@assets/images/svg/kalles.svg'
import { Col, Row } from "react-bootstrap";
import MobileHeader from "@src/components/Headers/MobileHeader";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import SearchModal from "@src/components/Headers/SearchModal";
import SearchModal2 from "../SearchModal2";

const LayoutHeader6 = () => {
    const [loginShow, setLoginShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [searchShow, setSearchShow] = useState(false);

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
            <div id="kalles-section-header_top" className="{{ class-name }}">
                <div className="h__top d-flex align-items-center">
                    <div className="container-fluid">
                        <Row className="py-2">
                            <Col md={6} lg={4}>
                                <div className="d-flex justify-content-center justify-content-md-start">
                                    <p className="mb-0"><i className="pegk pe-7s-call fs-14 me-1 align-middle"></i> +01 23456789</p>
                                    <p className="mb-0 ms-2"><i className="pe-7s-mail pegk fs-14 me-1 align-middle"></i> Kalles@domain.com
                                    </p>
                                </div>
                            </Col>
                            <Col md={6} lg={4} className="header-text text-center fs-12 py-1 py-md-0">
                                Summer sale discount off <span className="cr">50%</span>! <Link href="/shop" className="text-reset">Shop
                                    Now</Link>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <div className="navbar-custom d-flex align-items-center justify-content-between p-3">
                        <Link className="d-lg-none" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>
                        <div className="d-none d-lg-block nt-social">
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

                        <Link href="#!">
                            <Image className="w__95 logo_normal dn db_lg" src={logo} alt="Kalles Template" />
                        </Link>
                        <div className="topbar-toolbar d-flex align-items-center gap-3">
                            <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                <i className="iccl iccl-search"></i>
                            </Link>
                            <Link className="d-none d-lg-block" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                            <Link className="d-none d-lg-block" href="/wishlist"><i className="iccl iccl-heart" ></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center" >3</span></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas"><i className="iccl iccl-cart" onClick={handleShoppingShow}></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                            <Link className="d-none d-lg-block rotate-180" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                    <rect width="30" height="1.5"></rect>
                                    <rect y="7" width="20" height="1.5"></rect>
                                    <rect y="14" width="30" height="1.5"></rect>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backdrop-shadow d-none"></div>
            <SearchModal2 show={searchShow} handleClose={handleClose} />
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}
export default LayoutHeader6