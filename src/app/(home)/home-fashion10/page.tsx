import React from 'react'
import Link from 'next/link'

import main from "@assets/images/home-fashion-9/main-slide.jpg"
import FooterPage from '@src/components/Footer'
import Shipping from '@src/commonsections/Shipping'
import FollowInstagram from '@src/commonsections/FollowInstagram'
import LatestBlogs from '@src/commonsections/LatestBlogs'
import CatSection from '@app/(home)/home-fashion10/CatSection'
import BestSeller from '@app/(home)/home-fashion9/BestSeller'
import HeaderFashion9 from '@src/components/HeaderFashion9'
import TopBanner from '@src/components/Headers/TopBanner'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeFashion10 = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Fashion 10" />
            <TopBanner />

            <HeaderFashion9 />
            {/* main slider */}
            <section className=" kalles-categories-link-banner position-relative" style={{ backgroundImage: `url(${main.src})` }}>
                <div className="position-absolute top-0 start-0 end-0 bottom-0 text-center py-5 d-flex align-items-center justify-content-center">
                    <div>
                        <h3 className="fs-18 mb-3">SUMMER COLLECTION</h3>
                        <h1 className="text-uppercase fs-60 fw-bold mb-4">HUGE SALE 70% OFF</h1>
                        <Link href="/shop" className="btn btn-dark text-white fw-medium min-w-150 rounded-0">Men</Link>&nbsp;
                        <Link href="/shop" className="btn btn-dark text-white fw-medium min-w-150 rounded-0">Women</Link>
                    </div>
                </div>
            </section>

            {/* cat section */}
            <CatSection />

            {/* best seller */}
            <BestSeller />

            {/* latest - blog */}
            <LatestBlogs />

            {/* instagram */}
            <FollowInstagram />

            {/* Shipping */}
            <Shipping />

            {/* Footer */}
            <FooterPage />

        </React.Fragment>
    )
}

export default HomeFashion10