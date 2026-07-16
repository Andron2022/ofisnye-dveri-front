import type { Metadata } from "next";
import Link from "next/link";
import FooterPage from "@src/components/Footer";
import Header from "@src/components/Headers/Header";
import TopBanner from "@src/components/Headers/TopBanner";

export const metadata: Metadata = {
    title: "Страница не найдена",
    description: "Запрошенная страница не существует или была перемещена.",
    robots: {
        index: false,
        follow: true,
    },
};

export default function NotFoundPage() {
    return (
        <>
            <TopBanner />
            <Header />

            <main id="nt_content">
                <section className="py-5">
                    <div className="container py-lg-5 text-center">
                        <p className="text-uppercase text-muted small mb-2">Ошибка 404</p>
                        <h1 className="fs-2 mb-3">Страница не найдена</h1>
                        <p className="text-muted mx-auto mb-4" style={{ maxWidth: 640 }}>
                            Возможно, ссылка устарела или в адресе есть опечатка. Перейдите в каталог либо вернитесь на главную страницу.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                            <Link href="/mezhkomnatnye-dveri" className="btn btn-dark rounded-pill px-4">
                                Перейти в каталог
                            </Link>
                            <Link href="/" className="btn btn-outline-secondary rounded-pill px-4">
                                На главную
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <FooterPage />
        </>
    );
}
