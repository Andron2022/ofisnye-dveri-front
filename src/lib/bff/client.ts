// src/lib/bff/client.ts

export function createClientIdempotencyKey(): string {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }

    return `fallback-${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

export function appendRequestId(message: string, requestId?: string): string {
    return requestId ? `${message} Код запроса: ${requestId}.` : message;
}

export async function readBffJsonResponse<T>(response: Response): Promise<T> {
    try {
        return await response.json() as T;
    } catch {
        const requestId = response.headers.get("x-request-id") ?? undefined;
        const message = response.status === 429
            ? "Слишком много попыток отправки. Подождите немного и повторите."
            : "Сервис оформления вернул некорректный ответ. Повторите попытку позже.";

        throw new Error(appendRequestId(message, requestId));
    }
}
