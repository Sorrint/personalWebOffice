import { type ReactNode } from 'react';

export interface InventoryProduct {
  name: string;
  price: number | null;
  quantity: number;
  id?: string;
  isActiveAccount?: boolean;
}

export interface CreateInventory {
  documentNumber: number;
  choosenDate: Date;
  comment: string;
  storeName: string;
}

export interface InventoryDocs extends CreateInventory {
  _id: string;
  products: InventoryProduct[];
  totalSum?: number;
}

export interface InventoryProductDisplay extends InventoryProduct {
  highlight?: boolean | (() => void);
  priceString: string;
  number: number;
  sum: number | string;
  delete: () => ReactNode;
}
