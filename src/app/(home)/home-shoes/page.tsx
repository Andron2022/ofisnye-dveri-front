"use client";
import React, { useState } from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import Link from 'next/link'
import Image from 'next/image'
import FooterShoe from '@src/components/FooterShoe'
import PopupPage from '@src/components/Popup'
import { products } from '@src/common/data'
import ShoesSection from '@app/(home)/home-shoes/ShoesSection'
import BrandList from '@app/(home)/home-shoes/BrandList'
import NewsLetter from '@app/(home)/home-shoes/NewsLetter'
import HeaderShoes from '@src/components/HeaderShoes'
import ProductModal from '@src/commonsections/ProductModal'
import AddToCardModal from '@src/commonsections/AddToCardModal'
import HeadTitle from '@src/commonsections/HeadTitle'

const ProductCard = ({ product }: any) => {
    const [isHovered, setIsHovered] = useState(false);

    const [show, setShow] = useState(false);
    const [cardShow, setCardShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleAddToCardModalShow = () => setCardShow(true);
    const handleAddToCardModalClose = () => setCardShow(false);

    return (
        <>
            <div className="col card rounded-0 mb-0" key={product.id}>
                <Card.Body>
                    <div
                        className="topbar-product-card overlay-hover"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        <div className="position-relative overflow-hidden main">
                            <Image src={isHovered ? product.hoverImageUrl : product.imageUrl} alt="image" className="img-fluid" />
                            <Link href="#!" className="wishlistadd position-absolute" title='Add to Wishlist'>
                                <i className="facl facl-heart-o text-white"></i>
                            </Link>
                            <Link href="#!" className="compare_add position-absolute" title='Compare'>
                                <i className="las la-sync text-white"></i>
                            </Link>
                            <div className="product-button d-none d-lg-flex flex-column gap-2">
                                <Link href="#exampleModal" onClick={handleShow} className="btn rounded-pill fs-14" data-bs-toggle="modal">
                                    <span>Quick View</span> <i className="iccl iccl-eye text-white"></i>
                                </Link>
                                <button type="button" className="btn rounded-pill fs-14" data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                    <span>Quick Shop</span> <i className="iccl iccl-cart"></i>
                                </button>
                            </div>
                            <div className="position-absolute d-lg-none bottom-0 end-0 d-flex flex-column bg-white rounded-pill m-2" style={{ zIndex: 1, boxShadow: '1px 1px 1px rgba(0, 0, 0, .1)' }}>
                                <Link href="#exampleModal" onClick={handleShow} className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal">
                                    <i className="iccl iccl-eye fw-semibold"></i>
                                </Link>
                                <button type="button" className="btn responsive-cart rounded-pill fs-14 p-2" style={{ width: '36px', height: '36px' }} data-bs-toggle="modal" data-bs-target="#cardModal" onClick={handleAddToCardModalShow}>
                                    <i className="iccl iccl-cart fw-semibold"></i>
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h6 className="mb-1 fw-medium lh-base">
                                <Link href='/product-detail-layout-01' className="main_link_red">{product.name}</Link>
                            </h6>
                            <p className="mb-0 fs-14 text-muted">
                                <span>{product.price}</span>
                            </p>
                        </div>
                    </div>
                </Card.Body>
            </div>

            <ProductModal show={show} handleClose={handleClose} />
            <AddToCardModal cardShow={cardShow} handleAddToCardModalClose={handleAddToCardModalClose} />
        </>
    );
};

const HomeShoes = () => {

    return (
        <React.Fragment>
            <HeadTitle title="Home Shoes" />
            {/* header */}
            <HeaderShoes />

            {/* top */}
            <ShoesSection />

            {/* brandlist */}
            <BrandList />

            {/* Shoe list */}
            <section className="kalles-shoes-grid-products-section">
                <Container fluid className="px-2">
                    <Row className="row-cols-2 row-cols-md-3 row-cols-lg-5 g-0 justify-content-center">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </Row>
                </Container>
            </section>

            {/* news letter */}
            <NewsLetter />

            {/* footer */}
            <FooterShoe />

            <PopupPage />
        </React.Fragment>
    )
}

export default HomeShoes