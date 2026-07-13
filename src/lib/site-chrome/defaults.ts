// src/lib/site-chrome/defaults.ts

import type { SiteChromeSettings } from "@src/lib/site-chrome/types";

export const defaultSiteChromeSettings: SiteChromeSettings = {
  logo: {
    text: "Офисные двери",
  },
  announcement: {
    enabled: true,
    text: "Межкомнатные двери с комплектацией и подходящей фурнитурой. Оформление заказа без онлайн-оплаты.",
    href: "/mezhkomnatnye-dveri",
    linkLabel: "Перейти в каталог",
  },
  header: {
    phoneIconClass: "pegk pe-7s-call",
    phoneText: "Москва и МО",
    phoneHref: "/kontakty",
    centerText: "Двери с комплектацией и фурнитурой. Заказ без онлайн-оплаты.",
    emailIconClass: "pegk pe-7s-mail",
    email: "m0stone@ya.ru",
    emailLabel: "m0stone@ya.ru",
  },
  footer: {
    aboutText:
      "Интернет-магазин дверей для офисов и общественных пространств: каталог, комплектация, фурнитура и оформление заказа без онлайн-оплаты.",
    contacts: [
      {
        id: "footer-contact-1",
        enabled: true,
        iconClass: "pegk pe-7s-map-marker",
        text: "Москва и Московская область",
      },
      {
        id: "footer-contact-2",
        enabled: true,
        iconClass: "pegk pe-7s-mail",
        text: "m0stone@ya.ru",
        href: "mailto:m0stone@ya.ru",
      },
      {
        id: "footer-contact-3",
        enabled: true,
        iconClass: "pegk pe-7s-call",
        text: "8 (499) 322-22-33",
        href: "tel:+74993222233",
      },
      {
        id: "footer-contact-4",
        enabled: true,
        iconClass: "pegk pe-7s-box2",
        text: "Доставка и установка рассчитываются менеджером",
      },
    ],
    bottomLeft: "© {year} Офисные двери",
    bottomRight: "Стеновые панели рассчитываются отдельно под параметры проекта.",
  },
};
