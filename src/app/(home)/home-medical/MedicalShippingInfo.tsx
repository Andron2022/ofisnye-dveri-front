"use client";
import React from 'react'

const MedicalShippingInfo = () => {

    return (
        <React.Fragment>

            <section className="kalles-medical-shipping-info bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="text-center">
                                <i className="las la-las la-location-arrow fs-48 text-primary-emphasis"></i>
                                <h6 className="mt-3 mb-1">Store location</h6>
                                <p className="text-muted mb-0">219 Amara Fort Apt. 394</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="text-center">
                                <i className="las la-las la-envelope-open fs-48 text-primary-emphasis"></i>
                                <h6 className="mt-3 mb-1">Work inquiries</h6>
                                <p className="text-muted mb-0">hello@kalles.com</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="text-center">
                                <i className="las la-las la-phone-volume fs-48 text-primary-emphasis"></i>
                                <h6 className="mt-3 mb-1">Call us</h6>
                                <p className="text-muted mb-0">800 388 80 90</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div className="text-center">
                                <i className="las la-las la-clock fs-48 text-primary-emphasis"></i>
                                <h6 className="mt-3 mb-1">Open hours</h6>
                                <p className="text-muted mb-0">Mon-Sat : 08.00 - 18.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    )
}
export default MedicalShippingInfo