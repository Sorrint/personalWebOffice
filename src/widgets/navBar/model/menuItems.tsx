import ReportsIcon from 'shared/assets/icons/reports.svg';
import ShopsIcon from 'shared/assets/icons/shops.svg';
import DocumentsIcon from 'shared/assets/icons/documents.svg';
import AcceptanceIcon from 'shared/assets/icons/acceptance.svg';
import MarkingIcon from 'shared/assets/icons/marking.svg';
import ProductsIcon from 'shared/assets/icons/products.svg';
import ClientsIcon from 'shared/assets/icons/clients.svg';
import StocksIcon from 'shared/assets/icons/stocks.svg';
import LoyalityIcon from 'shared/assets/icons/loyality.svg';
import IntegrationsIcon from 'shared/assets/icons/integrations.svg';
import ScopesIcon from 'shared/assets/icons/scopes.svg';
import NewsIcon from 'shared/assets/icons/news.svg';
import SupportIcon from 'shared/assets/icons/support.svg';
import QuestionIcon from 'shared/assets/icons/question.svg';


const reports = {
    id: 'dashboard',
    text: 'Отчёты',
    image: ReportsIcon,
    path: '/office/dashboard'
};

const stores = {
    id: 'shops',
    text: 'Магазины',
    image: ShopsIcon,
    path: '/office/shops'
};

const documents = {
    id: 'documents',
    text: 'Заказы',
    image: DocumentsIcon,
    path: '/office/documents'
};

const acceptance = {
    id: 'inventory-lists',
    text: 'Инвентаризация',
    image: AcceptanceIcon,
    path: '/office/inventory-lists'
};

const marking = {
    id: 'goods-marking',
    text: 'Маркировка',
    image: MarkingIcon,
    path: '/office/goods-marking'
};

const products = {
    id: 'products',
    text: 'Товары',
    image: ProductsIcon,
    path: '/office/products'
};

const clients = {
    id: 'clients',
    text: 'Клиенты',
    image: ClientsIcon,
    path: '/office/clients'
};
const stocks = {
    id: 'promo',
    text: 'Акции',
    image: StocksIcon,
    path: '/office/promo'
};

const loyality = {
    id: 'loyality',
    text: 'Лояльность',
    image: LoyalityIcon,
    path: '/office/loyality'
};

const integrations = {
    id: 'applications',
    text: 'Интеграции',
    image: IntegrationsIcon,
    path: '/office/applications'
};

const scopes = {
    id: 'paid-options',
    text: 'Подписки',
    image: ScopesIcon,
    wrapperClassName: 'subscribe',
    path: '/office/paid-options'
};

const news = {
    id: 'news',
    text: 'Новости',
    image: NewsIcon,
    wrapperClassName: 'subscribe grow',
    path: '/office/news'
};

const support = {
    id: 'support',
    text: 'Техподдержка',
    image: SupportIcon,
    path: '/office/support'
};

const question = {
    id: 'question',
    text: 'Задать вопрос',
    image: QuestionIcon,
    path: '/office/question'
};

const menuItemsTop = {
    id: 'navigation-menu__top',
    wrapperClassName: 'navigation-menu__top',
    items: [reports, stores, documents, acceptance, marking, products, clients, stocks, loyality, integrations]
};

const menuItemsSpecial = {
    id: 'navigation-menu__special',
    items: [scopes, news]
};

const menuItemsBottom = {
    id: 'navigation-menu__bottom',
    wrapperClassName: 'navigation-menu__bottom',
    items: [support, question]
};

export const navBar = [menuItemsTop, menuItemsSpecial, menuItemsBottom];
