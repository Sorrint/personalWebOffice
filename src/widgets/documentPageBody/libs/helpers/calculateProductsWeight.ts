import { type IPackageWithId } from '@entities/packages';
import { type IUnitWithId } from '@entities/units';
import { type IOrderRecordResponse } from '@features/getOrderProductsWeight';
import { type Dictionary, type EntityState } from '@reduxjs/toolkit';

export const calculateProductsWeight = (records: IOrderRecordResponse[], units:EntityState<IUnitWithId>, packages: Dictionary<IPackageWithId>  ) => {
    if (!records) return
    return Object.values(records).reduce((result, record) => {
        const productCount = record.count;
        if (record.product && 'extraData' in record.product) {
            const productWeight = record.product.extraData?.weight;
            const productWeightUnitId = record.product.extraData?.weightUnit;
            if (productWeightUnitId && productWeight) {
                const productWeightUnit = units?.entities[productWeightUnitId]?.base;
                result.productsWeight += productWeight * (productWeightUnit ?? 1) * productCount;
            }
    
            const packageId = record.product.extraData?.package;
    
            if (packageId) {
                result.packagesWeight += (packages[packageId]?.weight ?? 0) * productCount;
            }
        }
        return result;
    }, { productsWeight: 0, packagesWeight: 0 });
}


