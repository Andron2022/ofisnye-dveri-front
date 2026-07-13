"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useSiteChromeSettings } from "@src/lib/site-chrome/SiteChromeProvider";

const TopBanner = ({ topclass }: { topclass?: string }) => {
    const { announcement } = useSiteChromeSettings();
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen || !announcement.enabled || !announcement.text) {
        return null;
    }

    return (
        <div className={topclass}>
            <div className="t_header fs-13 d-flex align-items-center">
                <div className="container-fluid">
                    <div className="d-flex gap-2 align-items-center">
                        <div className="col text-center text-white">
                            {announcement.text}{" "}
                            {announcement.href && announcement.linkLabel ? (
                                <Link href={announcement.href} className="text-white">
                                    {announcement.linkLabel} <i className="las la-arrow-right" />
                                </Link>
                            ) : null}
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
