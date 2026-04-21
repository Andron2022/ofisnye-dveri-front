"use client";
import React, { useRef, useEffect } from "react";
import { BolgsData } from "@src/common/Bolgs/BolgsData";
import Link from "next/link";

import 'flickity/css/flickity.css';

const BlogSwiper = () => {

    const flickityRef = useRef<Flickity | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize Flickity
            const FlickityClass = require('flickity');
            flickityRef.current = new FlickityClass('.blog-slideshow', {
                groupCells: true,
                fade: false,
                imagesLoaded: false,
                lazyLoad: false,
                freeScroll: false,
                wrapAround: false,
                autoPlay: false,
                pauseAutoPlayOnHover: true,
                rightToLeft: false,
                prevNextButtons: true,
                pageDots: false,
                contain: 3,
                adaptiveHeight: true,
                dragThreshold: 5,
                percentPosition: true,
            });

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
            <div className="kalles-blog-grid">
                <div className="slideshow blog-slideshow">
                    {
                        BolgsData.map((item: any, index: number) => {
                            return (
                                <div key={index} className="slideshow__slide" style={{ width: "33.33%" }}>
                                    <Link href="#" className="blog_grid">
                                        <div className="blog_grid_img w-100 h-100" style={{ backgroundImage: `url(${item.img.src})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} >
                                        </div>
                                    </Link>
                                    <div className="card rounded-0 border-0 bg-black bg-opacity-75 position-absolute w-100 bottom-0 start-0 end-0 z-3">
                                        <div className="card-body text-center">
                                            <div>
                                                <span className="fs-12 text-white-50"> {item.words} <span className="text-white"> {item.type} </span></span>
                                                <span className="fs-12 text-white-50"> {item.words2} <Link href="#!" className="text-white"> {item.type2}</Link>, 
                                                    <Link href="#!" className="text-white"> {item.fashion}</Link>
                                                </span>
                                            </div>
                                            <h2 className="fs-14 text-uppercase blog_grid_img_heading">
                                                <Link className="text-white" href="blog-post-with-instagram-shop.html">{item.des}</Link>
                                            </h2>
                                            <span>
                                                <time className="text-white-50" dateTime="2020-04-06T02:22:00Z">{item.date}</time>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}
export default BlogSwiper