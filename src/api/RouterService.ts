import {ApiService} from './ApiService';
import type {LngLat} from '../lib/ymaps';
import type {RouterResp} from '../types/map.types';

export const routerApi = ApiService.injectEndpoints({
    endpoints: (builder) => ({
        getRouter: builder.query<RouterResp, {waypoints: LngLat[]}>({
            query: (arg) => {
                const {waypoints} = arg;
                const formatWaypoints = JSON.stringify(waypoints);
                return {
                    url: '/router',
                    params: {waypoints: formatWaypoints},
                    method: 'get'
                };
            }
        })
    })
});

export const {useLazyGetRouterQuery} = routerApi;
