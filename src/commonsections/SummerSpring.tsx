"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import avatar2 from '@assets/images/blog-page/user-avatar-02.jpeg'
import avatar1 from '@assets/images/blog-page/user-avatar-01.jpeg'
import noavatar from '@src/assets/images/blog-page/no-avatar.jpg'
import { Col, Row } from "react-bootstrap";


const SummerSpring = () => {
    return (
        <React.Fragment>
            <h5 className="pb-2"> 6 THOUGHTS ON “SPRING – SUMMER TRENDING 2020” </h5>
            <div className="mt-4">
                <Row className="mt-4">
                    <Col md={1} className="col-3">
                        <Image src={avatar2} className="img-fluid" alt="Avatar2Img" />
                    </Col>
                    <Col md={11} className="col-9 px-0">
                        <h6 className="mb-1">SELENA RICHARDSON</h6>
                        <p className="my-1">Parturient odio mollis condimentum parturient a eu scelerisque auctor a
                            convallis blandit mi
                            vestibulum odio id rhoncus feugiat laoreet.</p>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">April
                            6,
                            2020 at 16:12pm</span>
                    </Col>
                </Row>
                <Row className=" mt-4">
                    <Col md={1} className="col-3">
                        <Image src={noavatar} className="img-fluid" alt="NoavatarImg" priority/>
                    </Col>
                    <Col md={11} className="col-9 px-0">
                        <h6 className="mb-1">SFSF SA</h6>
                        <p className="my-1">smksj a;orw</p>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">January
                            8, 2021 at 01:00am</span>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={1} className="col-3">
                        <Image src={noavatar} className="img-fluid" alt="NoavatarImg" priority/>
                    </Col>
                    <Col md={11} className="col-9 px-0">
                        <h6 className="mb-1">DFDSF</h6>
                        <p className="my-1">sfa ff</p>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">January
                            8, 2021 at 00:59am</span>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={1} className="col-3">
                        <Image src={noavatar} className="img-fluid" alt="NoavatarImg" priority/>
                    </Col>
                    <Col md={11} className="col-9 px-0">
                        <h6 className="mb-1">JAMSHAID FAROOQUI</h6>
                        <p className="my-1">Test mail</p>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">July
                            31,
                            2020 at 17:39pm</span>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col md={1} className="col-3">
                        <Image src={avatar1} className="img-fluid" alt="Avatar1Img" priority/>
                    </Col>
                    <Col md={11} className="col-9 px-0">
                        <h6 className="mb-1">
                            MONICA JORK</h6>
                        <p className="my-1">Lorem ipsum dolor sit amet, lacus eu erat integer bibendum rutrum, sed
                            arcu
                            molestie, in quis ornare, rhoncus scelerisque velit, nam feugiat nibh leo. Ac
                            suspendisse turpis posuere, cursus fames eu ege</p>
                        <span className="section-subtitle sub-title font-secondary fst-italic fs-14 text-muted">April
                            12, 2020 at 16:09pm</span>
                    </Col>
                </Row>
            </div>
            <div className="filter-pagination mt-5">
                <ul className="pagination py-4 border-bottom d-flex justify-content-center">
                    <li className="active"><a href="#" className="text-danger">1</a></li>
                    <li><Link href="#">2</Link></li>
                    <li><Link href="#">Next</Link></li>
                </ul>
            </div>
        </React.Fragment>
    )
}
export default SummerSpring