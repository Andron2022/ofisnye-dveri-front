"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled storefront error", error);
    }, [error]);

    return (
        <main id="nt_content">
            <section className="py-5">
                <div className="container py-lg-5 text-center">
                    <p className="text-uppercase text-muted small mb-2">Временная ошибка</p>
                    <h1 className="fs-2 mb-3">Не удалось загрузить страницу</h1>
                    <p className="text-muted mx-auto mb-4" style={{ maxWidth: 640 }}>
                        Попробуйте повторить запрос. Если ошибка сохранится, вернитесь на главную страницу и продолжите позже.
                    </p>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                        <button type="button" className="btn btn-dark rounded-pill px-4" onClick={reset}>
                            Повторить
                        </button>
                        <Link href="/" className="btn btn-outline-secondary rounded-pill px-4">
                            На главную
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
