import {LngLat} from '@yandex/ymaps3';
import {CarsWithMatrixResp} from '../types/cars.types';
import {RawResp} from '../types/resp.types';
import type {BasesResp, Substation, SubstationResp, SubstationsResp} from '../types/substations.types';
import {ApiService} from './ApiService';
import {Socket, io} from 'socket.io-client';
const SUBSTATION_URL = '/substations';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, {status?: Substation['status'] | 'all'}>({
            query: (params) => ({url: `${SUBSTATION_URL}`, params, method: 'get'}),
            providesTags: ['Substations'],
            async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
                const socket: Socket = io('http://localhost:4000');

                try {
                    await cacheDataLoaded;

                    socket.on(
                        'updateSubstationStatus',
                        (updatedSubstation: {substationId: number; status: Substation['status']}) => {
                            updateCachedData((draft) => {
                                const substationIndex = draft.data.findIndex(
                                    (substation) => substation.substation_id === +updatedSubstation.substationId
                                );
                                if (substationIndex !== -1) {
                                    draft.data[substationIndex].status = updatedSubstation.status;
                                }
                            });
                        }
                    );
                } catch (err) {
                    console.log(err);
                }

                await cacheEntryRemoved;
                socket.close();
            }
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
        }),
        updateSubstation: builder.mutation<
            RawResp,
            {substation_id: number; substationWithoutId: Omit<Substation, 'substation_id'>}
        >({
            query: ({substation_id, substationWithoutId}) => ({
                url: `${SUBSTATION_URL}/${substation_id}`,
                body: substationWithoutId,
                method: 'PUT'
            }),
            invalidatesTags: ['Substations']
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
    useGetSubstationRepairCarsQuery,
    useUpdateSubstationMutation
} = SubstationsApi;
