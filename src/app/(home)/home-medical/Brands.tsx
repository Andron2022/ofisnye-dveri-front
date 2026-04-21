"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import logo1 from "@assets/images/home-medical/brand-logo-01.png"
import logo2 from "@assets/images/home-medical/brand-logo-02.png"
import logo3 from "@assets/images/home-medical/brand-logo-03.png"
import logo4 from "@assets/images/home-medical/brand-logo-04.png"
import logo5 from "@assets/images/home-medical/brand-logo-05.png"
import logo6 from "@assets/images/home-medical/brand-logo-06.png"
import logo7 from "@assets/images/home-medical/brand-logo-07.png"
import logo8 from "@assets/images/home-medical/brand-logo-08.png"
import logo9 from "@assets/images/home-medical/brand-logo-09.png"
import logo10 from "@assets/images/home-medical/brand-logo-10.png"
import logo11 from "@assets/images/home-medical/brand-logo-11.png"
import logo12 from "@assets/images/home-medical/brand-logo-12.png"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';

const Brands = () => {

    return (
        <React.Fragment>
            <section className="kellas-medical-brand-list bg-light position-relative">
                <div className="container">
                    <div className="row align-items-center mb-4">
                        <div className="col-md-6">
                            <h3 className="fs-26 mb-0 text-center text-md-start">Shop by brands</h3>
                        </div>
                    </div>
                    <div className="row align-items-center g-2">
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo1} alt="Logo1Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo2} alt="Logo2Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo3} alt="Logo3Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo4} alt="Logo4Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo5} alt="Logo5Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo6} alt="Logo6Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo7} alt="Logo7Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo8} alt="Logo8Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo9} alt="Logo9Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo10} alt="Logo10Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo11} alt="Logo11Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                        <div className="col-lg-3 col-md-4 col-6 col-xl-2 brand-item">
                            <Link href="#!" className="medical-logo">
                                <Image src={logo12} alt="Logo12Img" className="img-fluid mx-auto d-block" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Brands