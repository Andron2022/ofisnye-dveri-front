// src/lib/navigation/site-menu.ts

// -----------------------------------------------------
// Единый fallback-конфиг навигации MVP.
//
// Сейчас меню зашито в коде, чтобы быстро зачистить demo Kalles shell.
// Позже этот контракт удобно заменить на BFF/WP menu source:
// Header и MobileHeader уже читают не локальные массивы внутри себя,
// а общий SiteNavigationItem[].
// -----------------------------------------------------

export type SiteNavigationItem = {
    id: string;
    label: string;
    href?: string;
    note?: string;
    children?: SiteNavigationItem[];
};

export const siteNavigation: SiteNavigationItem[] = [
    {
        id: "produktsiya",
        label: "Продукция",
        children: [
            {
                id: "dveri",
                label: "Двери",
                href: "/mezhkomnatnye-dveri",
            },
            {
                id: "stenovye-paneli",
                label: "Настенные панели",
                href: "/stenovye-paneli",
                note: "проектный расчёт",
            },
        ],
    },
    {
        id: "kompaniya",
        label: "Компания",
        children: [
            {
                id: "o-nas",
                label: "О нас",
                href: "/o-nas",
            },
            {
                id: "portfolio",
                label: "Портфолио",
                href: "/portfolio",
            },
        ],
    },
    {
        id: "klientam",
        label: "Клиентам",
        children: [
            {
                id: "zamery",
                label: "Замеры",
                href: "/klientam/zamery",
            },
            {
                id: "oplata",
                label: "Оплата",
                href: "/klientam/oplata",
            },
            {
                id: "dostavka",
                label: "Доставка",
                href: "/klientam/dostavka",
            },
            {
                id: "ustanovka",
                label: "Установка",
                href: "/klientam/ustanovka",
            },
        ],
    },
    {
        id: "partneram",
        label: "Партнерам",
        children: [
            {
                id: "podryadchikam",
                label: "Подрядчикам",
                href: "/partneram/podryadchikam",
            },
            {
                id: "arkhitektoram",
                label: "Архитекторам",
                href: "/partneram/arkhitektoram",
            },
        ],
    },
    {
        id: "novosti-i-stati",
        label: "Новости и статьи",
        href: "/novosti-i-stati",
    },
    {
        id: "kontakty",
        label: "Контакты",
        href: "/kontakty",
    },
];
