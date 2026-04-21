"use client";
import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper/modules'
import ShippingandDelivery from '@app/(product)/product-detail-pickup-availability/ShippingandDelivery'
import ProductAvailabilityTabs from '@app/(product)/product-detail-pickup-availability/ProductAvailabilityTabs'
import Image from 'next/image'
import MobileAccordion from '@app/(product)/product-detail-left-sidebar/MobileAccordion'
import FooterShoe from '@src/components/FooterShoe'
import thumb from "@assets/images/single-product/pickup-availability/thumb-sticky.jpg"
import AlsoLike from './AlsoLikeandRecentview'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal'
import BreadCrumb from '@src/commonsections/BreadCrumb'

import thumb1 from "@assets/images/single-product/pickup-availability/thumb-01.jpg"
import thumb2 from "@assets/images/single-product/pickup-availability/thumb-02.jpg"
import thumb3 from "@assets/images/single-product/pickup-availability/thumb-03.jpg"
import thumb4 from "@assets/images/single-product/pickup-availability/thumb-04.jpg"

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const ProductDetailPickupAvailability = () => {

    const [productSmall, setProductSmall] = useState(null);
    const [shoppingShow, setShoppingShow] = useState(false);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 575) {
                let maxScrollHeight = 3300; // Default value
                if (window.innerWidth <= 1224) {
                    maxScrollHeight = 2750;
                }
                if (window.scrollY > window.innerHeight && window.scrollY <= maxScrollHeight) {
                    document.querySelector(".productCart")?.classList.remove("d-none");
                } else {
                    var cartProduct = document.querySelector(".productCart")?.classList;
                    if (!cartProduct?.contains("d-none")) {
                        cartProduct?.add("d-none");
                    }
                }
            } else {
                let maxScrollHeight = 3300; // Default value
                if (window.innerWidth <= 1224) {
                    maxScrollHeight = 2450;
                }
                if (window.scrollY > window.innerHeight && window.scrollY <= maxScrollHeight) {
                    document.querySelector(".productCart")?.classList.remove("d-none");
                } else {
                    var cartProduct = document.querySelector(".productCart")?.classList;
                    if (!cartProduct?.contains("d-none")) {
                        cartProduct?.add("d-none");
                    }
                }

            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onProductSwipe = () => {
        setProductSmall(productSmall)
    }

    const handleShoppingClose = () => setShoppingShow(false);
    const handleShoppingShow = () => setShoppingShow(true);
    const handleIncrements = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
    };

    // Handler for decrementing quantity
    const handleDcrements = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
    };

    // Handler for manual input change
    const handleChange = (event: any) => {
        const value = Math.max(0, Math.min(100, Number(event.target.value)));
        setQuantity(value);
    };


    return (
        <React.Fragment>
            <TopBanner />

            <Header />
            <div>

                <BreadCrumb title="Women" subTitle="Adidas Copa Primeknit Sneakers" />

                <section className="py-4">
                    <Container>
                        <div className="row py-3 g-0">
                            <div className="col-lg-6 m-xl-n3 pe-xl-5">
                                <div className="row g-2">
                                    <div className="col-xl-10 order-2 order-xl-1 mt-3">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            direction='horizontal'
                                            autoHeight={true}
                                            navigation={{
                                                nextEl: ".swiper-button-next",
                                                prevEl: ".swiper-button-prev",
                                            }}
                                            thumbs={{
                                                swiper: productSmall,
                                            }}
                                            modules={[Navigation, Thumbs]}
                                            className="productMain pickup-arrow">
                                            <div className="swiper-wrapper">
                                                <SwiperSlide>
                                                    <Image src={thumb1} alt="Thumb1Img" className="img-fluid w-100" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Image src={thumb2} alt="Thumb2Img" className="img-fluid w-100" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Image src={thumb3} alt="Thumb3Img" className="img-fluid w-100" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Image src={thumb4} alt="Thumb4Img" className="img-fluid w-100" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Image src={thumb1} alt="Thumb1Img" className="img-fluid w-100" />
                                                </SwiperSlide>
                                                <SwiperSlide>
                                                    <Image src={thumb2} alt="Thumb2Img" className="img-fluid w-100" />
                                                </SwiperSlide>

                                            </div>
                                            <div className="swiper-button-next"></div>
                                            <div className="swiper-button-prev"></div>
                                        </Swiper>
                                    </div>
                                    <div className="col-xl-2 order-1 order-xl-2 mt-3">
                                        <Swiper
                                            onSwiper={onProductSwipe}
                                            spaceBetween={10}
                                            slidesPerView={6}
                                            direction='vertical'
                                            navigation={{
                                                nextEl: ".product-thumb-next",
                                                prevEl: ".product-thumb-prev",
                                            }}
                                            breakpoints={{
                                                100: {
                                                    direction: "horizontal",
                                                    slidesPerView: 4,
                                                },
                                                1200: {
                                                    direction: "vertical",

                                                }
                                            }}
                                            modules={[Navigation, Thumbs]}
                                            // thumbsSlider=""
                                            className="productSmall">
                                            <div className="swiper-wrapper">
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb1} alt="Thumb1Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb2} alt="Thumb2Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb3} alt="Thumb3Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb4} alt="Thumb4Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb1} alt="Thumb1Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                                <SwiperSlide className="pe-2">
                                                    <Image src={thumb2} alt="Thumb2Img" className="object-fit-cover" />
                                                </SwiperSlide>
                                            </div>
                                        </Swiper>
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <ShippingandDelivery handleShoppingShow={handleShoppingShow} />
                        </div>
                    </Container>
                </section>

                {/* Tabs */}
                <ProductAvailabilityTabs />

                <MobileAccordion />

                {/* also like & recent view */}
                <AlsoLike />

                {/* footer */}
                <FooterShoe />
            </div>

            {/* bottom */}
            <div className="position-fixed bottom-0 bg-body start-0 end-0 z-1 productCart d-none" style={{ boxShadow: '0 0 9px rgba(0, 0, 0, 0.12)' }}>
                <div className="container">
                    <div className="row justify-content-between align-items-center py-2">
                        <div className="col-auto">
                            <div className="d-none d-md-flex align-items-center">
                                <div>
                                    <Image alt="ThumbImg" src={thumb} style={{ maxHeight: "75px", maxWidth: "65px", width: "auto", height: "auto", verticalAlign: "middle" }} />
                                </div>
                                <div className="ms-2">
                                    <h6 className="mb-1">Adidas Copa Primeknit Sneakers</h6>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto mt-2 mt-md-0">
                            <div className="d-flex align-items-center gap-2">
                                <p className="text-danger mb-0 d-none d-md-flex" style={{ fontSize: "16px" }}>$289.00</p>
                                <div className="input-step border">
                                    <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements}>–</button>
                                    <input type="number" className="product-quantity fw-bold fs-6" value={quantity} min="0" max="100" onChange={handleChange} />
                                    <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements}>+</button>
                                </div>
                                <button data-bs-toggle="offcanvas" data-bs-target="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" className="btn bg-danger-dark text-white text-uppercase rounded-0 min-w-150" onClick={handleShoppingShow}>
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}

export default ProductDetailPickupAvailability