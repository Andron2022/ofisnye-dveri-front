"use client";
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import BreadCrumb from '@src/commonsections/BreadCrumb'
import ProductSwiper from '@app/(product)/product-detail-frequently-bought-together/ProductSwiper'
import DescriptionTab from '@app/(product)/product-detail-layout-02/ProductDetailLayout02Tab'
import MobileAccordion from '@app/(product)/product-detail-layout-02/MobileAccordion'
import LikeProducts from '@src/commonsections/LikeProducts'
import ViewedProduct from '@src/commonsections/ViewedProducts'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import BottomProduct from '@src/commonsections/Bottomproduct'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'

import thumb1 from '@assets/images/single-product/layout-02/thumb-sticky.jpg'

const Index = () => {

    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <React.Fragment>
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title='New Arrival' subTitle='Striped Long Sleeve Top' />

            {/* ProductSwiper */}

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            {/* DescriptionTab */}

            <DescriptionTab />

            {/* MobileAccordion */}

            <MobileAccordion />

            <section className="pt-5 py-lg-5 mb-3">
                <div className="container">
                    <Row className="justify-content-center">
                        <Col lg={7} >
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

            <BottomProduct img={thumb1} name="Striped Long Sleeve Top" colorSize2="Black / S" del="$45.00" price="$20.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}

export default Index