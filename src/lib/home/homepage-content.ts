// src/lib/home/homepage-content.ts

export type HomeImage = {
  src: string;
  alt?: string;
};

export type HomeHeroSlide = {
  id: string;
  image?: HomeImage;
  eyebrow: string;
  titleTop: string;
  titleBottom: string;
  buttonLabel: string;
  buttonHref: string;
  align: "left" | "center" | "right";
};

export type HomeCategoryCard = {
  id: string;
  title: string;
  href: string;
  image?: HomeImage;
};

export type HomeFeaturedProductsBlock = {
  enabled: boolean;
  title: string;
  productIds: number[];
  buttonLabel: string;
  buttonHref: string;
};

export type HomeProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type HomeProcessBlock = {
  enabled: boolean;
  title: string;
  subtitle: string;
  steps: HomeProcessStep[];
};

export type HomeOneCategoryBlock = {
  enabled: boolean;
  image?: HomeImage;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
};

export type HomePostsBlock = {
  enabled: boolean;
  title: string;
  postIds: number[];
};

export type HomeServiceLink = {
  id: string;
  iconClass: string;
  title: string;
  description: string;
  href: string;
};

export type HomeServicesBlock = {
  enabled: boolean;
  items: HomeServiceLink[];
};

export type HomePageContent = {
  seo: {
    title: string;
    description: string;
  };
  hero: {
    enabled: boolean;
    slides: HomeHeroSlide[];
  };
  categories: {
    enabled: boolean;
    bigCard?: HomeCategoryCard;
    smallCards: HomeCategoryCard[];
  };
  featuredProducts: HomeFeaturedProductsBlock;
  process: HomeProcessBlock;
  oneCategory: HomeOneCategoryBlock;
  posts: HomePostsBlock;
  services: HomeServicesBlock;
};

export const homePageContent: HomePageContent = {
  seo: {
    title: "Межкомнатные двери с комплектацией",
    description:
      "Каталог межкомнатных дверей с комплектацией, фурнитурой, корзиной и оформлением заказа без онлайн-оплаты.",
  },
  hero: {
    enabled: true,
    slides: [
      {
        id: "fallback-hero",
        eyebrow: "Каталог дверей",
        titleTop: "Межкомнатные двери",
        titleBottom: "с комплектацией онлайн",
        buttonLabel: "Перейти в каталог",
        buttonHref: "/mezhkomnatnye-dveri",
        align: "right",
      },
    ],
  },
  categories: {
    enabled: true,
    bigCard: {
      id: "interior-doors",
      title: "Межкомнатные двери",
      href: "/mezhkomnatnye-dveri",
    },
    smallCards: [
      {
        id: "hidden-doors",
        title: "Скрытые двери",
        href: "/mezhkomnatnye-dveri/skrytye",
      },
      {
        id: "fireproof-doors",
        title: "Противопожарные двери",
        href: "/mezhkomnatnye-dveri/protivopozharnye",
      },
    ],
  },
  featuredProducts: {
    enabled: true,
    title: "Популярные товары",
    productIds: [],
    buttonLabel: "Смотреть весь каталог",
    buttonHref: "/mezhkomnatnye-dveri",
  },
  process: {
    enabled: true,
    title: "От выбора до подтверждения заказа",
    subtitle:
      "Покупатель собирает комплектацию онлайн, а менеджер подтверждает доставку, установку и финальные условия.",
    steps: [
      {
        id: "choose-door",
        title: "Выберите дверь",
        description: "Откройте каталог, перейдите в карточку и выберите нужный вариант модели.",
      },
      {
        id: "configure-door",
        title: "Настройте комплектацию",
        description: "Укажите коробку, сторону открывания, шумоизоляцию, порожек и подходящую фурнитуру.",
      },
      {
        id: "checkout",
        title: "Оформите заказ",
        description: "Позиции попадут в корзину, а после оформления менеджер получит состав заказа для подтверждения.",
      },
      {
        id: "manager-contact",
        title: "Дождитесь менеджера",
        description: "Менеджер подтвердит наличие, доставку, установку и остальные условия заказа.",
      },
    ],
  },
  oneCategory: {
    enabled: true,
    title: "Настенные панели — проектный расчёт",
    description:
      "Стеновые панели рассчитываются как проектное решение: стоимость зависит от размеров стены, раскладки, каркаса и монтажа.",
    buttonLabel: "Подробнее о панелях",
    buttonHref: "/stenovye-paneli",
  },
  posts: {
    enabled: true,
    title: "Полезные материалы",
    postIds: [],
  },
  services: {
    enabled: true,
    items: [
      {
        id: "measurements",
        iconClass: "pegk pe-7s-ribbon",
        title: "Замеры",
        description: "Когда нужен выезд специалиста и как подготовиться к замеру.",
        href: "/klientam/zamery",
      },
      {
        id: "payment",
        iconClass: "pegk pe-7s-tools",
        title: "Оплата",
        description: "Заказ оформляется без онлайн-оплаты: цену доставки и детали подтверждает менеджер.",
        href: "/klientam/oplata",
      },
      {
        id: "delivery",
        iconClass: "pegk pe-7s-car",
        title: "Доставка",
        description: "Стоимость доставки рассчитывается отдельно по объёму и удалённости.",
        href: "/klientam/dostavka",
      },
      {
        id: "installation",
        iconClass: "pegk pe-7s-help2",
        title: "Установка",
        description: "Установка будет развиваться как отдельная услуга уровня заказа.",
        href: "/klientam/ustanovka",
      },
    ],
  },
};
