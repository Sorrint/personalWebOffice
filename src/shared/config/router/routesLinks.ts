// import ReportsIcon from '@shared/assets/icons/reports.svg';
// import ShopsIcon from '@shared/assets/icons/shops.svg';
// import DocumentsIcon from '@shared/assets/icons/documents.svg';
// import InventoryIcon from '@shared/assets/icons/inventory.svg';
// import ProductsIcon from '@shared/assets/icons/products.svg';
// import ClientsIcon from '@shared/assets/icons/clients.svg';
// import StocksIcon from '@shared/assets/icons/stocks.svg';
// import LoyalityIcon from '@shared/assets/icons/loyality.svg';
// import IntegrationsIcon from '@shared/assets/icons/integrations.svg';
// import ScopesIcon from '@shared/assets/icons/scopes.svg';
// import NewsIcon from '@shared/assets/icons/news.svg';
// import SupportIcon from '@shared/assets/icons/support.svg';
// import QuestionIcon from '@shared/assets/icons/question.svg';
// import PackageBoxIcon from '@shared/assets/icons/package-box.svg';
import { type IconName } from '@shared/ui/iconFont';

export const BaseURL = '/office';

type RoutesLinks = {
    id: string,
    text: string,
    image?: IconName,
    path: string,
    authOnly?: boolean
    wrapperClassName?: string
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
        image: 'icon-products',
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
        wrapperClassName: 'subscribe',
        path: `${BaseURL}/paid-options`
    },
    news: {
        id: 'news',
        text: 'Новости',
        image: 'icon-news',
        wrapperClassName: 'subscribe grow',
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