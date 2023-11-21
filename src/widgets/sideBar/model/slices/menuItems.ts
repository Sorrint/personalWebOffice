import { AppRoutes } from '@shared/config/router';
import { type IMenuItems } from '../types/menuItemsTypes';

const {
    getClienstRoute, getDashboardRoute, getDocumentsRoute, getInventoriesRoute, getPackagesRoute, getProductsRoute, getPromoRoute, getShopsRoute, getLoyalityRoute, getIntegrationsRoute, getScopesRoute, getNewsRoute, getQuestionRoute, getSupportRoute
} = AppRoutes

const menuItemsTop: IMenuItems = {
    section: 'main',
    items: [
        {
            path: getDashboardRoute(),
            text: 'Отчёты',
            image: 'icon-reports',
            authOnly: true
        }, 
        {
            id: 'shops',
            path: getShopsRoute(),
            text: 'Магазины',
            image: 'icon-shops',
            authOnly: true
        },
        {
            id: 'documents',
            path: getDocumentsRoute(),
            text: 'Документы',
            image: 'icon-documents',
            authOnly: true
        },
        {
            id: 'inventory-lists',
            path: getInventoriesRoute(),
            text: 'Инвентаризация',
            image: 'icon-inventory'
        },
        {
            id: 'packages',
            path: getPackagesRoute(),
            text: 'Упаковка',
            image: 'icon-package-box'
        },
        {
            id: 'products',
            path: getProductsRoute(),
            text: 'Товары',
            image: 'icon-products'
        },
        {
            id: 'clients',
            path: getClienstRoute(),
            text: 'Клиенты',
            image: 'icon-clients'
        },
        {
            id: 'promo',
            path: getPromoRoute(),
            text: 'Акции',
            image: 'icon-stocks'
        },
        {
            id: 'loyality',
            path: getLoyalityRoute(),
            text: 'Лояльность',
            image: 'icon-loyality'
        },
        {
            id: 'applications',
            path: getIntegrationsRoute(),
            text: 'Интеграции',
            image: 'icon-integrations'
        }
    ]
};

const menuItemsSpecial: IMenuItems  = {
    section: 'special',
    items: [{
        id: 'scopes',
        path: getScopesRoute(),
        text: 'Подписки',
        image: 'icon-scopes',
    }]
};

const menuItemsGrow: IMenuItems = {
    section: 'grow',
    items: [{
        id: 'news',
        text: 'Новости',
        image: 'icon-news',
        path: getNewsRoute()
    }],
    grow: true
}

const menuItemsBottom: IMenuItems = {
    section: 'bottom',
    items: [{
        id: 'support',
        text: 'Техподдержка',
        image: 'icon-support',
        path: getSupportRoute()
    },
    {
        id: 'question',
        text: 'Задать вопрос',
        image: 'icon-contact',
        path: getQuestionRoute()
    }]

};

export const sideBarScope = [menuItemsTop, menuItemsSpecial, menuItemsGrow, menuItemsBottom];
