"use client";
import Link from "next/link";
import React from "react";

const FilterLine = () => {
    return (
        <React.Fragment>
            <div className="filter-list">
                <ul className="list-unstyled d-flex my-4 align-items-center" style={{ height: "22px" }}>
                    <li>
                        <Link href="#!" className="d-flex align-items-center text-black"><span className="text-teal me-1">20</span>
                            Product
                            Found</Link>
                    </li>

                    <li>
                        <Link href="#!" className="d-flex align-items-center text-black">
                            <span className="filter-close">
                                <svg xmlns="http://www.w3.org/2000/svg" className="me-1 lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg></span>
                            <span className="d-none filter-open"><svg className="me-1 mb-2 lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                            </svg> </span>
                            Clear All Filter
                        </Link>
                    </li>

                    <li>
                        <Link href="#!" className="d-flex align-items-center text-black">
                            <span className="filter-close">
                                <svg xmlns="http://www.w3.org/2000/svg" className="me-1 lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg></span>
                            <span className="d-none filter-open"><svg className="me-1 mb-2 lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                            </svg> </span>
                            Size M
                        </Link>
                    </li>

                    <li>
                        <Link href="#!" className="d-flex align-items-center text-black">
                            <span className="filter-close">
                                <svg xmlns="http://www.w3.org/2000/svg" className="me-1 lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg></span>
                            <span className="d-none filter-open"><svg className="me-1 mb-2 lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                            </svg> </span>
                            Color Cyan
                        </Link>
                    </li>

                    <li>
                        <Link href="#!" className="d-flex align-items-center text-black">
                            <span className="filter-close">
                                <svg xmlns="http://www.w3.org/2000/svg" className="me-1 lucide lucide-x" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg></span>
                            <span className="d-none filter-open"><svg className="me-1 mb-2 lucide lucide-minus" xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14" />
                            </svg> </span>
                            Vendor Kalles
                        </Link>
                    </li>

                </ul>
            </div>
        </React.Fragment >
    )
}
export default FilterLine