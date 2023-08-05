import { rtkApi } from "@shared/api/rtkApi";
import type { IUnit } from "../model/unitTypes";

export interface IUnitWithId extends IUnit {
    _id: string
}

const unitsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUnits: build.query<IUnitWithId[], void> ({
            query: () => ({
                url: '/units'
            })
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
