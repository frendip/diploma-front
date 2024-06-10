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
        })
    })
});

export const {useGetSubstationsQuery, useGetBasesQuery, useGetSubstationByIdQuery} = SubstationsApi;
