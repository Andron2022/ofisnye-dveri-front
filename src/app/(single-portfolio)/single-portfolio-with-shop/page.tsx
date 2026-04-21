import React from "react";
import SinglePortfolioSection from "@src/commonsections/SinglePortfolioSection";
import Info from '@src/commonsections/Info';
import ShopLook from '@app/(single-portfolio)/single-portfolio-with-shop/ShopLook'
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const SinglePortfolioWithShop = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />
            {/* header */}
            <Header />
            <SinglePortfolioSection />
            <Info />
            <ShopLook />
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default SinglePortfolioWithShop