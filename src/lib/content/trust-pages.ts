// src/lib/content/trust-pages.ts

import type { Metadata } from "next";
import { buildSeoMetadata } from "@src/lib/seo/site";

// -----------------------------------------------------
// Fallback-контент служебных страниц MVP.
//
// Сейчас эти страницы должны закрыть доверие перед первым SEO/Direct-трафиком
// без подключения отдельного CMS-слоя. Позже этот контракт можно заменить
// на BFF/WP DTO с теми же полями: маршрут, meta, hero, блоки, CTA, контакты.
// -----------------------------------------------------

export type TrustPageId =
    | "about"
    | "contacts"
    | "measurements"
    | "payment"
    | "delivery"
    | "installation"
    | "contractors"
    | "architects";

export type TrustPageLink = {
    label: string;
    href: string;
};

export type TrustPageFact = {
    label: string;
    value: string;
};

export type TrustPageSection = {
    id: string;
    title: string;
    description?: string;
    items: string[];
};

export type TrustPageStep = {
    id: string;
    title: string;
    description: string;
};

export type TrustPageContactItem = {
    label: string;
    value: string;
    href?: string;
};

export type TrustPageMap = {
    title: string;
    description: string;
    embedUrlEnvKey: "NEXT_PUBLIC_CONTACT_MAP_EMBED_URL";
};

export type TrustPageContent = {
    id: TrustPageId;
    path: string;
    eyebrow: string;
    title: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    lead: string;
    facts?: TrustPageFact[];
    sections: TrustPageSection[];
    steps?: TrustPageStep[];
    contactItems?: TrustPageContactItem[];
    map?: TrustPageMap;
    primaryCta?: TrustPageLink;
    secondaryCta?: TrustPageLink;
    relatedLinks?: TrustPageLink[];
};

const customerLinks: TrustPageLink[] = [
    { label: "Замеры", href: "/klientam/zamery" },
    { label: "Оплата", href: "/klientam/oplata" },
    { label: "Доставка", href: "/klientam/dostavka" },
    { label: "Установка", href: "/klientam/ustanovka" },
];

const partnerLinks: TrustPageLink[] = [
    { label: "Подрядчикам", href: "/partneram/podryadchikam" },
    { label: "Архитекторам", href: "/partneram/arkhitektoram" },
];

export const trustPages: Record<TrustPageId, TrustPageContent> = {
    about: {
        id: "about",
        path: "/o-nas",
        eyebrow: "Компания",
        title: "Офисные двери для коммерческих интерьеров",
        description: "Помогаем подобрать двери, фурнитуру и комплектацию для офисов, общественных пространств и проектных задач.",
        metaTitle: "О компании",
        metaDescription: "О компании Офисные двери: подбор межкомнатных дверей, комплектация, фурнитура, доставка и ручное подтверждение заказа менеджером.",
        lead: "Мы помогаем подобрать межкомнатные двери, комплектацию и фурнитуру для офисов и общественных пространств. Заказ оформляется без онлайн-оплаты: менеджер проверяет состав, наличие, доставку и дальнейшие условия.",
        facts: [
            { label: "Основной регион", value: "Москва и Московская область" },
            { label: "Формат заказа", value: "Без онлайн-оплаты, с подтверждением менеджером" },
            { label: "Основной фокус", value: "Межкомнатные двери и фурнитура" },
        ],
        sections: [
            {
                id: "what-we-do",
                title: "Чем занимаемся",
                items: [
                    "Подбираем двери под офисные и общественные интерьеры.",
                    "Помогаем собрать комплектацию: коробка, сторона открывания, шумоизоляция, порожек и фурнитура.",
                    "Передаём заказ в обработку менеджеру, чтобы уточнить наличие, доставку, установку и финальную стоимость.",
                ],
            },
            {
                id: "mvp-principles",
                title: "Как устроен заказ",
                description: "Для заказа не нужна регистрация: достаточно собрать комплектацию и оставить контактные данные.",
                items: [
                    "Покупатель оформляет заказ как заявку на подтверждение.",
                    "Доставка и установка рассчитываются отдельно.",
                    "Панели пока не продаются через корзину: для них будет отдельный проектный расчёт.",
                ],
            },
        ],
        primaryCta: { label: "Перейти в каталог", href: "/mezhkomnatnye-dveri" },
        secondaryCta: { label: "Контакты", href: "/kontakty" },
        relatedLinks: [...customerLinks, ...partnerLinks],
    },

    contacts: {
        id: "contacts",
        path: "/kontakty",
        eyebrow: "Связь",
        title: "Контакты и консультация менеджера",
        description: "Свяжитесь с нами, чтобы уточнить наличие, комплектацию, доставку, установку или проектный расчёт.",
        metaTitle: "Контакты",
        metaDescription: "Контакты магазина Офисные двери: консультация менеджера, регион работы Москва и Московская область, блок для карты Яндекс или Google.",
        lead: "Заказ оформляется без онлайн-оплаты: после отправки корзины менеджер связывается с вами, проверяет состав заказа и уточняет условия доставки и установки.",
        facts: [
            { label: "Регион", value: "Москва и Московская область" },
            { label: "Заказы", value: "Через корзину и ручное подтверждение" },
            { label: "Панели", value: "Отдельная заявка на расчёт позже" },
        ],
        contactItems: [
            { label: "Телефон", value: "+7 (000) 000-00-00", href: "tel:+70000000000" },
            { label: "Email", value: "info@example.ru", href: "mailto:info@example.ru" },
            { label: "Регион работы", value: "Москва и Московская область" },
            { label: "График", value: "Уточняется перед запуском" },
            { label: "Шоурум / офис", value: "Адрес будет добавлен перед production" },
        ],
        map: {
            title: "Карта проезда",
            description: "Для production сюда можно вставить iframe-ссылку Яндекс.Карт или Google Maps через переменную окружения.",
            embedUrlEnvKey: "NEXT_PUBLIC_CONTACT_MAP_EMBED_URL",
        },
        sections: [
            {
                id: "what-to-prepare",
                title: "Что подготовить перед обращением",
                items: [
                    "Ссылку на выбранную дверь или номер заказа, если он уже создан.",
                    "Примерные размеры проёма и количество дверей.",
                    "Город или район доставки, этажность и необходимость установки.",
                ],
            },
            {
                id: "manager-help",
                title: "С чем поможет менеджер",
                items: [
                    "Проверит наличие и актуальность цены.",
                    "Подскажет по комплектации двери и фурнитуре.",
                    "Сориентирует по доставке, установке и дальнейшим шагам.",
                ],
            },
        ],
        primaryCta: { label: "Смотреть двери", href: "/mezhkomnatnye-dveri" },
        secondaryCta: { label: "Оформить заказ из корзины", href: "/shopping-cart" },
        relatedLinks: customerLinks,
    },

    measurements: {
        id: "measurements",
        path: "/klientam/zamery",
        eyebrow: "Клиентам",
        title: "Замеры перед заказом дверей",
        description: "Правильный замер помогает избежать ошибок в размере, комплектации и установке.",
        metaTitle: "Замеры дверей",
        metaDescription: "Как подготовиться к замеру дверей: размеры проёма, сторона открывания, особенности объекта и передача данных менеджеру.",
        lead: "Для точного заказа двери важно учитывать не только ширину и высоту проёма, но и сторону открывания, тип коробки, состояние стен и будущую фурнитуру.",
        facts: [
            { label: "Когда нужен замер", value: "Перед финальным подтверждением заказа" },
            { label: "Что влияет", value: "Проём, стены, коробка, открывание" },
            { label: "Результат", value: "Менеджер подтверждает состав заказа" },
        ],
        sections: [
            {
                id: "measure-list",
                title: "Какие данные нужны",
                items: [
                    "Ширина и высота проёма в нескольких точках.",
                    "Толщина стены и состояние откосов.",
                    "Желаемая сторона открывания: левая, правая или уточняется.",
                    "Наличие старой двери, коробки и ограничений по монтажу.",
                ],
            },
            {
                id: "why-check",
                title: "Почему замер лучше подтвердить",
                items: [
                    "Даже небольшая ошибка в размере может повлиять на комплектацию.",
                    "Для скрытых и противопожарных дверей важны дополнительные технические условия.",
                    "Доставка и установка рассчитываются менеджером после уточнения объекта.",
                ],
            },
        ],
        steps: [
            { id: "photo", title: "Сделайте фото проёма", description: "Фото помогает быстрее понять состояние стены, пола и старой коробки." },
            { id: "measure", title: "Передайте размеры", description: "Укажите ширину, высоту, толщину стены и желаемую сторону открывания." },
            { id: "confirm", title: "Дождитесь проверки", description: "Менеджер сопоставит размеры с выбранной дверью и комплектацией." },
        ],
        primaryCta: { label: "Выбрать дверь", href: "/mezhkomnatnye-dveri" },
        secondaryCta: { label: "Связаться с менеджером", href: "/kontakty" },
        relatedLinks: customerLinks.filter((link) => link.href !== "/klientam/zamery"),
    },

    payment: {
        id: "payment",
        path: "/klientam/oplata",
        eyebrow: "Клиентам",
        title: "Оплата после подтверждения заказа",
        description: "Онлайн-оплаты сейчас нет: заказ сначала проверяет менеджер, затем согласуются финальные условия.",
        metaTitle: "Оплата заказа",
        metaDescription: "Оплата дверей без онлайн-оплаты: заказ проверяет менеджер, после чего согласуются финальные условия.",
        lead: "Такой сценарий удобен для проектных заказов: цена двери фиксируется в карточке, а доставка, установка и нестандартные условия согласуются отдельно.",
        facts: [
            { label: "Онлайн-оплата", value: "Не подключена" },
            { label: "Статус заказа", value: "На подтверждении у менеджера" },
            { label: "Доставка", value: "Считается отдельно" },
        ],
        sections: [
            {
                id: "how-it-works",
                title: "Как проходит оплата",
                items: [
                    "Вы оформляете заказ через корзину без оплаты на сайте.",
                    "Менеджер проверяет товары, комплектацию, фурнитуру и адрес доставки.",
                    "После подтверждения согласуются способ оплаты и финальные условия.",
                ],
            },
            {
                id: "why-no-online-payment",
                title: "Почему пока без онлайн-оплаты",
                items: [
                    "Для дверей часто нужно уточнить доставку, подъём и установку.",
                    "Некоторые опции заказа требуют ручной проверки.",
                    "Это снижает риск некорректной оплаты до подтверждения заказа.",
                ],
            },
        ],
        primaryCta: { label: "Перейти в корзину", href: "/shopping-cart" },
        secondaryCta: { label: "Задать вопрос", href: "/kontakty" },
        relatedLinks: customerLinks.filter((link) => link.href !== "/klientam/oplata"),
    },

    delivery: {
        id: "delivery",
        path: "/klientam/dostavka",
        eyebrow: "Клиентам",
        title: "Доставка дверей по Москве и области",
        description: "Стоимость доставки зависит от состава заказа, объёма, адреса и условий разгрузки.",
        metaTitle: "Доставка дверей",
        metaDescription: "Доставка межкомнатных дверей по Москве и Московской области: расчёт менеджером после оформления заказа.",
        lead: "В корзине фиксируется состав заказа, а доставку менеджер рассчитывает отдельно: так можно учесть количество дверей, фурнитуру, адрес и особенности объекта.",
        facts: [
            { label: "Регион", value: "Москва и Московская область" },
            { label: "Расчёт", value: "После оформления заказа" },
            { label: "Что влияет", value: "Объём, удалённость, разгрузка" },
        ],
        sections: [
            {
                id: "delivery-factors",
                title: "Что влияет на стоимость доставки",
                items: [
                    "Количество и размеры дверей в заказе.",
                    "Удалённость объекта от склада или шоурума.",
                    "Необходимость подъёма, разгрузки и точного интервала доставки.",
                ],
            },
            {
                id: "delivery-process",
                title: "Как согласуется доставка",
                items: [
                    "После оформления заказа менеджер проверяет состав позиций.",
                    "Уточняет адрес, этаж, лифт и ограничения по подъезду.",
                    "Согласует предварительную стоимость и удобный формат доставки.",
                ],
            },
        ],
        primaryCta: { label: "Собрать заказ", href: "/mezhkomnatnye-dveri" },
        secondaryCta: { label: "Контакты", href: "/kontakty" },
        relatedLinks: customerLinks.filter((link) => link.href !== "/klientam/dostavka"),
    },

    installation: {
        id: "installation",
        path: "/klientam/ustanovka",
        eyebrow: "Клиентам",
        title: "Установка дверей как отдельная услуга",
        description: "Установка рассчитывается после уточнения объекта, размеров, комплектации и технических условий.",
        metaTitle: "Установка дверей",
        metaDescription: "Как будет согласовываться установка дверей: проверка объекта, комплектации, условий монтажа и ручной расчёт менеджером.",
        lead: "Установка не смешивается с товарной ценой двери. Это отдельная услуга, которую менеджер уточняет после оформления заказа.",
        facts: [
            { label: "Статус услуги", value: "Ручное согласование" },
            { label: "Что важно", value: "Проём, коробка, стены, пол" },
            { label: "Формат", value: "Отдельное согласование" },
        ],
        sections: [
            {
                id: "before-installation",
                title: "Что проверяется перед установкой",
                items: [
                    "Размер и состояние дверного проёма.",
                    "Тип коробки и выбранная комплектация.",
                    "Наличие старой двери, особенности стен и пола.",
                    "Ограничения по объекту и времени работ.",
                ],
            },
            {
                id: "mvp-border",
                title: "Почему установка не считается автоматически",
                items: [
                    "Цена установки зависит от условий объекта.",
                    "Для скрытых и специальных дверей могут быть дополнительные требования.",
                    "Финальный расчёт зависит от условий объекта и согласуется менеджером.",
                ],
            },
        ],
        primaryCta: { label: "Выбрать дверь", href: "/mezhkomnatnye-dveri" },
        secondaryCta: { label: "Уточнить установку", href: "/kontakty" },
        relatedLinks: customerLinks.filter((link) => link.href !== "/klientam/ustanovka"),
    },

    contractors: {
        id: "contractors",
        path: "/partneram/podryadchikam",
        eyebrow: "Партнёрам",
        title: "Сотрудничество с подрядными организациями",
        description: "Помогаем подбирать двери и комплектацию для объектов, где важны сроки, повторяемость и понятная спецификация.",
        metaTitle: "Подрядчикам",
        metaDescription: "Сотрудничество с подрядными организациями: подбор дверей, спецификация, фурнитура, поставка и согласование условий по объекту.",
        lead: "Если вы ведёте ремонт, отделку или комплектацию объекта, мы можем помочь собрать понятный заказ по дверям и фурнитуре с дальнейшим согласованием менеджером.",
        facts: [
            { label: "Формат", value: "Проектный подбор и спецификация" },
            { label: "Регион", value: "Москва и Московская область" },
            { label: "Документы", value: "Уточняются под объект" },
        ],
        sections: [
            {
                id: "for-whom",
                title: "Кому подойдёт",
                items: [
                    "Подрядчикам по ремонту и отделке офисов.",
                    "Комплектационным компаниям и снабженцам.",
                    "Командам, которым нужна повторяемая поставка дверей и фурнитуры.",
                ],
            },
            {
                id: "how-to-start",
                title: "Как начать работу",
                items: [
                    "Передайте список помещений, требования и желаемые сроки.",
                    "Менеджер поможет собрать предварительную спецификацию.",
                    "После проверки согласуются условия, доставка и дальнейшие шаги.",
                ],
            },
        ],
        primaryCta: { label: "Отправить запрос", href: "/kontakty" },
        secondaryCta: { label: "Каталог дверей", href: "/mezhkomnatnye-dveri" },
        relatedLinks: partnerLinks.filter((link) => link.href !== "/partneram/podryadchikam"),
    },

    architects: {
        id: "architects",
        path: "/partneram/arkhitektoram",
        eyebrow: "Партнёрам",
        title: "Сотрудничество с архитекторами и дизайнерами",
        description: "Подбираем двери под визуальную концепцию, требования проекта и будущую эксплуатацию помещения.",
        metaTitle: "Архитекторам",
        metaDescription: "Сотрудничество с архитекторами и дизайнерами: подбор межкомнатных, скрытых и специальных дверей под проект.",
        lead: "Архитектору важно не просто выбрать красивую дверь, а сохранить логику проекта: цвет, материал, тип открывания, фурнитуру и технические ограничения.",
        facts: [
            { label: "Фокус", value: "Двери для коммерческих интерьеров" },
            { label: "Подбор", value: "По цвету, материалу и назначению" },
            { label: "Панели", value: "Позже — отдельный проектный расчёт" },
        ],
        sections: [
            {
                id: "project-help",
                title: "Чем можем быть полезны",
                items: [
                    "Помочь подобрать варианты дверей под концепцию интерьера.",
                    "Согласовать фурнитуру и комплектацию с требованиями объекта.",
                    "Подготовить основу для дальнейшего расчёта и заказа.",
                ],
            },
            {
                id: "what-to-send",
                title: "Что лучше прислать",
                items: [
                    "План или список проёмов.",
                    "Пожелания по цвету, материалу, скрытому монтажу или огнестойкости.",
                    "Ориентиры по срокам, количеству и условиям поставки.",
                ],
            },
        ],
        primaryCta: { label: "Связаться", href: "/kontakty" },
        secondaryCta: { label: "Смотреть каталог", href: "/mezhkomnatnye-dveri" },
        relatedLinks: partnerLinks.filter((link) => link.href !== "/partneram/arkhitektoram"),
    },
};

export function getTrustPageContent(id: TrustPageId): TrustPageContent {
    return trustPages[id];
}

export function buildTrustPageMetadata(id: TrustPageId): Metadata {
    const page = getTrustPageContent(id);

    return buildSeoMetadata({
        title: page.metaTitle,
        description: page.metaDescription,
        path: page.path,
    });
}
