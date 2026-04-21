"use client";
import React, { useState } from "react";
import { HairMoadl, FashionModal, ProductInfoModal, ProductHoverModal, FashionModall, SortModal } from "@src/components/ProductDetailThumbRightModals/ProductDetailThumbTabModal";

import lookBook from '@assets/images/single-product/thumb-right/bg-loobook.jpg'
import Link from "next/link";
import { Row } from "react-bootstrap";

const ThreeModals = () => {

    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [modalShow4, setModalShow4] = useState(false);
    const [modalShow5, setModalShow5] = useState(false);
    const [modalShow6, setModalShow6] = useState(false);


    const handleRightModal1Show = () => setModalShow1(true);
    const handleRightModal1Close = () => setModalShow1(false);
    const handleRightModal2Show = () => setModalShow2(true);
    const handleRightModal2Close = () => setModalShow2(false);
    const handleRightModal3Show = () => setModalShow3(true);
    const handleRightModal3Close = () => setModalShow3(false);

    const handleRightModal4Close = () => setModalShow4(false);
    const handleRightModal5Show = () => setModalShow5(true);
    const handleRightModal5Close = () => setModalShow5(false);
    const handleRightModal6Show = () => setModalShow6(true);
    const handleRightModal6Close = () => setModalShow6(false);

    return (
        <React.Fragment>
            <Row className="mt-4">
                <div>
                    <div className="position-relative home-lookbook-section" style={{ backgroundImage: `url(${lookBook.src})`, height: "650px" }}>
                        <div className="pin-type position-absolute position-01">
                            <span className="zoompin"></span>
                            <Link href="#pinType1" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal1Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>

                        <div className="pin-type position-absolute position-02">
                            <span className="zoompin"></span>
                            <Link href="#pinType2" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal2Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>

                        <div className="pin-type position-absolute position-03">
                            <span className="zoompin"></span>
                            <Link href="#pinType3" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal3Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>

                        <div className="pin-type position-absolute position-04">
                            <span className="zoompin"></span>
                            <Link href="#pinType4" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal5Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>

                        <div className="pin-type position-absolute position-05">
                            <span className="zoompin"></span>
                            <Link href="#pinType5" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal6Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </Row>
            <HairMoadl modalShow1={modalShow1} handleRightModal1Close={handleRightModal1Close} />
            <FashionModal modalShow2={modalShow2} handleRightModal2Close={handleRightModal2Close} />
            <ProductInfoModal modalShow3={modalShow3} handleRightModal3Close={handleRightModal3Close} />
            <ProductHoverModal modalShow4={modalShow4} handleRightModal4Close={handleRightModal4Close} />
            <FashionModall modalShow5={modalShow5} handleRightModal5Close={handleRightModal5Close} />
            <SortModal modalShow6={modalShow6} handleRightModal6Close={handleRightModal6Close} />
        </React.Fragment>
    )
}
export default ThreeModals