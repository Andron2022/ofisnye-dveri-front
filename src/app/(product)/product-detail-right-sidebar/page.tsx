"use client";
import React, { useState } from "react";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductSwiper from "@app/(product)/product-detail-right-sidebar/ProductSwiper";
import ShippingAndDelivery from "@app/(product)/product-detail-right-sidebar/ShippingAndDelivery";
import ProductDetailRightSidebarTab from "./ProductDetailRightSidebarTab";
import LikeProducts from "@src/commonsections/LikeProducts";
import MobileAccordion from '@app/(product)/product-detail-right-sidebar/MobileAccordion'
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import dot1 from '@assets/images/products/dot-01.jpg'
import ShoppingCardModal from "@src/commonsections/ShoppingCardModal";
import ViewProductWithoutSwiper from "@src/commonsections/ViewProductWithoutSwiper";
import HeadTitle from "@src/commonsections/HeadTitle";

const ProductDetailRightSidebar = () => {
    const [shoppingShow, setShoppingShow] = useState(false);
    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="New Arrival" subTitle="Crosshatch Backpack" />

            <section className="py-4">
                <div className="container">
                    <div className="row py-3">
                        <ProductSwiper handleShoppingShow={handleShoppingShow} />
                        <ShippingAndDelivery />
                    </div>
                </div>
            </section>

            <ProductDetailRightSidebarTab />

            <MobileAccordion />

            <section className="pt-5 py-lg-5 mb-3">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="text-center mb-lg-4">
                                <h3 className="pb-lg-2">You may also like</h3>
                            </div>
                        </div>
                    </div>
                    <LikeProducts />
                </div>
                <div className="container">
                    <div className="row justify-content-center mt-3 mt-lg-5 pt-2">
                        <div className="col-lg-7">
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </div>
                    </div>
                    <ViewProductWithoutSwiper />
                </div>
            </section>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={dot1} name="Crosshatch Backpack" colorSize2="XL" price="$30.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}
export default ProductDetailRightSidebar