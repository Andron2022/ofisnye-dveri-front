"use client";
import React, { useState, useEffect } from 'react'
import { Col, Dropdown, Row } from 'react-bootstrap'
import { ProductData } from '@src/common/shop/ProductData';
import { brandData, priceData, sizeData, vendorData } from '@src/common/shop/filterData'
import AddToCardModal from '@src/commonsections/AddToCardModal';
import ProductModal from '@src/commonsections/ProductModal';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product, handleShow, handleAddToCardModalShow }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);

    return (
        <>
            <div
                className="topbar-product-card pb-3 w-100"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="position-relative overflow-hidden">
                    {product.label && (
                        <span className={`new-label ${product.labelClass} text-white rounded-circle`}>
                            {product.label}
                        </span>
                    )}
                    {
                        product.hoverImageUrl ?
                            <Image
                                src={isHovered ? product.hoverImageUrl : imageUrl}
                                alt="image"
                                className="img-fluid w-100"
                            />
                            :
                            <Image
                                src={imageUrl}
                                alt="ImageUrlImg"
                                className="img-fluid w-100"
                            />
                    }
                    <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: 10, left: 10 }} data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>
                    <Link href="#" className="wishlistadd d-none d-lg-flex position-absolute" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Add to Wishlist">
                        <i className="facl facl-heart-o text-white"></i>
                    </Link>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}>
                            <span>Quick View</span>
                            <i className="iccl iccl-eye"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn rounded-pill fs-14"
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i>
                        </button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Link href="#exampleModal" data-bs-toggle="modal" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: 36, height: 36 }} onClick={handleShow}>
                            <i className="iccl iccl-eye fw-semibold"></i>
                        </Link>
                        <button
                            type="button"
                            className="btn responsive-cart rounded-pill fs-14 p-2"
                            style={{ width: 36, height: 36 }}
                            data-bs-toggle="modal"
                            data-bs-target="#cardModal"
                            onClick={handleAddToCardModalShow}
                        >
                            <i className="iccl iccl-cart fw-semibold"></i>
                        </button>
                    </div>
                </div>
                <div className="mt-3">
                    <h6 className="mb-1 fw-medium">
                        <Link href="/product-detail-layout-01" className="main_link_acid_green">{product.title}</Link>
                    </h6>
                    {
                        product.del ?

                            <p className="mb-0 fs-14 text-muted">
                                <del>{product.del}</del>&nbsp;
                                <span className='text-danger'>{product.price}</span>
                            </p>
                            :
                            <p className="mb-0 fs-14 text-muted">
                                <span>{product.price}</span>
                            </p>
                    }

                    {product.colors ?
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {product.colors && product.colors.map((color: any, index: number) => (
                                <Link
                                    key={index}
                                    href="#!"
                                    onMouseOver={() => setImageUrl(color.imageUrl)}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                    }}
                                    className={`d-inline-block ${color.color} rounded-circle`}
                                ></Link>
                            ))}
                        </div>
                        :
                        <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                            {product.color && product.color.map((color: any, index: number) => (
                                <Link
                                    href="#!"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImageUrl(color.imageUrl);
                                        setIsHovered(false);
                                    }}
                                    style={{
                                        background: `url('${color.imageUrl.src}')`,
                                        backgroundSize: 'cover'
                                    }}
                                    className="d-inline-block bg-body-tertiary rounded-circle"
                                />
                            ))}
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

const FilterTab = () => {

    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setDisplay(1); // 2 columns for mobile view
            } else {
                setDisplay(3); // Default columns for larger screens
            }
        };
        window.addEventListener('resize', handleResize);
        // Set initial value based on the current window size
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

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

    return (
        <React.Fragment>
            <div className=" mt-5 d-flex justify-content-between align-items-center">
                <Link href="#!" className="text-muted fs-16 align-items-center d-none d-lg-flex" id="filter-icon" onClick={handleOpen}>
                    <i className={`iccl fwb iccl-filter fwb me-2 fw-medium ${open === false ? "d-none" : ""}`} id="icon-filter"></i>
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
                    <Dropdown.Toggle className="btn d-flex align-items-center justify-content-between featurnBtn rounded-pill dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Feature
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu filter-dropdown">
                        <Dropdown.Item><li><Link href="#">Feature</Link></li></Dropdown.Item>
                        <Dropdown.Item><li><Link href="#">Best selling</Link></li></Dropdown.Item>
                        <Dropdown.Item> <li><Link href="#">Alphabetically, A-Z</Link></li></Dropdown.Item>
                        <Dropdown.Item> <li><Link href="#">Alphabetically, Z-A</Link></li></Dropdown.Item>
                        <Dropdown.Item><li><Link href="#">Price, low to high</Link></li></Dropdown.Item>
                        <Dropdown.Item><li><Link href="#">Date, old to new</Link></li></Dropdown.Item>
                        <Dropdown.Item><li><Link href="#">Date, new to old</Link></li></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className={`p-4 filter-box ${open === false ? "" : "d-none"} mt-4`}>
                <Row className="m-sm-2 g-4 g-sm-2">

                    {/* color */}

                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Vendor </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3 filter-category">
                            {
                                vendorData.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="round d-flex align-items-center pt-2 mb-2 gap-1">
                                            <input className={item.color} type='checkbox' value="" id="colo1" />
                                            <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color ">
                                                {item.colorName}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>

                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Price </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3">
                            {
                                priceData.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheck1" />
                                            <label className="form-check-label" htmlFor="flexCheck1">
                                                {item.price}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>

                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Size </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3">
                            {
                                sizeData.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="form-check mb-2">
                                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked11" />
                                            <label className="form-check-label" htmlFor="flexCheckChecked11" style={{ cursor: "pointer" }}>
                                                {item.size}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>

                    <Col sm={6} lg={3}>
                        <h5 className="mb-1 fw-medium"> By Brand </h5>
                        <div className="filter-title"></div>
                        <div className="mt-3">
                            {
                                brandData.map((item: any, index: number) => {
                                    return (
                                        <div key={index} className="form-check mb-3">
                                            <input className="form-check-input" type="checkbox" value="" id="flex23" />
                                            <label className="form-check-label" htmlFor="flex23">
                                                {item.brand}
                                            </label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                </Row>
            </div >

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 6 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-lg-4 g-3">
                        {ProductData.map(product => (
                            <div className='col-12' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </Row>
                </div>
            </div>

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 1 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-lg-4 g-3">
                        {ProductData.map(product => (
                            <div className='col-6' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </Row>
                </div>
            </div>

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 2 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-lg-4 g-3">
                        {ProductData.map(product => (
                            <div className='col-4' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </Row>
                </div>
            </div>

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 3 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-lg-4 g-3">
                        {ProductData.map(product => (
                            <div className='col-3' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </Row>
                </div>
            </div>

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 4 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5">
                        {ProductData.map(product => (
                            <div className='col' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}

                    </Row>
                </div>
            </div>

            <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                <div className={`tab-pane fade ${display === 5 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                    <Row className="g-lg-4 g-3">
                        {ProductData.map(product => (
                            <div className='col-2' key={product.id}>
                                <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                            </div>
                        ))}
                    </Row>
                </div>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment >
    )
}

export default FilterTab