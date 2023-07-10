import { type IDreamkasProduct } from './model/interfaces/IDreamkasProduct';
import { productsAPI } from '@entities/products/model/productsService';
import ProductCard from './components/productCard/productCard';

import CategoryCard from './components/categoryCard/categoryCard';
import { CategoriesList } from './components/categoriesList/categoriesList';
import { transformProductName } from './lib/helpers/transformProductName';
import { type IOrderProduct } from './model/interfaces/IOrderProduct';
export { ProductList } from './components/productList/productList';
export { ProductCard, CategoryCard, CategoriesList, productsAPI, type IDreamkasProduct, transformProductName, type IOrderProduct };
