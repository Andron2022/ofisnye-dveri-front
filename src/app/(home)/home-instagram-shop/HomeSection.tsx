"use client";
import React from 'react'
import Link from 'next/link'
import lookbook from "@assets/images/home-instagram-shop/loobook.jpg"

const HomeSection = () => {
    return (
        <React.Fragment>
            <section className="kalles-banner-parallax-layout-01 min-vh-100 position-relative" style={{ backgroundImage: `url(${lookbook.src})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center top' }}>
                <div className="position-absolute top-50 start-50 translate-middle text-white text-center my-5">
                    <h1 className="text-uppercase fs-60">Clearance sale off to 70%</h1>
                    <h3 className="fs-18 font-secondary fst-italic">Spring Collection 2021</h3>
                    <Link href="/shop" className="btn btn-custom-white text-white min-w-150 rounded-pill mt-4">Shop Now</Link>
                </div>
            </section>
        </React.Fragment>
    )
}
export default HomeSection