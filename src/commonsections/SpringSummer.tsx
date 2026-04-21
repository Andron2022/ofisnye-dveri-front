"use client";
import React from "react";
import image1 from '@assets/images/blog-page/single-header__bg.jpg'
const SpringSummer = () => {
    return (
        <React.Fragment>
            <div
                style={{
                    backgroundImage: `url(${image1.src})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                }}
                className="position-relative"
            >
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className="px-4">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">SPRING – SUMMER TRENDING 2020</h4>
                        <p className="fs-14 section-subtitle sub-title font-secondary fst-italic">April 6, 2020</p>
                        <p className="text-white mb-0">In Life Style 6 comments</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SpringSummer