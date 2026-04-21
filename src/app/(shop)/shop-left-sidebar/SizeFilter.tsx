"use client";
import React from "react";
import { sizeData } from '@src/common/shop/filterData'

const SizeFilter = () => {
    return (
        <div>
            <h5 className="mb-2 mt-4"> By Size </h5>
            <div className="filter-title mb-4"></div>
            <div className="mt-3">
                {
                    sizeData.map((item: any, index: number) => {
                        return (
                            <div key={index} className="form-check mb-2">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked11" />
                                <label className="form-check-label" htmlFor="flexCheckChecked11" style={{ cursor: "pointer" }}>
                                    {item.size}
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default SizeFilter