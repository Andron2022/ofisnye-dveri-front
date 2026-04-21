import React from 'react'
import MainSlide from '@app/(home)/home-jewelry/MainSlide'
import CatSection from '@app/(home)/home-jewelry/CatSection'
import Cards from '@app/(home)/home-jewelry/Cards'
import Blogs from '@app/(home)/home-jewelry/Blogs'
import Shipping from '@app/(home)/home-jewelry/Shipping'
import FooterPage from '@src/components/Footer'
import InstaSection from '@app/(home)/home-jewelry/InstaSection'
import OurBestSelling from '@app/(home)/home-jewelry/OurBestSelling'
import OurTrending from '@app/(home)/home-jewelry/OurTrending'
import HomeJewelryHeader from '@src/components/Headers/HomeJewelryHeader'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeJewelry = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Jewelry" />
            <div className="jewelry-home">

                <HomeJewelryHeader />

                {/* main slide */}
                <MainSlide />

                {/* cat section */}
                <CatSection />

                {/* our best selling */}
                <OurBestSelling />

                {/* cards */}
                <Cards />

                {/* our trendings */}
                <OurTrending />

                {/* blogs */}
                <Blogs />

                {/* insta */}
                <InstaSection />

                {/* shipping */}
                <Shipping />

                {/* Footer */}
                <FooterPage />

            </div>
        </React.Fragment>
    )
}

export default HomeJewelry