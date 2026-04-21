import React from "react";

import ViewedProduct from "./ViewProduct";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import HomeSection from "./HomeSection";
import CartDetail from "./CartDetail";
import AddProductForm from "./AddProductForm";
import LikeProducts from "./LikeProduct";

const ShoppingCart = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />

            <div>
                <HomeSection />
                <section>
                    <div className="container">
                        <div className="mt-md-5 pt-4">
                            <CartDetail />
                            <AddProductForm />
                        </div>
                    </div>
                </section>
                <div className="container mt-3 mt-lg-5">
                    <h3 className="py-4 text-center">
                        You may also like
                    </h3>
                    <LikeProducts />
                </div>
                <div className="container">
                    <h3 className="py-4 text-center">
                        Recently viewed products
                    </h3>
                    <ViewedProduct />
                </div>

            </div>
            <FooterPage />
            <PopupPage />
        </React.Fragment >
    )
}
export default ShoppingCart