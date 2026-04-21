import React from "react";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from '@src/commonsections/FilterTab'
import ShopNavbar from "@src/commonsections/ShopNavbar";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const ShopMasonryLayout = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <ShopNavbar />

            <WomenColting />

            {/* filterTab */}

            <FilterTab />
            <div className="filter-pagination">
                <ul className="pagination py-4 d-flex justify-content-center">
                    <li className="active"><a href="#" className="text-danger">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">Next</a></li>
                </ul>
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default ShopMasonryLayout

