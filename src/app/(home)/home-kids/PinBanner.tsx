"use client";
import React, { useState } from 'react'

import banner from "@assets/images/home-kids/pin-map-banner.jpg"
import KidsModel from '@src/components/KidsModels/Kidsmodel'
import Link from 'next/link'

const PinBanner = () => {
    const [show, setShow] = useState(false)

    const handleKisdModelShow = () => {
        setShow(true)
    }
    const handleKisdModelClose = () => {
        setShow(false)
    }
    return (
        <React.Fragment>
            <section className="home-kids-pin">
                <div className="container-fluid px-0">
                    <div className="w-100 kalles-lookbook-home position-relative" style={{ backgroundImage: `url(${banner.src})` }}>
                        <div className="pin-type position-absolute position-01">
                            <span className="zoompin"></span>
                            <Link href="#pinType1" className="bg-blue-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleKisdModelShow}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-02">
                            <span className="zoompin"></span>
                            <Link href="#pinType2" className="bg-blue-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleKisdModelShow}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>

                        <div className="pin-type position-absolute position-03">
                            <span className="zoompin"></span>
                            <Link href="#pinType3" className="bg-blue-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleKisdModelShow}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-04">
                            <span className="zoompin"></span>
                            <Link href="#pinType4" className="bg-blue-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleKisdModelShow}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-05">
                            <span className="zoompin"></span>
                            <Link href="#pinType5" className="bg-blue-dark text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleKisdModelShow}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                    </div>

                </div>

                {/* modals */}
                <KidsModel show={show} handleKisdModelClose={handleKisdModelClose} />
            </section>
        </React.Fragment>
    )
}

export default PinBanner