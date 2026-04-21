"use client";
import React from 'react'
import { Col} from 'react-bootstrap'
import Image from 'next/image'
import who from "@assets/images/home-flower/who-we-are.png"
import sign from "@assets/images/home-flower/we-sign.png"
import cat1 from "@assets/images/home-flower/cat-01.png"
import cat2 from "@assets/images/home-flower/cat-02.jpg"
import cat3 from "@assets/images/home-flower/cat-03.jpg"
import cat4 from "@assets/images/home-flower/cat-04.jpg"
import Link from 'next/link'

const CatSection=()=>{
    return(
        <React.Fragment>
            <section className="kalles-flower-type-section cat-section">
                    <div className="container">
                        <div className="row justify-content-center">
                            <Col lg={8}>
                                <div className="text-center">
                                    <Image src={who} alt="WhoImg" className="img-fluid d-block mx-auto" />
                                    <p className="text-muted mt-2">Kalles landscape is a full service design studio based in Studio
                                        City (California) offering landscape, planting, material, and layout plans.
                                        We focus on the spatial relations created in our designs so they are functional,
                                        meaningful, and aesthetically appealing
                                        to both the architectural style of the property and end user. </p>
                                    <Image src={sign} alt="SignImg" className="img-fluid d-block mx-auto" />
                                    <p className="text-muted mt-3">Camila Menson, owner of Kalles Flowers shop.</p>
                                </div>
                            </Col>
                        </div>
                        <div className="row g-lg-4 g-2 mt-2">
                            <div className="col-md-6">
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat1.src})` }}></div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Events</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3 col-6">
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300 mb-lg-4 mb-2">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat2.src})` }}></div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Accessories</div>
                                    </div>
                                </Link>
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-300">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat3.src})` }}></div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Wedding Decor</div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col-md-3 col-6">
                                <Link href="/shop-left-sidebar" className="d-block position-relative cat_grid_item overflow-hidden h-624">
                                    <div className="h-100 w-100 cat-grid-img" style={{ backgroundImage: `url(${cat4.src})` }}></div>
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">Home Decor</div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
    )
}
export default CatSection