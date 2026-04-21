import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import MainSlide from '@app/(home)/home-handmade/MainSlide'
import CatSection from '@app/(home)/home-handmade/CatSection'
import SalebyCategories from '@app/(home)/home-handmade/SalebyCategories'
import BlogPost from '@app/(home)/home-handmade/BlogPost'
import OurFeaturedProducts from '@app/(home)/home-handmade/OurFeaturedProducts'
import HandmadeHeader from '@src/components/Headers/HandmadeHeader'
import FooterHandmade from '@src/components/FooterHandmade'
import MainModel from '@src/commonsections/MainModel'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeHandmade = () => {
  return (
    <React.Fragment>
      <HeadTitle title="Home Handmade" />
      <MainModel />
      <div>
        <HandmadeHeader />

        {/* main slide */}
        <MainSlide />

        {/* cat section */}
        <CatSection />

        {/* Our Featured Products */}
        <OurFeaturedProducts />

        {/* delay */}
        <section className="kalles-handmade-banner mt-5">
          <Container>
            <Row>
              <Col lg={6}>
                <h1 className="font-avenir">Deal of the day</h1>
                <p className="text-muted mb-3">Years of experience brought about by our skilled craftsmen could ensure
                  that every piece produced is a work of art. Our focus is always the best quality possible.</p>
                <Link className="btn btn-dark rounded-pill min-w-150 min-h-45 d-inline-flex align-items-center justify-content-center fw-semibold px-4" href="/shop">Shop Now</Link>
              </Col>
            </Row>
          </Container>
        </section>

        {/* categories */}
        <SalebyCategories />

        {/* difference */}
        <section className="pt-5">
          <Container>
            <div className="bg-light px-4 py-5">
              <Row>
                <Col lg={4}>
                  <h1 className="font-marcellus fw-medium fs-45 lh-base">The difference when you shop Kalles!</h1>
                </Col>
                <Col lg={4} className="my-4 mb-lg-0">
                  <div className="mb-4">
                    <h3 className="font-avenir fw-semibold fs-22">Superb Quality</h3>
                    <p className="fs-16 mb-0">We make commitments that the quality of our products will and always
                      will be superb.</p>
                  </div>
                  <div>
                    <h3 className="font-avenir fw-semibold fs-22">Free Returns</h3>
                    <p className="fs-16 mb-0">We accept returns for freshly purchased products within 7 days from
                      the payment.</p>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className="mb-4 pb-2">
                    <h3 className="font-avenir fw-semibold fs-22">Free Wrapping</h3>
                    <p className="fs-16 mb-0">Upon request, items bought as gifts from our store can receive free
                      wrapping service. </p>
                  </div>
                  <div>
                    <h3 className="font-avenir fw-semibold fs-22">Free Shipping</h3>
                    <p className="fs-16 mb-0">Once receiving your order, we will turn your products around in 3- 5
                      business days.</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>

        {/* blog post */}
        <BlogPost />

        {/* footer */}
        <FooterHandmade />

      </div>
    </React.Fragment>
  )
}

export default HomeHandmade