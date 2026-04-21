"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import gallery1 from '@assets/images/portfolio/gallery-full-size-01.jpg'
import gallery2 from '@assets/images/portfolio/gallery-02.jpg'
import gallery3 from '@assets/images/portfolio/gallery-03.jpg'
import gallery4 from '@assets/images/portfolio/gallery-04.jpg'
import gallery5 from '@assets/images/portfolio/gallery-05.jpg'
import gallery6 from '@assets/images/portfolio/gallery-06.jpg'

const SummerInfo = () => {
    return (
        <React.Fragment>
            <section>
                <div className="container">
                    <div className="my-4 text-muted pt-4">
                        <p>
                            Typography is the work of <span className="ection-subtitle sub-title font-secondary fst-italic">typesetters, compositors,
                                typographers, graphic
                                designers, art directors, manga artists, comic book artists, graffiti artists,</span> and
                            now—anyone
                            who arranges words, letters, numbers, and symbols for publication, display, or distribution—from
                            clerical <b className="fw-semibold">workers and newsletter writers to anyone self-publishing
                                materials.</b>
                        </p>

                        <div className="row row-cols-2 row-cols-md-3 g-2">
                            <div className="col">
                                <Link href="/shop" className="db">
                                    <Image src={gallery1} className="img-fluid h-100" alt="Gallery1Img" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="/shop" className="db">
                                    <Image src={gallery2} className="img-fluid h-100" alt="Gallery2Img" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="/shop" className="db">
                                    <Image src={gallery3} className="img-fluid h-100" alt="Gallery3Img" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="/shop" className="db">
                                    <Image src={gallery4} className="img-fluid h-100" alt="Gallery4Img" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="/shop" className="db">
                                    <Image src={gallery5} className="img-fluid h-100" alt="Gallery5Img" />
                                </Link>
                            </div>
                            <div className="col">
                                <Link href="shop.html" className="db">
                                    <Image src={gallery6} className="img-fluid h-100" alt="Gallery6Img" />
                                </Link>
                            </div>
                        </div>
                        <p className="sub-title font-secondary lookbook-contain my-3 fst-italic px-5 position-relative gray-light mt-4 p-30">
                            Sed utgio perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                            laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                            beatae vitae dicta sunt explicabo.
                        </p>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default SummerInfo