// import PortfolioGrid from "@app/(portfolio)/portfolio-classic/page"

// const Portfolio = () => {
//     return (
//         <PortfolioGrid />
//     );
// };

// export default Portfolio;

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";

export const metadata: Metadata = {
    title: "Портфолио — Офисные двери",
    description: "Портфолио реализованных проектов с дверями для офисов и общественных пространств будет добавлено позже.",
};

const futurePortfolioSections = [
    {
        id: "objects",
        title: "Реализованные объекты",
        description: "Фото и описания объектов с установленными дверями появятся после подключения контента из WordPress.",
    },
    {
        id: "door-types",
        title: "Типы решений",
        description: "Планируется разбивка по межкомнатным, скрытым и противопожарным дверям.",
    },
    {
        id: "case-details",
        title: "Карточки проектов",
        description: "Для каждого проекта позже будет отдельная страница с описанием задачи, решения и комплектации.",
    },
];

export default function PortfolioPage() {
    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5 bg-light border-bottom">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <p className="text-uppercase text-muted small mb-2">Компания</p>
                                <h1 className="mb-3">Портфолио будет добавлено позже</h1>
                                <p className="lead text-muted mb-4">
                                    Скоро здесь появятся реальные объекты: фотографии, описания решений, особенности комплектации и ссылки на использованные двери.
                                </p>
                                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                    <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-0 px-4 py-3">
                                        Перейти в каталог дверей
                                    </Link>
                                    <Link href="/kontakty" className="btn btn-outline-dark rounded-0 px-4 py-3">
                                        Связаться с менеджером
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <div className="row g-4">
                            {futurePortfolioSections.map((section) => (
                                <div key={section.id} className="col-md-4">
                                    <article className="h-100 border rounded-4 p-4 bg-white">
                                        <h2 className="h5 mb-3">{section.title}</h2>
                                        <p className="text-muted mb-0">{section.description}</p>
                                    </article>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}
