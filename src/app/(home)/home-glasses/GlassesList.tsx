"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import thumb1 from "@assets/images/home-glasses/thumb-01.jpg"
import thumb2 from "@assets/images/home-glasses/thumb-02.jpg"
import thumb4 from "@assets/images/home-glasses/thumb-04.jpg"
import thumb5 from "@assets/images/home-glasses/thumb-05.jpg"
import thumb6 from "@assets/images/home-glasses/thumb-06.jpg"
import thumb7 from "@assets/images/home-glasses/thumb-07.jpg"
import thumb8 from "@assets/images/home-glasses/thumb-08.jpg"
import thumb9 from "@assets/images/home-glasses/thumb-09.jpg"
import thumb10 from "@assets/images/home-glasses/thumb-10.jpg"
import thumb11 from "@assets/images/home-glasses/thumb-11.jpg"
import thumb12 from "@assets/images/home-glasses/thumb-12.jpg"

const GlassesList = () => {

    return (
        <React.Fragment>
            <section className="kalles-glasses-vertical-products border-top py-5">
                <div className="container my-4">
                    <div className="row g-2">
                        <div className="col-md-6 col-lg-3">
                            <h5 className="widget-title mb-4">MOST REVIEW</h5>

                            <div className="vstack gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb1} alt="Thumb1Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Vintage Aviator Sunglasses</Link></h6>
                                        <p className="mb-0 text-muted">$155.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb2} alt="Thumb2Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Ray-ban/Hexagonal Flat Lenses</Link></h6>
                                        <p className="mb-0 text-muted">$205.00 - $259.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb1} alt="Thumb1Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Ray-ban Gold Flat Lenses</Link></h6>
                                        <p className="mb-0 text-muted">$205.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5 className="widget-title mb-4">TOP RATE</h5>

                            <div className="vstack gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb4} alt="Thumb4Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Vintage Aviator Sunglasses</Link></h6>
                                        <p className="mb-0 text-muted">$155.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb5} alt="Thumb5Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Miu Miu/Core Collection MU 08RS</Link></h6>
                                        <p className="mb-0 text-muted">$405.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb6} alt="Thumb6Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Miu Miu/Core Collection MU 59US</Link></h6>
                                        <p className="mb-0 text-muted">$388.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5 className="widget-title mb-4">RECENT ITEMS</h5>

                            <div className="vstack gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb7} alt="Thumb7Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Miu Miu/NOIR Glasses</Link></h6>
                                        <p className="mb-0 text-muted">$205.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb8} alt="Thumb8Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Miu Miu/Core Collection MU 59US</Link></h6>
                                        <p className="mb-0 text-muted">$388.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb9} alt="Thumb9Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Ray-ban/Hexagonal Flat Lenses</Link></h6>
                                        <p className="mb-0 text-muted">$205.00 - $259.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3">
                            <h5 className="widget-title mb-4">POPULAR ITEMS</h5>

                            <div className="vstack gap-3">
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb10} alt="Thumb10Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Ray-ban/Hexagonal Flat Lenses</Link></h6>
                                        <p className="mb-0 text-muted">$205.00 - $259.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb11} alt="Thumb11Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Miu Miu/Core Collection MU 59US</Link></h6>
                                        <p className="mb-0 text-muted">$450.00</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <Image src={thumb12} alt="Thumb12Img" className="img-fluid flex-shrink-0" priority />
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h6 className="font-montserrat text-truncate mb-1"><Link href="#!" className="main_link_mustard">Ray-ban/Hexagonal Flat Lenses</Link></h6>
                                        <p className="mb-0 text-muted">$320.00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default GlassesList