import React from "react";
import BlogSwiper from "@src/commonsections/BlogSwiper";
import GridBlogs from '@app/(blog)/blog-masonry/GridBlogs'
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const BlogMasonry = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />
            <div id="nt_content">
                <BlogSwiper />
                <GridBlogs />
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default BlogMasonry