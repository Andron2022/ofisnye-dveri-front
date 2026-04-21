"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';

const HomeSportTopBanner = ({ extraclass }: any) => {

    const [isOpen, setIsOpen] = useState(true);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    useEffect(() => {
        // Add the class to the body tag when the component mounts
        document.body.classList.add('font-raleway');

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('font-raleway');
        };
    }, []);

    // Define the target date
    const targetDate = new Date('2027/01/01').getTime();

    // Helper function to pad single digits with a leading zero
    const padWithZero = (number: number) => {
        return number < 10 ? `0${number}` : number;
    };

    // Renderer for the countdown
    const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
        if (completed) {
            // Render a completed state
            return <span>Time&apos;s up!</span>;
        } else {
            // Calculate weeks from days
            const weeks = Math.floor(days / 7);
            const remainingDays = days % 7;

            // Render the countdown with padded values
            return (
                <span>
                    {weeks} weeks {padWithZero(remainingDays)} days {padWithZero(hours)}:{padWithZero(minutes)}:{padWithZero(seconds)}
                </span>
            );
        }
    };

    return (
        <React.Fragment>
            <div className={`navbar-sport ${extraclass}`}>
                <div className={`t_header fs-13 d-flex align-items-center ${!isOpen ? 'd-none' : ''}`}>
                    <div className="container-fluid">
                        <div className="d-flex gap-2">
                            <div className="col text-center text-white">
                                Today deal sale off <strong>70% </strong>. End in {' '}
                                <strong className="js_kl__countdown">
                                    {isClient && <Countdown date={targetDate} renderer={renderer} />}
                                </strong>
                                . <Link href="#!" className="text-white">Hurry Up <i className="las la-arrow-right"></i></Link>
                            </div>
                            <div className="col-auto mt-2 mt-md-0">
                                <Link href="#" className="h_banner_close text-white" onClick={(e) => { e.preventDefault(); setIsOpen(false); }}>close</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default HomeSportTopBanner;
