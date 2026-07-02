"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import type { HomeHeroSlide } from "@src/lib/home/homepage-content";
import "flickity/css/flickity.css";

type KallesHomeHeroSliderProps = {
  slides: HomeHeroSlide[];
};

type FlickityInstance = {
  destroy: () => void;
  reloadCells?: () => void;
  resize?: () => void;
  select?: (index: number, isWrapped?: boolean, isInstant?: boolean) => void;
};

function getAlignmentClasses(align: HomeHeroSlide["align"]): { row: string; content: string } {
  if (align === "left") {
    return {
      row: "justify-content-start",
      content: "text-start",
    };
  }

  if (align === "center") {
    return {
      row: "justify-content-center",
      content: "text-center mx-auto",
    };
  }

  return {
    row: "justify-content-end",
    content: "text-end",
  };
}

export default function KallesHomeHeroSlider({ slides }: KallesHomeHeroSliderProps) {
  const slideshowRef = useRef<HTMLDivElement | null>(null);
  const flickityRef = useRef<FlickityInstance | null>(null);
  const slidesSignature = useMemo(
    () => slides.map((slide) => `${slide.id}:${slide.image?.src ?? "no-image"}`).join("|"),
    [slides],
  );

  useEffect(() => {
    const element = slideshowRef.current;
    if (!element || slides.length <= 1) return undefined;

    const FlickityClass = require("flickity");
    const flickity = new FlickityClass(element, {
      fade: false,
      cellAlign: "center",
      imagesLoaded: false,
      lazyLoad: false,
      freeScroll: false,
      wrapAround: true,
      autoPlay: false,
      pauseAutoPlayOnHover: true,
      rightToLeft: false,
      prevNextButtons: false,
      pageDots: true,
      contain: true,
      adaptiveHeight: true,
      dragThreshold: 5,
      percentPosition: true,
    }) as FlickityInstance;

    flickityRef.current = flickity;

    const refresh = () => {
      flickity.reloadCells?.();
      flickity.resize?.();
      flickity.select?.(0, false, true);
    };

    const rafId = window.requestAnimationFrame(refresh);
    const timeoutId = window.setTimeout(refresh, 150);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      flickityRef.current?.destroy();
      flickityRef.current = null;
    };
  }, [slides.length, slidesSignature]);

  if (slides.length === 0) return null;

  return (
    <div className="kalles-home-section type_slideshow type_carousel kalles-medical kalles-bags">
      <div ref={slideshowRef} className="slideshow" data-home-hero-slides={slides.length}>
        {slides.map((slide) => {
          const alignment = getAlignmentClasses(slide.align);
          const imageSrc = slide.image?.src;
          const imageAlt = slide.image?.alt || slide.titleTop || slide.titleBottom || "Главный слайд";

          return (
            <div key={slide.id} className="slideshow__slide">
              {imageSrc ? (
                <img src={imageSrc} alt={imageAlt} className="position-absolute w-100 h-100 object-fit-cover" />
              ) : (
                <div className="position-absolute w-100 h-100 bg-dark" />
              )}

              <Container className="position-relative">
                <Row className={alignment.row}>
                  <Col lg={6}>
                    <div className={`content ${alignment.content}`}>
                      {slide.eyebrow ? (
                        <h5 className="text-white fs-18 fw-medium text-uppercase">{slide.eyebrow}</h5>
                      ) : null}
                      {slide.titleTop ? (
                        <h1 className="display-3 fw-bold text-white mb-1">{slide.titleTop}</h1>
                      ) : null}
                      {slide.titleBottom ? (
                        <h1 className="fs-50 fw-bold text-white mb-3">{slide.titleBottom}</h1>
                      ) : null}
                      {slide.buttonLabel && slide.buttonHref ? (
                        <Link
                          href={slide.buttonHref}
                          className="btn text-white btn-custom-white-red btn_icon_true fw-medium min-w-150 rounded-0 py-3 px-5 text-uppercase fs-17"
                        >
                          {slide.buttonLabel}
                        </Link>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}
      </div>
    </div>
  );
}
