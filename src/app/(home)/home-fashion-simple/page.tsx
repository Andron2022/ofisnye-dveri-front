import React from 'react'

import Banner from '@app/(home)/home-fashion-simple/Banner';
import Ourproduct from '@src/commonsections/Ourproduct';
import LatestBlogs from '@src/commonsections/LatestBlogs';
import FollowInstagram from '@src/commonsections/FollowInstagram';
import Shipping from '@src/commonsections/Shipping';
import FooterPage from '@src/components/Footer';
import CatSection from '@app/(home)/home-fashion-simple/CatSection';
import MainHomeSlide from '@src/commonsections/MainHomeSlide';
import TrendingandNewArrival from '@src/commonsections/TrendingandNewArrival';
import TopBanner from '@src/components/Headers/TopBanner';
import HeaderHomeFashion from '@src/components/Headers/HeaderHomeFashion';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeFashionSimple = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Fashion Simple" />
            <TopBanner />

            {/* header */}
            <HeaderHomeFashion />

            <div>
                {/* main slide */}
                <MainHomeSlide />

                {/* cat section */}
                <CatSection />

                {/* new arrival */}
                <section>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-lg-7">
                                <div className="text-center">
                                    <div className="mb-2">
                                        <h3 className="section-title position-relative flex">
                                            <span>NEW ARRIVAL</span>
                                        </h3>
                                    </div>
                                    <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">New product
                                        of our store</span>
                                </div>
                            </div>
                        </div>
                        <TrendingandNewArrival colClass="col-md-3 col-6 col-lg-2 px-lg-12 px-2" />
                    </div>
                </section>

                {/* banner */}
                <Banner />

                {/* Our product */}
                <Ourproduct />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* Shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />
            </div>
        </React.Fragment>
    )
}

export default HomeFashionSimple