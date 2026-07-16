"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
    return (
        <html lang="ru">
            <body style={{ margin: 0, fontFamily: "Arial, sans-serif", color: "#222", background: "#fff" }}>
                <main
                    style={{
                        minHeight: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "32px",
                        textAlign: "center",
                    }}
                >
                    <div style={{ maxWidth: 640 }}>
                        <p style={{ margin: "0 0 8px", color: "#777", textTransform: "uppercase", fontSize: 12 }}>
                            Временная ошибка
                        </p>
                        <h1 style={{ margin: "0 0 16px", fontSize: 32 }}>Сайт временно недоступен</h1>
                        <p style={{ margin: "0 0 24px", color: "#666", lineHeight: 1.6 }}>
                            Не удалось загрузить основные компоненты сайта. Повторите попытку через несколько секунд.
                        </p>
                        <button
                            type="button"
                            onClick={reset}
                            style={{
                                border: 0,
                                borderRadius: 999,
                                padding: "12px 24px",
                                background: "#222",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: 16,
                            }}
                        >
                            Повторить
                        </button>
                    </div>
                </main>
            </body>
        </html>
    );
}
