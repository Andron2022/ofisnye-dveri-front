// src/lib/site-chrome/types.ts

export type SiteChromeImage = {
  src: string;
  alt?: string;
};

export type SiteChromeLogo = {
  text: string;
  image?: SiteChromeImage;
};

export type SiteChromeAnnouncement = {
  enabled: boolean;
  text: string;
  href?: string;
  linkLabel?: string;
};

export type SiteChromeHeader = {
  phoneIconClass: string;
  phoneText: string;
  phoneHref?: string;
  centerText: string;
  emailIconClass: string;
  email: string;
  emailLabel: string;
};

export type SiteChromeContactItem = {
  id: string;
  enabled: boolean;
  iconClass: string;
  text: string;
  href?: string;
};

export type SiteChromeFooter = {
  aboutText: string;
  contacts: SiteChromeContactItem[];
  bottomLeft: string;
  bottomRight: string;
};

export type SiteChromeSettings = {
  logo: SiteChromeLogo;
  announcement: SiteChromeAnnouncement;
  header: SiteChromeHeader;
  footer: SiteChromeFooter;
};
