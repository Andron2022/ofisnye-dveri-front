"use client";
import React, { useState, useEffect, useRef } from 'react'

import pr1 from "@assets/images/popup/pr-1.jpg"
import pr2 from "@assets/images/popup/pr-2.jpg"
import pr3 from "@assets/images/popup/pr-3.jpg"
import mem2 from "@assets/images/about-us/mem-02.jpeg"

import Image from 'next/image'
import Link from 'next/link'

const PopupPage = () => {

    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [show, setShow] = useState<boolean>(false);
    const popUps = ['Pop-up 1', 'Pop-up 2', 'Pop-up 3']; // Example pop-up content
    const stopAutohide = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const showTimeout = setTimeout(showWindow, 2000);
        return () => clearTimeout(showTimeout);
    }, []);

    useEffect(() => {
        if (show) {
            stopAutohide.current = setTimeout(hideWindow, 5000);
        }
        return () => {
            if (stopAutohide.current) {
                clearTimeout(stopAutohide.current);
            }
        };
    });

    const showWindow = () => {
        setShow(true);
        const popMain = document.getElementById('pop-main');
        if (popMain) {
            popMain.style.overflow = 'hidden';
        }
    };

    const hideWindow = () => {
        setShow(false);
        document.getElementById('pop-main')!.style.overflow = 'visible';
        setCurrentIndex((currentIndex + 1) % popUps.length);
        setTimeout(showWindow, 5000);
    };

    const handleClose = () => {
        if (stopAutohide.current) {
            clearTimeout(stopAutohide.current);
        }
        hideWindow();
        setTimeout(showWindow, 5000);
    };
    const popUp = [
        {
            id: 1,
            name: "Sara",
            location: "Montana",
            product: "CROP TOP T-SHIRT",
            time: "40 minutes ago",
            image: pr1,
            verified: "verified"
        },
        {
            id: 2,
            name: "Kate",
            location: "Georgia",
            product: "Grey Beanie",
            time: "25 minutes ago",
            image: pr2,
            verified: "verified"
        },
        {
            id: 3,
            name: "Hau",
            location: "California",
            product: "Grey Beanie",
            time: "2 hours ago",
            image: pr3,
            verified: "verified"
        },
        {
            id: 4,
            name: "Hau",
            location: "California",
            product: "Grey Beanie",
            time: "2 hours ago",
            image: mem2,
            verified: "verified"
        }
    ]

    return (
        <React.Fragment>
            <div id="pop-main" className="d-none d-lg-block">
                {
                    popUp.map((item: any, index: number) => {
                        return (
                            <div key={index} className={`pop-up ${show && currentIndex === index ? 'd-flex' : 'd-none'}`}>
                                <div className="pop-card position-relative d-flex align-items-center">
                                    <div className="popup-img">
                                        <Link href="#!">
                                            <Image src={item.image} alt="ItemImg" priority/>
                                        </Link>
                                    </div>
                                    <div className="text-start popup-text">
                                        <p className="mb-0">{item.name} ({item.location}) <span className="text-muted">purchased</span></p>
                                        <Link href="#!" className="text-uppercase fs-14">{item.product}</Link>
                                        <div className="fs-12">
                                            <span className="text-muted">{item.time}</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" height="13" className="text-success ms-2 me-1" viewBox="0 0 512 512" fill="currentColor"><path d="M466.5 83.71l-192-80c-5.875-2.5-12.16-3.703-18.44-3.703S243.5 1.203 237.6 3.703L45.61 83.71C27.73 91.08 16 108.6 16 127.1C16 385.4 205.4 512 255.9 512C305.2 512 496 387.3 496 127.1C496 108.6 484.3 91.08 466.5 83.71zM463.9 128.3c0 225.3-166.2 351.7-207.8 351.7C213.3 479.1 48 352.2 48 128c0-6.5 3.875-12.25 9.75-14.75l192-80c1.973-.8275 4.109-1.266 6.258-1.266c2.071 0 4.154 .4072 6.117 1.266l192 80C463.3 117.1 463.9 125.8 463.9 128.3zM336 181.3c-4.094 0-8.188 1.562-11.31 4.688L229.3 281.4L187.3 239.4C184.2 236.2 180.1 234.7 176 234.7c-9.139 0-16 7.473-16 16c0 4.094 1.562 8.188 4.688 11.31l53.34 53.33C221.2 318.4 225.3 320 229.3 320s8.188-1.562 11.31-4.688l106.7-106.7C350.4 205.5 352 201.4 352 197.3C352 188.8 345.1 181.3 336 181.3z"></path></svg>
                                            <span>{item.verified}</span>
                                        </div>
                                    </div>
                                    <Link href="#!" className="close-btn" onClick={handleClose}>
                                        <i className="iccl iccl-x2"></i>
                                    </Link>
                                    <Link href="#!" className="view-btn">
                                        <i className="iccl iccl-eye2"></i>
                                    </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default PopupPage