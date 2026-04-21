import React from 'react'
import BreadCrumb from '@src/commonsections/BreadCrumb'
import LikeProducts from '@src/commonsections/LikeProducts'
import ViewedProduct from '@src/commonsections/ViewedProducts'
import DescriptionTab from '@src/app/(product)/product-detail-external-affiliate/DescriptionTab'
import ProductSwiper from '@src/app/(product)/product-detail-external-affiliate/ProductSwiper'
import { Col, Container, Row } from 'react-bootstrap'
import MobileAccordion from '@app/(product)/product-detail-external-affiliate/MobileAccordion'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'



const index = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />


            <BreadCrumb title='New Arrival' subTitle='Leather White Trainers' />

            {/* ProductSwiper */}

            <ProductSwiper />

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
                <FooterPage />

                <PopupPage />

            </section>

        </React.Fragment>
    )
}

export default index