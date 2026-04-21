"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import brand1 from "@assets/images/home-shoes/brand-01.png"
import brand2 from "@assets/images/home-shoes/brand-02.png"
import brand3 from "@assets/images/home-shoes/brand-03.png"
import brand4 from "@assets/images/home-shoes/brand-04.png"
import brand5 from "@assets/images/home-shoes/brand-05.png"
import brand6 from "@assets/images/home-shoes/brand-06.png"


const BrandList=()=>{
    return(
        <React.Fragment>
             <section className="kellas-medical-brand-list bg-light position-relative py-4 mt-2">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand1} alt="Brand1Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand2} alt="Brand2Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand3} alt="Brand3Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand4} alt="Brand4Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand5} alt="Brand5Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-6 col-md-4 p-3 p-lg-0 col-lg-2 brand-item">
                            <Link href="#!">
                                <Image src={brand6} alt="Brand6Img" className="img-fluid max-w-200 mx-auto d-block" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default BrandList