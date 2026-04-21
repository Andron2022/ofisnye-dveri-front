"use client";
import React from "react";
import Link from "next/link";
import { Container } from "react-bootstrap";

interface BreadcrumbItemProps {
    title: string;
    subTitle: string;
}

const BreadCrumb = ({ title, subTitle }: BreadcrumbItemProps) => {
    return (
        <React.Fragment>
            <div className="main-project-section">
                <Container>
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <nav className="customDiv"
                            aria-label="breadcrumb">
                            <ol className="breadcrumb mb-0 fs-13">
                                <li className="breadcrumb-item"><Link href="/index">Home</Link></li>
                                <li className="breadcrumb-item"><Link href="/shop-filter-sidebar">{title}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page"> {subTitle}</li>
                            </ol>
                        </nav>

                        <ul className="d-flex list-unstyled align-items-center mb-0" dir="ltr">
                            <li>
                                <Link href="/product-detail-layout-01" className="fs-18"><i className="las la-angle-left"></i></Link>
                            </li>
                            <li>
                                <Link href="/product-detail-layout-01" className="mx-2 fs-15"><i className="fwb iccl iccl-grid fw-semibold align-middle"></i></Link>
                            </li>
                            <li>
                                <Link href="/product-detail-layout-01" className="fs-18"><i className="las la-angle-right"></i></Link>
                            </li>
                        </ul>
                    </div>
                </Container>
            </div>
        </React.Fragment>

    )

}
export default BreadCrumb