import React from 'react'
import Trending from '@src/commonsections/Trending';
import Shipping from '@src/commonsections/Shipping';
import FooterPage from '@src/components/Footer';
import LatestBlogs from '@src/commonsections/LatestBlogs';
import FollowInstagram from '@src/commonsections/FollowInstagram';
import Ourproduct from '@src/commonsections/Ourproduct';
import HomeSection from '@app/(home)/home-classic/HomeSection'
import CatSection from '@app/(home)/home-classic/CatSection';
import Productsales from '@app/(home)/home-classic/ProductSales';
import Header2 from '@src/components/Header2';
import TopBanner from '@src/components/Headers/TopBanner';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeClassic = () => {

    return (
        <React.Fragment>

            <HeadTitle title="Home Classic" />
            <div>

                {/* top banner */}
                <TopBanner />

                {/* header */}
                <Header2 />

                {/* main slide */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* trending */}
                <Trending />

                {/* sale 70% */}
                <Productsales />

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

export default HomeClassic