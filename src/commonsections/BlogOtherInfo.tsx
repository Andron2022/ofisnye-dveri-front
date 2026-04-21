"use client";
import React from "react";
import Link from "next/link";

const BlogOtherInfo = () => {
    return (
        <React.Fragment>
            <p className="text-muted my-4">
                Until the Digital Age, typography was a specialized occupation. Digitization opened up typography to
                new generations of previously unrelated designers and lay users, and David Jury, head of graphic
                design at Colchester Institute in England, states that “typography is now something everybody does.
                As the capability to create typography has become ubiquitous, the application of principles and best
                practices developed over generations of skilled workers and professionals has diminished.
                Ironically, at a time when scientific techniques.
            </p>
            <div className="d-flex justify-content-between border p-3">
                <div className="d-flex gap-2 align-items-center">
                    <i className="facl facl-tags text-muted"></i>
                    <Link href="#!">
                        Beauty,
                    </Link>
                    <Link href="#!">
                        Fashion
                    </Link>
                </div>
                <Link href="#comments">
                    <p className="mb-0">6 comments</p>
                </Link>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <Link href="https://www.facebook.com" className="facebook social-icon d-flex justify-content-center align-items-center" data-bs-toggle="tooltip" title=" Share on Facebook">
                    <i className="facl facl-facebook"></i>
                </Link>
                <Link href="https://twitter.com" className="twitter social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Twitter">
                    <i className="facl facl-twitter"></i>
                </Link>
                <Link href="https://www.facebook.com" className="facebook social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Email">
                    <i className="facl facl-facebook"></i>
                </Link>
                <Link href="https://www.pinterest.com" className="pinterest social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Pinterest">
                    <i className="facl facl-pinterest"></i>
                </Link>
                <Link href="#" className="tumblr social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on tumblr">
                    <i className="facl facl-tumblr"></i>
                </Link>
                <Link href="#" className="telegram social-icon d-flex justify-content-center align-items-center " data-bs-toggle="tooltip" title=" Share on Telegram">
                    <i className="facl facl-telegram"></i>
                </Link>
            </div>
            <div className="py-5 tooltip-back d-flex justify-content-center align-items-center">
                <Link href="single-portfolio-with-shop.html">
                    <i className="h1 m-0 pegk pe-7s-angle-left" data-bs-toggle="tooltip" title=" Handmade Candle "></i>
                </Link>
                <Link href="single-portfolio-with-shop.html">
                    <i className="pegk pe-7s-keypad mx-5 lh-1" style={{fontSize:"40px"}} data-bs-toggle="tooltip" title="Back to Portfolio "></i>
                </Link>
                <Link href="single-portfolio-with-shop.html">
                    <i className="h1 m-0 pegk pe-7s-angle-right" data-bs-toggle="tooltip" title="Handmade Craft "></i>
                </Link>
            </div>
        </React.Fragment>
    )
}
export default BlogOtherInfo