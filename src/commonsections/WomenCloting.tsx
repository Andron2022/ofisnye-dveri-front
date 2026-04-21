"use client";
import React from "react";
import shopBanner from '@assets/images/shop/shop-banner.jpg'

const WomenColting = () => {
    return (
        <React.Fragment>
            <div style={{backgroundImage:`url(${shopBanner.src})`,backgroundPosition:'center'}}  className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className=" container">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">Women</h4>
                        <p className="fs-14">Shop through our latest selection of Women’s Clothing and Accessories.</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default WomenColting