"use client";
import Link from 'next/link'
import React from 'react'

import post1 from  '@assets/images/home-kids/blog-post-01.jpg'
import post2 from  '@assets/images/home-kids/blog-post-02.jpg'
import post3 from  '@assets/images/home-kids/blog-post-03.jpg'
import Image from 'next/image'

const LatestBlog = () => {

  return (
    <React.Fragment>
        <section className="kalles-section_type_featured_blog py-0">
            <div className="container-fluid bg-white px-4 py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="text-center mb-4 pb-2">
                            <div className="mb-2">
                                <h2 className="position-relative kids-header"><span>LATES FROM BLOG</span></h2>
                            </div>
                            <span className="section-subtitle sub-title fs-14 text-muted">The freshest and most exciting news</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row g-4 blog-arrow" dir="ltr">
                            <div className="col-lg-4 col-sm-6">
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={post1} alt="Post1Img" className="img-fluid" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset font-futura fw-normal main_link_primary">Why February
                                            Babies
                                            Are Extra Special</Link></h6>
                                    <div className="post-content text-muted">Applying The Kids Design Guide Internet
                                        technology
                                        such
                                        as
                                        online retailers and social media platforms have given...</div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={post2} alt="Post2Img" className="img-fluid" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset font-futura fw-normal main_link_primary">The End Result
                                            Was
                                            Absolutely Amazing</Link></h6>
                                    <div className="post-content text-muted">Consumption as a share of gross domestic
                                        product in
                                        China
                                        has fallen for six decades, from 76 percent in 1952 to 28...</div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6">
                                <div className="blog-card">
                                    <Link href="/blog-left-sidebar" className="overflow-hidden d-block blog-wrap">
                                        <Image src={post3} alt="Post3Img" className="img-fluid" />
                                    </Link>
                                    <h6 className="fs-16 mt-3 main_link_primary mb-2"><Link href="/blog-post-with-instagram-shop" className="text-reset font-futura fw-normal main_link_primary">The Surprising
                                            Way
                                            Motherhood Changed Me</Link></h6>
                                    <div className="post-content text-muted">The End Result Was Absolutely Amazing As we
                                        undergo
                                        a
                                        global economic downturn, the “Spend now, think later” belief...</div>
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

export default LatestBlog