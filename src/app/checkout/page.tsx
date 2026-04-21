"use client";
import React, { useState } from 'react'

import cart from "@assets/images/shopping-cart/shopping-cart-head.jpg"
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import FooterPage from '@src/components/Footer'


import visa from "@assets/images/shopping-cart/visa.svg"
import mastercard from "@assets/images/shopping-cart/mastercard.svg"
import amex from "@assets/images/shopping-cart/amex.svg"
import discover from "@assets/images/shopping-cart/discover.svg"
import diners from "@assets/images/shopping-cart/diners.svg"
import jcb from "@assets/images/shopping-cart/jcb.svg"
import Image from 'next/image'
import PopupPage from '@src/components/Popup'
import TopBanner from '@src/components/Headers/TopBanner'
import Header from '@src/components/Headers/Header'
import HeadTitle from '@src/commonsections/HeadTitle'

const Checkout = () => {


    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        companyName: '',
        country: 'United States',
        address: '',
        apartment: '',
        city: '',
        state: 'Texas',
        zipcode: '',
        phone: '',
        email: '',
        orderNotes: '',
        paymentMethod: 'directBankTransfer',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        termsAccepted: false,
    });

    const handleChange = (e: any) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form Data Submitted:', formData);
    };

    const [paymentMethod, setPaymentMethod] = useState('directBankTransfer');

    const togglePaymentInfo = (method: string) => {
        setPaymentMethod(method);
    };

    return (
        <React.Fragment>
            <HeadTitle title="Home Default" />
            <TopBanner />

            {/* header */}
            <Header />
            <div>
                <div style={{ backgroundImage: `url(${cart.src})`, backgroundPosition: "center", backgroundSize: "cover" }} className="position-relative">
                    <div className="position-absolute top-0 start-0 right-0 bottom-0 bg-dark w-100 opacity-50"></div>
                    <Container>
                        <div className="text-white text-center py-5 position-relative">
                            <h4 className="fs-20 fw-medium">
                                CHECKOUT</h4>
                        </div>
                    </Container>
                </div>
            </div>

            {/* collection */}
            <section>
                <div className="container">
                    <div className="row my-5">
                        <div className="col-md-6 col-lg-7">
                            <h3 className="border-bottom pb-3 mb-0">Billing details</h3>
                            <div className="filter-title mb-4 bg-teal" style={{ width: '134px' }}></div>
                            <form onSubmit={handleSubmit} className="form-comman">
                                <div className="row g-3">
                                    <div className="col-lg-6">
                                        <label className="fw-medium mb-2" htmlFor="firstName">First name</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="fw-medium mb-2" htmlFor="lastName">Last name</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="companyName">Company name (optional)</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="companyName"
                                            type="text"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2">Country / Region *</label>
                                        <select
                                            className="form-select rounded-pill mb-3"
                                            id="country"
                                            value={formData.country}
                                            onChange={handleChange}
                                        >
                                            <option value="">---</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Italy">Italy</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                            <option value="Spain">Spain</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Finland">Finland</option>
                                            <option value="Austria">Austria</option>
                                            <option value="Belgium">Belgium</option>
                                            <option value="Brazil">Brazil</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Chile">Chile</option>
                                            <option value="Cuba">Cuba</option>
                                            <option value="India">India</option>
                                            <option value="Indonesia">Indonesia</option>
                                            <option value="Japan">Japan</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="address">Street address *</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="address"
                                            placeholder="House number and street name"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                        <input
                                            id="apartment"
                                            className="form-control rounded-pill mt-3"
                                            placeholder="Apartment, suites, unit, etc.(optional)"
                                            type="text"
                                            value={formData.apartment}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="city">Town / City</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="city"
                                            type="text"
                                            value={formData.city}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2">State *</label>
                                        <select
                                            className="form-select rounded-pill mb-3"
                                            id="state"
                                            value={formData.state}
                                            onChange={handleChange}
                                        >
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
                                            <option value="Texas">Texas</option>
                                            <option value="Utah">Utah</option>
                                            <option value="Vermont">Vermont</option>
                                            <option value="Virgin Islands">U.S. Virgin Islands</option>
                                            <option value="Virginia">Virginia</option>
                                            <option value="Washington">Washington</option>
                                            <option value="West Virginia">West Virginia</option>
                                            <option value="Wisconsin">Wisconsin</option>
                                            <option value="Wyoming">Wyoming</option>
                                        </select>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="zipcode">Postal/Zip Code</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="zipcode"
                                            type="text"
                                            value={formData.zipcode}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="phone">Phone</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="phone"
                                            type="text"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                    <div className="col-12 mt-4">
                                        <label className="fw-medium mb-2" htmlFor="email">Email</label>
                                        <input
                                            className="form-control rounded-pill"
                                            id="email"
                                            type="text"
                                            value={formData.email}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="mt-5 pt-md-3">
                                <h3 className="border-bottom pb-3 mb-0">Shipping Details</h3>
                                <div className="filter-title mb-4 bg-teal" style={{ width: '134px' }}></div>
                                <div className="col-12">
                                    <label className="fw-medium mb-2" htmlFor="orderNotes">Order notes (optional)</label>
                                    <textarea
                                        className="form-control border-radious-none"
                                        style={{ borderRadius: '20px' }}
                                        id="orderNotes"
                                        placeholder="Notes about your order e.g. special notes for delivery."
                                        rows={8}
                                        value={formData.orderNotes}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-5 mt-5 mt-md-0">
                            <div className="checkout-order">
                                <h3 className="border-bottom pb-3 mb-0 fs-22">Your order</h3>
                                <div className="filter-title mb-4 bg-teal" style={{ width: '134px' }}></div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg">Product</h6>
                                    <h6 className="mb-0 lh-lg">Subtotal</h6>
                                </div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg"><span className="fw-normal">Black mountain hat</span> x 1</h6>
                                    <p className="mb-0 lh-lg">$50.00</p>
                                </div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg"><span className="fw-normal">Cream women pants</span> x 1</h6>
                                    <p className="mb-0 lh-lg">$35.00</p>
                                </div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg">Subtotal</h6>
                                    <p className="mb-0 lh-lg">$85.00</p>
                                </div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg">Shipping</h6>
                                    <p className="mb-0 lh-lg">$50.00</p>
                                </div>
                                <div className="d-flex justify-content-between fw-medium border-bottom mb-0 p-2">
                                    <h6 className="mb-0 lh-lg">Total</h6>
                                    <p className="mb-0 lh-lg">$145.00</p>
                                </div>
                                {/* =================================================================================================== */}
                                {/* <div>
                                    <div className="form-check py-3 mb-0 border-bottom">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="directBankTransfer"
                                            checked={formData.paymentMethod === 'directBankTransfer'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label fw-medium fs-13" htmlFor="directBankTransfer">
                                            Direct bank transfer
                                        </label>
                                    </div>
                                    {formData.paymentMethod === 'directBankTransfer' && (
                                        <p id="direct-bank-info" className="p-3 fs-13 checkout-bg mb-0">
                                            Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                        </p>
                                    )}
                                    <div className="form-check py-3 mb-0 border-bottom">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="creditCard"
                                            checked={formData.paymentMethod === 'creditCard'}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label fw-medium fs-13 d-block" htmlFor="creditCard">
                                            Credit Card (Stripe)
                                            <Image src={visa} height={25} className="stripe-visa-icon stripe-icon" alt="Visa" />
                                            <Image src={mastercard} height={25} className="stripe-mastercard-icon stripe-icon" alt="Mastercard" />
                                            <Image src={amex} height={25} className="stripe-amex-icon stripe-icon" alt="American Express" />
                                            <Image src={discover} height={25} className="stripe-discover-icon stripe-icon" alt="Discover" />
                                            <Image src={diners} height={25} className="stripe-diners-icon stripe-icon" alt="Diners" />
                                            <Image src={jcb} height={25} className="stripe-jcb-icon stripe-icon" alt="JCB" />
                                        </label>
                                    </div>
                                    {formData.paymentMethod === 'creditCard' && (
                                        <div id="credit-card-info" className="p-3 checkout-bg">
                                            <p className="fs-13">
                                                Pay with your credit card via Stripe. TEST MODE ENABLED. In test mode, you can use the card number 4242424242424242 with any CVC and a valid expiration date or check the Testing Stripe documentation for more card numbers.
                                            </p>
                                            <label htmlFor="cardNumber" className="mb-1 fs-12 fw-semibold">Card Number*</label>
                                            <input
                                                type="text"
                                                placeholder="1234 1234 1234 1234"
                                                id="cardNumber"
                                                className="form-control form-control-sm rounded-0 lh-lg"
                                                value={formData.cardNumber}
                                                onChange={handleChange}
                                            />
                                            <div className="row mt-3 g-4">
                                                <div className="col-md-6 mt-0">
                                                    <label htmlFor="cardExpiry" className="mb-1 fs-12 fw-semibold">Expiry Date *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        id="cardExpiry"
                                                        className="form-control form-control-sm rounded-0 lh-lg"
                                                        value={formData.cardExpiry}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                                <div className="col-md-6 mt-0">
                                                    <label htmlFor="cardCvc" className="mb-1 fs-12 fw-semibold">Card Code (CVC) *</label>
                                                    <input
                                                        type="text"
                                                        placeholder="CVC"
                                                        id="cardCvc"
                                                        className="form-control form-control-sm rounded-0 lh-lg"
                                                        value={formData.cardCvc}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <p className="py-2">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                    </p>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="termsAccepted"
                                            checked={formData.termsAccepted}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="termsAccepted">
                                            I have read and agree to the website terms and conditions *
                                        </label>
                                    </div>
                                    <button type="submit" className="btn btn-teal my-3 px-5 py-3 fw-bold w-100 rounded-pill mb-3">
                                        PLACE ORDER
                                    </button>
                                </div> */}
                                <div>
                                    <Form>
                                        <Form.Check
                                            type="radio"
                                            name="paymentMethod"
                                            id="directBankTransfer"
                                            label={
                                                <label className="form-check-label fw-medium fs-13" htmlFor="directBankTransfer">
                                                    Direct bank transfer
                                                </label>
                                            }
                                            checked={paymentMethod === 'directBankTransfer'}
                                            onChange={() => togglePaymentInfo('directBankTransfer')}
                                            className="py-3 mb-0 border-bottom"
                                        />
                                        {paymentMethod === 'directBankTransfer' && (
                                            <p id="direct-bank-info" className="p-3 fs-13 checkout-bg mb-0">
                                                Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                                            </p>
                                        )}

                                        <Form.Check
                                            type="radio"
                                            name="paymentMethod"
                                            id="creditCard"
                                            label={
                                                <label className="form-check-label fw-medium fs-13 d-block" htmlFor="creditCard">
                                                    Credit Card (Stripe){" "}
                                                    <Image src={visa} height={25} className="stripe-visa-icon stripe-icon" alt="Visa" />{" "}
                                                    <Image src={mastercard} height={25} className="stripe-mastercard-icon stripe-icon" alt="Mastercard" />{" "}
                                                    <Image src={amex} height={25} className="stripe-amex-icon stripe-icon" alt="American Express" />{" "}
                                                    <Image src={discover} height={25} className="stripe-discover-icon stripe-icon" alt="Discover" />{" "}
                                                    <Image src={diners} height={25} className="stripe-diners-icon stripe-icon" alt="Diners" />{" "}
                                                    <Image src={jcb} height={25} className="stripe-jcb-icon stripe-icon" alt="JCB" />
                                                </label>
                                            }
                                            checked={paymentMethod === 'creditCard'}
                                            onChange={() => togglePaymentInfo('creditCard')}
                                            className="py-3 mb-0 border-bottom"
                                        />
                                        {paymentMethod === 'creditCard' && (
                                            <div id="credit-card-info" className="p-3 checkout-bg">
                                                <p className="fs-13">
                                                    Pay with your credit card via Stripe. TEST MODE ENABLED. In test mode, you can use the card number 4242424242424242 with any CVC and a valid expiration date or check the Testing Stripe documentation for more card numbers.
                                                </p>
                                                <Form.Group controlId="number" className="mb-3">
                                                    <Form.Label className="mb-1 fs-12 fw-semibold">Card Number*</Form.Label>
                                                    <Form.Control type="text" placeholder="1234 1234 1234 1234" className="form-control-sm rounded-0 lh-lg" />
                                                </Form.Group>
                                                <Row className="mt-3 g-4">
                                                    <Col md={6} className="mt-0">
                                                        <Form.Group controlId="Expiry" className="mb-3">
                                                            <Form.Label className="mb-1 fs-12 fw-semibold">Expiry Date *</Form.Label>
                                                            <Form.Control type="text" placeholder="MM/YY" className="form-control-sm rounded-0 lh-lg" />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6} className="mt-0">
                                                        <Form.Group controlId="CVC" className="mb-3">
                                                            <Form.Label className="mb-1 fs-12 fw-semibold">Card Code (CVC) *</Form.Label>
                                                            <Form.Control type="text" placeholder="CVC" className="form-control-sm rounded-0 lh-lg" />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </div>
                                        )}

                                        <p className="py-2">
                                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.
                                        </p>
                                        <Form.Check
                                            type="checkbox"
                                            id="flexCheckDefault"
                                            label="I have read and agree to the website terms and conditions *"
                                        />
                                        <Button type="submit" className="btn btn-teal my-3 px-5 py-3 fw-bold w-100 rounded-pill mb-3">
                                            PLACE ORDER
                                        </Button>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* footer */}
            <FooterPage />
            <PopupPage />
        </React.Fragment>
    )
}

export default Checkout