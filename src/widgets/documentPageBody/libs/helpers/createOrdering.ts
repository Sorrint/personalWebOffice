import { type IPackageCategoryResponse } from "@entities/packages";
import { type IOrderingChapter } from "@entities/orderings";
import { type IStoreProduct } from "@entities/products";

import { type IOrderRecordResponse } from "../../model/types/documents";

export const createNewOrderingRecord = (category: IPackageCategoryResponse) => {
    return { records: [],
        summary: {
            categoryName: category.name,
            countOfPackages: category.countOfPackages,
            totalCount: 0,
            text: category.text ?? '',
            rowsCount: 0
        }};
};

export const getOrderingProduct = (record: IOrderRecordResponse, product: IStoreProduct) => {
    return {...record,
        product: product._id, 
        productName: product.name || record.productName, 
        unit: record.unit?.description || '',};
}; 

export const getOrderingRowsCount = (records: Record<string, IOrderingChapter>): { rowsCount: number, records: Record<string, IOrderingChapter>}  => {
    
    const rowsCount = Object.values(records).reduce((acc, record) => {
        const { summary} = record;
        const countOfRows = summary.countOfPackages ? summary.totalCount/summary.countOfPackages : 0;
        summary.rowsCount = countOfRows;
        return acc+= countOfRows;} ,0);

    return {rowsCount, records};
};