"use client";
import React from 'react'
import Link from 'next/link'

import blog1 from "@assets/images/blog/blog-01.jpg"
import blog2 from "@assets/images/blog/blog-02.jpg"
import blog3 from "@assets/images/blog/blog-03.jpg"

const blogData = [
    {
        pic: blog1,
        title: "Spring – Summer Trending 2020",
    },
    {
        pic: blog2,
        title: "The Easiest Way to Break Out on Top",
    },
    {
        pic: blog3,
        title: "Style for couple in Weeding season",
    }
]

const LatestBlogs = () => {
    return (
        <React.Fragment>
            <section className="kalles-section_type_featured_blog latest-blogs">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-4 pb-2">
                                <div className="mb-2">
                                    <h3 className="section-title position-relative flex text-uppercase">
                                        <span style={{ whiteSpace: 'nowrap' }}>Latest from Blog</span>
                                    </h3>
                                </div>
                                <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">The freshest and most exciting news</span>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 blog-arrow kalles-blog-grid" data-flickity='{"imagesLoaded": 0, "adaptiveHeight": 0, "contain": 1, "groupCells": "100%", "dragThreshold": 5, "cellAlign": "left", "wrapAround": true, "prevNextButtons": true, "percentPosition": 1, "pageDots": false, "autoPlay": 0, "pauseAutoPlayOnHover": true }' dir="ltr">
                        {blogData.map((item, index) => (
                            <div key={index} className="col-md-4 px-2 slideshow__slide"  >
                                <div
                                    // href="/blog-left-sidebar" 
                                    className="blog-card d-block blog-wrap">
                                    <div className="blog_grid overflow-hidden">
                                        <div className="blog_grid_img w-100 position-relative" style={{ background: `url(${item.pic.src}) center no-repeat`, backgroundSize: "cover", height: "254px" }}>
                                        </div>
                                    </div>
                                    <h6 className="fs-16 mt-3 main_link"><Link href="/blog-post-with-instagram-shop" className="text-reset">{item.title}</Link></h6>
                                    <div className="d-flex gap-1 align-items-center text-muted">
                                        <span className="me-1">By <span className="text-body">admin</span></span>
                                        On
                                        <span className="text-body">April 6, 2020</span>
                                    </div>
                                    <div className="post-content text-muted mt-3">Typography is the work of typesetters, compositors, typographers, graphic designers, art directors, manga artists, ...</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default LatestBlogs