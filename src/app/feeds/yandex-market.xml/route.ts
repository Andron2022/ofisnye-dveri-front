// src/app/feeds/yandex-market.xml/route.ts

import { buildYandexYmlFeed } from "@src/lib/feeds/yandex-yml";

export const dynamic = "force-dynamic";

export async function GET() {
    const xml = await buildYandexYmlFeed("market");

    return new Response(xml, {
        status: 200,
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
    });
}
