"use client";
import React from 'react';
import { Modal, Tab, Tabs } from 'react-bootstrap';

const SizeGuideModal = ({ show, handleClose }: any) => {
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} centered className="modal-overl" size="lg">
                <Modal.Body className="p-20">
                    <div className="text-end position-fixed top-0 end-0">
                        <button type="button" className="btn-close btn-close1 p-4" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                    </div>

                    <div className=" container p-5">
                        <div className="row">
                            <div className="col-md-6">
                                <div>
                                    <h4>Sizing &amp; Fit Guide</h4>
                                    <p>Please be aware that most of our clothing is Juniors&apos; sizing, which runs smaller than regular US / European Women sizing. Refer to the measurements chart for each individual product to determine the best size for you. Product specific size chart and information can be found in product description or in product picture gallery.</p>
                                    <p>Our team does it&apos;s best to include accurate size details and measurement of each item in the product descriptions. If you have questions regarding sizing or any other information on a specific item, please email us at hello@kalles.com for specific details.</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <h4>Find the best size</h4>
                                    <p>When comparing your measurements to those listed on the site, make sure to check if the fabric is stretchy or not. If it is, it can stretch an inch or more.</p>
                                    <ul className="p-0 ps-3 mb-0">
                                        <li>
                                            <strong> Bust:</strong> Wrap the measuring tape loosely around the fullest part of your bust to ensure a comfortable fit.
                                        </li>
                                        <li>
                                            <strong>Waist:</strong> Measure the narrowest part of your natural waist, holding the measuring tape loose enough to fit comfortably.
                                        </li>
                                        <li>
                                            <strong>Hips:</strong> Drape the measuring tape around the widest part of your hips, resting the tape comfortably against your body.
                                        </li>
                                        <li>
                                            <strong>Length:</strong> For tops and dresses, measure from the top of your shoulder to the hem. For strapless dresses, measure from the highest part of the neckline to the hem. For pants and skirts, measure from the top of the waist to the hem.
                                        </li>
                                        <li>
                                            <strong>Sleeve:</strong> With your arm outstretched, measure from the base of your neck to the end of the sleeve hem to determine where the sleeve length will fall on you.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <hr className="hr my-5" />

                        <Tabs defaultActiveKey="dresses" id="size-chart-tabs" className="mb-3 justify-content-center product-tabs">
                            <Tab eventKey="dresses" title="Dresses" className="p-3">
                                <div className="mt-5">
                                    <div className="mb-5">
                                        <h5 className="mb-3">Dress Size Chart (Inch)</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped w-100">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={5} className="text-center fw-medium">
                                                            DRESSES <br /> <span className="fw-light">SIZE IN INCHES</span>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">SIZE</td>
                                                        <td className="text-center">US / CAN</td>
                                                        <td className="text-center">BUST</td>
                                                        <td className="text-center">WAIST</td>
                                                        <td className="text-center">HIPS</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">XS</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center">31&quot;-32&quot;</td>
                                                        <td className="text-center">24&quot;-25&quot;</td>
                                                        <td className="text-center">34&quot;-35&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">S</td>
                                                        <td className="text-center">2-4</td>
                                                        <td className="text-center">33&quot;-34&quot;</td>
                                                        <td className="text-center">26&quot;-27&quot;</td>
                                                        <td className="text-center">36&quot;-37&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">M</td>
                                                        <td className="text-center">6-8</td>
                                                        <td className="text-center">35&quot;-36&quot;</td>
                                                        <td className="text-center">28&quot;-29&quot;</td>
                                                        <td className="text-center">38&quot;-39&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">L</td>
                                                        <td className="text-center">10-12</td>
                                                        <td className="text-center">37&quot;-39&quot;</td>
                                                        <td className="text-center">30&quot;-32&quot;</td>
                                                        <td className="text-center">40&quot;-42&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">XL</td>
                                                        <td className="text-center">14</td>
                                                        <td className="text-center">40&quot;-42&quot;</td>
                                                        <td className="text-center">33&quot;-35&quot;</td>
                                                        <td className="text-center">43&quot;-45&quot;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="mb-3">Dress Size Chart (cm)</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped w-100">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={5} className="text-center fw-medium">
                                                            DRESSES <br /> <span className="fw-light">SIZE IN CM</span>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">SIZE</td>
                                                        <td className="text-center">US / CAN</td>
                                                        <td className="text-center">BUST</td>
                                                        <td className="text-center">WAIST</td>
                                                        <td className="text-center">HIPS</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">XS</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center">78.7-81.2</td>
                                                        <td className="text-center">60.9-63.5</td>
                                                        <td className="text-center">86.3-88.9</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">S</td>
                                                        <td className="text-center">2-4</td>
                                                        <td className="text-center">83.8-86.3</td>
                                                        <td className="text-center">66-68.5</td>
                                                        <td className="text-center">91.4-93.9</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">M</td>
                                                        <td className="text-center">6-8</td>
                                                        <td className="text-center">88.9-91.4</td>
                                                        <td className="text-center">71.1-73.6</td>
                                                        <td className="text-center">96.5-99</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">L</td>
                                                        <td className="text-center">10-12</td>
                                                        <td className="text-center">93.9-99</td>
                                                        <td className="text-center">76.2-81.2</td>
                                                        <td className="text-center">101.6-106.6</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">XL</td>
                                                        <td className="text-center">14</td>
                                                        <td className="text-center">101.6-106.6</td>
                                                        <td className="text-center">81.2-88.9</td>
                                                        <td className="text-center">109.2-114.3</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="tops" title="Tops" className="p-3">
                                <div className="mt-5">
                                    <div className="mb-5">
                                        <h5 className="mb-3">Tops Size Chart (Inch)</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped w-100">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={4} className="text-center fw-medium">
                                                            TOPS <br /> <span className="fw-light">SIZE IN INCHES</span>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">SIZE</td>
                                                        <td className="text-center">US / CAN</td>
                                                        <td className="text-center">BUST</td>
                                                        <td className="text-center">WAIST</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">XS</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center">31&quot;-32&quot;</td>
                                                        <td className="text-center">24&quot;-25&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">S</td>
                                                        <td className="text-center">2-4</td>
                                                        <td className="text-center">33&quot;-34&quot;</td>
                                                        <td className="text-center">26&quot;-27&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">M</td>
                                                        <td className="text-center">6-8</td>
                                                        <td className="text-center">35&quot;-36&quot;</td>
                                                        <td className="text-center">28&quot;-29&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">L</td>
                                                        <td className="text-center">10-12</td>
                                                        <td className="text-center">37&quot;-39&quot;</td>
                                                        <td className="text-center">30&quot;-32&quot;</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">XL</td>
                                                        <td className="text-center">14</td>
                                                        <td className="text-center">40&quot;-42&quot;</td>
                                                        <td className="text-center">33&quot;-35&quot;</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div>
                                        <h5 className="mb-3">Tops Size Chart (cm)</h5>
                                        <div className="table-responsive">
                                            <table className="table table-bordered table-striped w-100">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={4} className="text-center fw-medium">
                                                            TOPS <br /> <span className="fw-light">SIZE IN CM</span>
                                                        </th>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">SIZE</td>
                                                        <td className="text-center">US / CAN</td>
                                                        <td className="text-center">BUST</td>
                                                        <td className="text-center">WAIST</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-center">XS</td>
                                                        <td className="text-center">0</td>
                                                        <td className="text-center">78.7-81.2</td>
                                                        <td className="text-center">60.9-63.5</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">S</td>
                                                        <td className="text-center">2-4</td>
                                                        <td className="text-center">83.8-86.3</td>
                                                        <td className="text-center">66-68.5</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">M</td>
                                                        <td className="text-center">6-8</td>
                                                        <td className="text-center">88.9-91.4</td>
                                                        <td className="text-center">71.1-73.6</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">L</td>
                                                        <td className="text-center">10-12</td>
                                                        <td className="text-center">93.9-99</td>
                                                        <td className="text-center">76.2-81.2</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">XL</td>
                                                        <td className="text-center">14</td>
                                                        <td className="text-center">101.6-106.6</td>
                                                        <td className="text-center">83.8-88.9</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="bottoms" title="Bottoms" className="p-3">
                                <div className=" mb-5">
                                    <h5 className="mb-3">Bottoms Size Chart (Inch)</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped w-100 ms-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={4} className="text-center fw-medium">
                                                        BOTTOMS <br /> <span className="fw-light">SIZE IN INCHES</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">SIZE</td>
                                                    <td className="text-center">US / CAN</td>
                                                    <td className="text-center">WAIST</td>
                                                    <td className="text-center">HIPS</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XS</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">24&quot;-25&quot;</td>
                                                    <td className="text-center">34&quot;-35&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">S</td>
                                                    <td className="text-center">2-4</td>
                                                    <td className="text-center">26&quot;-27&quot;</td>
                                                    <td className="text-center">36&quot;-37&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">M</td>
                                                    <td className="text-center">6-8</td>
                                                    <td className="text-center">28&quot;-29&quot;</td>
                                                    <td className="text-center">38&quot;-39&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">L</td>
                                                    <td className="text-center">10-12</td>
                                                    <td className="text-center">30&quot;-32&quot;</td>
                                                    <td className="text-center">40&quot;-42&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XL</td>
                                                    <td className="text-center">14</td>
                                                    <td className="text-center">33&quot;-35&quot;</td>
                                                    <td className="text-center">43&quot;-45&quot;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-3">Bottoms Size Chart (cm)</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped w-100 ms-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={4} className="text-center fw-medium">
                                                        BOTTOMS <br /> <span className="fw-light">SIZE IN CM</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">SIZE</td>
                                                    <td className="text-center">US / CAN</td>
                                                    <td className="text-center">WAIST</td>
                                                    <td className="text-center">HIPS</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XS</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">60.9-63.5</td>
                                                    <td className="text-center">86.3-88.9</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">S</td>
                                                    <td className="text-center">2-4</td>
                                                    <td className="text-center">66-68.5</td>
                                                    <td className="text-center">91.4-93.9</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">M</td>
                                                    <td className="text-center">6-8</td>
                                                    <td className="text-center">71.1-73.6</td>
                                                    <td className="text-center">96.4-93.9</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">L</td>
                                                    <td className="text-center">10-12</td>
                                                    <td className="text-center">76.2-81.2</td>
                                                    <td className="text-center">101.6-106.6</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XL</td>
                                                    <td className="text-center">14</td>
                                                    <td className="text-center">83.8-88.9</td>
                                                    <td className="text-center">109.2-114.3</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="Denim" title="Denim" className="p-3">
                                <div className=" mb-5">
                                    <h5 className="mb-3">Denim Size Chart (Inch)</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped w-100 ms-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={5} className="text-center fw-medium">
                                                        DENIM <br /> <span className="fw-light">SIZE IN INCHES</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">WAIST SIZE</td>
                                                    <td className="text-center">JUNIOR SIZING</td>
                                                    <td className="text-center">WAIST</td>
                                                    <td className="text-center">LOW WAIST</td>
                                                    <td className="text-center">HIPS</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">24</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">24&quot;-25&quot;</td>
                                                    <td className="text-center">26&quot;-27&quot;</td>
                                                    <td className="text-center">32&quot;-33&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">25</td>
                                                    <td className="text-center">1</td>
                                                    <td className="text-center">25&quot;-26&quot;</td>
                                                    <td className="text-center">28&quot;-29&quot;</td>
                                                    <td className="text-center">33&quot;-34&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">26</td>
                                                    <td className="text-center">3</td>
                                                    <td className="text-center">26&quot;-27&quot;</td>
                                                    <td className="text-center">30&quot;-31&quot;</td>
                                                    <td className="text-center">34&quot;-35&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">27</td>
                                                    <td className="text-center">5</td>
                                                    <td className="text-center">27&quot;-28&quot;</td>
                                                    <td className="text-center">31&quot;-32&quot;</td>
                                                    <td className="text-center">35&quot;-36&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">28</td>
                                                    <td className="text-center">7</td>
                                                    <td className="text-center">28&quot;-29&quot;</td>
                                                    <td className="text-center">32&quot;-33&quot;</td>
                                                    <td className="text-center">36&quot;-37&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">29</td>
                                                    <td className="text-center">9</td>
                                                    <td className="text-center">29&quot;-30&quot;</td>
                                                    <td className="text-center">33&quot;-34&quot;</td>
                                                    <td className="text-center">37&quot;-38&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">30</td>
                                                    <td className="text-center">11</td>
                                                    <td className="text-center">30&quot;-31&quot;</td>
                                                    <td className="text-center">34&quot;-35&quot;</td>
                                                    <td className="text-center">38&quot;-39&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">31</td>
                                                    <td className="text-center">13</td>
                                                    <td className="text-center">31&quot;-3&quot;</td>
                                                    <td className="text-center">35&quot;-36&quot;</td>
                                                    <td className="text-center">39&quot;-40&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">32</td>
                                                    <td className="text-center">15</td>
                                                    <td className="text-center">32&quot;-33&quot;</td>
                                                    <td className="text-center">36&quot;-37&quot;</td>
                                                    <td className="text-center">40&quot;-41&quot;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <h5 className="mb-3">Denim Size Chart (cm)</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped w-100 ms-0">
                                        <thead>
                                            <tr>
                                                <td colSpan={5} className="text-center fw-medium">
                                                    DENIM <br /> <span className="fw-light">SIZE IN CM</span>
                                                </td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">WAIST SIZE</td>
                                                <td className="text-center">JUNIOR SIZING</td>
                                                <td className="text-center">WAIST</td>
                                                <td className="text-center">LOW WAIST</td>
                                                <td className="text-center">HIPS</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">24</td>
                                                <td className="text-center">0</td>
                                                <td className="text-center">60.9-63.5</td>
                                                <td className="text-center">66-68.5</td>
                                                <td className="text-center">81.2-83.8</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">25</td>
                                                <td className="text-center">1</td>
                                                <td className="text-center">63.5-66</td>
                                                <td className="text-center">71.1-73.6</td>
                                                <td className="text-center">83.8-86.3</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">26</td>
                                                <td className="text-center">3</td>
                                                <td className="text-center">66-68.5</td>
                                                <td className="text-center">76.2-78.7</td>
                                                <td className="text-center">86.3-88.9</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">27</td>
                                                <td className="text-center">5</td>
                                                <td className="text-center">68.5-71.1</td>
                                                <td className="text-center">78.7-81.2</td>
                                                <td className="text-center">88.9-91.4</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">28</td>
                                                <td className="text-center">7</td>
                                                <td className="text-center">71.1-73.6</td>
                                                <td className="text-center">81.2-83.8</td>
                                                <td className="text-center">91.4-93.9</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">29</td>
                                                <td className="text-center">9</td>
                                                <td className="text-center">73.6-76.2</td>
                                                <td className="text-center">83.8-86.3</td>
                                                <td className="text-center">93.9-96.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">30</td>
                                                <td className="text-center">11</td>
                                                <td className="text-center">76.2-78.7</td>
                                                <td className="text-center">86.3-88.9</td>
                                                <td className="text-center">96.5-99</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">31</td>
                                                <td className="text-center">13</td>
                                                <td className="text-center">78.7-81.2</td>
                                                <td className="text-center">88.9-91.4</td>
                                                <td className="text-center">99-101.6</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">32</td>
                                                <td className="text-center">15</td>
                                                <td className="text-center">81.2-83.8</td>
                                                <td className="text-center">91.4-93.9</td>
                                                <td className="text-center">101.6-104.1</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Tab>
                            <Tab eventKey="Swimwear" title="Swimwear">
                                <div className="mb-5">
                                    <h5 className="mb-3">Swimwear Size Chart (Inch)</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped w-100 ms-0">
                                            <thead>
                                                <tr>
                                                    <th colSpan={5} className="text-center fw-medium">
                                                        SWIMWEAR <br /> <span className="fw-light">SIZE IN INCHES</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">SIZE</td>
                                                    <td className="text-center">US / CAN</td>
                                                    <td className="text-center">BUST</td>
                                                    <td className="text-center">WAIST</td>
                                                    <td className="text-center">HIPS</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XS</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">31&quot;-32&quot;</td>
                                                    <td className="text-center">24&quot;-25&quot;</td>
                                                    <td className="text-center">33&quot;-34&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">S</td>
                                                    <td className="text-center">2</td>
                                                    <td className="text-center">33&quot;-34&quot;</td>
                                                    <td className="text-center">26&quot;-27&quot;</td>
                                                    <td className="text-center">35&quot;-37&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">M</td>
                                                    <td className="text-center">4</td>
                                                    <td className="text-center">35&quot;-36&quot;</td>
                                                    <td className="text-center">28&quot;-29&quot;</td>
                                                    <td className="text-center">37&quot;-38&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">L</td>
                                                    <td className="text-center">6</td>
                                                    <td className="text-center">37&quot;-39&quot;</td>
                                                    <td className="text-center">30&quot;-32&quot;</td>
                                                    <td className="text-center">39&quot;-41&quot;</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XL</td>
                                                    <td className="text-center">8</td>
                                                    <td className="text-center">40&quot;-42&quot;</td>
                                                    <td className="text-center">33&quot;-35&quot;</td>
                                                    <td className="text-center">42&quot;-44&quot;</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <h5 className="mb-3">Swimwear Size Chart (cm)</h5>
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped w-100 ms-0">
                                            <thead>
                                                <tr>
                                                    <th className="text-center fw-medium">
                                                        SWIMWEAR <br /> <span className="fw-light">SIZE IN CM</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">XS</td>
                                                    <td className="text-center">0</td>
                                                    <td className="text-center">78.7-81.2</td>
                                                    <td className="text-center">60.9-63.5</td>
                                                    <td className="text-center">83.8-86.3</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">S</td>
                                                    <td className="text-center">2</td>
                                                    <td className="text-center">83.8-86.3</td>
                                                    <td className="text-center">66-68.5</td>
                                                    <td className="text-center">88.9-93.9</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">M</td>
                                                    <td className="text-center">4</td>
                                                    <td className="text-center">88.9-91.4</td>
                                                    <td className="text-center">71.1-73.6</td>
                                                    <td className="text-center">93.9-96.5</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">L</td>
                                                    <td className="text-center">6</td>
                                                    <td className="text-center">93.9-99</td>
                                                    <td className="text-center">76.2-81.2</td>
                                                    <td className="text-center">99-104.1</td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">XL</td>
                                                    <td className="text-center">8</td>
                                                    <td className="text-center">101.6-106.6</td>
                                                    <td className="text-center">81.2-88.9</td>
                                                    <td className="text-center">106.6-111.7</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="Shoes" title="Shoes">
                                <h5 className="mb-3">Shoes Size Chart</h5>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-striped w-100">
                                        <tbody>
                                            <tr>
                                                <td className="text-center">US</td>
                                                <td className="text-center">EURO</td>
                                                <td className="text-center">UK</td>
                                                <td className="text-center">AUS</td>
                                                <td className="text-center">JAPAN</td>
                                                <td className="text-center">CHINA</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">5</td>
                                                <td className="text-center">35-36</td>
                                                <td className="text-center">3</td>
                                                <td className="text-center">3.5</td>
                                                <td className="text-center">21.5</td>
                                                <td className="text-center">35</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">5.5</td>
                                                <td className="text-center">36</td>
                                                <td className="text-center">3.5</td>
                                                <td className="text-center">4</td>
                                                <td className="text-center">22</td>
                                                <td className="text-center">35.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">6</td>
                                                <td className="text-center">36-37</td>
                                                <td className="text-center">4</td>
                                                <td className="text-center">4.5</td>
                                                <td className="text-center">22.5</td>
                                                <td className="text-center">36</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">6.5</td>
                                                <td className="text-center">37</td>
                                                <td className="text-center">4.5</td>
                                                <td className="text-center">5</td>
                                                <td className="text-center">23</td>
                                                <td className="text-center">36.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">7</td>
                                                <td className="text-center">37-38</td>
                                                <td className="text-center">5</td>
                                                <td className="text-center">5.5</td>
                                                <td className="text-center">23.5</td>
                                                <td className="text-center">37</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">7.5</td>
                                                <td className="text-center">38</td>
                                                <td className="text-center">5.5</td>
                                                <td className="text-center">6</td>
                                                <td className="text-center">24</td>
                                                <td className="text-center">37.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">8</td>
                                                <td className="text-center">38-39</td>
                                                <td className="text-center">6</td>
                                                <td className="text-center">6.5</td>
                                                <td className="text-center">24.5</td>
                                                <td className="text-center">38</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">8.5</td>
                                                <td className="text-center">39</td>
                                                <td className="text-center">6.5</td>
                                                <td className="text-center">7</td>
                                                <td className="text-center">25</td>
                                                <td className="text-center">38.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">9</td>
                                                <td className="text-center">39-40</td>
                                                <td className="text-center">7</td>
                                                <td className="text-center">7.5</td>
                                                <td className="text-center">25.5</td>
                                                <td className="text-center">39</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">9.5</td>
                                                <td className="text-center">40</td>
                                                <td className="text-center">7.5</td>
                                                <td className="text-center">8</td>
                                                <td className="text-center">26</td>
                                                <td className="text-center">39.5</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">10</td>
                                                <td className="text-center">40-41</td>
                                                <td className="text-center">8</td>
                                                <td className="text-center">8.5</td>
                                                <td className="text-center">26.5</td>
                                                <td className="text-center">40</td>
                                            </tr>
                                            <tr>
                                                <td className="text-center">11</td>
                                                <td className="text-center">41-42</td>
                                                <td className="text-center">9</td>
                                                <td className="text-center">9.5</td>
                                                <td className="text-center">27.5</td>
                                                <td className="text-center">41</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Tab>
                        </Tabs>


                        <p className="mt-4">
                            <b>Attention:</b> This guide provides general sizing information only, and fit can vary depending on style and brand. For more specific sizing information on the product, please refer to product description.
                        </p>

                        <h6 className="fw-bold">NOTE:</h6>
                        <ul className="p-0 ps-3">
                            <li>All kalles models are wearing size small in tops and dresses, and size 1, 3, or 5 in jeans depending on their body type.</li>
                            <li>Most kalles jeans &amp; dresses have some stretch, please refer to product description for fabric details.</li>
                            <li>Most kalles bottoms have an inseam of 31-34” depending on the cut and style. Sizing may vary depending on cut and style.</li>
                        </ul>
                        <br />
                        <h5 className="text-center mb-3">STILL NEED HELP? CONTACT US ON</h5>
                        <h5 className="text-center mb-0">+1 (646) 389-7242</h5>

                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

const DeliveryAndReturnModal = ({ show2, handleClose2 }: any) => {
    return (
        <React.Fragment>
            <Modal show={show2} onHide={handleClose2} centered className="modal-overl" size="lg">
                <Modal.Body>
                    <div className="text-end position-fixed top-0 end-0">
                        <button type="button" className="btn-close btn-close1 p-4" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose2}></button>
                    </div>
                    <div className='p-2'>
                        <h5 className="ps-1">Delivery</h5>
                        <ul className="p-0 ps-4 vstack gap-2">
                            <li>All orders shipped with UPS Express.</li>
                            <li>Always free shipping for orders over US $250.</li>
                            <li>All orders are shipped with a UPS tracking number.</li>
                        </ul>
                        <h5 className="ps-1">Returns</h5>
                        <ul className="p-0 ps-4 vstack gap-2">
                            <li>Items returned within 14 days of their original shipment date in same as new condition will be eligible for a full refund or store credit.</li>
                            <li>Refunds will be charged back to the original form of payment used for purchase.</li>
                            <li>Customer is responsible for shipping charges when making returns and shipping/handling fees of original purchase is non-refundable.</li>
                            <li>All sale items are final purchases.</li>
                        </ul>
                        <h5 className="ps-1">Help</h5>
                        <ul className="p-0 ps-4 vstack gap-2">
                            <li>Give us a shout if you have any other questions and/or concerns.</li>
                            <li>Email: <a href="mailto:contact@domain.com"><span className="__cf_email__">contact@domain.com</span></a></li>
                            <li>Phone: +1 (23) 456 789</li>
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

const Question = ({ show3, handleClose3 }: any) => {
    return (
        <React.Fragment>
            <Modal show={show3} onHide={handleClose3} centered className="modal-overl modal-md">
                <Modal.Body>
                    <div className="text-end position-fixed top-0 end-0">
                        <button type="button" className="btn-close btn-close1 p-4" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose3}></button>
                    </div>
                    <div className="p-4">
                        <form method="" action="#">
                            <h3 className="mb-4 text-center">Ask a Question</h3>
                            <p>
                                <label htmlFor="ContactFormAsk-name" className="form-label">Your Name</label>
                                <input type="text" className="form-control" id="ContactFormAsk-name" name="name" placeholder="Enter Your Name" required />
                            </p>
                            <p>
                                <label htmlFor="ContactFormAsk-email" className="form-label">Your Email</label>
                                <input type="email" className="form-control" id="ContactFormAsk-email" name="email" placeholder="Enter Your mailId" required />
                            </p>
                            <p>
                                <label htmlFor="ContactFormAsk-phone" className="form-label">Your Phone Number</label>
                                <input type="tel" className="form-control" id="ContactFormAsk-phone" name="phone" pattern="[0-9\-]*" placeholder="91-854263169" />
                            </p>
                            <p>
                                <label htmlFor="ContactFormAsk-message" className="form-label">Your Message</label>
                                <textarea rows={8} className="form-control" id="ContactFormAsk-message" name="body" placeholder="Enter Your content : " required></textarea>
                            </p>
                            <input type="submit" className="btn btn-teal w-100" value="Send" />
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}

export { SizeGuideModal, DeliveryAndReturnModal, Question }