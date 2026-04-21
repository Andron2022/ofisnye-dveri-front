"use client";
import React from 'react'

const Shipping = () => {
  return (
    <div className="kalles-section-type-shipping">
        <div className="container">
            <div className="gap-4 d-flex overflow-x-auto" style={{whiteSpace: "nowrap"}}>
                <div className="d-flex gap-3">
                    <i className="pegk pe-7s-car fs-36 text-muted flex-shrink-0"></i>
                    <div className="flex-grow-1">
                        <h6 className="text-uppercase font-playfair">Free Shipping</h6>
                        <p className="text-muted mb-0">Free shipping on all US order or <br /> order above $100</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <i className="pegk pe-7s-help2 fs-36 text-muted flex-shrink-0"></i>
                    <div className="flex-grow-1">
                        <h6 className="text-uppercase font-playfair">Support 24/7</h6>
                        <p className="text-muted mb-0">Contact us 24 hours a day, 7 <br /> days a week</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <i className="pegk pe-7s-refresh fs-36 text-muted flex-shrink-0"></i>
                    <div className="flex-grow-1">
                        <h6 className="text-uppercase font-playfair">30 Days Return</h6>
                        <p className="text-muted mb-0">Simply return it within 30 days <br /> for an exchange.</p>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    <i className="pegk pe-7s-door-lock fs-36 text-muted flex-shrink-0"></i>
                    <div className="flex-grow-1">
                        <h6 className="text-uppercase font-playfair">100% Payment Secure</h6>
                        <p className="text-muted mb-0">We ensure secure payment with <br /> PEV</p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Shipping