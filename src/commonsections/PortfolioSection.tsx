"use client";
import React from "react";
import heading from '@assets/images/shop/collection-list/bg-heading.jpg';
const PortfolioSection = () => {
    return (
        <React.Fragment>
            <div style={{ backgroundImage: `url(${heading.src})`, backgroundPosition: 'left center', backgroundSize: "cover" }} className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className="px-4">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">PORTFOLIO</h4>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default PortfolioSection