"use client";
import React, { useState } from 'react'
import DescriptionTab from '@app/(product)/product-detail-pre-orders//DescriptionTab'
import ProductSwiper from '@app/(product)/product-detail-pre-orders/productSwiper'
import LikeProducts from '@src/commonsections/LikeProducts'
import ViewedProduct from '@src/commonsections/ViewedProducts'
import { Col, Container, Row } from 'react-bootstrap'
import BreadCrumb from '@src/commonsections/BreadCrumb'
import MobileAccordion from '@app/(product)/product-detail-pre-orders/MobileAccordion'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import BottomProduct from '@src/commonsections/Bottomproduct'

import thumb1 from '@assets/images/single-product/pre-orders/thumb-sticky.jpg'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'

const Index = () => {

    const [shoppingShow, setShoppingShow] = useState(false);

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);

    return (
        <React.Fragment>
            <TopBanner />

            {/* header */}
            <Header />

            <BreadCrumb title='New Arrival' subTitle='Ribbed Stripe Top' />

            {/* ProductSwiper */}

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            {/* DescriptionTab */}

            <DescriptionTab />

            {/* MobileAccordion */}

            <MobileAccordion />

            <section className="pt-5 py-lg-5 mb-3">
                <Container className="container">
                    <Row className="row justify-content-center">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4">
                                <h3 className="pb-lg-2">You may also like</h3>
                            </div>
                        </Col>
                    </Row>

                    {/* LikeProducts */}

                    <LikeProducts />


                    <Row className="justify-content-center mt-3 mt-lg-5 pt-2">
                        <Col lg={7}>
                            <div className="text-center mb-lg-4 pb-lg-2">
                                <h3>Recently viewed products</h3>
                            </div>
                        </Col>
                    </Row>

                    {/* ViewedProduct */}

                    <ViewedProduct />

                </Container>
            </section>
            <FooterPage />
            <PopupPage />

            <BottomProduct img={thumb1} name="Ribbed Stripe Top" colorSize2="Grey / S" price="$15.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}

export default Index