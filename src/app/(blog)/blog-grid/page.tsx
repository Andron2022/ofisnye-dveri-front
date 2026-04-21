import React from "react";
import BlogSwiper from "@src/commonsections/BlogSwiper";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import GridBlogs from "./GridBlogs";

const BlogGrid = () => {
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
export default BlogGrid