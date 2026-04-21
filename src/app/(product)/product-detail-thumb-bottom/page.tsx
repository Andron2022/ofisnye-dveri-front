"use client";
import React, { useState } from "react";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import { Col, Row } from "react-bootstrap";
import FooterPage from "@src/components/Footer";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import LikeProductWithoutSwiper from "@src/commonsections/LikeProductWithoutSwiper";
import ViewProductWithoutSwiper from "@src/commonsections/ViewProductWithoutSwiper";
import ProductSwiper from '@src/app/(product)/product-detail-thumb-bottom/ProductSwiper'
import ProductDetailThumbBottomTab from "@src/app/(product)/product-detail-thumb-bottom/ProductDetailThumbBottomTab";
import HeadTitle from "@src/commonsections/HeadTitle";
import MobileAccordion from "@src/app/(product)/product-detail-thumb-bottom/MobileAccordion";

import dot1 from '@assets/images/products/dot-01.jpg'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductDetailThumb = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="Women" subTitle="Mercury Tee" />

            <ProductSwiper />

            <ProductDetailThumbBottomTab />

            <MobileAccordion />

            <section className="pt-5 py-lg-5 mb-3">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4">
                                <h3 className="pb-lg-2">You may also like</h3>
                            </div>
                        </Col>
                    </Row>
                    <LikeProductWithoutSwiper />
                </div>
                <div className="container">
                    <div className="row justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </div>
                    <ViewProductWithoutSwiper />
                </div>
            </section>
            <FooterPage />

            <PopupPage />

            <BottomProduct img={dot1} name="Mercury Tee" colorSize2="White Cream / S" price="$68.00" />
        </React.Fragment>
    )
}
export default ProductDetailThumb