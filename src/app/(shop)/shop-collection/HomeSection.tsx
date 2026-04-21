"use client";
import React from "react";
import collection from '@assets/images/shop/collection-list/bg-heading.jpg'

const HomeSection = () => {
    return (
        <React.Fragment>
            <div style={{backgroundImage:`url(${collection.src})`,backgroundPosition:"center",backgroundSize:"cover"}}
            className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className=" container">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">
                            Collections</h4>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default HomeSection