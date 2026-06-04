// "use client";

// import IndexPage from "@src/app/(home)/home-index/page";

// export default function Home() {
//   return (
//     <main>
//       <IndexPage />
//     </main>
//   );
// }

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import { homePageContent } from "@src/lib/home/homepage-content";
import { buildSeoMetadata } from "@src/lib/seo/site";

export const metadata: Metadata = buildSeoMetadata({
  title: "Межкомнатные двери с комплектацией",
  description:
    "Каталог межкомнатных дверей с комплектацией, фурнитурой, корзиной и оформлением заказа без онлайн-оплаты.",
  path: "/",
});

function SectionHeading({ eyebrow, title, description }: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="row justify-content-center mb-4 mb-lg-5">
      <div className="col-lg-8 text-center">
        <p className="text-uppercase text-muted fs-12 mb-2">{eyebrow}</p>
        <h2 className="mb-3">{title}</h2>
        {description ? <p className="text-muted mb-0">{description}</p> : null}
      </div>
    </div>
  );
}

function HeroSection() {
  const { hero } = homePageContent;

  return (
    <section className="py-5 py-lg-6 bg-light border-bottom">
      <div className="container">
        <div className="row align-items-center g-4 g-lg-5">
          <div className="col-lg-7">
            <p className="text-uppercase text-muted fs-12 mb-3">{hero.eyebrow}</p>
            <h1 className="display-5 fw-semibold mb-4">{hero.title}</h1>
            <p className="lead text-muted mb-4">{hero.description}</p>

            <div className="d-flex flex-column flex-sm-row gap-3">
              <Link href={hero.primaryCta.href} className="btn btn-dark rounded-0 px-4 py-3">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} className="btn btn-outline-dark rounded-0 px-4 py-3">
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white border rounded-4 p-4 p-lg-5 h-100 shadow-sm">
              <h2 className="h4 mb-4">Что уже работает в MVP</h2>
              <div className="d-grid gap-3">
                {homePageContent.benefits.map((benefit) => (
                  <div key={benefit.id} className="border-bottom pb-3">
                    <h3 className="h6 mb-2">{benefit.title}</h3>
                    <p className="text-muted small mb-0">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductDirectionsSection() {
  return (
    <section className="py-5">
      <div className="container">
        <SectionHeading
          eyebrow="Продукция"
          title="Основные направления"
          description="На MVP продающий сценарий включён только для дверей. Панели пока вынесены в проектный расчёт."
        />

        <div className="row g-4">
          {homePageContent.productDirections.map((direction) => (
            <div key={direction.id} className="col-md-6 col-xl-4">
              <article className="border rounded-4 p-4 h-100 bg-white d-flex flex-column">
                <div className="d-flex align-items-start justify-content-between gap-3 mb-3">
                  <h3 className="h5 mb-0">{direction.title}</h3>
                  {direction.badge ? (
                    <span className="badge text-bg-light text-nowrap">{direction.badge}</span>
                  ) : null}
                </div>
                <p className="text-muted mb-4">{direction.description}</p>
                <Link href={direction.href} className="btn btn-outline-dark rounded-0 mt-auto align-self-start">
                  {direction.ctaLabel}
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-5 bg-light border-top border-bottom">
      <div className="container">
        <SectionHeading
          eyebrow="Сценарий заказа"
          title="От выбора двери до заказа в WooCommerce"
        />

        <div className="row g-4">
          {homePageContent.processSteps.map((step, index) => (
            <div key={step.id} className="col-md-6 col-xl-3">
              <div className="h-100 bg-white border rounded-4 p-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle mb-3" style={{ width: 40, height: 40 }}>
                  {index + 1}
                </div>
                <h3 className="h6 mb-2">{step.title}</h3>
                <p className="text-muted small mb-0">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-5">
      <div className="container">
        <SectionHeading
          eyebrow="Клиентам"
          title="Сервисные разделы"
          description="Эти страницы пока остаются простыми, но уже находятся на реальных маршрутах проекта."
        />

        <div className="row g-4">
          {homePageContent.serviceLinks.map((service) => (
            <div key={service.id} className="col-md-6 col-xl-3">
              <Link href={service.href} className="d-block border rounded-4 p-4 h-100 text-reset text-decoration-none bg-white">
                <h3 className="h6 mb-2">{service.title}</h3>
                <p className="text-muted small mb-0">{service.description}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PanelsNoticeSection() {
  const { panelNotice } = homePageContent;

  return (
    <section className="pb-5">
      <div className="container">
        <div className="border rounded-4 p-4 p-lg-5 bg-light d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-4">
          <div>
            <p className="text-uppercase text-muted fs-12 mb-2">Будущий сценарий</p>
            <h2 className="h4 mb-3">{panelNotice.title}</h2>
            <p className="text-muted mb-0">{panelNotice.description}</p>
          </div>
          <Link href={panelNotice.href} className="btn btn-outline-dark rounded-0 text-nowrap">
            {panelNotice.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <TopBanner />
      <Header />

      <main id="nt_content">
        <HeroSection />
        <ProductDirectionsSection />
        <ProcessSection />
        <ServicesSection />
        <PanelsNoticeSection />
      </main>

      <FooterPage />
    </>
  );
}
