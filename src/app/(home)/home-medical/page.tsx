"use client";
import React, { useEffect } from 'react'
import HomeSection from '@app/(home)/home-medical/HomeSection';
import Banner from '@app/(home)/home-medical/Banner';
import Categories from '@app/(home)/home-medical/Categories';
import DealSection from '@app/(home)/home-medical/DealSection';
import SellingItems from '@app/(home)/home-medical/SellingItems';
import Brands from '@app/(home)/home-medical/Brands';
import MedicalBlogs from '@app/(home)/home-medical/MedicalBlogs';
import MedicalShippingInfo from '@app/(home)/home-medical/MedicalShippingInfo';
import FooterMedical from '@src/components/FooterMedical';
import HeaderMedical from '@src/components/HeaderMedical';
import PopupPage from '@src/components/Popup';
import HeadTitle from '@src/commonsections/HeadTitle';


const HomeMedical = () => {

    useEffect(() => {
        document.body.classList.add('wrapper_cus', 'font-open-sans');
        return () => {
            document.body.classList.remove('wrapper_cus', 'font-open-sans');
        };
    }, []);

    return (
        <React.Fragment>
            <HeadTitle title="Home Medical" />
            {/* header */}
            <HeaderMedical />

            <div>
                {/* main slide */}
                <HomeSection />

                {/* banner */}
                <Banner />

                {/* categories */}
                <Categories />

                {/* deal-section */}
                <DealSection />

                {/* Best selling items */}
                <SellingItems />

                {/* brand-list section */}
                <Brands />

                {/* kalles-medical-blog-post */}
                <MedicalBlogs />

                {/* medical-shipping-info */}
                <MedicalShippingInfo />

                {/* Footer */}
                <FooterMedical />

                <PopupPage />

            </div>
        </React.Fragment>
    )
}

export default HomeMedical