import {LngLat} from '@yandex/ymaps3';
import {RawResp} from '../types/resp.types';
import type {BasesResp, Substation, SubstationResp, SubstationsResp} from '../types/substations.types';
import {ApiService} from './ApiService';
import {CarsWithMatrixResp} from '../types/cars.types';
const SUBSTATION_URL = '/substations';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, {status?: Substation['status'] | 'all'}>({
            query: (params) => ({url: `${SUBSTATION_URL}`, params, method: 'get'}),
            providesTags: ['Substations']
        }),
        getSubstationById: builder.query<SubstationResp, number>({
            query: (id) => ({url: `${SUBSTATION_URL}/${id}`, method: 'get'}),
            providesTags: ['Substations']
        }),
        getBases: builder.query<BasesResp, null>({
            query: () => ({url: `${SUBSTATION_URL}/bases`, method: 'get'}),
            providesTags: ['Bases']
        }),
        setSubstation: builder.mutation<RawResp, Omit<Substation, 'substation_id'>>({
            query: (substation) => ({
                url: `${SUBSTATION_URL}`,
                method: 'POST',
                body: substation
            }),
            invalidatesTags: ['Substations']
        }),
        deleteSubstation: builder.mutation<RawResp, {substation_id: number}>({
            query: (params) => ({
                url: `${SUBSTATION_URL}`,
                params,
                method: 'DELETE'
            }),
            invalidatesTags: ['Substations']
        }),
        getSubstationRepairCars: builder.query<CarsWithMatrixResp, number>({
            query: (id) => ({url: `${SUBSTATION_URL}/${id}/repair-cars`, method: 'get'}),
            providesTags: ['Substations']
        }),
        getAddressFromCoordinates: builder.query<any, {coordinates: LngLat}>({
            query: (params) => ({url: '/geocode', params, method: 'GET'})
        })
    })
});

export const {
    useGetSubstationsQuery,
    useGetBasesQuery,
    useSetSubstationMutation,
    useGetSubstationByIdQuery,
    useLazyGetAddressFromCoordinatesQuery,
    useDeleteSubstationMutation,
    useGetSubstationRepairCarsQuery
} = SubstationsApi;
