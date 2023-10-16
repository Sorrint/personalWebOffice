import { rtkApi } from '@shared/api/rtkApi';
import type { IUnit } from '../model/unitTypes';
import { type EntityState, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { type RootState } from '@shared/lib/store/types';

export interface IUnitWithId extends IUnit {
    _id: string
}

const unitsAdapter = createEntityAdapter({selectId: (unit: IUnitWithId)=> unit._id});

const initialState = unitsAdapter.getInitialState();

const unitsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUnits: build.query<EntityState<IUnitWithId>, void> ({
            query: () => ({
                url: '/units'
                
            }),
            transformResponse: (response: IUnitWithId[]) => {
                return unitsAdapter.setAll(initialState, response);
            }
        }),
        createUnit: build.mutation<IUnit, IUnit> ({
            query: (tare) => ({
                url: '/units/create',
                method: 'POST',
                body: tare
            })
        })
    })
});

export const useCreateNewUnit = unitsApi.useCreateUnitMutation;
export const useGetUnits = unitsApi.useGetUnitsQuery;


export const selectUnitsResult = unitsApi.endpoints.getUnits.select();

const selectUnitsData = createSelector(
    selectUnitsResult,
    unitsResult => unitsResult.data
);

export const { selectAll: selectAllUnits, selectById: selectUnitById } =
  unitsAdapter.getSelectors((state: RootState) => selectUnitsData(state) ?? initialState);