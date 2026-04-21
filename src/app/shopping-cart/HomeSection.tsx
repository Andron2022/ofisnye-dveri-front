"use client";
import React from "react";
import shoppingCart from '@assets/images/shopping-cart/shopping-cart-head.jpg'

const HomeSection = () => {
    return (
        <React.Fragment>
            <div style={{ backgroundImage: `url(${shoppingCart.src})`, backgroundSize: "cover", backgroundPosition: "center" }} className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className=" container">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">
                            SHOPPING CART</h4>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default HomeSection