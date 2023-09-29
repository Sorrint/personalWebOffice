import { useSearchParams } from 'react-router-dom';

import { useGetPackageCategories  } from '@entities/packages';
import { useGetOrderByIdQuery } from '@widgets/documentPageBody/api/documentsOrderApi';
import { type IOrderRecordResponse } from '@widgets/documentPageBody/model/types/documents';

import './ordering.scss';

interface OrderingRecords {
    records: IOrderRecordResponse[]
    count: number
}

export const Ordering = () => {

    const [queryParams] = useSearchParams();
    const orderId = queryParams.get('orderId');
    if (!orderId) return 'Нет id заказа';
    const {data: order } = useGetOrderByIdQuery(orderId);
    
    const { data: packageCategories } = useGetPackageCategories();
    const records: Record<string, OrderingRecords> = {};

    if (order?.orderRecords) {
        order.orderRecords.forEach(record => {
            const { product, count } = record;
            const productPackage = product?.extraData?.package;
            if (productPackage) {
                records[productPackage] = records[productPackage] || {records: [], count: 0};
                records[productPackage].records.push(record);
                records[productPackage].count += count;
            }
        });
    }
    console.log(records);
    console.log(packageCategories);


    return (
        <>
            <div>Порядовка</div>
            {packageCategories && records && (
                <div>{packageCategories.map(category => 
                    records[category.package._id] && records[category.package._id].records &&
                    records[category.package._id].records.map(record => <div key={record.number}>{record.productName}</div>))
                }</div>)}
          
        </>
    );
};

