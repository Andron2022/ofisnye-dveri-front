import React from 'react'
import TrendingCard from '@src/commonsections/TrendingCard';
import LookBookCard from '@src/commonsections/LookBookCard';
import SellerCard from '@src/commonsections/SellerCard';
import LatestBlogs from '@src/commonsections/LatestBlogs';
import FollowInstagram from '@src/commonsections/FollowInstagram';
import Shipping from '@src/commonsections/Shipping';
import FooterPage from '@src/components/Footer';
import HomeSection from '@app/main-index/HomeSection';
import CatSection from '@app/main-index/CatSection';
import TopBanner from '@src/components/Headers/TopBanner';
import Header from '@src/components/Headers/Header';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';

const IndexPage = () => {

    return (
        <React.Fragment>
           <HeadTitle title="Home Default"/>

            {/* top banner */}
            <TopBanner />

            {/* header */}
            <Header />

            <div>

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

              


            </div>
        </React.Fragment>
    )
}

export default IndexPage