"use client";
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import banner1 from "@assets/images/home-sport/banner-collection-01.jpg"
import banner2 from "@assets/images/home-sport/banner-collection-02.jpg"
import banner3 from "@assets/images/home-sport/banner-collection-03.jpg"

const data = [
    { id: 1, pic: banner1, name: "ACCESSORIES", desc: "FOR MEN", label: false },
    { id: 2, pic: banner2, name: "TRAINING CLOTHING", desc: "FOR WOMEN", label: false },
    { id: 3, pic: banner3, name: "-50% OFF", desc: "SUMMER SALE", label: true }
]

const Banner = () => {
    return (
        <React.Fragment>
            <section className="py-30">
                <div className="container">
                    <div className="row g-3">
                        {data.map((item) => (
                            <div className="col-md-6 col-lg-4" key={item.id}>
                                <Link href="/shop" className="d-inline-block kalles-medical-banner-01 position-relative img-zoom w-100">
                                    <Image src={item.pic} alt="ItemImg" className="w-100 img-fluid" />
                                   { item.label === true
                                    ?
                                    <div className="content position-absolute text-white start-50 translate-middle text-center w-100">
                                        <div>
                                            <h3 className="font-montserrat fw-bold fs-60 text-uppercase">{item.name}</h3>
                                            <p className="text-uppercase fs-16 fw-semibold mb-1">{item.desc}</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="content position-absolute text-white">
                                        <p className="text-uppercase fs-16 fw-semibold mb-1">{item.name}</p>
                                        <h3 className="font-montserrat fw-bold fs-36 text-uppercase">{item.desc}</h3>
                                    </div>
                                    }
                                </Link>
                            </div>
                        ))}
                       
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Banner