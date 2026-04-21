"use client";
import React from "react";
import Link from "next/link";

const ProductCategories = () => {
    return (
        <React.Fragment>
            <div>
                <h5 className="mb-2 mt-3"> Product Categories </h5>
                <div className="filter-title mb-4"></div>
                <ul className=" list-unstyled mb-4 navbar-nav justify-content-center ">
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span>
                            Accessories (24)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex">
                                <i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i>
                            </span> Bottom (13)
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex">
                                <i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i>
                                </span> Denim (6)
                                </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex">
                                <i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i>
                                </span>Dress (7)
                            </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span> Jackets (6)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span> Jewellery (9)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span> Men (18)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span> Shoes (7)</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="#!">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span>Tops (8)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 text-teal d-flex" href="#!">
                            <span className="d-inline-flex d-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span>Women (39)</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3" href="#!">
                            <span className="d-inline-flex d-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{ transform: " rotate(45deg)" }}></i></span>T-Shirt (9)</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ProductCategories