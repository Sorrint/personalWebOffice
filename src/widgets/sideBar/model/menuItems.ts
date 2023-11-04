import { routesLinks } from '@shared/config/router';

const {
    reports, documents, stores, inventory, packages, products,
    clients, loyality, stocks, integrations, news, scopes, question, support
} = routesLinks;

const menuItemsTop = {
    id: 'navigation-menu__top',
    wrapperClassName: 'navigation-menu__top',
    items: [reports, stores, documents, inventory, packages, products, clients, stocks, loyality, integrations]
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
