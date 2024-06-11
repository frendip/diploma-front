import {RawResp} from '../types/resp.types';
import type {BasesResp, Substation, SubstationResp, SubstationsResp} from '../types/substations.types';
import {ApiService} from './ApiService';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, {status?: Substation['status'] | 'all'}>({
            query: (params) => ({url: '/substations', params, method: 'get'}),
            providesTags: ['Substations']
        }),
        getSubstationById: builder.query<SubstationResp, number>({
            query: (id) => ({url: `/substations/${id}`, method: 'get'}),
            providesTags: ['Substations']
        }),
        getBases: builder.query<BasesResp, null>({
            query: () => ({url: '/substations/bases', method: 'get'}),
            providesTags: ['Bases']
        }),
        setSubstation: builder.mutation<RawResp, Omit<Substation, 'substation_id'>>({
            query: (substation) => ({
                url: '/substations',
                method: 'POST',
                body: substation
            }),
            invalidatesTags: ['Substations']
        })
    })
});

export const {useGetSubstationsQuery, useGetBasesQuery, useSetSubstationMutation} = SubstationsApi;
