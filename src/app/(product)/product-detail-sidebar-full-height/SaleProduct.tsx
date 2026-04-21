"use client";
import React from "react";
import thumbnail1 from '@assets/images/blog-page/pr-thumbnail-01.jpg'
import thumbnail2 from '@assets/images/blog-page/pr-thumbnail-02.jpg'
import thumbnail3 from '@assets/images/blog-page/pr-thumbnail-03.jpg'
import Image from "next/image";
import { Row } from "react-bootstrap";


const SaleProduct = () => {
    return (
        <React.Fragment>
            <div>
                <h5 className="mb-2 mt-3 mt-lg-5 fw-medium">Sale Products </h5>
                <div className="filter-title mb-4"></div>
                <Row>
                    <div className="col-4">
                        <Image src={thumbnail1} alt="Thumbnail1Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">Analogue Resin Strap</h6>
                        <p className="text-muted mb-0">$30.00</p>
                    </div>
                </Row>
                <Row className="my-3">
                    <div className="col-4">
                        <Image src={thumbnail2} alt="Thumbnail2Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">Ridley High Waist</h6>
                        <p className="text-muted mb-0">$36.00</p>
                    </div>
                </Row>
                <Row>
                    <div className="col-4">
                        <Image src={thumbnail3} alt="Thumbnail3Img" className="img-fluid" />
                    </div>
                    <div className="col-8 ps-0">
                        <h6 className="fw-medium mb-1">Blush Beanie</h6>
                        <p className="text-muted mb-0">$15.00</p>
                    </div>
                </Row>
            </div>
        </React.Fragment>
    )
}
export default SaleProduct