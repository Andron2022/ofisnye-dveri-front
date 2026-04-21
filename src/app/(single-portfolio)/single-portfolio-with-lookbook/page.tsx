import React from "react";
import PortfolioSection from '@app/(single-portfolio)/single-portfolio-with-lookbook/PortfolioSection'
import Info from "@src/commonsections/Info";
import ShopLook from '@app/(single-portfolio)/single-portfolio-with-lookbook/ShopLook'
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const SinglePortfolioWithLookbook = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />
            {/* header */}
            <Header />
            <PortfolioSection />
            <Info />
            <ShopLook />
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default SinglePortfolioWithLookbook