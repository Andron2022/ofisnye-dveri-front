import React from 'react'
import HomeSection from '@app/(home)/home-lingeries/HomeSection';
import OurStory from '@app/(home)/home-lingeries/OurStory';
import NewArrivals from '@app/(home)/home-lingeries/NewArrivals';
import TrandingItems from '@app/(home)/home-lingeries/TrandingItems';
import Blogs from '@app/(home)/home-lingeries/Blogs';
import Brands from '@app/(home)/home-lingeries/Brands';
import Banner from '@app/(home)/home-lingeries/Banner';
import FooterLingeries from '@src/components/FooterLingeries'
import HeaderLingeries from '@src/components/HeaderLingeries';
import HeadTitle from '@src/commonsections/HeadTitle';

const HomeLingeries = () => {

    return (
        <React.Fragment>
            <HeadTitle title="home Lingeries" />
            {/* header */}
            <HeaderLingeries />

            {/* main slide */}
            <HomeSection />

            {/* our story */}
            <OurStory />

            {/* NEW ARRIVALS */}
            <NewArrivals />

            {/* Trandingitems */}
            <TrandingItems />

            {/* popular blog */}
            <Blogs />

            {/* brand */}
            <Brands />

            {/* cards banner */}
            <Banner />

            {/* Footer */}
            <FooterLingeries />

        </React.Fragment>
    )
}

export default HomeLingeries