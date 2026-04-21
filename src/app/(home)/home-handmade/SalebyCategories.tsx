"use client";
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import cat1 from "@assets/images/home-hand-made/cat-circular-01.png"
import cat2 from "@assets/images/home-hand-made/cat-circular-02.png"
import cat3 from "@assets/images/home-hand-made/cat-circular-03.png"
import cat4 from "@assets/images/home-hand-made/cat-circular-04.png"
import cat5 from "@assets/images/home-hand-made/cat-circular-05.png"
import Image from 'next/image'
import Link from 'next/link'

const category = [
    { id: 1, pic: cat1, name: "Hospital Equipment", product: 7 },
    { id: 2, pic: cat2, name: "Blood Pressure", product: 15 },
    { id: 3, pic: cat3, name: "Accessories", product: 12 },
    { id: 4, pic: cat4, name: "Personal", product: 18 },
    { id: 5, pic: cat5, name: "Independent Living", product: 8 },
]

const SalebyCategories = () => {
    return (
        <React.Fragment>
            <section className="type_tab_collection kalles-glasses-tab-product pb-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex fw-semibold font-avenir">
                                        <span>Shop by Categories</span>
                                    </h3>
                                </div>
                                <span className="fs-14 text-muted">Making & crafting</span>
                            </div>
                        </div>
                    </div>
                    <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
                        {category.map((item) => (
                            <Col key={item.id}>
                                <div className="position-relative">
                                    <Link href="#!"><Image src={item.pic} alt="ItemImg" className="img-fluid rounded-circle" /></Link>
                                    <div className="mt-3 text-center">
                                        <h5 className="fw-medium">{item.name}</h5>
                                        <p className="text-muted">{item.product} products</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}

export default SalebyCategories