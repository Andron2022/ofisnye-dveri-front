"use client";

import { ChangeEvent, FormEvent, useMemo, useRef, useState } from "react";
import type {
    WallPanelProduct,
    WallPanelRequestPayload,
    WallPanelRequestResponse,
    WallPanelRequestSubmission,
} from "@src/lib/wall-panels/types";
import { appendRequestId, createClientIdempotencyKey, readBffJsonResponse } from "@src/lib/bff/client";

const initialFormState: Omit<WallPanelRequestPayload, "productId"> = {
    areaSqm: 0,
    name: "",
    phone: "",
    email: "",
    comment: "",
    termsAccepted: false,
};

type FieldErrors = Partial<Record<keyof WallPanelRequestPayload | "root", string>>;

type WallPanelRequestModalProps = {
    product: WallPanelProduct | null;
    onClose: () => void;
};

function formatAttributeValues(values: string[]): string {
    return values.length > 0 ? values.join(", ") : "—";
}

function getInputClassName(hasError: boolean): string {
    return hasError ? "form-control is-invalid" : "form-control";
}

function buildFieldErrorMap(response: WallPanelRequestResponse): FieldErrors {
    if (response.success || !response.errors) return {};

    return response.errors.reduce<FieldErrors>((result, error) => {
        result[error.field] = error.message;
        return result;
    }, {});
}

export default function WallPanelRequestModal({ product, onClose }: WallPanelRequestModalProps) {
    const [form, setForm] = useState<Omit<WallPanelRequestPayload, "productId">>(initialFormState);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [website, setWebsite] = useState("");
    const idempotencyKeyRef = useRef<string | null>(null);
    const formStartedAtRef = useRef(Date.now());

    const activeImage = useMemo(() => {
        if (!product) return null;
        return product.images[activeImageIndex] ?? product.images[0] ?? null;
    }, [activeImageIndex, product]);

    if (!product) return null;

    const resetAndClose = () => {
        setForm(initialFormState);
        setActiveImageIndex(0);
        setFieldErrors({});
        setSuccessMessage(null);
        setWebsite("");
        idempotencyKeyRef.current = null;
        formStartedAtRef.current = Date.now();
        onClose();
    };

    const getFieldError = (field: keyof WallPanelRequestPayload | "root") => fieldErrors[field];

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value, type } = event.target;
        const checked = event.target instanceof HTMLInputElement ? event.target.checked : false;

        setForm((current) => ({
            ...current,
            [id]: id === "areaSqm" ? Number(value.replace(",", ".")) : type === "checkbox" ? checked : value,
        }));

        setFieldErrors((current) => {
            if (!(id in current)) return current;

            const nextErrors = { ...current };
            delete nextErrors[id as keyof WallPanelRequestPayload];
            return nextErrors;
        });
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage(null);
        setFieldErrors({});

        try {
            idempotencyKeyRef.current ??= createClientIdempotencyKey();
            const submission: WallPanelRequestSubmission = {
                productId: product.id,
                areaSqm: form.areaSqm,
                name: form.name,
                phone: form.phone,
                email: form.email,
                comment: form.comment,
                termsAccepted: form.termsAccepted,
                antiAbuse: {
                    website,
                    startedAt: formStartedAtRef.current,
                },
            };

            const response = await fetch("/api/wall-panels/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Idempotency-Key": idempotencyKeyRef.current,
                },
                body: JSON.stringify(submission),
            });
            const data = await readBffJsonResponse<WallPanelRequestResponse>(response);

            if (!response.ok || !data.success) {
                if (!data.success && data.code === "IDEMPOTENCY_CONFLICT") {
                    idempotencyKeyRef.current = null;
                }

                const rootMessage = data.success
                    ? "Не удалось отправить заявку. Попробуйте ещё раз."
                    : appendRequestId(data.message, data.requestId);

                setFieldErrors({
                    ...buildFieldErrorMap(data),
                    root: rootMessage,
                });
                return;
            }

            idempotencyKeyRef.current = null;
            setSuccessMessage(`Заявка отправлена. Номер в Woo: ${data.orderNumber}. Менеджер свяжется для уточнения проекта.`);
            setForm(initialFormState);
            setWebsite("");
            formStartedAtRef.current = Date.now();
        } catch (error) {
            setFieldErrors({
                root: error instanceof Error ? error.message : "Не удалось отправить заявку. Попробуйте ещё раз.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-3"
            style={{ background: "rgba(0, 0, 0, 0.55)", zIndex: 1080 }}
            role="dialog"
            aria-modal="true"
            aria-label={`Заявка на расчёт: ${product.name}`}
        >
            <div className="bg-white rounded-3 shadow-lg overflow-hidden w-100" style={{ maxWidth: "1080px", maxHeight: "92vh" }}>
                <div className="d-flex align-items-center justify-content-between border-bottom px-4 py-3">
                    <div>
                        <div className="small text-uppercase text-muted">Заявка на расчёт</div>
                        <h3 className="fs-5 mb-0">{product.name}</h3>
                    </div>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Закрыть"
                        onClick={resetAndClose}
                    />
                </div>

                <div className="overflow-auto" style={{ maxHeight: "calc(92vh - 73px)" }}>
                    <div className="row g-0">
                        <div className="col-lg-7 p-4">
                            {activeImage ? (
                                <div className="bg-light rounded-3 overflow-hidden mb-3" style={{ aspectRatio: "3 / 2" }}>
                                    <img
                                        src={activeImage.src}
                                        alt={activeImage.alt}
                                        className="w-100 h-100 object-fit-cover"
                                    />
                                </div>
                            ) : (
                                <div className="bg-light rounded-3 d-flex align-items-center justify-content-center text-muted mb-3" style={{ aspectRatio: "3 / 2" }}>
                                    Фото панели не добавлено
                                </div>
                            )}

                            {product.images.length > 1 ? (
                                <div className="d-flex gap-2 flex-wrap mb-4">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={image.id || image.src}
                                            type="button"
                                            className={`border rounded-2 p-0 overflow-hidden ${index === activeImageIndex ? "border-dark" : "border-light"}`}
                                            style={{ width: "76px", aspectRatio: "3 / 2" }}
                                            onClick={() => setActiveImageIndex(index)}
                                            aria-label={`Показать фото ${index + 1}`}
                                        >
                                            <img
                                                src={image.thumbnail || image.src}
                                                alt={image.alt}
                                                className="w-100 h-100 object-fit-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            ) : null}

                            <div className="row g-3 mb-4">
                                <div className="col-sm-6">
                                    <div className="border rounded-3 p-3 h-100">
                                        <div className="small text-muted mb-1">Материал</div>
                                        <div className="fw-medium">{formatAttributeValues(product.material)}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="border rounded-3 p-3 h-100">
                                        <div className="small text-muted mb-1">Цвет</div>
                                        <div className="fw-medium">{formatAttributeValues(product.color)}</div>
                                    </div>
                                </div>
                            </div>

                            {product.shortDescriptionHtml ? (
                                <div className="text-muted mb-3" dangerouslySetInnerHTML={{ __html: product.shortDescriptionHtml }} />
                            ) : null}

                            {product.descriptionHtml ? (
                                <div className="wp-content small lh-lg" dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
                            ) : null}
                        </div>

                        <div className="col-lg-5 bg-light p-4">
                            <div className="bg-white border rounded-3 p-4">
                                <div className="mb-3">
                                    <div className="small text-muted">SKU</div>
                                    <div className="fw-medium">{product.sku || "—"}</div>
                                </div>
                                <div className="alert alert-warning small">
                                    Стоимость не фиксируется на сайте. Менеджер рассчитает проект после проверки площади, раскладки, системы крепления и монтажа.
                                </div>

                                {successMessage ? (
                                    <div className="alert alert-success mb-0">{successMessage}</div>
                                ) : (
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div
                                            aria-hidden="true"
                                            style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
                                        >
                                            <label htmlFor="wall-panel-website">Сайт</label>
                                            <input
                                                id="wall-panel-website"
                                                name="website"
                                                type="text"
                                                value={website}
                                                onChange={(event) => setWebsite(event.target.value)}
                                                tabIndex={-1}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="fw-medium mb-2" htmlFor="areaSqm">Примерная площадь, м²</label>
                                            <input
                                                className={getInputClassName(Boolean(getFieldError("areaSqm")))}
                                                id="areaSqm"
                                                type="number"
                                                min="0.1"
                                                step="0.1"
                                                value={form.areaSqm || ""}
                                                onChange={handleChange}
                                                placeholder="Например, 24"
                                                aria-invalid={Boolean(getFieldError("areaSqm"))}
                                            />
                                            {getFieldError("areaSqm") ? <div className="invalid-feedback">{getFieldError("areaSqm")}</div> : null}
                                            <div className="form-text">Это поле защищает от случайной заявки и помогает менеджеру быстрее оценить проект.</div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="fw-medium mb-2" htmlFor="name">Имя</label>
                                            <input
                                                className={getInputClassName(Boolean(getFieldError("name")))}
                                                id="name"
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="Как к вам обращаться"
                                            />
                                            {getFieldError("name") ? <div className="invalid-feedback">{getFieldError("name")}</div> : null}
                                        </div>

                                        <div className="mb-3">
                                            <label className="fw-medium mb-2" htmlFor="phone">Телефон</label>
                                            <input
                                                className={getInputClassName(Boolean(getFieldError("phone")))}
                                                id="phone"
                                                value={form.phone}
                                                onChange={handleChange}
                                                placeholder="+7..."
                                                aria-invalid={Boolean(getFieldError("phone"))}
                                            />
                                            {getFieldError("phone") ? <div className="invalid-feedback">{getFieldError("phone")}</div> : null}
                                        </div>

                                        <div className="mb-3">
                                            <label className="fw-medium mb-2" htmlFor="email">Email <span className="text-muted fw-normal">необязательно</span></label>
                                            <input
                                                className={getInputClassName(Boolean(getFieldError("email")))}
                                                id="email"
                                                type="email"
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="name@example.com"
                                                aria-invalid={Boolean(getFieldError("email"))}
                                            />
                                            {getFieldError("email") ? <div className="invalid-feedback">{getFieldError("email")}</div> : null}
                                            <div className="form-text">Заполните, если хотите получить расчёт или уточнения ещё и на почту.</div>
                                        </div>

                                        <div className="mb-3">
                                            <label className="fw-medium mb-2" htmlFor="comment">Комментарий</label>
                                            <textarea
                                                className={getInputClassName(Boolean(getFieldError("comment")))}
                                                id="comment"
                                                rows={4}
                                                value={form.comment}
                                                onChange={handleChange}
                                                placeholder="Например: нужен монтаж, есть проёмы, нужна раскладка по стене"
                                            />
                                            {getFieldError("comment") ? <div className="invalid-feedback">{getFieldError("comment")}</div> : null}
                                        </div>

                                        <div className="form-check mb-3">
                                            <input
                                                className={`form-check-input ${getFieldError("termsAccepted") ? "is-invalid" : ""}`}
                                                type="checkbox"
                                                id="termsAccepted"
                                                checked={form.termsAccepted}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label small" htmlFor="termsAccepted">
                                                Согласен на обработку данных для связи по заявке
                                            </label>
                                            {getFieldError("termsAccepted") ? <div className="invalid-feedback">{getFieldError("termsAccepted")}</div> : null}
                                        </div>

                                        {getFieldError("root") ? <div className="alert alert-danger small">{getFieldError("root")}</div> : null}

                                        <button type="submit" className="btn btn-dark rounded-pill w-100" disabled={isSubmitting}>
                                            {isSubmitting ? "Отправляем..." : "Отправить заявку на расчёт"}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
