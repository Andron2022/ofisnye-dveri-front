"use client";
import React from "react";
import banner from "@assets/images/home-furniture/recent-project-banner.jpg"

const RecentProject=()=>{
    return(
        <React.Fragment>
              <div className="container">
                    <div className="kalles-furniture-wrap-inner bg-warning text-white position-relative z-1">
                        <p className="sub-title mb-1">RECENT PROJECTS</p>
                        <h4 className="heading mb-0 fs-45">Hampton Chaise Corner Sofa Lounge</h4>
                    </div>
                </div>
                {/* jarallax */}
                <section className="kalles-furniture-recent-project-section jarallax position-relative" style={{ backgroundImage: `url(${banner.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                </section>
        </React.Fragment>
    )
}
export default RecentProject