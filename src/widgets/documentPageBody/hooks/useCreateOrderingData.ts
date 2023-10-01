import { type IPackageCategoryResponse, useGetPackageCategories } from "@entities/packages";
import { useGetOrderByIdQuery } from "../api/documentsOrderApi";
import { type IOrdering } from "@entities/orderings";


export const useCreateOrderingData = ( id: string ) => {
    const {data: order } = useGetOrderByIdQuery(id);
    
    const { data: packageData} = useGetPackageCategories();
   
    const records: Record<string, IOrdering> = {};
    
    const packages: Record<string, IPackageCategoryResponse> = {};
    
    if (packageData) {
        packageData.forEach(item => {
            packages[item.package._id] = item;
        });
    }

    if (order?.orderRecords) {
        order.orderRecords.forEach(record => {
            const { product, count } = record;

            const productPackage = product?.extraData?.package;
            if (!productPackage) return;

            const currentPackage = packages?.[productPackage];
            if (!currentPackage) return;

            if (!records[productPackage]) { 
                records[productPackage] = {
                    records: [], 
                    summary: {categoryName: currentPackage.name, countOfPackages: currentPackage.countOfPackages, totalCount: 1800}};
            }

            records[productPackage].records.push(
                {...record, 
                    product: product._id, 
                    productName: product.name || record.productName, 
                    unit: record.unit?.description || '',
                });

            records[productPackage].summary.totalCount += count;
        }
        );
    }

    return { records, packages };
};