"use client";
import React, { useEffect } from 'react'
import FooterFlower from '@src/components/FooterFlower';
import ArrangingWorkshop from '@app/(home)/home-flower/ArrangingWorkshop';
import HomeSection from '@app/(home)/home-flower/HomeSection';
import CatSection from '@app/(home)/home-flower/CatSection';
import Trending from '@app/(home)/home-flower/Trending';
import BestSeller from '@app/(home)/home-flower/BestSeller';
import FeaturedBlogs from '@app/(home)/home-flower/FeaturedBlogs';
import FollowInstagram from '@app/(home)/home-flower/FollowInstagram';
import Shipping from '@src/commonsections/Shipping'
import HeaderFlower from '@src/components/HeaderFlower';
import TopBanner from '@src/components/Headers/TopBanner';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';


const HomeFlower = () => {

    useEffect(() => {
        document.body.classList.add('font-quicksand');
        return () => {
            document.body.classList.remove('font-quicksand');
        };
    }, []);

    return (
        <React.Fragment>
            <HeadTitle title="Home Flower" />
            <TopBanner topclass="navbar-green" />

            {/* header */}
            <HeaderFlower />

            <div>

                {/* main */}
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* trending */}
                <Trending />

                {/* Arranging Workshop */}
                <ArrangingWorkshop />

                {/* best seller */}
                <BestSeller />

                {/* featured blogs */}
                <FeaturedBlogs />

                {/* FollowInstagram */}
                <FollowInstagram />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterFlower />

                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeFlower