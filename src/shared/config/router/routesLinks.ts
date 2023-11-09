import { type IconName } from '@shared/ui/iconFont';

export const BaseURL = '/office';

type RoutesLinks = {
    id: string,
    text: string,
    image?: IconName,
    path: string,
    authOnly?: boolean
}


export const routesLinks: Record<string, RoutesLinks> = {
    reports: {
        id: 'dashboard',
        text: 'Отчёты',
        image: 'icon-reports',
        path: `${BaseURL}/dashboard`,
        authOnly: true
    },
    stores: {
        id: 'shops',
        text: 'Магазины',
        image: 'icon-shops',
        path: `${BaseURL}/shops`,
        authOnly: true
    },
    documents: {
        id: 'documents',
        text: 'Документы',
        image: 'icon-documents',
        path: `${BaseURL}/documents`,
        authOnly: true
    },
    inventory: {
        id: 'inventory-lists',
        text: 'Инвентаризация',
        image: 'icon-inventory',
        path: `${BaseURL}/inventory-lists`
    },
    packages: {
        id: 'packages',
        text: 'Упаковка',
        image: 'icon-package-box',
        path: `${BaseURL}/packages`
    },
    products: {
        id: 'products',
        text: 'Товары',
        image: 'icon-products',
        path: `${BaseURL}/products`
    },
    clients: {
        id: 'clients',
        text: 'Клиенты',
        image: 'icon-clients',
        path: `${BaseURL}/clients`
    },
    stocks: {
        id: 'promo',
        text: 'Акции',
        image: 'icon-stocks',
        path: `${BaseURL}/promo`
    },
    loyality: {
        id: 'loyality',
        text: 'Лояльность',
        image: 'icon-loyality',
        path: `${BaseURL}/loyality`
    },
    integrations: {
        id: 'applications',
        text: 'Интеграции',
        image: 'icon-integrations',
        path: `${BaseURL}/applications`
    },
    scopes: {
        id: 'paid-options',
        text: 'Подписки',
        image: 'icon-scopes',
        path: `${BaseURL}/paid-options`
    },
    news: {
        id: 'news',
        text: 'Новости',
        image: 'icon-news',
        path: `${BaseURL}/news`
    },
    support: {
        id: 'support',
        text: 'Техподдержка',
        image: 'icon-support',
        path: `${BaseURL}/support`
    },
    question: {
        id: 'question',
        text: 'Задать вопрос',
        image: 'icon-question',
        path: `${BaseURL}/question`
    },
    profile: {
        id: 'profile',
        text: 'Профиль',
        path: `${BaseURL}/profile`,
        image: 'icon-profile'
    },
    register: {
        id: 'register',
        text: 'Регистрация',
        path: `${BaseURL}/register`
    },
    login: {
        id: 'login',
        text: 'Вход',
        path: `${BaseURL}/login`
    }
};