import {SubstationsResp} from '../types/substations.types';
import {ApiService} from './ApiService';

export const SubstationsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getSubstations: builder.query<SubstationsResp, null>({
            query: () => ({url: '/substations', method: 'get'}),
            providesTags: ['Substations']
        })
    })
});

export const {useGetSubstationsQuery} = SubstationsApi;
