"use client";

import Link from "next/link";
import { SiteLogo } from "@src/components/site-chrome/SiteLogo";
import { useFooterNavigation } from "@src/lib/navigation/NavigationProvider";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";
import { replaceYearToken, useSiteChromeSettings } from "@src/lib/site-chrome/SiteChromeProvider";
import type { SiteChromeContactItem } from "@src/lib/site-chrome/types";

function FooterLinks({ title, items }: {
  title: string;
  items: SiteNavigationItem[];
}) {
  return (
    <div>
      <h5 className="h6 mb-3">{title}</h5>
      <ul className="list-unstyled d-grid gap-2 mb-0">
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.href ?? "#"} className="text-muted text-decoration-none">
              {item.label}
              {item.note ? <span className="ms-2 small">{item.note}</span> : null}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact({ item }: { item: SiteChromeContactItem }) {
  if (!item.enabled || !item.text) return null;

  const content = item.href ? (
    <a href={item.href} className="text-muted text-decoration-none">
      {item.text}
    </a>
  ) : (
    <span>{item.text}</span>
  );

  return (
    <div className="d-flex align-items-start gap-2">
      <i className={`${item.iconClass} fs-20 flex-shrink-0`} />
      {content}
    </div>
  );
}

function getFooterColumn(item: SiteNavigationItem): { title: string; items: SiteNavigationItem[] } {
  return {
    title: item.label,
    items: item.children?.length ? item.children : [item],
  };
}

const FooterPage = () => {
  const footerNavigation = useFooterNavigation();
  const { footer } = useSiteChromeSettings();
  const columns = footerNavigation.map(getFooterColumn).slice(0, 2);

  return (
    <footer className="footer bg-light border-top py-0">
      <div className="container py-4">
        <div className="row g-4 align-items-start">
          <div className="col-lg-4">
            <SiteLogo className="h5 text-uppercase text-decoration-none text-dark d-inline-block mb-3" />
            {footer.aboutText ? (
              <p className="text-muted mb-3">
                {footer.aboutText}
              </p>
            ) : null}
            <div className="d-grid gap-2 text-muted small">
              {footer.contacts.map((item) => (
                <FooterContact key={item.id} item={item} />
              ))}
            </div>
          </div>

          {columns.map((column, index) => (
            <div key={column.title} className={`col-6 col-lg-2 ${index === 0 ? "ms-lg-auto" : ""}`}>
              <FooterLinks title={column.title} items={column.items} />
            </div>
          ))}
        </div>

        <div className="border-top mt-4 pt-3 d-flex flex-column flex-md-row justify-content-between gap-3 text-muted small">
          <span>{replaceYearToken(footer.bottomLeft)}</span>
          <span>{replaceYearToken(footer.bottomRight)}</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
