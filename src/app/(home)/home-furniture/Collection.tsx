"use client";
import React from "react";
import collection from "@assets/images/home-furniture/collection-banner.jpg"

const Collection=()=>{
    return(
        <React.Fragment>
              <div className="container">
                    <div className="kalles-furniture-wrap-inner bg-warning text-white position-relative z-1">
                        <p className="sub-title mb-1">COLLECTION</p>
                        <h4 className="heading mb-0">Impressive Scandinavi Interior Design</h4>
                    </div>
                </div>
                {/* jarallax */}
                <section className="kalles-furniture-recent-project-section jarallax position-relative" style={{ backgroundImage: `url(${collection.src})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                </section>
        </React.Fragment>
    )
}
export default Collection