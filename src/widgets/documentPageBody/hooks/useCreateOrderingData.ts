import { useSelector } from 'react-redux';

import { useGetPackageCategories,  selectPackageCategoriesObject } from '@entities/packages';
import { type IOrderingChapter } from '@entities/orderings';

import { createNewOrderingRecord, getOrderingProduct } from '../libs/helpers/createOrdering';
import { useGetOrderByIdQuery } from '@features/getOrderProductsWeight';


export const useCreateOrderingData = ( id: string ) => {
    useGetPackageCategories();
    
    const { data: order } = useGetOrderByIdQuery(id);
    const packageCategories = useSelector(selectPackageCategoriesObject);

    const searchCache = new Map();

    const records = (order?.orderRecords || [])
        .reduce((result: Record<string, IOrderingChapter>, record)  => {
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

    return { records };
};