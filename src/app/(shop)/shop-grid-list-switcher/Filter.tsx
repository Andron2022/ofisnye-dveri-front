"use client";
import { firstTab, tabsection } from '@src/common/shop/gridlistswitcher';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import ProductModal from '@src/commonsections/ProductModal';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Col, Dropdown, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

const ShopCard = ({ item, handleShow, handleAddToCardModalShow }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="card-body">
            <div
                className="topbar-product-card overlay-hover"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden main">
                    <Image
                        src={isHovered ? item.hoverImageUrl : item.imageUrl}
                        alt="image"
                        className="img-fluid"
                        width={500}
                        height={500}
                    />
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip id="tooltip-top">Add to Wishlist</Tooltip>}
                    >
                        <Link href="#!" className="wishlistadd position-absolute">
                            <i className="facl facl-heart-o"></i>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="right"
                        overlay={<Tooltip id="tooltip-right">Compare</Tooltip>}
                    >
                        <Link href="#!" className="compare_add position-absolute">
                            <i className="las la-sync"></i>
                        </Link>
                    </OverlayTrigger>
                    <div className="product-button d-none d-lg-flex flex-column gap-2" style={{ boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></Link>
                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i></button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} onClick={handleShow}><i className="iccl iccl-eye fw-semibold"></i></Link>
                        <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: "36px", height: "36px" }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i></button>
                    </div>

                </div>
                <div className="mt-4">
                    <h6 className="mb-1 fw-medium lh-base">
                        <Link href="/product-detail-layout-01" className="main_link_red">{item.title}</Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        <span>{item.price}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, handleShow, handleAddToCardModalShow }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="col card rounded-0 mb-0 p-3">
            <div className="row align-items-center">
                <div className="col-md-3 col-lg-2">
                    <div
                        className="topbar-product-card overlay-hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden main">
                            {product.discount && (
                                <span className="new-label bg-danger text-white rounded-circle">
                                    {product.discount}
                                </span>
                            )}
                            <Image
                                src={isHovered ? product.images.hover : product.images}
                                alt="image"
                                className="img-fluid"
                            />
                            <Link
                                href="#!"
                                className="wishlistadd position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                data-bs-title="Add to Wishlist"
                            >
                                <i className="facl facl-heart-o"></i>
                            </Link>
                            <Link
                                href="#!"
                                className="compare_add position-absolute"
                                data-bs-toggle="tooltip"
                                data-bs-placement="right"
                                data-bs-title="Compare"
                            >
                                <i className="las la-sync"></i>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 col-lg-10">
                    <div className="row">
                        <div className="col-lg-8 col-xl-9">
                            <h6 className="mb-1 fw-medium lh-base">
                                <Link href="/product-detail-layout-01" className="main_link_red">
                                    {product.title}
                                </Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>{product.price}</span>
                            </p>

                        </div>
                        <div className="col-sm-6 col-md-4 col-xl-3 px-4">
                            <div
                                className="product-button d-none d-lg-flex flex-column gap-2"
                                style={{ boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)" }}
                            >
                                {product.buttons && product.buttons.map((button: any, index: any) => (
                                    <Link
                                        key={index}
                                        href={product.links.quickView}
                                        data-bs-toggle="modal"
                                        className="btn rounded-pill fs-14"
                                    >
                                        <span>{button.label}</span>
                                        <i className="iccl iccl-cart"></i>
                                    </Link>
                                ))}
                                <button
                                    type="button"
                                    className="btn rounded-pill fs-14"
                                    data-bs-toggle="modal"
                                >
                                    {/* <span>{product.buttons[1].label}</span>
                                    <i className={product.buttons[1].icon}></i> */}
                                </button>
                            </div>
                            <div
                                className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2"
                                style={{
                                    zIndex: 1,
                                    boxShadow: "1px 1px 1px rgba(0, 0, 0, .1)"
                                }}
                            >
                                <Link
                                    href="#exampleModal"
                                    data-bs-toggle="modal"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: "36px", height: "36px" }}
                                    onClick={handleShow}
                                >
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button
                                    type="button"
                                    className="btn responsive-cart rounded-pill fs-14 p-2"
                                    style={{ width: "36px", height: "36px" }}
                                    data-bs-toggle="modal"
                                    data-bs-target='#cardModal'
                                    onClick={handleAddToCardModalShow}
                                >
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


const FilterComponent = () => {

    const [open, setOpen] = useState(true);
    const handleOpen = () => {
        setOpen(!open)
    }

    const [display, setDisplay] = useState<any | number>(3)

    const handleClick = (id: any) => {
        if (open === id) {
            setDisplay(null)
        } else {
            setDisplay(id)
        }
    }


    const [minPrice, setMinPrice] = useState<number>(32);
    const [maxPrice, setMaxPrice] = useState<number>(60);

    // Calculate the progress percentage
    const progress = ((minPrice - 32) / (100 - 32)) * 100;

    useEffect(() => {
        // Ensure maxPrice is always greater than minPrice
        if (maxPrice < minPrice) {
            setMaxPrice(minPrice);
        }
    }, [minPrice, maxPrice]);

    // modal
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    const [cardShow, setCardShow] = useState(false);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <React.Fragment>
            <div className="mt-5 d-flex justify-content-between align-items-center">
                <Link href="#!" className="text-muted fs-16 align-items-center d-none d-lg-flex" id="filter-icon" onClick={handleOpen}>
                    <i className={`iccl fwb iccl-filter ${open === false ? "d-none" : ""} fwb me-2 fw-medium`} id="icon-filter"></i>
                    <i className={`pe-7s-close pegk ${open === false ? "" : "d-none"} me-2 fw-medium fw-semibold`} id="icon-close" style={{ fontSize: "24px" }}></i>
                    <p className="mb-0">Filter</p>
                </Link>
                <div className="d-flex align-items-center d-lg-none fs-16 text-muted" data-bs-toggle="offcanvas">
                    <i className="iccl fwb iccl-filter fwb me-2 fw-medium" id="icon-filter"></i>
                    <i className="pe-7s-close pegk d-none me-2 fw-medium fw-semibold" id="icon-close" style={{ fontSize: "24px" }}></i>
                    <p className="mb-0">Filter</p>
                </div>
                <ul className="nav tab_header tab_filter gap-2 justify-content-end justify-content-sm-center" id="pills-tab" role="tablist">
                    <li className="nav-item d-sm-none" role="presentation">
                        <button className={`nav-link ${display === 6 ? "active" : ""}`} id="best-pan1-tab" data-bs-toggle="pill" data-bs-target="#best-pan1" type="button" role="tab" aria-controls="best-pan1" aria-selected="true" onClick={() => handleClick(6)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className={`nav-link ${display === 1 ? "active" : ""}`} id="best-seller-tab" data-bs-toggle="pill" data-bs-target="#best-seller" type="button" role="tab" aria-controls="best-seller" aria-selected="true" onClick={() => handleClick(1)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item d-none d-sm-block" role="presentation">
                        <button className={`nav-link ${display === 2 ? "active" : ""}`} id="featured-tab" data-bs-toggle="pill" data-bs-target="#featured" type="button" role="tab" aria-controls="featured" aria-selected="false" onClick={() => handleClick(2)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item d-none d-md-block" role="presentation">
                        <button className={`nav-link ${display === 3 ? "active" : ""}`} id="sale-tab" data-bs-toggle="pill" data-bs-target="#sale" type="button" role="tab" aria-controls="sale" aria-selected="false" onClick={() => handleClick(3)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item d-none d-lg-block" role="presentation">
                        <button className={`nav-link ${display === 4 ? "active" : ""}`} id="top-sale-tab" data-bs-toggle="pill" data-bs-target="#top-sale" type="button" role="tab" aria-controls="top-sale" aria-selected="false" onClick={() => handleClick(4)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                    <li className="nav-item d-none d-xl-block" role="presentation">
                        <button className={`nav-link ${display === 5 ? "active" : ""}`} id="top-product-tab" data-bs-toggle="pill" data-bs-target="#top-product" type="button" role="tab" aria-controls="top-product" aria-selected="false" onClick={() => handleClick(5)}>
                            <div className="filter-option d-flex">
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                                <div className="grid1"></div>
                            </div>
                        </button>
                    </li>
                </ul>
                <Dropdown>
                    <Dropdown.Toggle
                        variant="secondary"
                        className="d-flex align-items-center justify-content-between featurnBtn rounded-pill"
                        id="dropdown-basic"
                    >
                        Feature
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="filter-dropdown">
                        <Dropdown.Item href="#">Feature</Dropdown.Item>
                        <Dropdown.Item href="#">Best selling</Dropdown.Item>
                        <Dropdown.Item href="#">Alphabetically, A-Z</Dropdown.Item>
                        <Dropdown.Item href="#">Alphabetically, Z-A</Dropdown.Item>
                        <Dropdown.Item href="#">Price, low to high</Dropdown.Item>
                        <Dropdown.Item href="#">Date, old to new</Dropdown.Item>
                        <Dropdown.Item href="#">Date, new to old</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            {/* filter */}
            <div className={`p-4 filter-box ${open === false ? "" : "d-none"} mt-4`}>
                <Row className="m-sm-2 g-4 g-sm-2">
                    {/* <!-- color --> */}
                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Vendor </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked1" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked1" style={{ cursor: "pointer" }}>
                                    Ck
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked2" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked2" style={{ cursor: "pointer" }}>
                                    H&M
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked3" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked3" style={{ cursor: "pointer" }}>
                                    Kalles
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked4" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked4" style={{ cursor: "pointer" }}>
                                    Lavi&apos;s
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked5" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked5" style={{ cursor: "pointer" }}>
                                    Monki
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked6" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked6" style={{ cursor: "pointer" }}>
                                    Nike
                                </label>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Size </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked11" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked11" style={{ cursor: "pointer" }}>
                                    S <span className="ms-1 text-muted">(9)</span>
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked21" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked21" style={{ cursor: "pointer" }}>
                                    M <span className="ms-1 text-muted">(12)</span>
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked31" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckChecked31" style={{ cursor: "pointer" }}>
                                    L <span className="ms-1 text-muted">(6)</span>
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked41" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked41" style={{ cursor: "pointer" }}>
                                    Xs <span className="ms-1 text-muted">(8)</span>
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked51" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked51" style={{ cursor: "pointer" }}>
                                    Xl <span className="ms-1 text-muted">(25)</span>
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="flexCheckChecked61" style={{ cursor: "pointer" }} />
                                <label className="form-check-label" htmlFor="flexCheckChecked61" style={{ cursor: "pointer" }}>
                                    Xxl <span className="ms-1 text-muted">(16)</span>
                                </label>
                            </div>
                        </div>

                    </Col>
                    {/* <!-- color --> */}
                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Vendor </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3 filter-category">
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-black border-black p-1" type="checkbox" defaultValue="" id="colo1" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color1">
                                    Black
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-teal border-teal p-1" type="checkbox" defaultValue="" id="color2" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color2">
                                    Cyan
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-green2 p-1" type="checkbox" defaultValue="" id="color3" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color3">
                                    Green
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-cid-green border-cid-green p-1" type="checkbox" defaultValue="" id="color4" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color4">
                                    Gray
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-pink2 border-pink2 p-1" type="checkbox" defaultValue="" id="color5" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color5">
                                    Pink
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-sea border-sea p-1" type="checkbox" defaultValue="" id="color6" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color6">
                                    Sea
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-blue-dark border-blue-dark p-1" type="checkbox" defaultValue="" id="color7" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color7">
                                    Blue
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-red border-red p-1" type="checkbox" defaultValue="" id="color8" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color8">
                                    red
                                </label>
                            </div>
                            <div className="round d-flex align-items-center mb-2">
                                <input className="form-check-input bg-orange p-1 border-orange" type="checkbox" defaultValue="" id="color9" />
                                <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color9">
                                    Orange
                                </label>
                            </div>
                        </div>
                    </Col>
                    {/* <!-- Category --> */}
                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Category </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3 filter-category">
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor="cate">
                                    Accessories
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate2" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate2">
                                    Men
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate3" defaultChecked />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate3">
                                    Women
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate4" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate4">
                                    Shoes
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate5" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate5">
                                    T-Shirt
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate6" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate6">
                                    Dress
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate7" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate7">
                                    Jackets
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate8" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate8">
                                    Boots
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate9" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate9">
                                    Jewellery
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate10" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate">
                                    Tops
                                </label>
                            </div>
                            <div className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" defaultValue="" id="cate11" />
                                <label className="form-check-label" style={{ cursor: "pointer" }} htmlFor=" cate11">
                                    Wallet
                                </label>
                            </div>
                        </div>
                    </Col>
                    {/* <!-- title--> */}
                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Title </h5>
                        <div className="filter-title"></div>
                        <form className="form-inline my-2 my-lg-4 filter-search me-3">
                            <input className="form-control fs-12" type="search" placeholder="Search for product title" aria-label="Search" />
                            <button className="btn btn-custom-dark  fw-medium min-w-150 mt-3" style={{ border: "2px solid black" }}>FILTER</button>
                        </form>
                    </Col>

                    <div className="col-sm-6 col-lg-3">
                        <h5 className="mb-1 fw-medium">By Price</h5>
                        <div className="filter-title"></div>
                        <form action="" className="mt-5">
                            <div className="slider">
                                <div className="progress" style={{ width: `${progress}%` }}></div>
                            </div>
                            <div className="range-input">
                                <input
                                    type="range"
                                    className="range-min"
                                    min="32"
                                    max="100"
                                    value={minPrice}
                                    onChange={(e) => setMinPrice(Number(e.target.value))}
                                    step="1"
                                />
                                <input
                                    type="range"
                                    className="range-max"
                                    min="60"
                                    max="100"
                                    value={maxPrice}
                                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                                    step="1"
                                />
                            </div>
                            <p className="fw-medium text-black fs-14 mt-4">
                                <span className="text-muted fw-normal me-2">Price</span>${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
                            </p>
                            <button className="btn btn-custom-dark  fw-medium min-w-150 " style={{ border: "2px solid black" }}>FILTER</button>
                        </form>
                    </div>
                </Row>
            </div>

            {/* tab section */}
            <div className="tab-content my-3 my-md-4" id="pills-tabContent">

                <div className={`tab-pane fade ${display === 6 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <div className="row row-cols-1 justify-content-center g-0">
                        {firstTab.map((product, idx) => (
                            <div className="col card rounded-0 mb-0" key={idx}>
                                <ProductCard key={idx} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`tab-pane fade ${display === 1 ? "active show" : ""}`} id="best-seller" role="tabpanel" aria-labelledby="best-seller-tab" tabIndex={0}>
                    <div className="row row-cols-2 justify-content-center g-0">
                        {tabsection.map((item) => (
                            <div className="col card rounded-0 mb-0" key={item.id}>
                                <ShopCard key={item.id} item={item} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </div>
                </div>

                <div className={`tab-pane fade ${display === 2 ? "active show" : ""}`} id="featured" role="tabpanel" aria-labelledby="featured-tab" tabIndex={0}>
                    <section className="kalles-shoes-grid-products-section pb-0">
                        <div className="container-fluid px-0">
                            <div className="row row-cols-2 row-cols-md-3 justify-content-center row-cols-lg-3 g-0">
                                {tabsection.map((item) => (
                                    <div className="col card rounded-0 mb-0" key={item.id}>
                                        <ShopCard key={item.id} item={item} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                    </div>
                                ))}

                            </div>
                        </div>
                    </section>
                </div>

                <div className={`tab-pane fade ${display === 3 ? "active show" : ""}`} id="sale" role="tabpanel" aria-labelledby="sale-tab" tabIndex={0}>
                    <section className="kalles-shoes-grid-products-section pb-0">
                        <div className="container-fluid px-0">
                            <div className="row row-cols-2 row-cols-md-3 justify-content-center row-cols-lg-4 g-0">
                                {tabsection.map((item) => (
                                    <div className="col card rounded-0 mb-0" key={item.id}>
                                        <ShopCard key={item.id} item={item} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className={`tab-pane fade ${display === 4 ? "active show" : ""}`} id="top-sale" role="tabpanel" aria-labelledby="top-sale-tab" tabIndex={0}>
                    <section className="kalles-shoes-grid-products-section pb-0">
                        <div className="container-fluid px-0">
                            <div className="row row-cols-2 row-cols-md-3 justify-content-center row-cols-lg-5 g-0">
                                {tabsection.map((item) => (
                                    <div className="col card rounded-0 mb-0" key={item.id}>
                                        <ShopCard key={item.id} item={item} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                <div className={`tab-pane fade ${display === 5 ? "active show" : ""}`} id="top-product" role="tabpanel" aria-labelledby="top-product-tab" tabIndex={0}>
                    <section className="kalles-shoes-grid-products-section pb-0">
                        <div className="container-fluid px-0">
                            <div className="row row-cols-2 row-cols-md-3 justify-content-center row-cols-lg-6 g-0">
                                {tabsection.map((item) => (
                                    <div className="col card rounded-0 mb-0" key={item.id}>
                                        <ShopCard key={item.id} item={item} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

            </div>
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
            <ProductModal show={show} handleClose={handleShow} />
        </React.Fragment>
    )
}

export default FilterComponent