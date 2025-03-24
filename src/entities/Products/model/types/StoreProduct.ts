import { type ProductStock } from './DreamkasProduct';

enum UnitTypes {
  COUNTABLE = 'COUNTABLE',
  SCALABLE = 'SCALABLE',
  WEIGHTABLE = 'WEIGHTABLE',
}
export type ProductType = 'SCALABLE' | 'COUNTABLE';

export interface extraData {
  package?: string;
  packageCategory?: string;
  weight?: number;
  weightUnit?: string;
}

export interface UnitOption {
  content: string;
  _id: string;
  type: ProductType;
  base: number;
}

export interface StoreProduct {
  _id?: string;
  name: string;
  type?: UnitTypes;
  quantity?: number;
  department?: {
    id: number;
    name: string;
    tax: string;
  };
  isMarked?: null | boolean;
  price?: null | number;
  stock?: null | ProductStock[];
  tax?: string;
  unit?: string;
  extraData?: extraData;
}

export type StoreProductStock = [number, string, string, string, string];

export interface CheckStoreProduct {
  productsExists: unknown[];
  productsNotExists: unknown[];
}
