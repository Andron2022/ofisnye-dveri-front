// src/app/robots.ts

import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "@src/lib/seo/site";
import { isSiteIndexingEnabled } from "@src/lib/runtime/environment";

export default function robots(): MetadataRoute.Robots {
    if (!isSiteIndexingEnabled()) {
        return {
            rules: {
                userAgent: "*",
                disallow: "/",
            },
        };
    }

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: [
                "/api/",
                "/checkout",
                "/shopping-cart",
            ],
        },
        sitemap: buildAbsoluteUrl("/sitemap.xml"),
    };
}
