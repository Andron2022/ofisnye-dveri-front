"use client";
import React from 'react'
import Link from 'next/link'

import blog1 from "@assets/images/home-electronic/blog-thumb-01.jpg"
import blog2 from "@assets/images/home-electronic/blog-thumb-02.jpg"
import blog3 from "@assets/images/home-electronic/blog-thumb-03.jpg"
import Image from 'next/image'

const Blog = () => {
  return (
    <React.Fragment>
        <section className="kalles-section_type_featured_blog kalles-decor-02-blog-post">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-7">
                    <div className="text-center mb-4 pb-2">
                        <div className="mb-2">
                            <h3 className="section-title position-relative flex">
                                <span>LATES FROM BLOG</span>
                            </h3>
                        </div>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">The freshest
                            and most exciting news</span>
                    </div>
                </div>
            </div>
            <div className="row g-4 blog-arrow" data-flickity='{"imagesLoaded": 0, "adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold": 5, "cellAlign": "left", "wrapAround": true, "prevNextButtons": true, "percentPosition": 1, "pageDots": false, "autoPlay": 0, "pauseAutoPlayOnHover": true }' dir="ltr">
                <div className="col-sm-6 col-lg-4 px-2">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog1} alt="Blog1Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_mustard lh-base"><Link href="/blog-post-with-instagram-shop" className="text-reset">Dial and Disc Wireless Chargers home office from Sum</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            By
                            <span className="text-body">admin</span>
                            On
                            <span className="text-body">February 21, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">Sleek, minimalist wireless charging designs to
                            &quot;complement and blend within the home and office&quot;.</div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 px-2">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog2} alt="Blog2Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_mustard lh-base"><Link href="/blog-post-with-instagram-shop" className="text-reset">The Headphones Can Translate 11 Languages Wireless Speaker</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            By
                            <span className="text-body">admin</span>
                            On
                            <span className="text-body">February 21, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">These 3-in-1 headphones can snap together and turn
                            into a wireless speaker.</div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-4 px-2">
                    <div className="blog-card">
                        <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                            <Image src={blog3} alt="Blog3Img" className="blog-img object-fit-cover w-100" />
                        </Link>
                        <h6 className="fs-16 mt-3 main_link_mustard lh-base"><Link href="/blog-post-with-instagram-shop" className="text-reset">Microsoft’s Top Secret Surface Headphones Project Revealed</Link></h6>
                        <div className="d-flex gap-1 align-items-center text-muted">
                            On
                            <span className="text-body">February 21, 2024</span>
                        </div>
                        <div className="post-content text-muted mt-3">Microsoft unveils the cool grey, minimalist
                            voice-controlled Surface Headphones.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </React.Fragment>
  )
}

export default Blog