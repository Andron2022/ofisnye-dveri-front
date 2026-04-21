"use client";
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import blog1 from "@assets/images/home-lingerie/blog-01.png"
import blog2 from "@assets/images/home-lingerie/blog-02.jpg"
import blog3 from "@assets/images/blog/blog-03.jpg"

const Blogs = () => {

    const blog = [
        { id: 1, pic: blog1, title: "Holiday Capsule Collection", date: "July 23, 2024", desc: "Looking (and feeling) like a badass beach babe comes naturally when you’re wearing a strappy style. So, the Camilla..." },
        { id: 2, pic: blog2, title: "Best Swimsuits for Small Bust", date: "July 23, 2020", desc: "Don’t be mistaken ladies, you don’t need a large bust that fills out your bikini top for a flawless beach look. You..." },
        { id: 3, pic: blog3, title: "5 Best Swimsuits for Big Busts", date: "AJuly 23, 20200", desc: "Our top 5 Best Swimsuits for Big Busts Bikinis and a big bust are rarely two things that go together. Well, that is..." }
    ];

    return (
        <React.Fragment>
            <section className="kalles-section_type_featured_blog pt-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-4">
                                    <h3 className="position-relative flex text-capitalize font-futura fw-normal line-section-title">
                                        <span>POPULAR BLOG</span>
                                    </h3>
                                </div>
                                <p className="fs-14 text-muted mb-0">One-piece swimsuits are hotter than ever, offering styles that
                                    are even sexier than itsy bitsy bikinis!</p>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 ">
                        {blog.map((item) => (
                            <div className="col-md-4" key={item.id}>
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={item.pic} alt="ItemImg" className="img-fluid" />
                                    </Link>
                                    <h6 className="fs-17 mt-3 font-futura fw-medium main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.title}</Link></h6>
                                    <div className="d-flex gap-1 align-items-center text-muted">
                                        On
                                        <span className="text-body">{item.date}</span>
                                    </div>
                                    <div className="post-content text-muted mt-3">{item.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default Blogs