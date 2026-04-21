import React from 'react'

import Ourproduct from '@src/commonsections/Ourproduct'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import FooterPage from '@src/components/Footer'
import Trending from '@src/commonsections/Trending'
import CatSection from '@app/(home)/home-video-banner/CatSection'
import ProductSale from '@app/(home)/home-video-banner/ProductSale'
import Link from 'next/link'
import Header2 from '@src/components/Header2'
import TopBanner from '@src/components/Headers/TopBanner'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'
import Shipping from './Shipping'

// import video from "@assets/videos/jewelry_video.mp4"

const HomeVideoBanner = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Video Banner"/>
            {/* top banner */}
            <TopBanner />

            {/* header */}
            <Header2 />

            <div>
                <div className="position-relative kalles-hero-video">
                    <Link href="/shop">
                        <video autoPlay muted loop id="myVideo" className="w-100 object-fit-cover">
                            <source src='/assets/videos/jewelry_video.mp4' type="video/mp4" />
                        </video>
                    </Link>
                    <div className="position-absolute top-50 start-50 translate-middle text-white text-center my-5">
                        <h3 className="fs-18 font-secondary fst-italic">Spring – Summer 2020</h3>
                        <h1 className="text-uppercase fs-60" style={{ whiteSpace: "nowrap" }}>FLASH SALE OFF 70%</h1>
                        <Link href="/shop" className="btn btn-custom-white text-white min-w-150 rounded-pill">
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* shipping */}
                <Shipping />

                {/* cat section */}
                <CatSection />

                {/* trending */}
                <Trending />

                {/* sale 70% */}
                <ProductSale />

                {/* our product */}
                <Ourproduct />

                {/* latest - blog */}
                <LatestBlogs />

                {/* instagram */}
                <FollowInstagram />

                {/* footer */}
                <FooterPage />

                {/* popup */}
                <PopupPage />

            </div>
        </React.Fragment >
    )
}

export default HomeVideoBanner