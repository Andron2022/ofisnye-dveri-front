"use client";
import Link from 'next/link'
import React from 'react'
import { Col, Row } from 'react-bootstrap'

import category1 from "@assets/images/home-categories-links/cat-bn-01.jpeg"
import category2 from "@assets/images/home-categories-links/cat-bn-02.jpg"
import category3 from "@assets/images/home-categories-links/cat-bn-03.jpg"
import category4 from "@assets/images/home-categories-links/cat-bn-04.jpg"

import Image from 'next/image'


const catsection = [
    {
        id: 1,
        pic: category1,
        title: 'Footwear'
    },
    {
        id: 2,
        pic: category2,
        title: 'Bags'
    },
    {
        id: 3,
        pic: category3,
        title: 'Watches'
    },
    {
        id: 4,
        pic: category4,
        title: 'Caps & Hats'
    }
]

const CatSection = () => {
    return (
        <React.Fragment>
            <section className="cat-section pb-4">
                <div className="container-fluid ">
                    <Row className="g-lg-4 g-2">
                        {catsection.map((item) => (
                            <Col md={3} sm={6} key={item.id}>
                                <Link href="/shop" className="d-block position-relative cat_grid_item overflow-hidden h-100">
                                    <Image className="h-100 w-100 cat-grid-img" src={item.pic} alt="ItemImg" />
                                    <div className="cat-grid-button text-body">
                                        <div className="cat_grid_item__title">{item.title}</div>
                                    </div>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </div>
            </section>
        </React.Fragment>
    )
}
export default CatSection