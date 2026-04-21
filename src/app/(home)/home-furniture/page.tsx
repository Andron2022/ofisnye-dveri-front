import React from 'react'
import HomeSection from '@app/(home)/home-furniture/HomeSection'
import Info from '@app/(home)/home-furniture/Info'
import NewProduct from '@app/(home)/home-furniture/NewProduct'
import RecentProject from '@app/(home)/home-furniture/RecentProject'
import HappyCustomer from '@app/(home)/home-furniture/HappyCustomer'
import FeaturedCollection from '@app/(home)/home-furniture/FeaturedCollection'
import Collection from '@app/(home)/home-furniture/Collection'
import Blogs from '@app/(home)/home-furniture/Blogs'
import NewsLetter from '@app/(home)/home-furniture/NewsLetter'
import FooterFurniture from '@src/components/FooterFurniture'
import PopupPage from '@src/components/Popup'
import HeaderFurniture from '@src/components/HeaderFurniture'
import HeadTitle from '@src/commonsections/HeadTitle'

const HomeFurniture = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Furniture" />
            {/* header */}
            <HeaderFurniture />

            <div>
                {/* slide */}
                <HomeSection />

                {/* info */}
                <Info />

                {/* collection */}
                <NewProduct />

                {/* recent project  */}
                <RecentProject />

                {/* happy customer testimonial */}
                <HappyCustomer />

                {/* featured-collection */}
                <FeaturedCollection />

                {/* collection */}
                <Collection />

                {/* feature blog */}
                <Blogs />

                {/* newsletter */}
                <NewsLetter />

                {/* footer */}
                <FooterFurniture />

                <PopupPage />
            </div>

        </React.Fragment>
    )
}

export default HomeFurniture