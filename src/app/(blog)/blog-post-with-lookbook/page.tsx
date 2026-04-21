import React from 'react'
import SpringSummer from '@src/commonsections/SpringSummer'
import SummerInfo from '@app/(blog)/blog-post-with-lookbook/SummerInfo'
import CatSection from '@app/(blog)/blog-post-with-lookbook/CatSection'
import ThreeModals from '@app/(blog)/blog-post-with-lookbook/ThreeModals'
import BlogOtherInfo from '@src/commonsections/BlogOtherInfo'
import RelatedArticles from '@src/commonsections/RelatedArticles'
import SummerSpring from '@src/commonsections/SummerSpring'
import LeaveComment from '@src/commonsections/LeaveComment'
import FooterPage from '@src/components/Footer'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import PopupPage from '@src/components/Popup'
import HeadTitle from '@src/commonsections/HeadTitle'


const index = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />
            {/* main slide */}
            <SpringSummer />
            <section>
                <div className="container">
                    <SummerInfo />
                    <CatSection />
                    <ThreeModals />
                    <BlogOtherInfo />
                    <RelatedArticles />
                    <div className="py-5">
                        <SummerSpring />
                        <LeaveComment />
                    </div>
                </div>
            </section>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}

export default index