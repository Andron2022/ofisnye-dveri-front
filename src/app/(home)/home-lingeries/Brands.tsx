"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'

import brand1 from "@assets/images/home-lingerie/brand-01.png"
import brand2 from "@assets/images/home-lingerie/brand-02.png"
import brand3 from "@assets/images/home-lingerie/brand-03.png"
import brand4 from "@assets/images/home-lingerie/brand-04.png"
import brand5 from "@assets/images/home-lingerie/brand-05.png"
import brand6 from "@assets/images/home-lingerie/brand-06.png"

const Brands=()=>{

    const brand = [
        { id: 1, pic: brand1 }, { id: 2, pic: brand2 }, { id: 3, pic: brand3 }, { id: 4, pic: brand4 }, { id: 5, pic: brand5 }, { id: 6, pic: brand6 }
    ];

    return(
        <React.Fragment>
                 <section className="kalles-lingerie-brand">
                <Container>
                    <Row className="g-4">
                        {brand.map((item, idx) => (
                            <Col md={2} className="col-4" key={idx}>
                                <Link href="#!" className="type_brand_list">
                                    <Image src={item.pic} alt="ItemImg" className="img-fluid" />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default Brands