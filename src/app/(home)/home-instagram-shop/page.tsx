
import React from 'react'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import Shipping from '@src/commonsections/Shipping'
import FooterPage from '@src/components/Footer'
import HomeSection from '@app/(home)/home-instagram-shop/HomeSection'
import CatSection from '@app/(home)/home-instagram-shop/CatSection'
import InstagramShop from '@app/(home)/home-instagram-shop/InstagramShop'
import TopBanner from '@src/components/Headers/TopBanner'
import Header2 from '@src/components/Header2'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'


const HomeInstagramShop = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Instagram Shop" />
            <TopBanner />

            {/* header */}
            <Header2 />

            <div>
                <HomeSection />

                {/* cat section */}
                <CatSection />

                {/* instagram shop */}
                <InstagramShop />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterPage />

                <PopupPage />
            </div>
        </React.Fragment>
    )
}

export default HomeInstagramShop