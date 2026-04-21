"use client";
import React from 'react'
import Link from 'next/link'
import main from "@assets/images/home-fashion-9/main-slide.jpg"

const HomeSection=()=>{
    return(
        <React.Fragment>
             <section className=" kalles-categories-link-banner position-relative" style={{ backgroundImage: `url(${main.src})` }}>
                    <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 d-flex align-items-center justify-content-center">
                        <div>
                            <h3 className="fs-18 mb-3">SUMMER COLLECTION</h3>
                            <h1 className="text-uppercase fs-60 fw-bold mb-4">HUGE SALE 70% OFF</h1>
                            <Link href="/shop" className="btn btn-dark text-white fw-medium min-w-150 rounded-0">Men</Link>&nbsp;
                            <Link href="/shop" className="btn btn-dark text-white fw-medium min-w-150 rounded-0">Women</Link>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default HomeSection