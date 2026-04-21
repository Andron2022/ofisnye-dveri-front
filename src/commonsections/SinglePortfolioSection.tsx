"use client";
import React from "react";
import portfolio4 from "@assets/images/portfolio/p-04.jpg";

const SinglePortfolioSection = () => {
    return (
        <React.Fragment>
            <div style={{backgroundImage:`url(${portfolio4.src})`}} className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className="px-4">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">BRANDING DESIGN MOCKUP</h4>
                        <p className="fs-14 section-subtitle sub-title font-secondary fst-italic">April 5, 2020</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default SinglePortfolioSection