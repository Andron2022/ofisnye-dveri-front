// src/components/site-chrome/SiteLogo.tsx

"use client";

import Link from "next/link";
import { useSiteChromeSettings } from "@src/lib/site-chrome/SiteChromeProvider";

type SiteLogoProps = {
  className?: string;
  imageClassName?: string;
};

export function SiteLogo({ className = "", imageClassName = "" }: SiteLogoProps) {
  const { logo } = useSiteChromeSettings();
  const label = logo.text || "Офисные двери";

  return (
    <Link href="/" className={className} aria-label={label}>
      {logo.image?.src ? (
        <img
          src={logo.image.src}
          alt={logo.image.alt || label}
          className={imageClassName || "site-chrome-logo__image"}
          loading="eager"
        />
      ) : (
        label
      )}
    </Link>
  );
}
