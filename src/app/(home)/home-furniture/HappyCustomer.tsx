"use client";
import React from 'react'
import customer1 from "@assets/images/home-furniture/customer-01.jpg"
import customer2 from "@assets/images/home-furniture/customer-02.jpg"
import customer3 from "@assets/images/home-furniture/customer-03.jpg"
import Image from 'next/image'

const HappyCustomer=()=>{
    return(
        <React.Fragment>
            <section className="kalles-furniture-testimonial">
                    <div className="container">
                        <div className="row">
                            <div className="col-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="61px" height="54px">
                                    <path fillRule="evenodd" fill="rgb(41, 51, 65)" d="M57.426,49.283 L46.839,49.283 L42.422,53.653 C42.190,53.884 41.885,53.999 41.580,53.999 C41.275,53.999 40.970,53.884 40.738,53.653 L36.321,49.283 L25.734,49.283 C23.764,49.283 22.160,47.696 22.160,45.746 L22.160,45.409 L20.262,47.287 C20.030,47.517 19.725,47.632 19.420,47.632 C19.115,47.632 18.810,47.517 18.577,47.287 L14.161,42.916 L3.574,42.916 C1.603,42.916 0.000,41.329 0.000,39.379 L0.000,17.685 C0.000,15.734 1.603,14.147 3.574,14.147 L11.080,14.147 L11.080,3.536 C11.080,1.586 12.683,-0.001 14.654,-0.001 L46.346,-0.001 C48.316,-0.001 49.920,1.586 49.920,3.536 L49.920,20.515 L57.426,20.515 C59.397,20.515 61.000,22.101 61.000,24.051 L61.000,45.746 C61.000,47.696 59.397,49.283 57.426,49.283 ZM11.080,25.231 L11.080,16.505 L3.574,16.505 C2.917,16.505 2.383,17.035 2.383,17.685 L2.383,39.379 C2.383,40.029 2.917,40.558 3.574,40.558 L14.654,40.558 C14.970,40.558 15.273,40.682 15.497,40.903 L19.420,44.786 L23.343,40.903 C23.566,40.682 23.870,40.558 24.185,40.558 L35.266,40.558 C35.923,40.558 36.457,40.029 36.457,39.379 L36.457,28.768 L35.759,28.768 L31.342,33.139 C31.110,33.368 30.805,33.483 30.500,33.483 C30.195,33.483 29.890,33.368 29.657,33.139 L25.241,28.768 L14.654,28.768 C12.683,28.768 11.080,27.181 11.080,25.231 ZM47.537,3.536 C47.537,2.886 47.003,2.358 46.346,2.358 L14.654,2.358 C13.997,2.358 13.463,2.886 13.463,3.536 L13.463,25.231 C13.463,25.881 13.997,26.409 14.654,26.409 L25.734,26.409 C26.050,26.409 26.353,26.534 26.577,26.755 L30.500,30.637 L34.423,26.755 C34.647,26.534 34.950,26.409 35.266,26.409 L46.346,26.409 C47.003,26.409 47.537,25.881 47.537,25.231 L47.537,3.536 ZM58.617,24.051 C58.617,23.401 58.083,22.872 57.426,22.872 L49.920,22.872 L49.920,25.231 C49.920,27.181 48.316,28.768 46.346,28.768 L38.840,28.768 L38.840,39.379 C38.840,41.329 37.236,42.916 35.266,42.916 L24.679,42.916 L24.543,43.050 L24.543,45.746 C24.543,46.396 25.077,46.925 25.734,46.925 L36.814,46.925 C37.130,46.925 37.433,47.049 37.657,47.270 L41.580,51.152 L45.503,47.270 C45.727,47.049 46.030,46.925 46.346,46.925 L57.426,46.925 C58.083,46.925 58.617,46.396 58.617,45.746 L58.617,24.051 ZM41.580,22.165 L25.266,22.165 C24.608,22.165 24.075,21.637 24.075,20.986 C24.075,20.335 24.608,19.807 25.266,19.807 L41.580,19.807 C42.238,19.807 42.771,20.335 42.771,20.986 C42.771,21.637 42.238,22.165 41.580,22.165 ZM41.580,15.562 C41.267,15.562 40.959,15.436 40.738,15.217 C40.516,14.997 40.389,14.694 40.389,14.384 C40.389,14.074 40.516,13.769 40.738,13.550 C40.959,13.330 41.267,13.204 41.580,13.204 C41.893,13.204 42.201,13.330 42.422,13.550 C42.644,13.769 42.771,14.074 42.771,14.384 C42.771,14.694 42.644,14.997 42.422,15.217 C42.201,15.436 41.893,15.562 41.580,15.562 ZM41.580,8.960 L19.437,8.960 C18.780,8.960 18.246,8.432 18.246,7.781 C18.246,7.129 18.780,6.601 19.437,6.601 L41.580,6.601 C42.238,6.601 42.771,7.129 42.771,7.781 C42.771,8.432 42.238,8.960 41.580,8.960 ZM18.246,14.384 C18.246,13.732 18.780,13.204 19.437,13.204 L35.664,13.204 C36.322,13.204 36.855,13.732 36.855,14.384 C36.855,15.034 36.322,15.562 35.664,15.562 L19.437,15.562 C18.780,15.562 18.246,15.034 18.246,14.384 ZM19.420,19.807 L19.520,19.807 C20.178,19.807 20.711,20.335 20.711,20.986 C20.711,21.637 20.178,22.165 19.520,22.165 L19.420,22.165 C18.762,22.165 18.228,21.637 18.228,20.986 C18.228,20.335 18.762,19.807 19.420,19.807 Z">
                                    </path>
                                </svg>
                            </div>
                            <div className="col">
                                <h6 className="fs-16 mb-1 sub-title">52.910 + HAPPY CUSTOMERS</h6>
                                <h1 className="title fw-light font-roboto-slab">What folks are saying about us</h1>
                            </div>
                        </div>
                        <div className="quotes_wrapper row g-0">
                            <div className="col-lg-4 col-md-6">
                                <div className="quote_slide border">
                                    <p className="text-muted fs-16">Really good design/documentation, pretty much everything is
                                        nicely
                                        setup. Support team is very responsive to problems. Highly recommended to everyone! I’m
                                        your
                                        fan already</p>
                                    <div className="d-flex align-items-center gap-4 mt-4 pt-2">
                                        <Image src={customer1} alt="Customer1Img" className="square-md rounded-circle" />
                                        <div>
                                            <h6 className="quote_author mb-0 text-uppercase">ARTHUR HANSEN</h6>
                                            <p className="text-muted mb-0">CEO / Letters Inc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="quote_slide border">
                                    <p className="text-muted fs-16">What an amazing theme and customer support!!! I knew I chose
                                        well
                                        with you, guys!! I am not a developer, I just adjust things I can manage, but everything
                                        was
                                        so easy customizing the theme.</p>
                                    <div className="d-flex align-items-center gap-4 mt-4 pt-2">
                                        <Image src={customer2} alt="Customer2Img" className="square-md rounded-circle" />
                                        <div>
                                            <h6 className="quote_author mb-0 text-uppercase">ANNIE QUINN</h6>
                                            <p className="text-muted mb-0">Co-Founder / April Inc</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="quote_slide border">
                                    <p className="text-muted fs-16">Octopus templates are awesome and very contemporary. They are
                                        super
                                        sleek and fast. The best is the customer support. Usually response is less than 30
                                        minutes.
                                        Love it.</p>
                                    <div className="d-flex align-items-center gap-4 mt-4 pt-2">
                                        <Image src={customer3} alt="Customer3Img" className="square-md rounded-circle" />
                                        <div>
                                            <h6 className="quote_author mb-0 text-uppercase">CHESTER TORRES</h6>
                                            <p className="text-muted mb-0">VP of Product / Local Inc</p>
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
export default HappyCustomer