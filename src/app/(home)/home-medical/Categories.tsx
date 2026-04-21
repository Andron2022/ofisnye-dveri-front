"use client";
import React from 'react'
import { Col, Container, Row, } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import cat1 from "@assets/images/home-medical/cat-01.jpg"
import cat2 from "@assets/images/home-medical/cat-02.jpg"
import cat3 from "@assets/images/home-medical/cat-03.jpg"
import cat4 from "@assets/images/home-medical/cat-04.jpg"
import cat5 from "@assets/images/home-medical/cat-05.jpg"
import cat6 from "@assets/images/home-medical/cat-06.jpg"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';


const categories = [
    {
        id: 1,
        pic: cat1,
        title: "Hospital Equipment",
        product: "19"
    },
    {
        id: 2,
        pic: cat2,
        title: "Blood Pressure",
        product: "5"
    },
    {
        id: 3,
        pic: cat3,
        title: "Medical Accessories",
        product: "5"
    },
    {
        id: 4,
        pic: cat4,
        title: "Personal",
        product: "8"
    },
    {
        id: 5,
        pic: cat5,
        title: "Independent Living",
        product: "8"
    },
    {
        id: 6,
        pic: cat6,
        title: "Pharmacy",
        product: "8"
    }
]

const Categories = () => {

    return (
        <React.Fragment>
            <section className="py-30 shop-categories">
                <Container>
                    <Row className="mt-3">
                        <Col lg={6}>
                            <h3 className="fs-26">Shop by categories</h3>
                        </Col>
                    </Row>
                    <Row className="mt-3 pb-5 blog-arrow g-2">
                        {categories.map((item) => (
                            <Col lg={2} md={4} sm={6} className="px-2 text-center" key={item.id}>
                                <div className="img-zoom">
                                    <Link href="/shop-left-sidebar" className="overflow-hidden d-inline-block">
                                        <Image src={item.pic} alt="ItemImg" className='img-fluid' />
                                    </Link>
                                    <div className="p-10 text-center">
                                        <h5 className="fw-medium mb-2">
                                            <Link href="/shop-left-sidebar" className="text-reset">{item.title}</Link>
                                        </h5>
                                        <p className="mb-0">{item.product} Products</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default Categories