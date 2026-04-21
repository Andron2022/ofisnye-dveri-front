"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import men from "@assets/images/home-static-image/shop-men.jpg"
import women from "@assets/images/home-static-image/shop-women.jpg"
import girl from "@assets/images/home-static-image/hipster_girl.jpg"

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section pb-4 ">
                <div className="container-fluid">
                    <div className="row g-xl-4 g-3">
                        <div className="col-xl-4 col-md-6">
                            <Link href="/shop" className="d-inline-flex">
                                <Image src={men} alt="MenImg" className="img-fluid" />
                            </Link>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <Link href="/shop" className="d-inline-flex">
                                <Image src={women} alt="WomenImg" className="img-fluid" />
                            </Link>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <Link href="/shop" className="d-inline-flex">
                                <Image src={girl} alt="GirlImg" className="img-fluid" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default CatSection