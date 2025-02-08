export interface Pallet {
  _id: string;
  name: string;
  count: number;
}

export interface UpdateOrderPackagesDTO {
  orderNumber: number;
  pallets: Pallet[];
}
