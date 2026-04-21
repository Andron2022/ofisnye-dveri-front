"use client";
import React, { useEffect, useRef } from 'react';
import { jarallax } from 'jarallax'; // Import jarallax function from jarallax library
import "jarallax/dist/jarallax.css";

const JarallaxSection = ({ backgroundImage, children, ...rest }: any) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            jarallax(sectionRef.current, {
                speed: 0.5,
            });
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            style={{ backgroundImage: `url(${backgroundImage})` }}
            {...rest}
        >
            {children}
        </section>
    );
};

export default JarallaxSection;
