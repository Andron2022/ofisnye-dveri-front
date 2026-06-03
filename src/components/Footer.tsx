"use client";

import Link from "next/link";
import { siteNavigation } from "@src/lib/navigation/site-menu";

function getNavigationItem(id: string) {
  return siteNavigation.find((item) => item.id === id);
}

function FooterLinks({ title, items }: {
  title: string;
  items: Array<{ id: string; label: string; href?: string; note?: string }>;
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

const FooterPage = () => {
  const productItems = getNavigationItem("produktsiya")?.children ?? [];
  const companyItems = getNavigationItem("kompaniya")?.children ?? [];
  const customerItems = getNavigationItem("klientam")?.children ?? [];
  const partnerItems = getNavigationItem("partneram")?.children ?? [];

  return (
    <footer className="footer bg-light border-top">
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-4">
            <Link href="/" className="h5 text-uppercase text-decoration-none text-dark d-inline-block mb-3">
              Офисные двери
            </Link>
            <p className="text-muted mb-3">
              Headless MVP интернет-магазина дверей: каталог, карточка с комплектацией, корзина и заказ в WooCommerce без онлайн-оплаты.
            </p>
            <div className="d-grid gap-2 text-muted small">
              <span>Москва и Московская область</span>
              <span>Доставка и установка рассчитываются менеджером</span>
              <Link href="/kontakty" className="text-muted text-decoration-none">Контакты и шоурум</Link>
            </div>
          </div>

          <div className="col-6 col-lg-2">
            <FooterLinks title="Продукция" items={productItems} />
          </div>

          <div className="col-6 col-lg-2">
            <FooterLinks title="Компания" items={[...companyItems, { id: "kontakty", label: "Контакты", href: "/kontakty" }]} />
          </div>

          <div className="col-6 col-lg-2">
            <FooterLinks title="Клиентам" items={customerItems} />
          </div>

          <div className="col-6 col-lg-2">
            <FooterLinks
              title="Партнёрам"
              items={[
                ...partnerItems,
                { id: "novosti-i-stati", label: "Новости и статьи", href: "/novosti-i-stati" },
              ]}
            />
          </div>
        </div>

        <div className="border-top mt-5 pt-4 d-flex flex-column flex-md-row justify-content-between gap-3 text-muted small">
          <span>© {new Date().getFullYear()} Офисные двери</span>
          <span>Панели на MVP не продаются через корзину: для них будет отдельный проектный расчёт.</span>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
