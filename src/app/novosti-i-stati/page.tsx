// import BlogGrid from "@src/app/(blog)/blog-grid/page"

// const NewsAndArticles = () => {
//     return (
//         <BlogGrid />
//     );
// };

// export default NewsAndArticles;

import type { Metadata } from "next";
import Link from "next/link";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";
import FooterPage from "@src/components/Footer";

export const metadata: Metadata = {
    title: "Новости и статьи — Офисные двери",
    description: "Новости и статьи будут подключены позже через WordPress. На MVP раздел очищен от demo-материалов Kalles.",
};

const futureContentSections = [
    {
        id: "articles",
        title: "Статьи для клиентов",
        description: "Позже здесь появятся материалы о выборе дверей, комплектации, фурнитуре, доставке и установке.",
    },
    {
        id: "seo",
        title: "SEO-контент",
        description: "Раздел пригодится для информационного спроса и внутренней перелинковки с каталогом дверей.",
    },
    {
        id: "wp-source",
        title: "Управление из WP",
        description: "Публикации будут создаваться в админке WordPress и отдаваться во frontend через BFF.",
    },
];

export default function NewsAndArticlesPage() {
    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5 bg-light border-bottom">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-lg-8">
                                <p className="text-uppercase text-muted small mb-2">Контентный раздел</p>
                                <h1 className="mb-3">Новости и статьи будут добавлены позже</h1>
                                <p className="lead text-muted mb-4">
                                    Сейчас раздел не использует demo-блог Kalles. Для MVP оставлена безопасная страница-заглушка,
                                    которую позже можно заменить на живую ленту публикаций из WordPress.
                                </p>
                                <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                                    <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-0 px-4 py-3">
                                        Смотреть двери
                                    </Link>
                                    <Link href="/klientam/zamery" className="btn btn-outline-dark rounded-0 px-4 py-3">
                                        Узнать про замеры
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-5">
                    <div className="container">
                        <div className="row g-4">
                            {futureContentSections.map((section) => (
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
