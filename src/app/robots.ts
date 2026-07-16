// src/app/robots.ts

import type { MetadataRoute } from "next";
import { buildAbsoluteUrl } from "@src/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
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
