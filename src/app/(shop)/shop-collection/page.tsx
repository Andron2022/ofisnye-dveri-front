import React from "react";
import HomeSection from '@app/(shop)/shop-collection/HomeSection'
import CatSection from '@app/(shop)/shop-collection/CatSection'
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
const ShopCollection = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <div>
                <HomeSection />
                <CatSection />
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default ShopCollection