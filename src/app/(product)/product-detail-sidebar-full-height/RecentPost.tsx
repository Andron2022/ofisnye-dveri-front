"use client";
import React from "react";
import thumbnail1 from '@assets/images/blog-page/blog-thumbnail-01.jpg'
import thumbnail2 from '@assets/images/blog-page/blog-thumbnail-01.jpg'
import thumbnail3 from '@assets/images/blog-page/blog-thumbnail-01.jpg'
import Image from "next/image";

const RecentPost = () => {
    return (
        <React.Fragment>
            <div>
                <h5 className="mb-2 mt-3 mt-lg-4 fw-medium">Recent Post </h5>
                <div className="filter-title mb-4"></div>
                <div className="row">
                    <div className="col-4">
                        <Image src={thumbnail1} alt="Thumbnail1Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">Spring – Summer Trending 2020</h6>
                        <p className="text-muted mb-0">April 6, 2020</p>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-4">
                        <Image src={thumbnail2} alt="Thumbnail2Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">The Easiest Way to Break Out on Top</h6>
                        <p className="text-muted mb-0">April 6, 2020</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-4">
                        <Image src={thumbnail3} alt="Thumbnail3Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">Style for couple in Weeding season</h6>
                        <p className="text-muted mb-0">April 6, 2020</p>
                    </div>
                </div>
            </div>

            <div>
                <h5 className="mb-2 mt-3 mt-lg-5 fw-medium">Talk about your brand </h5>
                <div className="filter-title mb-4"></div>
                <p className="text-muted">
                    Use this text to share information about your brand with your customers. Describe a product, share announcements, or welcome customers to your store.
                </p>
            </div>
        </React.Fragment>
    )
}
export default RecentPost