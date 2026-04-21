import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Image from 'next/image'
import MainSlide from '@app/(home)/home-sport/MainSlide'
import Banner from '@app/(home)/home-sport/Banner'

import LatestNews from '@app/(home)/home-sport/LatestNews'
import Shipping from '@app/(home)/home-sport/Shipping'
import FooterSports from '@src/components/FooterSports'
import TopSelling from '@app/(home)/home-sport/TopSelling'
import SwiperTab from '@app/(home)/home-sport/SwiperTab'
import HomeSportTopBanner from '@src/components/Headers/HomeSportTopBanner'
import HeaderSport from '@src/components/Headers/HeaderSport'
import HeadTitle from '@src/commonsections/HeadTitle'

import desktop from "@assets/images/home-sport/full-width-banner-desktop.jpg"

const HomeSport = () => {
  return (
    <React.Fragment>
      <HeadTitle title="Home Sport" />
      <HomeSportTopBanner />

      <HeaderSport />

      <div>

        {/* main slide */}
        <MainSlide />

        {/* banner */}
        <Banner />

        {/* tab section */}
        <SwiperTab />

        {/* black friday */}
        <section className="overflow-hidden mt-5 pt-4">
          <Container fluid className="px-0">
            <Row>
              <Col lg={12}>
                <div className="kalles-medical-banner-01 position-relative img-zoom">
                  <Image src={desktop} alt="DesktopImg" className="w-100 img-fluid" />
                  <div className="content position-absolute text-white py-5">
                    <p className="text-uppercase fs-16 fw-semibold mb-1">BLACK FRIDAY</p>
                    <h3 className="font-montserrat fw-bold display-3 text-uppercase">SAVE 50% OFF</h3>
                    <h2 className="text-uppercase fs-36 fw-bold mb-4">FIRST ONLINE PURCHASE</h2>
                    <button className="btn btn-custom-orange rounded-0 min-w-150 min-h-45 text-uppercase d-inline-flex align-items-center justify-content-center fw-semibold">VIEW PROMOTION</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* selling */}
        <TopSelling />

        {/* news */}
        <LatestNews />

        {/* shipping */}
        <Shipping />

        {/* Footer */}
        <FooterSports />

      </div>
    </React.Fragment>
  )
}

export default HomeSport