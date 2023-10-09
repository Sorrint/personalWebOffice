import { selectPackagesObject, useGetPackages } from "@entities/packages";
import { useGetUnits } from "@entities/units";
import { useGetOrderByIdQuery } from "@widgets/documentPageBody/api/documentsOrderApi";
import { useSelector } from "react-redux";


export const useGetOrderProductsWeight = (id: string) => {

    useGetPackages();
    
    const {data: units} = useGetUnits();
    const {data: order } = useGetOrderByIdQuery(id);
    const packages = useSelector(selectPackagesObject);

    const orderRecords = order?.orderRecords;
    
    const productsWeight = (orderRecords ?? []).reduce((result, record) => {
        const productCount = record.count;
        if (record.product && 'extraData' in record.product) {
            const productWeight = record.product.extraData?.weight;
            const productWeightUnitId = record.product.extraData?.weightUnit;
            if (productWeightUnitId && productWeight) {
                const productWeightUnit =  units?.entities[productWeightUnitId]?.base;
                result.productsWeight += productWeight * (productWeightUnit ?? 1) * productCount;
            } 
            
            const packageId = record.product.extraData?.package;
            
            if (packageId) {
                result.packagesWeight += (packages[packageId]?.weight ?? 0)*productCount;
            }
        }
        return result;
    }, { productsWeight: 0, packagesWeight: 0 });

    return  {...productsWeight, allWeight: productsWeight.productsWeight+ productsWeight.packagesWeight} ;
};