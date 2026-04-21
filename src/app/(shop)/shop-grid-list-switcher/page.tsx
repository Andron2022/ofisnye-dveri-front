import React from 'react'
import { Container } from 'react-bootstrap'
import shop from "@assets/images/shop/shop-banner.jpg"
import Link from 'next/link'
import Header from '@src/components/Headers/Header'
import FooterPage from '@src/components/Footer'
import PopupPage from '@src/components/Popup'
import TopBanner from '@src/components/Headers/TopBanner'
import Head from 'next/head'
import MainModel from '@src/commonsections/MainModel'
import FilterComponent from './Filter'

const ShopGridListSwitcher = () => {


    return (
        <React.Fragment>


            <Head>
                <title>Home Default | Kalles - Clean, Versatile, Responsive Bootstrap 5 & Nextjs Theme</title>
            </Head>

            <TopBanner />
            <Header />
            <div>
                {/* main slide */}
                <div style={{ backgroundImage: `url(${shop.src})`, backgroundPosition: "center" }} className="position-relative">
                    <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                    <div className=" container">
                        <div className="text-white text-center py-5 position-relative">
                            <h4 className="fs-20 fw-medium">Boys</h4>
                            <p className="fs-14">Shop through our latest selection of Boy’s Clothing and Accessories.</p>
                        </div>
                    </div>
                </div>

                {/* filter */}
                <Container>
                    <FilterComponent />
                </Container>

                {/* pagination */}
                <div className="filter-pagination">
                    <ul className="pagination py-4 d-flex justify-content-center">
                        <li className="active"><a href="#">1</a></li>
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

export default ShopGridListSwitcher