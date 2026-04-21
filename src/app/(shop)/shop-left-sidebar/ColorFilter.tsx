"use client";
import React from "react";
import { vendorData } from '@src/common/shop/filterData'

const ColorFilter = () => {
    return (
        <React.Fragment>
            <div>
                <h5 className="mb-2 mt-4"> Filter by color </h5>
                <div className="filter-title mb-4"></div>
                <div className="mt-3 filter-category">
                    {
                        vendorData.map((item: any, index: number) => {
                            return (
                                <div key={index} className="round d-flex align-items-center pt-2 mb-2 gap-1">
                                    <input className={item.color} type='checkbox' value="" id="colo1" />
                                    <label className="form-check-label ms-1" style={{ cursor: "pointer" }} htmlFor="color ">
                                        {item.colorName}
                                    </label>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </React.Fragment>
    )
}
export default ColorFilter