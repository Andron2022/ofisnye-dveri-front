import React from "react";
import SpringSummer from "@src/commonsections/SpringSummer";
import SummerInfo from "@src/commonsections/SummerInfo";
import BlogInstaShopLook from "@src/commonsections/BlogInstaShopLook";
import BlogOtherInfo from "@src/commonsections/BlogOtherInfo";
import RelatedArticles from "@src/commonsections/RelatedArticles";
import SummerSpring from "@src/commonsections/SummerSpring";
import LeaveComment from "@src/commonsections/LeaveComment";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const BlogwithInstagramShop = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />
            {/* header */}
            <Header />
            <SpringSummer />
            <SummerInfo />
            <section>
                <div className="container">
                    <div className="py-3">
                        <BlogInstaShopLook />
                        <BlogOtherInfo />
                        <RelatedArticles />
                        <div className="py-5">
                            <SummerSpring />
                            <LeaveComment />
                        </div>
                    </div>
                </div>
            </section>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default BlogwithInstagramShop