export const BaseURL = '/office';

export const AppRoutes = {
    getDashboardRoute: () => `${BaseURL}/dashboard`,
    //Documents Page
    getDocumentsRoute: () => `${BaseURL}/documents`,
    getOrdersRoute: () => `${BaseURL}/documents/orders`,
    getOrderDetailsRoute: (id: string) => `${BaseURL}/documents/orders/${id}`,
    getOrderCreateRoute: () => `${BaseURL}/documents/orders/create`,
    getOrderAddProductsRoute: () => `${BaseURL}/documents/orders/addProducts`,
    getOrderingsRoute: () => `${BaseURL}/documents/orderings`,
    getOrderingsCreateRoute: () => `${BaseURL}/documents/orderings/create`,
    getDistributionsRoute: () => `${BaseURL}/documents/distibutions`,
    // Inventories Page
    getInventoriesRoute: () => `${BaseURL}/inventories`,
    getInventoryCreateRoute: () => `${BaseURL}/inventories/create`,
    getInventoryDetailsRoute: (id: number) => `${BaseURL}/inventories/${id}`,
    // Products Page
    getProductsRoute: () => `${BaseURL}/products`,
    getProductsCategoriesRoute: () => `${BaseURL}/products/categories`,
    //Packages Page
    getPackagesRoute: () => `${BaseURL}/packages`,
    getPackageCreateRoute: () => `${BaseURL}/packages/create`,
    getPackagesCategoryCreateRoute: () => `${BaseURL}/packages/categories/create`,
    //User, auth Pages
    getProfileRoute: () => `${BaseURL}/profile`,
    getLoginRoute: () => `${BaseURL}/login`,
    getRegisterRoute: () => `${BaseURL}/register`,
    //Others
    getShopsRoute: () => `${BaseURL}/shops`,
    getClienstRoute: () => `${BaseURL}/clients`,
    getPromoRoute: () => `${BaseURL}/promo`,
    getLoyalityRoute: ()=> `${BaseURL}/loyality`,
    getIntegrationsRoute: () => `${BaseURL}/applications`,
    getScopesRoute: () => `${BaseURL}/paid-options`,
    getNewsRoute: () => `${BaseURL}/news`,
    getSupportRoute: () => `${BaseURL}/support`,
    getQuestionRoute: () => `${BaseURL}/question`
}

export type RoutesKeys = keyof typeof AppRoutes

