"use client";
import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import Link from 'next/link'
import { Navigation, Thumbs } from 'swiper/modules';
import ShoppingCardModal from '@src/commonsections/ShoppingCardModal';

import thumb1 from "@assets/images/home-kids/thumb-01.jpg"
import thumb2 from "@assets/images/home-kids/thumb-02.jpg"
import thumb3 from "@assets/images/home-kids/thumb-03.jpg"
import thumb4 from "@assets/images/home-kids/thumb-04.jpg"
import thumb5 from "@assets/images/home-kids/thumb-05.jpg"
import trust from "@assets/images/single-product/trust_img2.png"

import 'swiper/css';
import 'swiper/css/navigation';
import "swiper/css/thumbs";

const SwiperSection = () => {
    const [shoppingShow, setShoppingShow] = useState(false);
    const [color, setColor] = useState('Grey');
    const [quantity, setQuantity] = useState(1);


    const handleColorClick = (newColor: string) => {
        setColor(newColor);
    };
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
            <div className="container-fluid bg-white pb-4">
                <div className="row justify-content-center pb-3">
                    <div className="col-lg-5 px-3">

                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            direction='horizontal'
                            autoHeight={true}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            // thumbs={{
                            //     swiper: kidsProductSmall,
                            // }}

                            modules={[Thumbs, Navigation]}
                            className="productMain kidsPoducts kidsProductMain">
                            <SwiperSlide>
                                <Image className="img-fluid w-100" src={thumb1} alt="product4" />
                            </SwiperSlide>
                            <SwiperSlide >
                                <Image className="img-fluid w-100" src={thumb2} alt="product5" />
                            </SwiperSlide>
                            <SwiperSlide className="product">
                                <Image className="img-fluid w-100" src={thumb3} alt="product31" />
                            </SwiperSlide>
                            <SwiperSlide className="product">
                                <Image className="img-fluid w-100" src={thumb4} alt="product42" />
                            </SwiperSlide>
                            <SwiperSlide className="product">
                                <Image className="img-fluid w-100" src={thumb5} alt="product43" />
                            </SwiperSlide>
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </Swiper>
                        <Swiper className="productSmall kidsPoducts kidsProductSmall"
                            direction="horizontal"
                            slidesPerView={4}
                            spaceBetween={10}
                            navigation={{
                                nextEl: ".swiper-button-next",
                                prevEl: ".swiper-button-prev",
                            }}
                            modules={[Navigation]}
                        >
                            <div className="swiper-wrapper d-flex">
                                <SwiperSlide>
                                    <Image src={thumb1} className="object-fit-cover" alt="product1" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src={thumb2} className="object-fit-cover" alt="product5" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src={thumb3} className="object-fit-cover" alt="product5" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src={thumb4} className="object-fit-cover" alt="product42" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <Image src={thumb5} className="object-fit-cover" alt="product43" />
                                </SwiperSlide>
                            </div>
                        </Swiper>
                    </div>

                    <div className="col-lg-5">
                        <h4 className="mb-2 fs-16 font-futura">Cosatto Baby Fleece Troller</h4>
                        <p className="text-muted fs-22 mb-3">$145.00</p>
                        <p className="pr_flash"><i className="cd mr__5 fading_true fs__20 las la-fire me-1 mb-1"></i>13 sold in
                            last 19 hours</p>
                        <p className="text-muted mb-3">Fully removable seat unit for easy cleaning and self-standing capability.
                            One-hand recline
                            with 4 recline...</p>

                        <div className="fw-bold text-blue-dark h6">
                            <h6 className="text-uppercase fw-bold mb-3">Color: <span>{color}</span></h6>
                            <div className="product-color-list mt-2 gap-2 d-flex align-items-center">

                                <Link href="#!" className="d-inline-block bg_color_pink rounded-circle square-xs"
                                    onClick={() => handleColorClick('Pink')}
                                />

                                <Link href="#!" className="d-inline-block bg-dark rounded-circle square-xs"
                                    onClick={() => handleColorClick('Black')}
                                />

                            </div>
                        </div>

                        <div className="d-flex align-items-center gap-2 mt-4">
                            <div className="input-step border border-dark rounded-pill">
                                <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements}>–</button>
                                <input type="number" className="product-quantity fw-bold fs-6" value={quantity} min="0" max="100" onChange={handleChange} />
                                <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements}>+</button>
                            </div>
                            <button type="submit" className="btn btn-blue-dark rounded-pill text-uppercase px-4 fw-semibold" onClick={handleShoppingShow}>Add
                                to
                                cart</button>
                            <div className="product_wishlist square-40 rounded-circle border border-dark bg-transparent text-center" style={{ lineHeight: "40px" }}>
                                <Link href="#"><i className="facl facl-heart-o"></i></Link>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Image src={trust} alt="TrustImg" />
                        </div>
                        <div className="nt-social my-3 fs-20 d-flex align-items-center flex-wrap justify-content-center">
                            <Link href="https://www.facebook.com" className="facebook cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-facebook"></i>
                            </Link>
                            <Link href="https://twitter.com" className="twitter cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-twitter"></i>
                            </Link>
                            <Link href="#" className="email cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-mail-alt"></i>
                            </Link>
                            <Link href="https://www.pinterest.com" className="pinterest cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-pinterest"></i>
                            </Link>
                            <Link href="#" className="tumblr cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-tumblr"></i>
                            </Link>
                            <Link href="#" className="telegram cb ttip_nt tooltip_top m-2">
                                <i className="facl facl-telegram"></i>
                            </Link>
                        </div>
                        <p className="pr_flash mb-3"><i className="cd mr__5 fading_true fs__20 las la-eye me-1 mb-1"></i>
                            <span className="fw-medium">85 People</span>&nbsp;are viewing this right now
                        </p>
                        <Link href="#!" className="fs-14 fw-medium main_link_primary"> View Full details <i className="facl facl-right"></i> </Link>
                    </div>
                </div>
            </div>
            <ShoppingCardModal shoppingShow={shoppingShow} handleShoppingClose={handleShoppingClose} />

        </React.Fragment>
    )
}

export default SwiperSection