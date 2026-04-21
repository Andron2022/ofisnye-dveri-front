import React from "react";
import SpringSummer from "@src/commonsections/SpringSummer";
import SummerInfo from "@src/commonsections/SummerInfo";
import BlogShopLook from "@src/commonsections/BlogShopLook";
import BlogOtherInfo from "@src/commonsections/BlogOtherInfo";
import RelatedArticles from "@src/commonsections/RelatedArticles";
import SummerSpring from "@src/commonsections/SummerSpring";
import LeaveComment from "@src/commonsections/LeaveComment";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const BlogPostProductListing = () => {
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
                    <div className="pb-3 pt-4">
                        <BlogShopLook />
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
export default BlogPostProductListing