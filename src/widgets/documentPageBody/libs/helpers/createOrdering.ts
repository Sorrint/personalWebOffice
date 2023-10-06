import { type IPackageCategoryResponse } from "@entities/packages";
import { type IStoreProduct } from "@entities/products";

import { type IOrderRecordResponse } from "../../model/types/documents";

export const createNewOrderingRecord = (category: IPackageCategoryResponse) => {
    return { records: [],
        summary: {
            categoryName: category.name,
            countOfPackages: category.countOfPackages,
            totalCount: 0,
        }};
};

export const getOrderingProduct = (record: IOrderRecordResponse, product: IStoreProduct) => {
    return {...record,
        product: product._id, 
        productName: product.name || record.productName, 
        unit: record.unit?.description || '',};
}; 