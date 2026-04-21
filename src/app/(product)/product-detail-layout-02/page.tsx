"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductDetailLayout02Tab from "@src/app/(product)/product-detail-layout-02/ProductDetailLayout02Tab";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import HeadTitle from "@src/commonsections/HeadTitle";
import ProductSwiper from "@app/(product)/product-detail-layout-02/ProductSwiper";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import MobileAccordion from "@app/(product)/product-detail-layout-02/MobileAccordion";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";

import thumb1 from '@assets/images/products/thumb-01.jpg'
import 'flickity/css/flickity.css';

const Index = () => {

    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);


    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="Women" subTitle="Striped Long Sleeve Top" />

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            <ProductDetailLayout02Tab />

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
                    <LikeProducts />
                </div>
                <div className="container">
                    <Col className="justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Col>
                    <ViewedProduct />
                </div>
            </section>
            <FooterPage />

            <PopupPage />

            <BottomProduct img={thumb1} colorSize2="Black / S" name="Striped Long Sleeve Top" del="$45.00" price="$20.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
        </React.Fragment>
    )
}
export default Index