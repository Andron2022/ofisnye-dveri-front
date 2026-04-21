"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductSwiper from "@app/(product)/product-detail-variant-images-grouped/ProductSwiper";
import ProductDetailVariantgroupedTab from "@app/(product)/product-detail-variant-images-grouped/ProductDetailVariantgroupedTab";
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import FooterPage from "@src/components/Footer";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";

import thumb from '@assets/images/single-product/variant-images-grouped/thumb-sticky.jpg'

const PoductDetailvariantGrouped = () => {

    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <React.Fragment>
            <TopBanner />

            {/* header */}
            <Header />
            <BreadCrumb title="New Arrival" subTitle="Skin Sweatpans" />
            <ProductSwiper handleShoppingShow={handleShoppingShow} />
            <ProductDetailVariantgroupedTab />

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
                    <Row className="justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Row>
                    <ViewedProduct />
                </div>
            </section>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={thumb} name="Skin Sweatpans" colorSize2="Grey / S" del="$75.00" price="$45.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}
export default PoductDetailvariantGrouped