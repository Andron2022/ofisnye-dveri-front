"use client";
import React, { useState } from "react";
import { Row, Col } from 'react-bootstrap';
import ProductDetailLayout01Tab from "@app/(product)/product-detail-product-sticky/ProductDetailStickyTab";
import ProductSwiper from "@app/(product)/product-detail-product-sticky/ProductSwiper";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import LikeProducts from "@src/commonsections/LikeProducts";
import FooterPage from "@src/components/Footer";
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import thumb from '@assets/images/single-product/layout-03/thumb-sticky.png'

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductDetailSticky = () => {

    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <React.Fragment>
            <TopBanner />

            {/* header */}
            <Header />
            <BreadCrumb title="New Arrival" subTitle="Blush Beanie" />
            <ProductSwiper handleShoppingShow={handleShoppingShow} />
            <ProductDetailLayout01Tab />

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
                    <div className="row justify-content-center mt-3 mt-lg-5 pt-2">
                        <Row>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Row>
                    </div>
                    <ViewedProduct />
                </div>
            </section>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={thumb} name="Blush Beanie" colorSize2="Grey / S" price="$15.00" />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
        </React.Fragment >
    )
}
export default ProductDetailSticky