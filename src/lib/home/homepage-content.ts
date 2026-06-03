// src/lib/home/homepage-content.ts

// -----------------------------------------------------
// Fallback-контент главной страницы MVP.
//
// Сейчас главная страница должна быть полностью рабочей без WP-запросов,
// чтобы быстро убрать demo Kalles с точки входа сайта.
// Позже этот объект можно заменить на BFF/WP DTO с тем же смыслом:
// hero, направления, преимущества, этапы покупки и сервисные ссылки.
// -----------------------------------------------------

export type HomeLink = {
  label: string;
  href: string;
};

export type HomeHero = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: HomeLink;
  secondaryCta: HomeLink;
};

export type HomeProductDirection = {
  id: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  badge?: string;
};

export type HomeBenefit = {
  id: string;
  title: string;
  description: string;
};

export type HomeProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type HomeServiceLink = {
  id: string;
  title: string;
  description: string;
  href: string;
};

export type HomePageContent = {
  hero: HomeHero;
  productDirections: HomeProductDirection[];
  benefits: HomeBenefit[];
  processSteps: HomeProcessStep[];
  serviceLinks: HomeServiceLink[];
  panelNotice: {
    title: string;
    description: string;
    href: string;
    ctaLabel: string;
  };
};

export const homePageContent: HomePageContent = {
  hero: {
    eyebrow: "MVP-каталог дверей",
    title: "Межкомнатные двери для офисов и общественных пространств",
    description:
      "Выберите дверь, настройте комплектацию, добавьте подходящую фурнитуру и отправьте заказ менеджеру без онлайн-оплаты.",
    primaryCta: {
      label: "Перейти в каталог дверей",
      href: "/mezhkomnatnye-dveri",
    },
    secondaryCta: {
      label: "Связаться с менеджером",
      href: "/kontakty",
    },
  },
  productDirections: [
    {
      id: "interior-doors",
      title: "Межкомнатные двери",
      description:
        "Основной каталог дверей с реальными товарами WooCommerce, комплектацией и фурнитурой.",
      href: "/mezhkomnatnye-dveri",
      ctaLabel: "Смотреть каталог",
      badge: "продаём на MVP",
    },
    {
      id: "hidden-doors",
      title: "Скрытые двери",
      description:
        "Дочерняя категория внутри межкомнатных дверей. Карточки открываются по тем же правилам универсального роутинга.",
      href: "/mezhkomnatnye-dveri/skrytye",
      ctaLabel: "Смотреть скрытые",
    },
    {
      id: "fireproof-doors",
      title: "Противопожарные двери",
      description:
        "Категория дверей с отдельными характеристиками, включая класс огнестойкости.",
      href: "/mezhkomnatnye-dveri/protivopozharnye",
      ctaLabel: "Смотреть противопожарные",
    },
  ],
  benefits: [
    {
      id: "real-products",
      title: "Живые данные из WooCommerce",
      description:
        "Каталог, карточки, цены, фурнитура и заказы уже идут через headless-связку Next + Woo.",
    },
    {
      id: "door-configurator",
      title: "Комплектация в карточке",
      description:
        "Коробка, сторона открывания, шумоизоляция, порожек и фурнитура собираются до добавления в корзину.",
    },
    {
      id: "manager-order",
      title: "Заказ без онлайн-оплаты",
      description:
        "Покупатель оформляет заказ, а менеджер уточняет доставку, установку и финальные детали.",
    },
  ],
  processSteps: [
    {
      id: "choose-door",
      title: "Выберите дверь",
      description:
        "Откройте каталог, перейдите в карточку и выберите нужный вариант модели.",
    },
    {
      id: "configure-door",
      title: "Настройте комплектацию",
      description:
        "Укажите коробку, сторону открывания, шумоизоляцию, порожек и подходящую фурнитуру.",
    },
    {
      id: "checkout",
      title: "Оформите заказ",
      description:
        "Позиции попадут в корзину и затем в заказ WooCommerce со статусом ручной обработки.",
    },
    {
      id: "manager-contact",
      title: "Дождитесь менеджера",
      description:
        "Менеджер подтвердит наличие, доставку, установку и остальные условия заказа.",
    },
  ],
  serviceLinks: [
    {
      id: "measurements",
      title: "Замеры",
      description: "Когда нужен выезд специалиста и как подготовиться к замеру.",
      href: "/klientam/zamery",
    },
    {
      id: "payment",
      title: "Оплата",
      description: "На MVP заказ оформляется без онлайн-оплаты, детали уточняет менеджер.",
      href: "/klientam/oplata",
    },
    {
      id: "delivery",
      title: "Доставка",
      description: "Стоимость доставки рассчитывается отдельно по объёму и удалённости.",
      href: "/klientam/dostavka",
    },
    {
      id: "installation",
      title: "Установка",
      description: "Установка будет развиваться как отдельная услуга уровня заказа.",
      href: "/klientam/ustanovka",
    },
  ],
  panelNotice: {
    title: "Настенные панели — проектный расчёт",
    description:
      "Панели не продаются через корзину на MVP: стоимость зависит от размеров стены, раскладки, каркаса и монтажа. Позже для них появится отдельная заявка на расчёт.",
    href: "/stenovye-paneli",
    ctaLabel: "Подробнее о панелях",
  },
};
