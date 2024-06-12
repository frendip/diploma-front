import {Car, CarResp, CarRouteResp, CarsResp, RepairingSubstationResp} from '../types/cars.types';
import {RawResp} from '../types/resp.types';
import {ApiService} from './ApiService';
const CARS_URl = '/cars';

export const CarsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query<CarsResp, null>({
            query: () => ({url: CARS_URl, method: 'get'}),
            providesTags: ['Cars']
        }),
        getCarById: builder.query<CarResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}`, method: 'get'}),
            providesTags: ['Cars']
        }),
        getCarRoute: builder.query<CarRouteResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}/route`, method: 'get'}),
            providesTags: ['Cars', 'Substations']
        }),
        getCarRepairingSubstation: builder.query<RepairingSubstationResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}/repairing-substation`, method: 'get'}),
            providesTags: ['Cars', 'Substations']
        }),
        updateCar: builder.mutation<RawResp, {car_id: number; carWithoutId: Omit<Car, 'car_id'>}>({
            query: ({car_id, carWithoutId}) => ({url: `${CARS_URl}/${car_id}`, body: carWithoutId, method: 'PUT'}),
            invalidatesTags: ['Cars']
        })
    })
});

export const {
    useGetCarsQuery,
    useGetCarByIdQuery,
    useGetCarRouteQuery,
    useGetCarRepairingSubstationQuery,
    useLazyGetCarRouteQuery,
    useLazyGetCarByIdQuery,
    useUpdateCarMutation
} = CarsApi;
