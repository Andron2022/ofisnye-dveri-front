"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductDetailLayout03Tab from "@app/(product)/product-detail-layout-03/ProductDetailLayout03Tab";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductSwiper from "@app/(product)/product-detail-layout-03/ProductSwiper";
import MobileAccordion from "@app/(product)/product-detail-layout-03/MobileAccordion";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import ViewProductWithoutSwiper from "@src/commonsections/ViewProductWithoutSwiper";
import LikeProductWithoutSwiper from "@src/commonsections/LikeProductWithoutSwiper";
import HeadTitle from "@src/commonsections/HeadTitle";

import pr25 from '@assets/images/products/pr-25.png'

const ProductDetailLayout03 = () => {
    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="New Arrival" subTitle="Black mountain hat" />

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            <ProductDetailLayout03Tab />

            {/* MobileAccordion */}

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
                    <Row className="justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Row>
                    <ViewProductWithoutSwiper />
                </div>
            </section>
            <FooterPage />

            <PopupPage />

            <BottomProduct img={pr25} colorSize2="Black" name="Black mountain hat" price="$50.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
        </React.Fragment>
    )
}
export default ProductDetailLayout03