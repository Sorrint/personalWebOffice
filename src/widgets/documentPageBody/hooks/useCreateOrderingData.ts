import { useEffect } from 'react';
import { type EntityState, type Dictionary } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

import { type IOrderResponse, useGetOrderByIdQuery } from '@features/getOrderProductsWeight';
import { selectPackageCategoriesObject, type IPackageCategoryResponse, selectPackagesObject, type IPackageWithId, useGetPackages, useGetPackageCategories } from '@entities/packages';
import { orderingActions } from '@entities/orderings';
import { type IUnitWithId, useGetUnits } from '@entities/units';
import { useAppDispatch } from '@shared/lib/hooks';

import { groupProductsByCategory, updateOrderingChapterSummary } from '../libs/helpers/setRecords';
import { calculateProductsWeight } from '../libs/helpers/calculateProductsWeight';


export const useCreateOrderingData = ( id: string ) => {
    const dispatch = useAppDispatch()

    useGetPackageCategories();
    useGetPackages();

    const { data: order } = useGetOrderByIdQuery(id);
    const { data: units } = useGetUnits();
 
    const packageCategories = useSelector(selectPackageCategoriesObject);
    const packages = useSelector(selectPackagesObject);
 
    const sectionOrder: Record<number, string> = {
        1: '64daa7c326529ad019afc7d0',
        2: '64daa7a926529ad019afc7cc',
        3: '64daa79626529ad019afc7c8',
        4: '64daa78b26529ad019afc7c6',
        5: '64daa76f26529ad019afc7c2',
        6: '652016c4b3e554be97d46267',
        7: '64daa76326529ad019afc7c0',
        8: '64daa6fd26529ad019afc7be',
        9: '6521251cec860329e66ef6a8',
        10: '652131a4177b2cc6d7f2b44c'
    };

    const setRecords = (order: IOrderResponse, packageCategories: Dictionary<IPackageCategoryResponse>) => {
        const records = groupProductsByCategory(order)
        const updatedRecords = updateOrderingChapterSummary(packageCategories, records)
        dispatch(orderingActions.setRecords(updatedRecords))
    }

    const setChaptersOrder = (packageCategories: Dictionary<IPackageCategoryResponse>) => {
        if (packageCategories) {
            dispatch(orderingActions.setChaptersOrder(sectionOrder));
        }
    };

    const setWeights = (order: IOrderResponse, units:EntityState<IUnitWithId>, packages: Dictionary<IPackageWithId> ) => {
        const weights = calculateProductsWeight(order.orderRecords, units, packages)
        if (weights) {
            const {packagesWeight, productsWeight } = weights
            dispatch(orderingActions.setWeights({packagesWeight, productsWeight}))
        }
    }

    useEffect(()=> {
        if (order && packageCategories) {
            dispatch(orderingActions.setIsLoading(true))
            setRecords(order, packageCategories)
            setChaptersOrder(packageCategories)
            dispatch(orderingActions.setIsLoading(false))
        }
    }, [order, packageCategories])

    useEffect(()=> {
        if (order && units && packages) {
            setWeights(order, units, packages)
        }
    }, [order, units, packages])

    return;
};