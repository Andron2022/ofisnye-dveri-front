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
                        <Link className="nav-link pt-0 pe-3 d-flex" href="shop-full-width-layout">
                            <span><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>
                            Accessories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-1600px-layout">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Bottom</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-filter-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Denim</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="shop-right-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Dress</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-filter-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Jackets</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-left-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Jewellery</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-filter-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Men</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-left-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Shoes</Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-right-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Tops</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 text-teal d-flex" href="/shop-filter-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>Women</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link pt-0 pe-3 d-flex" href="/shop-filter-sidebar">
                            <span className="d-inline-flex"><i className="close_pp  pegk pe-7s-close ts__03 cd fs-20 fw-bold filter-close" style={{transform: "rotate(45deg)"}}></i></span>T-Shirt</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ProductCategories