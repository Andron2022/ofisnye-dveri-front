"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Dropdown} from "react-bootstrap";

import AUD from '@assets/images/svg/aud.svg';
import CAD from '@assets/images/svg/cad.svg';
import DKK from '@assets/images/svg/dkk.svg';
import EUR from '@assets/images/svg/eur.svg';
import GBP from '@assets/images/svg/gbp.svg';
import HKD from '@assets/images/svg/hkd.svg';
import JPY from '@assets/images/svg/jpy.svg';
import NZD from '@assets/images/svg/nzd.svg';
import SGD from '@assets/images/svg/sgd.svg';
import USD from '@assets/images/svg/usd.svg';
import Link from "next/link";


const country = [
    {
        name: "AUD",
        image: AUD
    },
    {
        name: "CAD",
        image: CAD
    },
    {
        name: "DKK",
        image: DKK
    },
    {
        name: "EUR",
        image: EUR
    },
    {
        name: "GBP",
        image: GBP
    },
    {
        name: "HKD",
        image: HKD
    },
    {
        name: "JPY",
        image: JPY
    },
    {
        name: "NZD",
        image: NZD
    },
    {
        name: "SGD",
        image: SGD
    },
    {
        name: "USD",
        image: USD
    },
]

const Topbnner = () => {

    const [isOpen, setIsOpen] = useState(true);
    const [currency, setCurrency] = useState('USD');

    const handleSelect = (eventKey: any) => {
        setCurrency(eventKey);
    };

    return (
        <>
            <div className={`topbar-cosmetics ${!isOpen ? 'd-none' : ''}`}>
                <div className="t_header fs-13 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col text-white text-center text-lg-start">
                                Start earning Octopus Rewards points when you shop!
                                <Link href="#!" className="main_link_white_lima text-white fw-medium">
                                    JOIN NOW
                                </Link>
                            </div>
                            <div className="col-auto d-none d-lg-block ">
                                <Dropdown className="text-end position-relative">
                                    <Dropdown.Toggle className="fs-12 text-white currency-button" variant="link" id="dropdown-basic">
                                        <Image src={USD} alt="USDImg" height="12" className="me-1" /> USD <i className="facl facl-angle-down ms-1"></i>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="p-3 dropdown-currency">
                                        {
                                            country.map((item: any, index: number) => {
                                                return (
                                                    <Dropdown.Item href="#!" key={index}>
                                                        <Image src={item.image} alt="ItemImg" height="12" className="me-1" /> {item.name}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Topbnner