import {io, Socket} from 'socket.io-client';
import {Car, CarResp, CarRouteResp, CarsResp, RawCarRoute, RepairingSubstationResp} from '../types/cars.types';
import {RawResp} from '../types/resp.types';
import {ApiService} from './ApiService';
import {LngLat} from '../lib/ymaps';
const CARS_URl = '/cars';

export const CarsApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getCars: builder.query<CarsResp, null>({
            query: () => ({url: CARS_URl, method: 'get'}),
            providesTags: ['Cars'],
            async onCacheEntryAdded(arg, {updateCachedData, cacheDataLoaded, cacheEntryRemoved}) {
                const socket: Socket = io('http://localhost:4000');

                try {
                    await cacheDataLoaded;

                    socket.on('updateCarCoordinates', (updatedCar: {carId: number; newCoordinates: LngLat}) => {
                        updateCachedData((draft) => {
                            const carIndex = draft.data.findIndex((car) => car.car_id === +updatedCar.carId);
                            if (carIndex !== -1) {
                                draft.data[carIndex].coordinates = updatedCar.newCoordinates;
                            }
                        });
                    });

                    socket.on('updateCarStatus', (updatedCar: {carId: number; status: Car['status']}) => {
                        updateCachedData((draft) => {
                            const carIndex = draft.data.findIndex((car) => car.car_id === +updatedCar.carId);
                            if (carIndex !== -1) {
                                draft.data[carIndex].status = updatedCar.status;
                            }
                        });
                    });
                } catch (err) {
                    console.log(err);
                }

                await cacheEntryRemoved;
                socket.close();
            }
        }),
        getCarById: builder.query<CarResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}`, method: 'get'}),
            providesTags: ['Cars']
        }),
        getCarRoute: builder.query<CarRouteResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}/route`, method: 'get'}),
            providesTags: ['Cars', 'Substations', 'Route']
        }),
        setCarRoute: builder.mutation<RawResp, RawCarRoute>({
            query: (params) => ({
                url: `${CARS_URl}/${params.car_id}/route`,
                body: {start_substation_id: params.start_substation_id, end_substation_id: params.end_substation_id},
                method: 'POST'
            }),
            invalidatesTags: ['Cars', 'Substations', 'Route']
        }),
        getCarRepairingSubstation: builder.query<RepairingSubstationResp, number>({
            query: (id) => ({url: `${CARS_URl}/${id}/repairing-substation`, method: 'get'}),
            providesTags: ['Substations']
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
    useUpdateCarMutation,
    useSetCarRouteMutation
} = CarsApi;
