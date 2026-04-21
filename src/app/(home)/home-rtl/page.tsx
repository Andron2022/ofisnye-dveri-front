import FollowInstagram from '@src/commonsections/FollowInstagram'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import LookBookCard from '@src/commonsections/LookBookCard'
import SellerCard from '@src/commonsections/SellerCard'
import Shipping from '@src/commonsections/Shipping'
import TrendingCard from '@src/commonsections/TrendingCard'
import FooterPage from '@src/components/Footer'
import React from 'react'
import HomeSection from '@app/main-index/HomeSection'
import CatSection from '@app/main-index/CatSection'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'

const HomeRtl = () => {
    return (
        <React.Fragment>
            <TopBanner />
            <Header />
            <div dir="rtl">
                {/* main slide */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* trending card */}
                <TrendingCard />

                {/* lookbook */}
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
            </div>
        </React.Fragment>
    )
}

export default HomeRtl