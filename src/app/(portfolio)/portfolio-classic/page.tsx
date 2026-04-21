import React from "react";
import PortfolioSection from "@src/commonsections/PortfolioSection";
import PortfolioTab from "@src/commonsections/PortfolioTab";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const portfolio = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />
            {/* header */}
            <Header />
            <PortfolioSection />
            <PortfolioTab />
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default portfolio