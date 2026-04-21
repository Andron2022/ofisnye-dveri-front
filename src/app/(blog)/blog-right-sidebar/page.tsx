import React from "react";
import BlogSwiper from "@src/commonsections/BlogSwiper";
import GridBlogs from '@app/(blog)/blog-left-sidebar/GridBlogs'
import LeftSideBar from '@app/(blog)/blog-left-sidebar/leftSideBar'
import { Row } from "react-bootstrap";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const BlogRightSidebar = () => {
    return (
        <React.Fragment>
             <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />
            <BlogSwiper />
            <div className="container">
                <Row className="mt-5">
                    <GridBlogs />
                    <LeftSideBar />
                </Row>
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default BlogRightSidebar