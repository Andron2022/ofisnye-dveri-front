"use client";
import React, { useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import Link from 'next/link';

const LoginModal = ({ loginShow, handleLoginClose }: any) => {


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <React.Fragment >

            <Offcanvas show={loginShow} onHide={handleLoginClose} placement="end">
                <Offcanvas.Header className='border-bottom'>
                        <h5 className="offcanvas-title fs-16 text-uppercase" id="accountOffcanvasLabel">LOGIN</h5>
                        <button type="button" className="btn-close btn-close-none" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleLoginClose}><i className="pe-7s-close pegk"></i></button>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form onSubmit={handleSubmit} className="mb-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id="emailInputOffcanvas"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 pb-1">
                            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                id="current-password"
                                autoComplete="off"
                                required
                            />
                        </Form.Group>
                        <Button type="submit" className="btn btn-info w-100 rounded-pill">
                            SIGN IN
                        </Button>
                    </Form>
                    <p className="text-muted">
                        New customer?{' '}
                        <Link href="#!" className="product-title">
                            Create your account
                        </Link>
                    </p>
                    <p className="text-muted">
                        Lost password?{' '}
                        <Link href="#!" className="product-title">
                            Recover password
                        </Link>
                    </p>
                </Offcanvas.Body>
            </Offcanvas>

        </React.Fragment>
    )
}
export default LoginModal;