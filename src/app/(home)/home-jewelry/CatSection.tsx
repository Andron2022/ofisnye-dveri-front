"use client";
import React from 'react'
import Link from 'next/link'
import banner1 from "@assets/images/home-jewelry/banner-collection-01.png"
import banner2 from "@assets/images/home-jewelry/banner-collection-02.png"
import banner3 from "@assets/images/home-jewelry/banner-collection-03.png"
import banner4 from "@assets/images/home-jewelry/banner-collection-04.png"
import banner5 from "@assets/images/home-jewelry/banner-collection-05.png"

const CatSection = () => {
  return (
    <React.Fragment>
         <section className="cat-section pb-4">
        <div className="container">
            <div className="row g-2 g-md-4">
                <div className="col-md-3">
                    <div className="row g-2 g-md-4">
                        <div className="col-6 col-md-12">
                            <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden shops-img">
                                <div className="h-100 w-100" style={{backgroundImage: `url(${banner1.src})`, backgroundSize: 'cover'}}>
                                </div>
                                <div className="cat-grid-button text-white bg-dark">
                                    <div className="cat_grid_item__title">BRACELETS</div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-6 col-md-12">
                            <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden shops-img">
                                <div className="h-100 w-100" style={{backgroundImage: `url(${banner5.src})`, backgroundSize: 'cover'}}>
                                </div>
                                <div className="cat-grid-button text-white bg-dark">
                                    <div className="cat_grid_item__title">NECKLACE</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="row g-2 g-md-4">
                        <div className="col-lg-12">
                            <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden shops-img">
                                <div className="h-100 w-100" style={{backgroundImage: `url(${banner2.src})`, backgroundSize: 'contain', backgroundPosition: "center"}}>
                                </div>
                            </Link>
                        </div>
                        <div className="col-lg-12">
                            <Link href="/shop" className="d-none d-md-block position-relative cat_grid_item overflow-hidden shops-img">
                                <div className="h-100 w-100" style={{backgroundImage: `url(${banner4.src})`, backgroundPosition: "center"}}>
                                </div>
                                <div className="cat-grid-button text-white bg-dark">
                                    <div className="cat_grid_item__title">ENGAGEMENT</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 mt-0">
                    <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-524">
                        <div className="h-100 w-100" style={{backgroundImage: `url(${banner3.src})`, backgroundSize: 'cover'}}>
                        </div>
                        <div className="cat-grid-button text-white bg-dark">
                            <div className="cat_grid_item__title">ACCESSORIES</div>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-12 d-md-none">
                    <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden shops-img">
                        <div className="h-100 w-100" style={{backgroundImage: `url(${banner4.src})`, backgroundSize: 'cover', backgroundPosition: "center"}}>
                        </div>
                        <div className="cat-grid-button text-white bg-dark">
                            <div className="cat_grid_item__title">ENGAGEMENT</div>
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