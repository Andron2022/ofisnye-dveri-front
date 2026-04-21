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
import LayoutHeader6 from '@src/components/Headers/LayoutHeader6'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeHeader06 = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Classic" />
            <TopBanner />

            <LayoutHeader6 />

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

        </React.Fragment>
    )
}

export default HomeHeader06