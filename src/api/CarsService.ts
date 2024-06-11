import {CarResp, CarRouteResp, CarsResp, RepairingSubstationResp} from '../types/cars.types';
import {ApiService} from './ApiService';

export const CarsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query<CarsResp, null>({
            query: () => ({url: '/cars', method: 'get'}),
            providesTags: ['Cars']
        }),
        getCarById: builder.query<CarResp, number>({
            query: (id) => ({url: `/cars/${id}`, method: 'get'}),
            providesTags: ['Cars']
        }),
        getCarRoute: builder.query<CarRouteResp, number>({
            query: (id) => ({url: `/cars/${id}/route`, method: 'get'}),
            providesTags: ['Cars', 'Substations']
        }),
        getCarRepairingSubstation: builder.query<RepairingSubstationResp, number>({
            query: (id) => ({url: `/cars/${id}/repairing-substation`, method: 'get'}),
            providesTags: ['Cars', 'Substations']
        })
    })
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useGetCarRouteQuery,
    useGetCarRepairingSubstationQuery,
    useLazyGetCarRouteQuery,
    useLazyGetCarByIdQuery
} = CarsApi;
