import React from 'react'
import Ourproduct from '@src/commonsections/Ourproduct'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import HomeSection from '@app/(home)/home-static-image/HomeSection'
import CatSection from '@app/(home)/home-static-image/CatSection'
import Sale from '@app/(home)/home-static-image/Sale'
import Trending from '@app/(home)/home-static-image/Trending'
import Header2 from '@src/components/Header2'
import TopBanner from '@src/components/Headers/TopBanner'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeStaticImage = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Static Image"/>
            {/* top banner */}
            <TopBanner />

            {/* header */}
            <Header2 />

            <div>
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* sale */}
                <Sale />

                {/* trending */}
                <Trending />

                {/* our product */}
                <Ourproduct />

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

export default HomeStaticImage