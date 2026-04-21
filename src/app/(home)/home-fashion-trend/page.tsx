import React from 'react'
import MainSection from '@app/(home)/home-fashion-trend/MainSection'
import BlogPost from '@app/(home)/home-fashion-trend/BlogPost'
import TrendInsta from '@app/(home)/home-fashion-trend/TrendInsta'
import FooterTrend from '@src/components/FooterTrend'
import BestSeller from '@app/(home)/home-fashion-trend/BestSeller'
import HomeFashionTrendHeader from '@src/components/Headers/HomeFashionTrendHeader'
import HeadTitle from '@src/commonsections/HeadTitle'
import Shipping from './Shipping'

const HomeFashionTrend = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Fashion Trend" />
            <div className="home-fashion-trend">

                {/* header */}
                <HomeFashionTrendHeader />
                {/* main */}
                <MainSection />

                {/* best seller */}
                <BestSeller />

                {/* blog post */}
                <BlogPost />

                {/* trend insta */}
                <TrendInsta />

                {/* shipping */}
                <Shipping />

                {/* footer */}
                <FooterTrend />

            </div>
        </React.Fragment>
    )
}

export default HomeFashionTrend