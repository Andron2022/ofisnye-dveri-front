"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import { brandData, priceData, sizeData, vendorData } from '@src/common/shop/filterData'

const FilterSection = () => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => {
        setOpen(!open)
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
                <Row
                    className="m-sm-2 g-4 g-sm-2">

                    {/* color */}

                    <Col sm={6} className="col-lg-3">
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

                    <Col sm={6} className="col-lg-3">
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

                    <Col sm={6} className="col-lg-3">
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

                    <Col sm={6} className="col-lg-3 ">
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
        </React.Fragment>
    )
}
export default FilterSection