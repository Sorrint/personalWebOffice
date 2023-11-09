import { routesLinks } from '@shared/config/router';
import { type IMenuItems } from './menuItemsTypes';


const {
    reports, documents, stores, inventory, packages, products,
    clients, loyality, stocks, integrations, news, scopes, question, support
} = routesLinks;

const menuItemsTop: IMenuItems = {
    section: 'main',
    items: [reports, stores, documents, inventory, packages, products, clients, stocks, loyality, integrations]
};

const menuItemsSpecial: IMenuItems  = {
    section: 'special',
    items: [scopes]
};

const menuItemsGrow: IMenuItems = {
    section: 'grow',
    items: [news],
    grow: true
}

const menuItemsBottom: IMenuItems = {
    section: 'bottom',
    items: [support, question]

};

export const sideBarScope = [menuItemsTop, menuItemsSpecial, menuItemsGrow, menuItemsBottom];
