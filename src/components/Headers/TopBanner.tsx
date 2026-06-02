"use client";

import Link from "next/link";
import React, { useState } from "react";

const TopBanner = ({ topclass }: { topclass?: string }) => {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={topclass}>
            <div className="t_header fs-13 d-flex align-items-center">
                <div className="container-fluid">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="col text-center text-white">
                            Межкомнатные двери с комплектацией и подходящей фурнитурой. Оформление заказа без онлайн-оплаты.{' '}
                            <Link href="/mezhkomnatnye-dveri" className="text-white">
                                Перейти в каталог <i className="las la-arrow-right" />
                            </Link>
                        </div>

                        <div className="col-auto mt-2 mt-md-0">
                            <button
                                type="button"
                                className="h_banner_close text-white border-0 bg-transparent p-0"
                                onClick={() => setIsOpen(false)}
                            >
                                закрыть
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBanner;
