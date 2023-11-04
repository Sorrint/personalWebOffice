import ReportsIcon from '@shared/assets/icons/reports.svg';
import ShopsIcon from '@shared/assets/icons/shops.svg';
import DocumentsIcon from '@shared/assets/icons/documents.svg';
import InventoryIcon from '@shared/assets/icons/inventory.svg';
import ProductsIcon from '@shared/assets/icons/products.svg';
import ClientsIcon from '@shared/assets/icons/clients.svg';
import StocksIcon from '@shared/assets/icons/stocks.svg';
import LoyalityIcon from '@shared/assets/icons/loyality.svg';
import IntegrationsIcon from '@shared/assets/icons/integrations.svg';
import ScopesIcon from '@shared/assets/icons/scopes.svg';
import NewsIcon from '@shared/assets/icons/news.svg';
import SupportIcon from '@shared/assets/icons/support.svg';
import QuestionIcon from '@shared/assets/icons/question.svg';
import PackageBoxIcon from '@shared/assets/icons/package-box.svg';

const BaseURL = '/office';

export const routesLinks = {
    reports: {
        id: 'dashboard',
        text: 'Отчёты',
        image: ReportsIcon,
        path: `${BaseURL}/dashboard`,
        authOnly: true
    },
    stores: {
        id: 'shops',
        text: 'Магазины',
        image: ShopsIcon,
        path: `${BaseURL}/shops`,
        authOnly: true
    },
    documents: {
        id: 'documents',
        text: 'Документы',
        image: DocumentsIcon,
        path: `${BaseURL}/documents`,
        authOnly: true
    },
    inventory: {
        id: 'inventory-lists',
        text: 'Инвентаризация',
        image: InventoryIcon,
        path: `${BaseURL}/inventory-lists`
    },
    packages: {
        id: 'packages',
        text: 'Упаковка',
        image: PackageBoxIcon,
        path: `${BaseURL}/packages`
    },
    products: {
        id: 'products',
        text: 'Товары',
        image: ProductsIcon,
        path: `${BaseURL}/products`
    },
    clients: {
        id: 'clients',
        text: 'Клиенты',
        image: ClientsIcon,
        path: `${BaseURL}/clients`
    },
    stocks: {
        id: 'promo',
        text: 'Акции',
        image: StocksIcon,
        path: `${BaseURL}/promo`
    },
    loyality: {
        id: 'loyality',
        text: 'Лояльность',
        image: LoyalityIcon,
        path: `${BaseURL}/loyality`
    },
    integrations: {
        id: 'applications',
        text: 'Интеграции',
        image: IntegrationsIcon,
        path: `${BaseURL}/applications`
    },
    scopes: {
        id: 'paid-options',
        text: 'Подписки',
        image: ScopesIcon,
        wrapperClassName: 'subscribe',
        path: `${BaseURL}/paid-options`
    },
    news: {
        id: 'news',
        text: 'Новости',
        image: NewsIcon,
        wrapperClassName: 'subscribe grow',
        path: `${BaseURL}/news`
    },
    support: {
        id: 'support',
        text: 'Техподдержка',
        image: SupportIcon,
        path: `${BaseURL}/support`
    },
    question: {
        id: 'question',
        text: 'Задать вопрос',
        image: QuestionIcon,
        path: `${BaseURL}/question`
    },
    profile: {
        id: 'profile',
        text: 'Профиль',
        path: `${BaseURL}/profile`
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