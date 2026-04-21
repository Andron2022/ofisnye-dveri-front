import React from "react";
import ShopNavbar from "@src/commonsections/ShopNavbar";
import WomenColting from "@src/commonsections/WomenCloting";
import FilterTab from "@app/(shop)/shop-filter-sidebar/FilterTab";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";

const FilterSiderbar = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default"/>
            <TopBanner />

            {/* header */}
            <Header />

            <div>
                <ShopNavbar />
                <WomenColting />
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
export default FilterSiderbar