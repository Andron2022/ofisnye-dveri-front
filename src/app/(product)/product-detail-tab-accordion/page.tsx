"use client";
import React, { useState } from 'react'
import DescriptionTab from '@app/(product)/product-detail-tab-accordion/DescriptionTab'
import ProductSwiper from '@app/(product)/product-detail-tab-accordion/productSwiper'
import LikeProducts from '@src/commonsections/LikeProducts'
import ViewedProduct from '@src/commonsections/ViewedProducts'
import { Col, Container, Row } from 'react-bootstrap'
import BreadCrumb from '@src/commonsections/BreadCrumb'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import BottomProduct from '@src/commonsections/Bottomproduct'

import thumb1 from '@assets/images/single-product/tab-accordion/thumb-sticky.jpg'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'
import HeadTitle from '@src/commonsections/HeadTitle'

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

            <BreadCrumb title='New Arrival' subTitle='Felt Cowboy Hat' />

            {/* ProductSwiper */}

            <ProductSwiper handleShoppingShow={handleShoppingShow} />

            {/* DescriptionTab */}

            <DescriptionTab />

            <section className="pt-5 py-lg-5 mb-3">
                <Container className="container">
                    <Row className="justify-content-center">
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

            <BottomProduct img={thumb1} name="Felt Cowboy Hat" price="$20.00" handleShoppingShow={handleShoppingShow} />
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />
        </React.Fragment>
    )
}

export default Index