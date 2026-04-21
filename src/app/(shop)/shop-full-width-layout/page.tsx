import React from "react";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@app/(shop)/shop-full-width-layout/FilterTab";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const ShopFullWidthLayout = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <ShopNavbar />

            <WomenColting />
            <div className="px-4">
                <FilterTab />
                <div className="filter-pagination">
                    <ul className="pagination py-4 d-flex justify-content-center">
                        <li className="active"><Link href="#" className="text-danger">1</Link></li>
                        <li><Link href="#">2</Link></li>
                        <li><Link href="#">3</Link></li>
                        <li><Link href="#">4</Link></li>
                        <li><Link href="#">Next</Link></li>
                    </ul>
                </div>
            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}
export default ShopFullWidthLayout