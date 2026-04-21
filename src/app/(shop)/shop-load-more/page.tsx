import React from "react";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@src/commonsections/FilterTab";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const LodeMore = () => {
    return (
        <React.Fragment>
             <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <ShopNavbar />

            <WomenColting />

            <FilterTab />

            <div className="d-flex justify-content-center mb-5">
                <button type="submit" className="btn-load btn btn-custom-dark fw-semibold min-w-150 rounded-pill">
                    Lorn more
                </button>
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default LodeMore