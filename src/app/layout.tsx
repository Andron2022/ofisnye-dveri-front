import "@assets/scss/bootstrap.scss";
import "@assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import { ReactNode } from "react";
import { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@src/app/providers";
import {
  buildMetadataBase,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
  serializeJsonLd,
  SITE_NAME,
} from "@src/lib/seo/site";
import { getWpDrivenSiteChrome } from "@src/lib/site-chrome/wp-site-chrome";
import { getWpDrivenNavigation } from "@src/lib/wp/menu";

const fontSans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-serif",
  display: "swap",
});

export function generateViewport(): Record<string, string | number> {
  return {
    width: "device-width",
    initialScale: 1,
    userScalable: "no",
  };
}

export const metadata: Metadata = {
  metadataBase: buildMetadataBase(),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_NAME}`,
  },
  description: "Headless интернет-магазин межкомнатных дверей с комплектацией и заказом без онлайн-оплаты.",
  icons: {
    icon: "/favicon.ico",
  },
};

interface LayoutProps {
  children: ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const [navigation, siteChrome] = await Promise.all([
    getWpDrivenNavigation(),
    getWpDrivenSiteChrome(),
  ]);

  return (
    <html lang="ru" className={`${fontSans.variable} ${fontSerif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildOrganizationJsonLd(siteChrome)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(buildWebSiteJsonLd()),
          }}
        />
        <Providers navigation={navigation} siteChrome={siteChrome}>{children}</Providers>
      </body>
    </html>
  );
}
