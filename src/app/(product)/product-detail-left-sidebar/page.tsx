"use client";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ShippingAndDelivery from "@src/app/(product)/product-detail-left-sidebar/ShippingAndDelivery";
import ProductSwiper from "@src/app/(product)/product-detail-left-sidebar/ProductSwiper"
import ProductDetailLeftSidebarTab from "@src/app/(product)/product-detail-left-sidebar/ProductDetailLeftSidebarTab"
import MobileAccordion from '@app/(product)/product-detail-left-sidebar/MobileAccordion'
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewProductWithoutSwiper from "@src/commonsections/ViewProductWithoutSwiper";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import dot1 from '@assets/images/products/dot-01.jpg'
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import HeadTitle from "@src/commonsections/HeadTitle";

const ProuctDetailLeftSidebar = () => {
    const [shoppingShow, setShoppingShow] = useState(false);
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    return (
        <React.Fragment>
            
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="New Arrival" subTitle="Men pants" />
            <section className="py-4">
                <div className="container">
                    <div className="row py-3">
                        <ShippingAndDelivery />
                        <ProductSwiper handleShoppingShow={handleShoppingShow} />
                    </div>
                </div>
            </section>
            <ProductDetailLeftSidebarTab />

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

            <BottomProduct img={dot1} name="Men pants" colorSize2="White Cream / S" price="$56.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}
export default ProuctDetailLeftSidebar