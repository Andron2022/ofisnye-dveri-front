"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import LoginModal from '@src/components/Headers/LoginModal'
import logo from '@assets/images/svg/kalles.svg'
import MobileHeader from "@src/components/Headers/MobileHeader";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import MobileHeaderSearchModel from "@src/components/Headers/MobileHeaderSearchModel";

const LayoutHeader = () => {
    const [loginShow, setLoginShow] = useState(false);
    const [headerShow, setHeaderShow] = useState(false)
    const [shoppingShow, setShoppingShow] = useState(false);
    const [show, setShow] = useState(false);
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
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

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
                                Summer sale discount off <span className="cr">50%</span>! <a href="shop.html" className="text-reset">Shop
                                    Now</a>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div>
                    <div className="navbar-custom d-flex align-items-center justify-content-between p-3">
                        <Link data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" onClick={handleHeader}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="16" viewBox="0 0 30 16">
                                <rect width="30" height="1.5"></rect>
                                <rect y="7" width="20" height="1.5"></rect>
                                <rect y="14" width="30" height="1.5"></rect>
                            </svg>
                        </Link>
                        {/* logo */}
                        <Link href="#!">
                            <Image className="w__95 logo_normal dn db_lg" src={logo} alt="Kalles Template" />
                        </Link>
                        <div className="topbar-toolbar d-flex align-items-center gap-3">
                            <Link href="#!" role="presentation" data-bs-toggle="modal" data-bs-target="#searchModal" onClick={handleShow}>
                                <i className="iccl iccl-search"></i>
                            </Link>
                            <Link className="d-md-block d-none" data-bs-toggle="offcanvas" href="#accountOffcanvas" aria-controls="accountOffcanvas" onClick={handleLoginShow}><i className="iccl iccl-user"></i></Link>
                            <Link className="d-md-block d-none" href="/wishlist"><i className="iccl iccl-heart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">3</span></Link>
                            <Link data-bs-toggle="offcanvas" href="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" onClick={handleShoppingShow}><i className="iccl iccl-cart"></i><span className="tcount bg-dark text-white rounded-circle d-flex align-items-center justify-content-center">5</span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="backdrop-shadow d-none"></div>
            <LoginModal loginShow={loginShow} handleLoginClose={handleLoginClose} />
            <MobileHeader headerShow={headerShow}
                handleHeaderClose={handleHeaderClose}
                loginShow={loginShow}
                handleLoginClose={handleLoginClose}
                handleLoginShow={handleLoginShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
            <MobileHeaderSearchModel show={show} handleClose={handleClose} />
        </React.Fragment>
    )
}
export default LayoutHeader