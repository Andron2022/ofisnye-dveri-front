import React from "react";
import { Col, Row } from "react-bootstrap";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductDetailThumbRightTab from "@src/app/(product)/product-detail-thumb-right/ProductDetailThumbRightTab";
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import ProductSwiper from "@src/app/(product)/product-detail-thumb-right/ProductSwiper"
import MobileAccordion from "@app/(product)/product-detail-thumb-right/MobileAccordion";

import des2 from '@assets/images/single-product/des-02.jpg'
import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";


const ProductDetailthumbRight = () => {
    return (
        <React.Fragment>

            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="Women" subTitle="High Waist Skinny Jean" />

            <ProductSwiper />

            <ProductDetailThumbRightTab />

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
                    <div className="row justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </div>
                    <ViewedProduct />
                </div>
            </section>
            <FooterPage />

            <PopupPage />

            <BottomProduct img={des2} name="High Waist Skinny Jean" colorSize2="M" del="$45.00" price=" $30.00" />
        </React.Fragment >
    )
}
export default ProductDetailthumbRight