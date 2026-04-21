"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";
import Image from "next/image";
import cart1 from '@assets/images/shopping-cart/cart_image.png'

const AddProductForm = () => {
    return (
        <React.Fragment>
            <Row className="py-5 form-comman">
                <Col md={6}>
                    <label className="fs-14 mb-2" htmlFor="order" role="button">Add Order Note</label>
                    <textarea className="form-control rounded-0" id="order" placeholder="How can we help you ?" rows={6}></textarea>
                    <div className="row">
                        <div className="col-12 col-md-7">
                            <label className="fs-14 mt-3 mb-2" htmlFor="coupon" role="button">Coupon:</label>
                            <p className="text-muted">Coupon code will work on checkout page</p>
                            <input className="form-control rounded-0" id="coupon" type="text" aria-label="default input example" placeholder="Coupon code" />
                        </div>
                    </div>
                </Col>
                <div className="col-md-6 text-md-end mt-4 mt-md-0">
                    <h5>SUBTOTAL : $85.00</h5>
                    <p className="text-muted mb-2">Taxes, shipping and discounts codes calculated at checkout</p>
                    <div className="text-muted mb-3">
                        <input className="form-check-input rounded-0" type="checkbox" value="" id="flexCheckChecked" />
                        <label htmlFor="flexCheckChecked" role="button" className="ms-1">
                            I agree with the terms and conditions.
                        </label>
                    </div>
                    <button type="submit" className=" btn btn-teal px-5 py-2 rounded-pill mb-3">
                        CHECK OUT
                    </button>
                    <div>
                        <Image src={cart1} style={{ width: "300px", height: "33px" }} alt="Cart1Img" />
                    </div>
                </div>
            </Row>
            <div className="form-comman center-text-frame">
                <h3>Estimate Shipping</h3>
                <Row>
                    <Col md={6} lg={3}>
                        <label className="text-muted mb-2">Country</label>
                        <select className="form-select rounded-pill mb-3" id="address_country_ship_2">
                            <option >---</option>
                            <option defaultValue="">United States</option>
                            <option >United Kingdom</option>
                            <option>Italy</option>
                            <option >Germany</option>
                            <option >France</option>
                            <option >Spain</option>
                            <option >Australia</option>
                            <option >Finland</option>
                            <option >Austria</option>
                            <option >Belgium</option>
                            <option >Brazil</option>
                            <option >Canada</option>
                            <option>Chile</option>
                            <option >Cuba</option>
                            <option >India</option>
                            <option >Indonesia</option>
                            <option >Japan</option>
                        </select>
                    </Col>
                    <Col md={6} lg={3}>
                        <label className="text-muted mb-2">Country</label>
                        <select className="form-select rounded-pill mb-3" id="address_province_ship">
                            <option value="Alabama">Alabama</option>
                            <option value="Alaska">Alaska</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Arizona">Arizona</option>
                            <option value="Arkansas">Arkansas</option>
                            <option value="Armed Forces Americas">Armed Forces Americas</option>
                            <option value="Armed Forces Europe">Armed Forces Europe</option>
                            <option value="Armed Forces Pacific">Armed Forces Pacific</option>
                            <option value="California">California</option>
                            <option value="Colorado">Colorado</option>
                            <option value="Connecticut">Connecticut</option>
                            <option value="Delaware">Delaware</option>
                            <option value="District of Columbia">Washington DC</option>
                            <option value="Federated States of Micronesia">Micronesia</option>
                            <option value="Florida">Florida</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Guam">Guam</option>
                            <option value="Hawaii">Hawaii</option>
                            <option value="Idaho">Idaho</option>
                            <option value="Illinois">Illinois</option>
                            <option value="Indiana">Indiana</option>
                            <option value="Iowa">Iowa</option>
                            <option value="Kansas">Kansas</option>
                            <option value="Kentucky">Kentucky</option>
                            <option value="Louisiana">Louisiana</option>
                            <option value="Maine">Maine</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Maryland">Maryland</option>
                            <option value="Massachusetts">Massachusetts</option>
                            <option value="Michigan">Michigan</option>
                            <option value="Minnesota">Minnesota</option>
                            <option value="Mississippi">Mississippi</option>
                            <option value="Missouri">Missouri</option>
                            <option value="Montana">Montana</option>
                            <option value="Nebraska">Nebraska</option>
                            <option value="Nevada">Nevada</option>
                            <option value="New Hampshire">New Hampshire</option>
                            <option value="New Jersey">New Jersey</option>
                            <option value="New Mexico">New Mexico</option>
                            <option value="New York">New York</option>
                            <option value="North Carolina">North Carolina</option>
                            <option value="North Dakota">North Dakota</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Ohio">Ohio</option>
                            <option value="Oklahoma">Oklahoma</option>
                            <option value="Oregon">Oregon</option>
                            <option value="Palau">Palau</option>
                            <option value="Pennsylvania">Pennsylvania</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Rhode Island">Rhode Island</option>
                            <option value="South Carolina">South Carolina</option>
                            <option value="South Dakota">South Dakota</option>
                            <option value="Tennessee">Tennessee</option>
                            <option value="Texas" defaultValue="">Texas</option>
                            <option value="Utah">Utah</option>
                            <option value="Vermont">Vermont</option>
                            <option value="Virgin Islands">U.S. Virgin Islands</option>
                            <option value="Virginia">Virginia</option>
                            <option value="Washington">Washington</option>
                            <option value="West Virginia">West Virginia</option>
                            <option value="Wisconsin">Wisconsin</option>
                            <option value="Wyoming">Wyoming</option>
                        </select>
                    </Col>
                    <Col md={6} lg={3}>
                        <label className="text-muted mb-2" htmlFor="pincode">Postal/Zip Code</label>
                        <input className="form-control rounded-pill mb-3" id="pincode" type="text" aria-label="default input example" />
                    </Col>
                    <Col md={6} lg={3} className="d-flex align-items-end">
                        <button type="submit" className="w-100 btn btn-teal rounded-pill mb-3">
                            CHECK OUT
                        </button>
                    </Col>
                </Row>
            </div>
        </React.Fragment>
    )
}
export default AddProductForm