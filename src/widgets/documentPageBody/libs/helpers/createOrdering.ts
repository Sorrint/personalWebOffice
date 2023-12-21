import { type IOrderResponse, type IOrderRecordResponse } from '@features/getOrderProductsWeight';
import { type IPackageCategoryResponse } from '@entities/packages';
import { type IOrderingChapter } from '@entities/orderings';
import { type IStoreProduct } from '@entities/products';
import { type Dictionary } from '@reduxjs/toolkit';

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

export const getOrderingProduct = (record: IOrderRecordResponse, product: Partial<IStoreProduct>) => {
    return {...record,
        product: product?._id, 
        productName: product?.name || record.productName, 
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


export const createRecords = (order: IOrderResponse, packageCategories: Dictionary<IPackageCategoryResponse>) => {
    const searchCache = new Map();
    const records = order.orderRecords.reduce((result: Record<string, IOrderingChapter>, record)  => {
        const { product, count } = record;
        const productPackage = product?.extraData?.package;
            
        if (!productPackage) return result;
            
        if (!searchCache.has(productPackage)) {
            Object.entries(packageCategories).forEach((value)=> {
                const currentCategory = value[1];
                const currentCategoryId = value[0];
                if (currentCategory?.packages.includes(productPackage)) {
                    searchCache.set(productPackage, currentCategoryId);
                    result[currentCategoryId] = createNewOrderingRecord(currentCategory);
                    return;
                }
            });}
                
        const cachedCategoryId = searchCache.get(productPackage);
                
        if (result[cachedCategoryId]){
            result[cachedCategoryId].records.push(
                getOrderingProduct(record, product));
            result[cachedCategoryId].summary.totalCount += count;
        }
    
        return result;
    }, {});

    return records
}

