"use client";
import React from 'react'
import Image from 'next/image'

import Link from 'next/link';
import br1 from "@assets/images/home-bags/br1.png"
import br2 from "@assets/images/home-bags/br2.png"
import br3 from "@assets/images/home-bags/br3.png"
import br4 from "@assets/images/home-bags/br4.png"
import br5 from "@assets/images/home-bags/br5.png"
import br6 from "@assets/images/home-bags/br6.jpg"
import br7 from "@assets/images/home-bags/br7.jpg"
import br8 from "@assets/images/home-bags/br8.jpg"
import br9 from "@assets/images/home-bags/br9.jpg"
import br10 from "@assets/images/home-bags/br10.jpg"

import 'flickity/css/flickity.css';


const OurPartners=()=>{
    return(
        <React.Fragment>
                 <section className="kalles-bags-brand">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="text-center pb-3">
                                    <div className="mb-2">
                                        <h1>OUR PARTNERS</h1>
                                    </div>
                                    <span className="fs-14 text-uppercase ls-normal text-muted">WHO WE WORK WITH</span>
                                </div>
                            </div>
                        </div>
                        <div className="row row-cols-2 row-cols-md-5 justify-content-center">
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br1} alt="Br1Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br2} alt="Br2Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br3} alt="Br3Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br4} alt="Br4Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br5} alt="Br5Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br6} alt="Br6Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br7} alt="Br7Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br8} alt="Br8Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br9} alt="Br9Img" className="img-fluid" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="#!" className="text-center d-inline-block mt-4">
                                    <Image src={br10} alt="Br10Img" className="img-fluid" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default OurPartners