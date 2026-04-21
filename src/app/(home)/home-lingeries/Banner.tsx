"use client";
import React from 'react'
import { Col } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'
import banner1 from "@assets/images/home-lingerie/line-banner-01.jpg"
import banner2 from "@assets/images/home-lingerie/line-banner-02.jpg"

const Banner=()=>{

    const banner = [
        { id: 1, pic: banner1, title: "Summer Wear", day: "Collection 2024",extraclass:"justify-content-end" }, { id: 2, pic: banner2, title: "Trending Item", day: "Sale Of The Day" }
    ];

    return(
        <React.Fragment>
              <div className="banner-section position-relative mt-5 pt-4">
                <div className="container">
                    <div className="row g-4">
                        {banner.map((item) => (
                            <Col md={6} key={item.id}>
                                <Link href="#!" className="position-relative hover-zoom d-block">
                                    <Image src={item.pic} alt="ItemImg" className="img-fluid hover-zoom-img w-100" />
                                    <div className={`position-absolute start-0 start-0 end-0 top-0 bottom-0 d-flex align-items-center  mx-4 ${item.extraclass}`}>
                                        <div className="text-white text-end">
                                            <h4 className="fs-24 font-futura fw-medium mb-4">{item.title} <br /> {item.day}</h4>
                                            <p className="fw-normal font-futura mb-0 btn_icon_true d-inline-block position-relative fs-14">
                                                Explore Now</p>
                                        </div>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </div>
                </div>
            </div>

            <section className="kalles-lingerie-newsletter">
                <div className="container py-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-10">
                            <h1 className="font-futura fs-45 fw-medium text-center">Get Daily Update For Deals & Exclusive Discount
                            </h1>
                        </div>
                    </div>
                    <div className="row justify-content-center mt-4 pt-2">
                        <div className="col-lg-7 col-md-10">
                            <form action="#!" className="signup-newsletter-form row g-0">
                                <div className="col-md col-12">
                                    <input type="email" name="email" placeholder="Your email address" className="form-control bg-transparent shadow-none border-0" required />
                                </div>
                                <div className="col-md-auto col-12">
                                    <button type="submit" className="btn_icon_true btn bg-dark border-dark rounded-0 text-white w-100 w-md-auto">
                                        Subscribe{" "}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Banner