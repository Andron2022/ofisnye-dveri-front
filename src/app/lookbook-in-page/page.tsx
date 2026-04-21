import React from "react";
import portfolio from '@assets/images/portfolio/p-04.jpg'
import ShopLook from "@app/lookbook-in-page/ShopLook";
import OtherInfo from "@src/commonsections/OtherInfo";
import RelatedPortfolio from "@src/commonsections/RelatedPortfolio";
import InstaShopLook from "@app/lookbook-in-page/InstaShopLook";
import FooterPage from "@src/components/Footer";
import TopBanner from "@src/components/Headers/TopBanner";
import Header from "@src/components/Headers/Header";
import HeadTitle from "@src/commonsections/HeadTitle";
const LookBookPage = () => {

    return (

        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />
            <Header />
            <div style={{ backgroundImage: `url(${portfolio.src})` }} className="position-relative">
                <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                <div className="px-4">
                    <div className="text-white text-center py-5 position-relative">
                        <h4 className="fs-20 fw-medium">BRANDING DESIGN MOCKUP</h4>
                        <p className="fs-14 section-subtitle sub-title font-secondary fst-italic mb-0">April 5, 2020</p>
                    </div>
                </div>
            </div>
            <section>
                <div className="container">
                    <div className="my-4 text-muted">
                        <p>
                            Typography is the work of <b className="fw-semibold">typesetters, compositors, typographers, graphic
                                designers, art directors, manga artists, comic book artists, graffiti artists,</b> and
                            now—anyone
                            who arranges words, letters, numbers, and symbols for publication, display, or distribution—from
                            clerical workers and newsletter writers to anyone self-publishing materials.
                        </p>
                        <p className="sub-title font-secondary my-3 fst-italic py-4 px-5 lookbook-contain position-relative gray-light ">
                            Sed utgio perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                            beatae vitae dicta sunt explicabo.
                        </p>
                        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                            magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="py-3">
                        <ShopLook />
                        <InstaShopLook />
                        <OtherInfo />
                        <RelatedPortfolio />
                    </div>
                </div>
            </section>
            <FooterPage />
        </React.Fragment>
    )
}
export default LookBookPage