"use client";
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import slide1 from "@assets/images/home-lookbook/slide-01.jpg"
import slide2 from "@assets/images/home-lookbook/slide-02.jpg"
import slide3 from "@assets/images/home-lookbook/slide-03.jpg"

import { FashionModal, FashionModall, HairMoadl, ProductHoverModal, ProductInfoModal, SortModal, CapModal, ProductInfoModal2, ProductInfoModal3, WatchModal } from '@src/components/ProductDetailThumbRightModals/ProductDetailThumbTabModal'
import 'flickity/css/flickity.css';

const HomeSection = () => {
    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);
    const [modalShow4, setModalShow4] = useState(false);
    const [modalShow5, setModalShow5] = useState(false);
    const [modalShow6, setModalShow6] = useState(false);
    const [modalShow7, setModalShow7] = useState(false);
    const [modalShow8, setModalShow8] = useState(false);
    const [modalShow9, setModalShow9] = useState(false);
    const [modalShow10, setModalShow10] = useState(false);

    const handleRightModal1Show = () => setModalShow1(true);
    const handleRightModal1Close = () => setModalShow1(false);
    const handleRightModal2Show = () => setModalShow2(true);
    const handleRightModal2Close = () => setModalShow2(false);
    const handleRightModal3Show = () => setModalShow3(true);
    const handleRightModal3Close = () => setModalShow3(false);

    const handleRightModal4Close = () => setModalShow4(false);
    const handleRightModal5Show = () => setModalShow5(true);
    const handleRightModal5Close = () => setModalShow5(false);
    const handleRightModal6Show = () => setModalShow6(true);
    const handleRightModal6Close = () => setModalShow6(false);
    const handleRightModal7Show = () => setModalShow7(true);
    const handleRightModal7Close = () => setModalShow7(false);
    const handleRightModal8Show = () => setModalShow8(true);
    const handleRightModal8Close = () => setModalShow8(false);
    const handleRightModal9Show = () => setModalShow9(true);
    const handleRightModal9Close = () => setModalShow9(false);
    const handleRightModal10Show = () => setModalShow10(true);
    const handleRightModal10Close = () => setModalShow10(false);

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.slideshow', {
                fade: false,
                cellAlign: 'center',
                imagesLoaded: false,
                lazyLoad: false,
                freeScroll: false,
                wrapAround: true,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: true,
                contain: true,
                adaptiveHeight: true,
                dragThreshold: 10,
                percentPosition: true,
                draggable: true,
                selectedAttraction: 0.1,
                friction: 0.6,
            });

            // Initialize AOS (Animate On Scroll)
            // AOS.init();
        }

        // Cleanup Flickity on unmount
        return () => {
            if (flickityRef.current) {
                flickityRef.current.destroy();
            }
        };
    }, []);

    return (
        <React.Fragment>
            <section className="position-relative home-lookbook-section">
                <div className="slideshow">
                    {/* first slide */}
                    <div className="slideshow__slide w-100 kalles-lookbook-home" style={{ backgroundImage: `url(${slide1.src})` }}>
                        <div className="pin-type position-absolute position-01">
                            <span className="zoompin"></span>
                            <Link href="#pinType1" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal1Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-02">
                            <span className="zoompin"></span>
                            <Link href="#pinType2" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal2Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-03">
                            <span className="zoompin"></span>
                            <Link href="#pinType3" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal3Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-04">
                            <span className="zoompin"></span>
                            <Link href="#pinType4" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal5Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-05">
                            <span className="zoompin"></span>
                            <Link href="#pinType5" className="bg_color_red text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal6Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                    </div>
                    {/* second slide */}
                    <div className="slideshow__slide w-100 kalles-lookbook-home" style={{ backgroundImage: `url(${slide2.src})` }}>
                        <div className="pin-type position-absolute position-06">
                            <span className="zoompin"></span>
                            <Link href="#pinType6" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal7Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-07">
                            <span className="zoompin"></span>
                            <Link href="#pinType7" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal8Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                    </div>

                    {/* third slide */}
                    <div className="slideshow__slide w-100 kalles-lookbook-home" style={{ backgroundImage: `url(${slide3.src})` }}>
                        <div className="pin-type position-absolute position-08">
                            <span className="zoompin"></span>
                            <Link href="#pinType8" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal10Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                        <div className="pin-type position-absolute position-09">
                            <span className="zoompin"></span>
                            <Link href="#pinType9" className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center position-relative" data-bs-toggle="modal" onClick={handleRightModal9Show}>
                                <i className="nav_link_icon position-relative"></i>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Modals (pinTypeX) */}
                {/* pin-type -1 */}

                {/* Example of modal structure */}
                <div className="modal fade modal-overl pin_popup" id="pinType1" tabIndex={-1} aria-labelledby="pinType1Label" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-body p-20">
                                {/* Content of the modal */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <HairMoadl modalShow1={modalShow1} handleRightModal1Close={handleRightModal1Close} />
            <FashionModal modalShow2={modalShow2} handleRightModal2Close={handleRightModal2Close} />
            <ProductInfoModal modalShow3={modalShow3} handleRightModal3Close={handleRightModal3Close} />
            <ProductHoverModal modalShow4={modalShow4} handleRightModal4Close={handleRightModal4Close} />
            <FashionModall modalShow5={modalShow5} handleRightModal5Close={handleRightModal5Close} />
            <SortModal modalShow6={modalShow6} handleRightModal6Close={handleRightModal6Close} />
            <CapModal modalShow7={modalShow7} handleRightModal7Close={handleRightModal7Close} />
            <ProductInfoModal2 modalShow8={modalShow8} handleRightModal8Close={handleRightModal8Close} />
            <ProductInfoModal3 modalShow9={modalShow9} handleRightModal9Close={handleRightModal9Close} />
            <WatchModal modalShow10={modalShow10} handleRightModal10Close={handleRightModal10Close} />

            

        </React.Fragment>
    )
}
export default HomeSection