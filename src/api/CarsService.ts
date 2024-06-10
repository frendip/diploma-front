import {CarsResp} from '../types/cars.types';
import {ApiService} from './ApiService';

export const CarsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query<CarsResp, null>({
            query: () => ({url: '/cars', method: 'get'}),
            providesTags: ['Cars']
        })
    })
});

export const {useGetCarsQuery} = CarsApi;
