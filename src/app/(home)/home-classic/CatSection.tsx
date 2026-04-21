"use client";
import React from 'react'
import Link from 'next/link';
import women from "@assets/images/home-classic/cat-women.jpg"
import men from "@assets/images/home-classic/cat-men.jpg"
import bags from "@assets/images/home-classic/cat-bags.jpg"
import footwear from "@assets/images/home-classic/cat-footerwear.jpg"
import watch from "@assets/images/home-classic/cat-watch.jpg"


const CatSection = () => {

    return (
        <React.Fragment>
            <section className="cat-section">
                <div className="container">
                    <div className="row g-xl-4 g-2">
                        <div className="col-md-6">
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-570">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${women.src})` }}></div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Women</div>
                                </div>
                            </Link>
                            <div className="row gx-xl-4 gx-2 mt-xl-4 mt-2">
                                <div className="col-6">
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${bags.src})` }}></div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Bags</div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-6">
                                    <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                        <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${footwear.src})` }}>
                                        </div>
                                        <div className="cat-grid-button text-body">
                                            <div className="cat_grid_item__title">Footwear</div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-xl-4 mb-2">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${men.src})`, backgroundPosition: "center" }}>
                                </div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Men</div>
                                </div>
                            </Link>
                            <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-570">
                                <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${watch.src})`, backgroundPosition: "center" }}>
                                </div>
                                <div className="cat-grid-button text-body">
                                    <div className="cat_grid_item__title">Watch</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default CatSection