import { type IOrderingChapter } from '@entities/orderings';
import { type IOrderResponse } from '@features/getOrderProductsWeight';
import { getOrderingProduct } from './createOrdering';
import { type IPackageCategoryResponse } from '@entities/packages';
import { type Dictionary } from '@reduxjs/toolkit';

export const groupProductsByCategory = (order: IOrderResponse) => {
    return order.orderRecords.reduce((result: Record<string, IOrderingChapter>, record)  => {
        const {product, count} = record
        
        const category = product && product.extraData && product.extraData.packageCategory || 'Не указана'
        if (category && !result[category]) {
            result[category] = { records: [],
                summary: {
                    categoryName: '',
                    countOfPackages: 0,
                    totalCount: 0,
                    text: '',
                    rowsCount: 0
                }};
        }
        result[category].records.push(getOrderingProduct(record, product))
        result[category].summary.totalCount += count;

        return result
    }, {})
}

export const updateOrderingChapterSummary = (packageCategories: Dictionary<IPackageCategoryResponse>, records: Record<string, IOrderingChapter>) => {
    return  Object.entries(records).reduce((result: Record<string, IOrderingChapter>, currentRecord)=> {
        const data = currentRecord[1]
        const packageId = currentRecord[0]
        const category = packageCategories[packageId]
        if (category) {
            const totalCount = records[packageId].summary.totalCount 
            result[packageId] = {
                records: data.records,
                summary: {
                    totalCount, 
                    categoryName: category.name ,
                    countOfPackages: category?.countOfPackages,
                    text: category.text ?? '', 
                    rowsCount: category.countOfPackages ? totalCount/category.countOfPackages : 0 
                }
            }
        }
        return result
    }, {})
}