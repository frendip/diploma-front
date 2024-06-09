import type {BasesResp, Substation, SubstationsResp} from '../types/substations.types';
import {ApiService} from './ApiService';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, {status?: Substation['status'] | 'all'}>({
            query: (params) => ({url: '/substations', params, method: 'get'}),
            providesTags: ['Substations']
        }),
        getBases: builder.query<BasesResp, null>({
            query: () => ({url: '/substations/bases', method: 'get'}),
            providesTags: ['Bases']
        })
    })
});

export const {useGetSubstationsQuery, useGetBasesQuery} = SubstationsApi;
