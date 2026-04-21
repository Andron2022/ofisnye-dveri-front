"use client";
import React from "react";
import Link from "next/link";

const ShopNavbar = () => {
    return (
        <React.Fragment>
            <div className="d-none d-lg-block navbar navbar-expand-lg py-1 border-top">
                <ul className=" list-unstyled navbar-nav justify-content-center ">
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-full-width-layout">Accessories</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-1600px-layout">Bottom</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-filter-sidebar">Denim</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-right-sidebar">Dress</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-filter-sidebar">Jackets</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-left-sidebar">Jewellery</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-filter-sidebar">Men</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-left-sidebar">Shoes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-filter-sidebar">T-Shirt</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3" href="/shop-right-sidebar">Tops</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link px-3 text-teal" href="shop-filter-sidebar">Women</Link>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default ShopNavbar