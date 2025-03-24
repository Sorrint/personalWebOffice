import {
  type DreamkasProduct,
  type ProductCategory,
  type ProductQueryTrace,
} from './types/DreamkasProduct';

export interface SearchParams {
  limit: number;
  q: string;
}

export interface SearchResult {
  categories: ProductCategory[];
  products: DreamkasProduct[];
  _queryTrace: ProductQueryTrace[];
}

export interface ProductListParams {
  limit?: number;
  offset?: number;
}
