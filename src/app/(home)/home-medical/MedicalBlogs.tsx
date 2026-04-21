"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import Link from 'next/link'

import post1 from "@assets/images/home-medical/post-thumb-01.jpg"
import post2 from "@assets/images/home-medical/post-thumb-02.jpg"
import post3 from "@assets/images/home-medical/post-thumb-03.jpg"
import post4 from "@assets/images/home-medical/post-thumb-04.jpg"

import 'flickity/css/flickity.css';
import 'swiper/css';
import 'swiper/css/pagination';


const blogPosts = [
    {
        title: "Coronavirus latest: at a glance",
        date: "Feb 28, 2024",
        image: post1,
        content: "Spain’s death rate continues to fall. The country reported 399 deaths in 24 hours, lower than Sunday’s figure of 41...",
        link: "/blog-post-with-instagram-shop"
    },
    {
        title: "WHO warns that few have developed antibodies to Covid-19",
        date: "Feb 28, 2024",
        image: post2,
        content: "Only a tiny proportion of the global population – maybe as few as 2% or 3% – appear to have antibodies in the blood...",
        link: "/blog-post-with-instagram-shop"
    },
    {
        title: "Healthcare workers confronted anti-lockdown protesters",
        date: "Feb 28, 2024",
        image: post3,
        content: "But a standout image by photographer Alyson McClaran came on Sunday from Denver, Colorado. As protesters gathered...",
        link: "/blog-post-with-instagram-shop"
    },
    {
        title: "The stress of giving birth under lockdown",
        date: "Feb 28, 2024",
        image: post4,
        content: "Helen Simmons, a 28-year-old film producer from London, went into labor with her second child on the evening...",
        link: "/blog-post-with-instagram-shop"
    }
];

const MedicalBlogs = () => {

    return (
        <React.Fragment>
            <section className="kalles-medical-blog-post shop-categories">
                <Container>
                    <Row className="justify-content-between align-items-center mb-4">
                        <Col className="col-auto">
                            <h3 className="fs-26 mb-0">From our Blog</h3>
                        </Col>
                        <Col className="col-auto text-end">
                            <Link href="#!" className="main_link_primary text-decoration-underline">See all Posts</Link>
                        </Col>
                    </Row>
                    <Row className="g-lg-4 g-3 pt-lg-4 blog-arrow pb-5 pb-lg-0">
                        {blogPosts.map((post, index) => (
                            <Col key={index} lg={3} sm={6} className="my-3 my-lg-0 px-2">
                                <div className="blog-card">
                                    <Link href={post.link} className="overflow-hidden d-block blog-wrap">
                                        <Image src={post.image} alt="PostImg" className="w-100 object-fit-cover" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_primary text-truncate"><Link href="/blog-post-with-instagram-shop" className="text-reset">Coronavirus latest: at
                                        a glance</Link></h6>
                                    <div className="d-flex gap-1 align-items-center">
                                        on Feb 28, 2024
                                    </div>
                                    <div className="post-content text-muted mt-3">Spain’s death rate continues to fall The country
                                        reported 399 deaths in 24 hours, lower than Sunday’s figure of 41...</div>
                                    {/* <Card.Body>
                                            <Card.Title className="fs-16 mt-3 main_link_primary text-truncate">
                                                <Link href={post.link} className="text-reset">{post.title}</Link>
                                            </Card.Title>
                                            <div className="d-flex gap-1 align-items-center">
                                                on {post.date}
                                            </div>
                                            <Card.Text className="post-content text-muted mt-3">
                                                {post.content}
                                            </Card.Text>
                                        </Card.Body> */}
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default MedicalBlogs