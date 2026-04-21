"use client";
import React from "react";
import { priceData } from '@src/common/shop/filterData'

const PriceFilter = () => {
    return (
        <React.Fragment>
            <div>
                <h5 className="mb-2 mt-3">Filter by price </h5>
                <div className="filter-title mb-4"></div>
                <div className="mt-3">

                    {
                        priceData.map((item: any, index: number) => {
                            return (
                                <div key={index} className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheck1" />
                                    <label className="form-check-label" htmlFor="flexCheck1">
                                        {item.price}
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
export default PriceFilter