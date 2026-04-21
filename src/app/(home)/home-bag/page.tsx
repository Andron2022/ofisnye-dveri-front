import React from 'react'
import FooterPage from '@src/components/Footer'
import HomeSection from '@app/(home)/home-bag/HomeSection'
import PowerplateCollection from '@app/(home)/home-bag/PowerplateCollection';
import CatSection from '@app/(home)/home-bag/CatSection';
import BestSellerProducts from '@app/(home)/home-bag/BestSellerProducts';
import OurPartners from '@app/(home)/home-bag/OurPartners';
import HappyCustomer from '@app/(home)/home-bag/HappyCustomer';

import HeaderBag from '@src/components/HeaderBag';
import TopBanner from '@src/components/Headers/TopBanner';
import HeadTitle from '@src/commonsections/HeadTitle';


const HomeBag = () => {

    return (
        <React.Fragment>
            <HeadTitle title="home Bag" />
            <TopBanner topclass="navbar-dark" />

            {/* header */}
            <HeaderBag />

            <div>
                {/* main slide */}

                <HomeSection />

                {/* powerplate collection */}

                <PowerplateCollection />

                {/* cat section */}

                <CatSection />

                {/* best seller */}

                <BestSellerProducts />

                {/* OurPartners */}

                <OurPartners />

                {/* happy customer */}

                <HappyCustomer />

                {/* Footer */}
                <FooterPage />

            </div >
        </React.Fragment >
    )
}

export default HomeBag