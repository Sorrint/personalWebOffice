export type { ProductsState } from './model/types/products';
export { type IDreamkasProduct } from './model/interfaces/IDreamkasProduct';
export { ProductCard } from './components/productCard/productCard';
export { CategoryCard } from './components/categoryCard/categoryCard';
export { CategoriesList } from './components/categoriesList/categoriesList';
export { transformProductName } from './lib/helpers/transformProductName';
export { type IOrderProduct } from './model/interfaces/IOrderProduct';
export { ProductList } from './components/productList/productList';

export { useCheckOrderProducts, useLoadCategoriesBySearch, useLoadProducts, useLoadProductsBySearch, useLoadProductsCategories } from './model/productsService';
