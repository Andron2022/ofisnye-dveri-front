import React from 'react'
import FooterPage from '@src/components/Footer'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagramCard from '@src/commonsections/FollowInstagramCard'
import HomeSection from '@app/(home)/home-fashion9/HomeSection'
import Info from '@app/(home)/home-fashion9/Info'
import CatSection from '@app/(home)/home-fashion9/CatSection'
import Banner from '@app/(home)/home-fashion9/Banner'
import BestSeller from '@app/(home)/home-fashion9/BestSeller'
import HeaderFashion9 from '@src/components/HeaderFashion9'
import TopBanner from '@src/components/Headers/TopBanner'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeFashion9 = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Fashion 9" />
            <TopBanner />

            <HeaderFashion9 />

            <div>

                {/* main slide */}
                <HomeSection />

                {/* info */}
                <Info />

                {/* cat section */}
                <CatSection />

                {/* Best seller */}
                <BestSeller />

                {/* banner section */}
                <Banner />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagramCard />

                {/* footer */}
                <FooterPage />

            </div>
        </React.Fragment>
    )
}

export default HomeFashion9