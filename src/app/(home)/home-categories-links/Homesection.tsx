"use client";
import React from 'react'
import Link from 'next/link'

const HomeSection = () => {
    return (
        <React.Fragment>
            <section className="min-vh-100 kalles-categories-link-banner position-relative">
                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 text-black d-flex align-items-center justify-content-center">
                    <div className="p-2">
                        <h1 className="text-uppercase fs-60 fw-bold mb-2">CLEARANCE SALE OFF TO 70%</h1>
                        <h3 className="fs-18 font-secondary fst-italic mb-4">Spring Collection 2020</h3>
                        <Link href="/shop" className="btn btn-custom-dark fw-medium min-w-150 rounded-pill">Shop
                            Now</Link>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default HomeSection