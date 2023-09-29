import { useSearchParams } from 'react-router-dom';

import { useGetPackageCategories, type IPackageCategoryResponse } from '@entities/packages';
import { OrderingList, type IOrdering } from '@entities/orderings';

import { useGetOrderByIdQuery } from '../../api/documentsOrderApi';

export const OrderingDetails = () => {

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';
    const {data: order } = useGetOrderByIdQuery(orderId);
    
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
    return (
        <>
            <div>Порядовка</div>
            <OrderingList orderingRecords={Object.values(records)}/>
        </>
    );
};

