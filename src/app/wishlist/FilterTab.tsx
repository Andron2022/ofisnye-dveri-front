"use client";
import React, { useState,useEffect } from 'react'
import { Button, Container,  OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import { WishlistData } from '@src/common/shop/ProductData';
import AddToCardModal from '@src/commonsections/AddToCardModal';
import ProductModal from '@src/commonsections/ProductModal';
import Image from 'next/image';
import Link from 'next/link';

const ProductCard = ({ product, handleShow, handleAddToCardModalShow }: any) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageUrl, setImageUrl] = useState(product.imageUrl);

    return (
        <>
            <div className="topbar-product-card pb-3">
                <div className="position-relative overflow-hidden">
                    <span className={`new-label ${product.labelClass} text-white rounded-circle`}>{product.label}</span>
                    <Image src={imageUrl} alt="ImageUrlImg" className="img-fluid w-100" />
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Add to Wishlist</Tooltip>}
                    >
                        <Link href="#" className="d-lg-none position-absolute" style={{ zIndex: 1, top: '10px', left: '10px' }}>
                            <i className="facl facl-heart-o text-white"></i>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement="top"
                        overlay={<Tooltip>Remove Wishlist</Tooltip>}
                    >
                        <a href="#" className="wis_remove_icon fs-18 shadow-sm d-flex align-items-center justify-content-center rounded-circle bg-white position-absolute">
                            <i className="las la-trash"></i>
                        </a>
                    </OverlayTrigger>
                    <div className="product-button d-none d-lg-flex flex-column gap-2">
                        <a href="#exampleModal" data-bs-toggle="modal" className="btn rounded-pill fs-14" onClick={handleShow}><span>Quick View</span> <i className="iccl iccl-eye"></i></a>
                        <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}><span>Quick Shop</span>
                            <i className="iccl iccl-cart"></i></button>
                    </div>
                    <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1 }}>
                        <Button variant="link" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleShow}>
                            <i className="iccl iccl-eye fw-semibold"></i>
                        </Button>
                        <Button variant="link" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} onClick={handleAddToCardModalShow}>
                            <i className="iccl iccl-cart fw-semibold"></i>
                        </Button>
                    </div>
                    <p className="product-size mb-0 text-center text-white fw-medium">{product.size}</p>
                </div>
                <div className="mt-3">
                    <h6 className="mb-1">
                        <Link href="/product-detail-layout-01" className="product-title">{product.title}</Link>
                    </h6>
                    <p className="mb-0 fs-14 text-muted">
                        <del className="text-danger">{product.del}</del>
                        <span>{product.price}</span>
                    </p>
                </div>
                {product.colors ?
                    <div className="product-color-list mt-2 gap-2 d-flex align-items-center">
                        {product.colors && product.colors.map((color: any, index: number) => (
                            <Link
                                href="#!"
                                key={index}
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
                                onMouseOver={(e) => {
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
        </>
    );
};

const FilterTab = () => {

    const [open, setOpen] = useState(true);
    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);


    // const handleOpen = () => {
    //     setOpen(!open)
    // }

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

            <Container>

                <div className="row mt-5 justify-content-between align-items-center pb-3">
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
                </div>

              

                <div className="tab-content my-3 my-md-4" id="pills-tabContent">
                    <div className={`tab-pane fade ${display === 6 ? "active show" : ""}`} id="best-pan1" role="tabpanel" aria-labelledby="best-pan1-tab" tabIndex={0}>
                        <Row className="g-lg-4 g-3">
                            {WishlistData.map(product => (
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
                            {WishlistData.map(product => (
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
                            {WishlistData.map(product => (
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
                            {WishlistData.map(product => (
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
                            {WishlistData.map(product => (
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
                            {WishlistData.map(product => (
                                <div className='col-2' key={product.id}>
                                    <ProductCard key={product.id} product={product} handleShow={handleShow} handleAddToCardModalShow={handleAddToCardModalShow} />
                                </div>
                            ))}
                        </Row>
                    </div>
                </div>
            </Container>
            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </React.Fragment >
    )
}

export default FilterTab