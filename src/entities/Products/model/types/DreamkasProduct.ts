export interface DreamkasProduct {
  id: string;
  name: string;
  department: {
    id: number;
    name: string;
    tax: string;
  };
  departmentId: number;
  family: null | string;
  image: null | string;
  imageId: null | number;
  isMarked: null | boolean;
  maxPrice: null | number;
  minPrice: null | number;
  postfix: null;
  price: null | number;
  prices: null | number[];
  stock: null | ProductStock[];
  syncStatuses: null;
  tax: string;
  type: string;
  unit: string;
  quantity: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  productCount: number;
}

export interface ProductQueryTrace {
  event: string;
  duration?: string;
  t: string;
}

export type ProductStock = [number, string, string, string, string];
