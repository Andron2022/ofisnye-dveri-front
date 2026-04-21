"use client";
import React from 'react';
import { Offcanvas, Row } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import product01 from '@assets/images/mini-cart/product-01.jpg';
import product02 from '@assets/images/mini-cart/product-02.jpg';
import product03 from '@assets/images/mini-cart/product-03.jpg';
import product04 from '@assets/images/mini-cart/product-04.jpg';
import product05 from '@assets/images/mini-cart/product-05.jpg';

const SearchModal = ({ show, handleClose }: any) => {


    return (
        <React.Fragment>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header className='border-bottom'>
                    <h5 className="offcanvas-title fs-16 text-uppercase" id="searchOffcanvasLabel">Search Out Site</h5>
                    <button type="button" className="btn-close btn-close-none" data-bs-dismiss="offcanvas" aria-label="Close"><i className="pe-7s-close pegk" onClick={handleClose}></i></button>
                </Offcanvas.Header>
                <div className="px-3 py-4">
                    <div>
                        <form action="#!">
                            <select className="form-select rounded-pill mb-3">
                                <option value="*">All Categories</option>
                                <option value="Accessories">Accessories</option>
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
                            <div className="search-box position-relative">
                                <input type="text" className="form-control rounded-pill" id="exampleFormControlsearch2" placeholder="Search for products" />
                                <button type="submit" className="btn"><i className="iccl iccl-search"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="p-3 border-bottom border-top shadow-2xl">
                    <h6 className="mb-0 fw-medium">Need some inspiration?</h6>
                </div>
                <div className="offcanvas-body">
                    <Row className="mb-3">
                        <div className="col-4">
                            <Link href="#!"><Image src={product01} alt="Product01Img" className="img-fluid" priority /></Link>
                        </div>
                        <div className="col-8">
                            <h6 className="mb-2"><Link href="/product-detail-layout-01" className="product-title">sunlight bell solar
                                lamp</Link></h6>
                            <p className="mb-0 fs-14 text-muted">$30.00</p>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-4 pe-0">
                            <Link href="#!"><Image src={product02} alt="Product02Img" className="img-fluid" priority /></Link>
                        </div>
                        <div className="col-8">
                            <h6 className="mb-2"><Link href="product-detail-layout-01.html" className="product-title">cru thermos jug</Link></h6>
                            <p className="mb-0 fs-14 text-muted d-flex align-items-center gap-2">
                                <del>$60.00</del>
                                <span className="text-danger">$40.00</span>
                                <span className="badge bg-danger rounded-0">-25%</span>
                            </p>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-4 pe-0">
                            <Link href="#!"><Image src={product03} alt="Product03Img" className="img-fluid" priority /></Link>
                        </div>
                        <div className="col-8">
                            <h6 className="mb-2"><Link href="/product-detail-layout-01" className="product-title">brush set small</Link></h6>
                            <p className="mb-0 fs-14 text-muted">$65.00</p>
                        </div>
                    </Row>
                    <Row className="mb-3">
                        <div className="col-4 pe-0">
                            <Link href="#!"><Image src={product04} alt="Product04Img" className="img-fluid" priority /></Link>
                        </div>
                        <div className="col-8">
                            <h6 className="mb-2"><Link href="/product-detail-layout-05" className="product-title">stripe oilcloth</Link></h6>
                            <p className="mb-0 fs-14 text-muted">$35.00</p>
                        </div>
                    </Row>
                    <Row className="row mb-3">
                        <div className="col-4 pe-0">
                            <Link href="#!"><Image src={product05} alt="Product05Img" className="img-fluid" priority /></Link>
                        </div>
                        <div className="col-8">
                            <h6 className="mb-2"><Link href="/product-detail-layout-05" className="product-title">picto wall clock</Link></h6>
                            <p className="mb-0 fs-14 text-muted">$15.00</p>
                        </div>
                    </Row>
                </div>
                <div className="py-4 border-top mx-4">
                    <Link href="#" className="detail_link fs-14 fw-semibold">View All <i className="las la-arrow-right fs__18"></i></Link>
                </div>
            </Offcanvas>
        </React.Fragment>
    )
}
export default SearchModal