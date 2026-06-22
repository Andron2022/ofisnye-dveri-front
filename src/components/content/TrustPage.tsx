// src/components/content/TrustPage.tsx

import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";
import type { TrustPageContent, TrustPageLink, TrustPageMap } from "@src/lib/content/trust-pages";

function getMapUrl(value: string | undefined): string | undefined {
    if (!value) return undefined;

    const trimmedValue = value.trim();
    const iframeSrcMatch = trimmedValue.match(/src=["']([^"']+)["']/i);
    const candidate = iframeSrcMatch?.[1] ?? trimmedValue;

    return candidate.replace(/&amp;/g, "&");
}

function isTrustedMapUrl(value: string | undefined): value is string {
    const mapUrl = getMapUrl(value);

    if (!mapUrl) return false;

    try {
        const url = new URL(mapUrl);
        const hostname = url.hostname.toLowerCase();

        return url.protocol === "https:"
            && (
                hostname.includes("yandex.")
                || hostname.includes("google.")
                || hostname.includes("googleusercontent.")
            );
    } catch {
        return false;
    }
}

function resolveMapEmbedUrl(map: TrustPageMap): string | undefined {
    const rawEmbedUrl = map.embedUrl ?? (map.embedUrlEnvKey ? process.env[map.embedUrlEnvKey] : undefined);

    if (!isTrustedMapUrl(rawEmbedUrl)) return undefined;

    return getMapUrl(rawEmbedUrl);
}

function ActionLink({ link, variant }: { link: TrustPageLink; variant: "primary" | "secondary" }) {
    const className = variant === "primary"
        ? "btn btn-dark rounded-0 px-4 py-3"
        : "btn btn-outline-dark rounded-0 px-4 py-3";

    return (
        <Link href={link.href} className={className}>
            {link.label}
        </Link>
    );
}

function PageHero({ page }: { page: TrustPageContent }) {
    const isContactsPage = page.id === "contacts";
    const heroStyle = page.heroImage
        ? {
            backgroundImage: `linear-gradient(90deg, rgba(255,255,255,0.88), rgba(255,255,255,0.74)), url(${page.heroImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
        }
        : undefined;

    if (isContactsPage) {
        return (
            <section className="py-5 py-lg-6 bg-light border-bottom" style={heroStyle}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h1 className="display-6 fw-semibold mb-4">{page.title}</h1>
                            <p className="lead text-muted mb-0">{page.description}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-5 py-lg-6 bg-light border-bottom" style={heroStyle}>
            <div className="container">
                <div className="row align-items-end g-4">
                    <div className="col-lg-8">
                        <p className="text-uppercase text-muted fs-12 mb-3">{page.eyebrow}</p>
                        <h1 className="display-6 fw-semibold mb-4">{page.title}</h1>
                        <p className="lead text-muted mb-0">{page.description}</p>
                    </div>

                    {(page.primaryCta || page.secondaryCta) ? (
                        <div className="col-lg-4">
                            <div className="d-flex flex-column flex-sm-row flex-lg-column gap-3 align-items-stretch align-items-sm-start align-items-lg-stretch">
                                {page.primaryCta ? <ActionLink link={page.primaryCta} variant="primary" /> : null}
                                {page.secondaryCta ? <ActionLink link={page.secondaryCta} variant="secondary" /> : null}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

function WpPageContent({ page }: { page: TrustPageContent }) {
    if (!page.contentHtml) return null;

    return (
        <div className="row justify-content-center mb-5">
            <div className="col-lg-9">
                <article
                    className="border rounded-4 bg-white p-4 p-lg-5 shadow-sm wp-content"
                    dangerouslySetInnerHTML={{ __html: page.contentHtml }}
                />
            </div>
        </div>
    );
}

function FactsGrid({ page }: { page: TrustPageContent }) {
    if (!page.facts?.length) return null;

    return (
        <div className="row g-3 mb-5">
            {page.facts.map((fact) => (
                <div key={fact.label} className="col-md-4">
                    <div className="h-100 border rounded-4 bg-white p-4 shadow-sm">
                        <div className="text-uppercase text-muted fs-12 mb-2">{fact.label}</div>
                        <div className="fw-semibold">{fact.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function SectionCard({ section }: { section: TrustPageContent["sections"][number] }) {
    return (
        <article className="h-100 border rounded-4 bg-white p-4 p-lg-5">
            <h2 className="h4 mb-3">{section.title}</h2>
            {section.description ? <p className="text-muted mb-4">{section.description}</p> : null}
            <ul className="list-unstyled d-grid gap-3 mb-0">
                {section.items.map((item) => (
                    <li key={item} className="d-flex gap-3">
                        <span className="d-inline-flex align-items-center justify-content-center bg-dark text-white rounded-circle flex-shrink-0 mt-1" style={{ width: 22, height: 22, fontSize: 12 }}>
                            ✓
                        </span>
                        <span className="text-muted">{item}</span>
                    </li>
                ))}
            </ul>
        </article>
    );
}

function SectionCards({ page }: { page: TrustPageContent }) {
    return (
        <div className="row g-4">
            {page.sections.map((section) => (
                <div key={section.id} className="col-lg-6">
                    <SectionCard section={section} />
                </div>
            ))}
        </div>
    );
}

function StepsSection({ page }: { page: TrustPageContent }) {
    if (!page.steps?.length) return null;

    return (
        <section className="py-5 bg-light border-top border-bottom">
            <div className="container">
                <div className="row justify-content-center mb-4">
                    <div className="col-lg-8 text-center">
                        <p className="text-uppercase text-muted fs-12 mb-2">Порядок работы</p>
                        <h2 className="h3 mb-0">Как это происходит</h2>
                    </div>
                </div>

                <div className="row g-4">
                    {page.steps.map((step, index) => (
                        <div key={step.id} className="col-md-4">
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

function ContactCards({ page }: { page: TrustPageContent }) {
    if (!page.contactItems?.length) return null;

    return (
        <div className="row g-3 mb-5">
            {page.contactItems.map((item) => (
                <div key={item.label} className="col-md-6 col-xl-4">
                    <div className="h-100 border rounded-4 bg-white p-4">
                        <div className="text-uppercase text-muted fs-12 mb-2">{item.label}</div>
                        {item.href ? (
                            <Link href={item.href} className="fw-semibold text-dark text-decoration-none">
                                {item.value}
                            </Link>
                        ) : (
                            <div className="fw-semibold">{item.value}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

function ContactInformationCard({ page }: { page: TrustPageContent }) {
    const contactInformation = page.contactInformation;

    if (!contactInformation?.items.length) return null;

    return (
        <article className="h-100 border rounded-4 bg-white p-4 p-lg-5 shadow-sm">
            <div className="d-grid gap-4">
                {contactInformation.items.map((item, index) => (
                    <div
                        key={`${item.label}-${item.value}`}
                        className={index === contactInformation.items.length - 1 ? "" : "pb-4 border-bottom"}
                    >
                        <div className="fw-semibold mb-1">{item.label}</div>
                        {item.href ? (
                            <Link href={item.href} className="text-muted text-decoration-none lh-base">
                                {item.value}
                            </Link>
                        ) : (
                            <div className="text-muted lh-base">{item.value}</div>
                        )}
                    </div>
                ))}
            </div>
        </article>
    );
}

function ContactsContentGrid({ page }: { page: TrustPageContent }) {
    if (page.id !== "contacts" || !page.contactInformation) return null;

    return (
        <div className="row g-4 align-items-stretch">
            <div className="col-lg-5">
                <ContactInformationCard page={page} />
            </div>
            <div className="col-lg-7">
                <div className="d-grid gap-4 h-100">
                    {page.sections.map((section) => (
                        <SectionCard key={section.id} section={section} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function MapBlock({ map }: { map: TrustPageMap }) {
    const embedUrl = resolveMapEmbedUrl(map);

    return (
        <section className="pb-5">
            <div className="container">
                <div className="border rounded-4 bg-white overflow-hidden shadow-sm">
                    <div className="row g-0 align-items-stretch">
                        <div className="col-lg-4 p-4 p-lg-5 bg-light border-end">
                            <p className="text-uppercase text-muted fs-12 mb-2">Маршрут</p>
                            <h2 className="h4 mb-3">{map.title}</h2>
                            <p className="text-muted mb-4">{map.description}</p>

                            {map.navigatorHref ? (
                                <Link
                                    href={map.navigatorHref}
                                    className="btn btn-dark rounded-0 px-4 py-3 w-100"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {map.navigatorLabel ?? "Открыть маршрут"}
                                </Link>
                            ) : null}
                        </div>

                        <div className="col-lg-8">
                            <div className="ratio ratio-16x9 bg-light h-100">
                                {embedUrl ? (
                                    <iframe
                                        src={embedUrl}
                                        title={map.title}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="border-0"
                                        allowFullScreen
                                    />
                                ) : (
                                    <div className="d-flex align-items-center justify-content-center text-center p-4">
                                        <div>
                                            <div className="h5 mb-2">Карта скоро будет добавлена</div>
                                            <p className="text-muted mb-0">
                                                Здесь можно разместить iframe-ссылку Яндекс.Карт или Google Maps.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function RelatedLinks({ page }: { page: TrustPageContent }) {
    if (!page.relatedLinks?.length) return null;

    return (
        <section className="pb-5">
            <div className="container">
                <div className="border rounded-4 p-4 p-lg-5 bg-light d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-4">
                    <div>
                        <p className="text-uppercase text-muted fs-12 mb-2">Полезные разделы</p>
                        <h2 className="h4 mb-0">Связанные страницы</h2>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                        {page.relatedLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="btn btn-outline-dark rounded-0">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default function TrustPage({ page }: { page: TrustPageContent }) {
    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <PageHero page={page} />

                <section className="py-5">
                    <div className="container">
                        <div className="row justify-content-center mb-5">
                            <div className="col-lg-9 text-center">
                                <p className="text-muted fs-5 mb-0">{page.lead}</p>
                            </div>
                        </div>

                        <WpPageContent page={page} />

                        {page.id === "contacts" ? (
                            <ContactsContentGrid page={page} />
                        ) : (
                            <>
                                <FactsGrid page={page} />
                                <ContactCards page={page} />
                                <SectionCards page={page} />
                            </>
                        )}
                    </div>
                </section>

                <StepsSection page={page} />
                {page.map ? <MapBlock map={page.map} /> : null}
                <RelatedLinks page={page} />
            </main>

            <FooterPage />
        </>
    );
}
