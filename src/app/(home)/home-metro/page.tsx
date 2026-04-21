
import React from 'react'
import { Container } from 'react-bootstrap'

import FollowInstagram from '@src/commonsections/FollowInstagram'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import HomeSection from '@app/(home)/home-metro/HomeSection';
import CatSection from './CatSection'
import TopBanner from '@src/components/Headers/TopBanner'
import Header2 from '@src/components/Header2'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeMetro = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Metro"/>
            {/* top banner */}
            <TopBanner />

            {/* header */}
            <Header2 />

            <div>
                {/* main slide */}
                <HomeSection />

                {/* cat section */}
                <section className="cat-section pb-0">
                    <Container>
                        <div className="row g-lg-4 g-3">
                            <CatSection />
                        </div>
                    </Container>
                </section>

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterPage />

                {/* popup */}
                <PopupPage />

            </div>
        </React.Fragment>
    )
}

export default HomeMetro