"use client";
import React from "react";
import { Col, Row } from "react-bootstrap";

const LeaveComment = () => {
    return (
        <React.Fragment>
            <div className="mt-5">
                <h6>LEAVE A COMMENT</h6>
                <p className="text-muted">Your email address will not be published. Required fields are marked*</p>

                <form action="" className="form-comman mt-4">
                    <Row className="g-3">
                        <Col lg={6}>
                            <label role="button" htmlFor="name" className="text-muted mb-2">Name *</label>
                            <input id="name" className="form-control rounded-0" type="text" aria-label="default input example" />
                        </Col>
                        <Col lg={6}>
                            <label role="button" htmlFor="email" className="text-muted mb-2">Email*</label>
                            <input id="email" className="form-control rounded-0" type="Email" aria-label="default input example" />
                        </Col>
                        <div className="col-12">
                            <label role="button" htmlFor="comment" className="text-muted mb-2">Comment*</label>
                            <textarea id="comment" className="form-control border-radious-none rounded-0" rows={8}></textarea>
                        </div>
                        <div>
                            <button className="btn-load btn btn-custom-dark fw-semibold px-4 rounded-pill">Post Comment</button>
                        </div>
                    </Row>
                </form>
            </div>
        </React.Fragment>
    )
}
export default LeaveComment