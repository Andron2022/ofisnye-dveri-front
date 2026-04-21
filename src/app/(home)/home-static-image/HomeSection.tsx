"use client";
import React from 'react'
import Link from 'next/link'
import slide from "@assets/images/home-static-image/main-slide.jpg"

const HomeSection = () => {
    return (
        <React.Fragment>
            <section className="min-vh-100 kalles-categories-link-banner position-relative" style={{ backgroundImage: `url(${slide.src})` }}>
                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 text-white d-flex align-items-center justify-content-center">
                    <div className="p-3 p-md-0">
                        <h3 className="fs-18 font-secondary fst-italic mb-3">Summer Lookbook</h3>
                        <h1 className="text-uppercase fs-60 fw-bold mb-4">FLASH SALE 70% OFF</h1>
                        <Link href="/shop" className="btn btn-custom-white text-white fw-medium min-w-150 rounded-pill stretched-link">Shop
                            Now</Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default HomeSection