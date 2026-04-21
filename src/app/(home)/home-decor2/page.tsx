import React from 'react'
import MainBanner from '@app/(home)/home-decor2/MainBanner'
import Shipping from '@src/commonsections/Shipping'
import LatestBlog from '@app/(home)/home-decor/LatestBlog'
import NewsLetter from '@app/(home)/home-decor/NewsLetter'
import FooterDecor2 from '@src/components/FooterDecor2'
import HeaderDecor2 from '@src/components/HeaderDecor2'
import BestSelling from './BestSelling'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeDecor2 = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Decor" />
            <HeaderDecor2 />

            <div>
                {/* main */}
                <MainBanner />

                {/* best selling */}
                <BestSelling />

                {/* shipping */}
                <section className="bg-light">
                    <Shipping />
                </section>

                {/* latest blog */}
                <LatestBlog />

                {/* newsletter */}
                <NewsLetter />

                {/* footer */}
                <FooterDecor2 />
            </div>
        </React.Fragment>
    )
}

export default HomeDecor2