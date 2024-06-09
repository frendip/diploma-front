import {ApiService} from './ApiService';
import type {Substation, SubstationsResp} from '../types/substations.types';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, {status?: Substation['status'] | 'all'}>({
            query: (params) => ({url: '/substations', params, method: 'get'}),
            providesTags: ['Substations']
        })
    })
});

export const {useGetSubstationsQuery} = SubstationsApi;
