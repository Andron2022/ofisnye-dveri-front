import React from "react";
import { Col, Row } from "react-bootstrap";
import BreadCrumb from "@src/commonsections/BreadCrumb";
import ProductDetailWithoutThumbnailTab from "@app/(product)/product-detail-without-thumbnail/ProductDetailWithoutThumbnailTab";
import LikeProducts from "@src/commonsections/LikeProducts";
import ViewedProduct from "@src/commonsections/ViewedProducts";
import ProductSwiper from '@src/app/(product)/product-detail-without-thumbnail/ProductSwiper'
import MobileAccordion from "@src/app/(product)/product-detail-without-thumbnail/MobileAccordion"
import thumb1 from "@assets/images/single-product/without-thumbnail/thumb-01.jpg"
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import BottomProduct from "@src/commonsections/Bottomproduct";
import HeadTitle from "@src/commonsections/HeadTitle";

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/free-mode";
import "swiper/css/thumbs";

const ProductDetailWithoutThumbnail = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title="Women" subTitle="Striped Long Sleeve Top" />

            <ProductSwiper />

            <ProductDetailWithoutThumbnailTab />

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
                    <ViewedProduct />
                </div>
            </section>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={thumb1} name="Striped Long Sleeve Top" price="$15.00" />
        </React.Fragment>
    )
}
export default ProductDetailWithoutThumbnail;