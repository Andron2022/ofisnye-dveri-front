import React from "react";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import PopupPage from "@src/components/Popup";
import HeadTitle from "@src/commonsections/HeadTitle";
import HomeSection from "./HomeSection";
import CartDetail from "./CartDetail";

const ShoppingCart = () => {
    return (
        <React.Fragment>
            <HeadTitle title="Корзина" />
            <TopBanner />
            <Header />

            <main id="nt_content">
                <HomeSection />
                <section>
                    <div className="container">
                        <div className="mt-md-5 pt-4 pb-5">
                            <CartDetail />
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
            <PopupPage />
        </React.Fragment>
    );
};

export default ShoppingCart;
