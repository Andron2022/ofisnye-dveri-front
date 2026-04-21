"use client";
import React, { useState } from "react";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductCategories from "@app/(product)/product-detail-sidebar-full-height/ProductCategories";
import ShippingAndDelivery from "@app/(product)/product-detail-sidebar-full-height/ShippingAndDelivery";
import SaleProduct from "@app/(product)/product-detail-sidebar-full-height/SaleProduct";
import RecentPost from "@app/(product)/product-detail-sidebar-full-height/RecentPost";
import ProductSwiper from "@app/(product)/product-detail-sidebar-full-height/ProductSwiper";
import Accordion from "@app/(product)/product-detail-sidebar-full-height/Accordion";
import LikeProducts from "@src/commonsections/LikeProducts";
import { Col, Row } from "react-bootstrap";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import dot1 from '@assets/images/products/dot-01.jpg'
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import ViewProductWithoutSwiper from "@src/commonsections/ViewProductWithoutSwiper";
import HeadTitle from "@src/commonsections/HeadTitle";

const ProductDetailFullWith = () => {
    const [shoppingShow, setShoppingShow] = useState(false);
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="New Arrival" subTitle="Simple Skin T-shirt" />
            <div className="container">
                <Row className="py-4">
                    <Col xl={3} >
                        <div>
                            <ProductCategories />
                            <ShippingAndDelivery />
                            <SaleProduct />
                            <RecentPost />
                        </div>
                    </Col>
                    <Col xl={9}>
                        <ProductSwiper handleShoppingShow={handleShoppingShow} />
                        <Accordion />
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
                                <Row className="justify-content-center mt-0">
                                    <Col lg={7}>
                                        <div className="text-center mb-lg-4 pb-lg-2">
                                            <h3>Recently viewed products</h3>
                                        </div>
                                    </Col>
                                </Row>
                                <ViewProductWithoutSwiper />
                            </div>
                        </section>
                    </Col>
                </Row>
            </div>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={dot1} name="Simple Skin T-shirt" colorSize2="XL" price="$56.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}
export default ProductDetailFullWith