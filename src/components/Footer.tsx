"use client";

import Link from "next/link";
import { useFooterNavigation } from "@src/lib/navigation/NavigationProvider";
import type { SiteNavigationItem } from "@src/lib/navigation/site-menu";

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

function getFooterColumn(item: SiteNavigationItem): { title: string; items: SiteNavigationItem[] } {
  return {
    title: item.label,
    items: item.children?.length ? item.children : [item],
  };
}

const FooterPage = () => {
  const footerNavigation = useFooterNavigation();
  const columns = footerNavigation.map(getFooterColumn).slice(0, 4);

  return (
    <footer className="footer bg-light border-top">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <Link href="/" className="h5 text-uppercase text-decoration-none text-dark d-inline-block mb-3">
              Офисные двери
            </Link>
            <p className="text-muted mb-3">
              Интернет-магазин дверей для офисов и общественных пространств: каталог, комплектация, фурнитура и оформление заказа без онлайн-оплаты.
            </p>
            <div className="d-grid gap-2 text-muted small">
              <div className="d-flex align-items-start gap-2">
                <i className="pegk pe-7s-map-marker fs-20 flex-shrink-0" />
                <span>Москва и Московская область</span>
              </div>
              <div className="d-flex align-items-start gap-2">
                <i className="pegk pe-7s-mail fs-20 flex-shrink-0" />
                <Link href="mailto:m0stone@ya.ru" className="text-muted text-decoration-none">m0stone@ya.ru</Link>
              </div>
              <div className="d-flex align-items-start gap-2">
                <i className="pegk pe-7s-call fs-20 flex-shrink-0" />
                <Link href="tel:+74993222233" className="text-muted text-decoration-none">8 (499) 322-22-33</Link>
              </div>
              <div className="d-flex align-items-start gap-2">
                <i className="pegk pe-7s-box2 fs-20 flex-shrink-0" />
                <span>Доставка и установка рассчитываются менеджером</span>
              </div>
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title} className="col-6 col-lg-2">
              <FooterLinks title={column.title} items={column.items} />
            </div>
          ))}
        </div>

        <div className="border-top mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between gap-3 text-muted small">
          <span>© {new Date().getFullYear()} Офисные двери</span>
          <span>Стеновые панели рассчитываются отдельно под параметры проекта.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
