import React from 'react'
import HomeSection from '@app/main-index/HomeSection'
import CatSection from '@app/(home)/home-header-01/CatSection'
import TrendingCard from '@src/commonsections/TrendingCard'
import LookBookCard from '@src/commonsections/LookBookCard'
import SellerCard from '@src/commonsections/SellerCard'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import LayoutHeader4 from '@src/components/Headers/LayoutHeader4'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeHeader04 = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Handmade" />
            <TopBanner />

            <LayoutHeader4 />

            {/* main slide */}
            <HomeSection />

            {/* cat-section */}
            <CatSection />

            {/* trending - card */}
            <TrendingCard />

            {/* lookbook - card */}
            <LookBookCard />

            {/* best seller */}
            <SellerCard />

            {/* latest - blog */}
            <LatestBlogs />

            {/* instagram */}
            <FollowInstagram />

            {/* Shipping */}
            <Shipping />

            {/* Footer */}
            <FooterPage />

            <PopupPage />

        </React.Fragment>
    )
}

export default HomeHeader04