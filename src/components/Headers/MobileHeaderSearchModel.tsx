"use client";
import Link from 'next/link';
import React, { useState } from 'react';
import { Modal, Form, Row, Col } from 'react-bootstrap';
import { SearchModel } from '@src/common/Header/mobileHeader';
import Image from 'next/image';

const MobileHeaderSearchModel = ({ show, handleClose }: any) => {

    const [category, setCategory] = useState('*');
    const [searchQuery, setSearchQuery] = useState('');

    const handleCategoryChange = (e: any) => setCategory(e.target.value);
    const handleSearchChange = (e: any) => setSearchQuery(e.target.value);
    const handleSubmit = (e: any) => {
        e.preventDefault()
    };

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} className="fade modal-overl " id="searchModal" dialogClassName="modal-fullscreen header-search-model" >
                <Modal.Body className="p-0 mb-4">
                    <Form className="row g-2 mx-2 mx-md-5 my-4 pb-3 pt-4" onSubmit={handleSubmit}>
                        <Col md={3}>
                            <Form.Select
                                className="rounded-pill w-100"
                                value={category}
                                onChange={handleCategoryChange}
                            >
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
                            </Form.Select>
                        </Col>
                        <Col md={9}>
                            <div className="search-box position-relative">
                                <input type="text" className="form-control rounded-pill" value={searchQuery} placeholder="Search for products" onChange={handleSearchChange} />
                                <button type="submit" className="btn"><i className="iccl iccl-search"></i></button>
                            </div>
                        </Col>
                    </Form>
                    <p className="need-sec fs-16 fw-medium p-2 text-center">Need some inspiration?</p>
                    <Row className="g-3 row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 row-cols-xxl-auto mx-auto mt-4 justify-content-center px-lg-5">
                        {
                            SearchModel.map((item: any, index: number) => {
                                return (
                                    <Col key={index}>
                                        <Image src={item.img} alt="ItemImg" />
                                        <div className="mt-4 text-center">
                                            <h6 className="mb-1 text-capitalize fs-14 fw-medium">
                                                <Link href="/product-detail-layout-01" className="main_link_teal">
                                                    {item.title}<br />{item.bold}</Link>
                                            </h6>
                                            <p className="mb-0 fs-14 text-muted">
                                                <del>{item.del}</del>
                                                <span className="text-danger">{item.price}</span>
                                                <span className="text-danger">{item.price2}</span>
                                                <span className={item.color}>{item.label}</span>
                                            </p>
                                        </div>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <button type="button" className="btn search-model-close" onClick={handleClose}>
                        <i className="las la-times"></i>
                    </button>
                </Modal.Body>

            </Modal>
        </React.Fragment>
    )
}
export default MobileHeaderSearchModel