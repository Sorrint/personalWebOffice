const reports = {
    id: 'dashboard',
    text: 'Отчёты',
    image: `<svg id="insert_chart" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet"focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"></path></svg>`,
    path: '/dashboard'
};

const stores = {
    id: 'shops',
    text: 'Магазины',
    image: `<svg id="store" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"> <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z"></path></svg>`,
    path: '/shops'
};

const documents = {
    id: 'documents',
    text: 'Заказы',
    image: `<svg id="folder" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"        fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path></svg>`,
    path: '/documents'
};

const acceptance = {
    id: 'inventory-lists',
    text: 'Инвентаризация',
    image: `<svg id="assignment" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"        fit="" preserveAspectRatio="xMidYMid meet" focusable="false"> <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></path></svg>`,
    path: '/inventory-lists'
};

const marking = {
    id: 'goods-marking',
    text: 'Маркировка',
    image: `<svg id="goods_marking" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M4 3C2.89 3 2 3.89 2 5V15C2 15.5304 2.21071 16.0391 2.58579 16.4142C2.96086 16.7893 3.46957 17 4 17H12V22L15 19L18 22V17H20C20.5304 17 21.0391 16.7893 21.4142 16.4142C21.7893 16.0391 22 15.5304 22 15V8V6V5C22 4.46957 21.7893 3.96086 21.4142 3.58579C21.0391 3.21071 20.5304 3 20 3H16H4ZM12 5L15 7L18 5V8.5L21 10L18 11.5V15L15 13L12 15V11.5L9 10L12 8.5V5ZM4 5H9V7H4V5ZM4 9H7V11H4V9ZM4 13H9V15H4V13Z"></path></svg>`,
    path: '/goods-marking'
};

const products = {
    id: 'products',
    text: 'Товары',
    image: `<svg id="local_mall" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"></path></svg>`,
    path: '/products'
};

const clients = {
    id: 'clients',
    text: 'Клиенты',
    image: `<svg id="people" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>`,
    path: '/clients'
};
const stocks = {
    id: 'promo',
    text: 'Акции',
    image: `<svg id="card_giftcard" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"></path></svg>`,
    path: '/promo'
};

const loyality = {
    id: 'loyality',
    text: 'Лояльность',
    image: `<svg id="loyality-new" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M17.65,2.85 L18.26,6.71 L21.77,8.5 L20,12 L21.78,15.5 L18.24,17.29 L17.63,21.15 L13.74,20.54 L10.97,23.3 L8.19,20.5 L4.33,21.14 L3.71,17.25 L0.22,15.47 L2,11.97 L0.23,8.5 L3.74,6.69 L4.35,2.86 L8.22,3.5 L11,0.69 L13.77,3.46 L17.65,2.85 Z M8.5,7 C7.67157288,7 7,7.67157288 7,8.5 C7,9.32842712 7.67157288,10 8.5,10 C9.32842712,10 10,9.32842712 10,8.5 C10,7.67157288 9.32842712,7 8.5,7 Z M13.5,14 C12.6715729,14 12,14.6715729 12,15.5 C12,16.3284271 12.6715729,17 13.5,17 C14.3284271,17 15,16.3284271 15,15.5 C15,14.6715729 14.3284271,14 13.5,14 Z M7.41,17 L16,8.41 L14.59,7 L6,15.59 L7.41,17 Z" id="Shape"></path></svg>`,
    path: '/loyality'
};

const integrations = {
    id: 'applications',
    text: 'Интеграции',
    image: `<svg id="settings_ethernet" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M7.77 6.76L6.23 5.48.82 12l5.41 6.52 1.54-1.28L3.42 12l4.35-5.24zM7 13h2v-2H7v2zm10-2h-2v2h2v-2zm-6 2h2v-2h-2v2zm6.77-7.52l-1.54 1.28L20.58 12l-4.35 5.24 1.54 1.28L23.18 12l-5.41-6.52z"></path></svg>`,
    path: '/applications'
};

const scopes = {
    id: 'paid-options',
    text: 'Подписки',
    image: `<svg id="briefcase_check" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="m10 3h4c.5304 0 1.0391.21071 1.4142.58579.3751.37507.5858.88378.5858 1.41421v2h4c.5304 0 1.0391.21071 1.4142.58579.3751.37507.5858.88378.5858 1.41421v11c0 .5304-.2107 1.0391-.5858 1.4142s-.8838.5858-1.4142.5858h-16c-.53043 0-1.03914-.2107-1.41421-.5858-.37508-.3751-.58579-.8838-.58579-1.4142v-11c0-.53043.21071-1.03914.58579-1.41421.37507-.37508.88378-.58579 1.41421-.58579h4v-2c0-.53043.21071-1.03914.58579-1.41421.37507-.37508.88378-.58579 1.41421-.58579zm4 4v-2h-4v2zm-3.5 11.5 6.59-6.59-1.41-1.41-5.18 5.17-2.09-2.08-1.41 1.41z"></path></svg>`,
    wrapperClassName: 'subscribe',
    path: '/paid-options'
};

const news = {
    id: 'news',
    text: 'Новости',
    image: `<svg id="update" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><defs><path d="M0 0h24v24H0V0z" id="a"></path></defs><clipPath id="b"><use overflow="visible" xlink:href="#a"></use></clipPath><path clip-path="url(#b)" d="M21 10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-.1-2.73 2.71-2.73 7.08 0 9.79 2.73 2.71 7.15 2.71 9.88 0C18.32 15.65 19 14.08 19 12.1h2c0 1.98-.88 4.55-2.64 6.29-3.51 3.48-9.21 3.48-12.72 0-3.5-3.47-3.53-9.11-.02-12.58 3.51-3.47 9.14-3.47 12.65 0L21 3v7.12zM12.5 8v4.25l3.5 2.08-.72 1.21L11 13V8h1.5z"></path></svg>`,
    wrapperClassName: 'subscribe grow',
    path: '/news'
};

const support = {
    id: 'support',
    text: 'Техподдержка',
    image: `<svg id="help_desk" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fit="" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" focusable="false"><path d="M10,20C4.5,20,0,15.5,0,10C0,4.5,4.5,0,10,0c5.5,0,10,4.5,10,10C20,15.5,15.5,20,10,20z M10,2c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S14.4,2,10,2z"></path><path d="M10,15c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5S12.8,15,10,15z M10,7c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S11.7,7,10,7z"></path><path id="Rectangle" d="M6,1h8l-2,6H8L6,1z"></path><path id="Rectangle_1_" d="M6,19h8l-2-6H8L6,19z"></path><path id="Rectangle_2_" d="M19,6v8l-6-2V8L19,6z"></path> <path id="Rectangle_3_" d="M1,14V6l6,2v4L1,14z"></path></svg>`,
    path: '/support'
};

const question = {
    id: 'question',
    text: 'Задать вопрос',
    image: `<svg id="question" viewBox="0 0 24 24" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.3999 0H21.6001C22.9199 0 24 1.08 24 2.4V24L19.2 19.2H2.3999C1.08008 19.2 0 18.12 0 16.8V2.4C0 1.08 1.08008 0 2.3999 0ZM5.33325 9.33336C5.33374 5.65084 8.31836 2.66667 12 2.66667C15.6819 2.66667 18.6665 5.6513 18.6665 9.33321L18.6663 9.36087C18.6514 13.03 15.6726 15.9997 12 15.9997L11.7991 15.9999C11.667 16 11.5356 16.0001 11.4014 15.9997H10.8652V11.1624H12.0276C13.0378 11.1624 13.8564 10.3435 13.8564 9.33321C13.8564 8.32307 13.0376 7.50433 12.0276 7.50433C11.0173 7.50433 10.1985 8.32307 10.1985 9.33336V10.4858V11.1624V15.9997H5.33325" fill="black" fill-opacity="0.38"></path></svg>`,
    path: '/question'
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
