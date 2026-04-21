"use client";
import React, { useEffect } from 'react'
import HomeSection from '@app/(home)/home-cosmetics/HomeSection';
import CatSection from '@app/(home)/home-cosmetics/CatSection';
import ImageList from '@app/(home)/home-cosmetics/ImageList';
import BrandList from '@app/(home)/home-cosmetics/BrandList';
import FooterCosmetics from '@src/components/FooterCosmetics';
import NewArrival from '@app/(home)/home-cosmetics/NewArrival';
import NowTrending from '@app/(home)/home-cosmetics/NowTrending';
import HeaderCosmetics from '@src/components/HeaderCosmetics';
import PopupPage from '@src/components/Popup';
import Topbnner from '@app/(home)/home-cosmetics/Topbnner';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeCosmetics = () => {

    useEffect(() => {
        document.body.classList.add('wrapper_cus');
        return () => {
            document.body.classList.remove('wrapper_cus');
        };
    }, []);

    return (
        <React.Fragment>
            <HeadTitle title="Home Cosmetics" />
            <Topbnner />
            <HeaderCosmetics />

            <div>
                {/* slider */}
                <HomeSection />

                {/* Now Trending */}
                <NowTrending />

                {/*Cat Section  */}
                <CatSection />

                {/*  */}

                {/* new arrival */}
                <NewArrival />

                {/* image list */}
                <ImageList   />

                {/* brand list */}
                <BrandList />

                {/* footer */}
                <FooterCosmetics />

                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeCosmetics