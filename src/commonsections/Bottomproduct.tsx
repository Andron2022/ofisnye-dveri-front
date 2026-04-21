"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Row } from "react-bootstrap";
import Link from "next/link";

const BottomProduct = ({ img, colorSize, colorSize2, name, price, del, handleShoppingShow }: any) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrements = () => {
        setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 100));
    };
    // Handler for decrementing quantity
    const handleDcrements = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };
    // Handler for manual input change
    const handleChange = (event: any) => {
        const value = Math.max(0, Math.min(100, Number(event.target.value)));
        setQuantity(value);
    };
    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth > 575) {
                let maxScrollHeight = 3300; // Default value
                if (window.innerWidth <= 1224) {
                    maxScrollHeight = 2750;
                }
                if (window.scrollY > window.innerHeight && window.scrollY <= maxScrollHeight) {
                    document.querySelector(".productCart")?.classList.remove("d-none");
                } else {
                    var cartProduct = document.querySelector(".productCart")?.classList;
                    if (!cartProduct?.contains("d-none")) {
                        cartProduct?.add("d-none");
                    }
                }
            } else {
                let maxScrollHeight = 3300; // Default value
                if (window.innerWidth <= 1224) {
                    maxScrollHeight = 2450;
                }
                if (window.scrollY > window.innerHeight && window.scrollY <= maxScrollHeight) {
                    document.querySelector(".productCart")?.classList.remove("d-none");
                } else {
                    var cartProduct = document.querySelector(".productCart")?.classList;
                    if (!cartProduct?.contains("d-none")) {
                        cartProduct?.add("d-none");
                    }
                }

            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <div className="position-fixed bottom-0 bg-body start-0 end-0 z-1 productCart d-none" style={{ boxShadow: "0 0 9px rgba(0, 0, 0, 0.12)" }}>
                <div className="container">
                    <Row className="justify-content-between align-items-center py-2">
                        <div className="col-auto">
                            <div className="d-flex align-items-center">
                                <div>
                                    <Image alt="ImgImg" src={img} style={{ maxWidth: "65px", maxHeight: "75px", width: "auto", verticalAlign: "middle" }} />
                                </div>
                                <div className="ms-2">
                                    <h6 className="mb-1">Men pants</h6>
                                    <Link href="#" className="text-teal text-decoration-underline fs-12 fw-semibold">{colorSize2}</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-auto mt-2 mt-md-0">
                            <div className="d-flex flex-wrap align-items-center gap-2">
                                <p className="text-muted fs-16 mb-0"><del>{del}</del>&nbsp;&nbsp; <span className="text-danger ms-1">{price}</span></p>
                                <div className="input-step border">
                                    <button type="button" className="minus material-shadow text-dark fw-bold" onClick={handleDcrements}>–</button>
                                    <input type="number" className="product-quantity fw-bold fs-6" value={quantity} min="0" max="100" onChange={handleChange} />
                                    <button type="button" className="plus material-shadow text-dark fw-bold" onClick={handleIncrements}>+</button>
                                </div>
                                <button data-bs-toggle="offcanvas" data-bs-target="#shoppingCartOffcanvas" aria-controls="shoppingCartOffcanvas" className="btn btn-teal text-uppercase rounded-0 min-w-150" onClick={handleShoppingShow}>
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        </React.Fragment>
    )
}
export default BottomProduct