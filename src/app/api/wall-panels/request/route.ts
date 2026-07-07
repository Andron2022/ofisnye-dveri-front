// src/app/api/wall-panels/request/route.ts

import { NextRequest, NextResponse } from "next/server";
import type { WallPanelRequestErrorResponse } from "@src/lib/wall-panels/types";
import {
    createWallPanelRequestOrder,
    getWallPanelRequestErrorMessage,
    validateWallPanelRequestPayload,
} from "@src/lib/wall-panels/request";

export async function POST(request: NextRequest) {
    try {
        const rawPayload = await request.json();
        const validation = validateWallPanelRequestPayload(rawPayload);

        if (!validation.ok) {
            const response: WallPanelRequestErrorResponse = {
                success: false,
                message: getWallPanelRequestErrorMessage(validation.errors),
                errors: validation.errors,
            };

            return NextResponse.json(response, {
                status: 422,
            });
        }

        const result = await createWallPanelRequestOrder(validation.value);

        return NextResponse.json(result, {
            status: 201,
        });
    } catch (error) {
        const response: WallPanelRequestErrorResponse = {
            success: false,
            message: error instanceof Error
                ? error.message
                : "Не удалось отправить заявку на расчёт стеновых панелей",
        };

        return NextResponse.json(response, {
            status: 400,
        });
    }
}
