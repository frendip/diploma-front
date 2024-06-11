import type {LngLat} from '../lib/ymaps';
import type {RawResp} from './resp.types';
import type {Substation} from './substations.types';

export interface Car {
    car_id: number;
    coordinates: LngLat;
    status: 'delivered' | 'inWork' | 'onBase';
    driver_name: string;
    generator_power: number;
    generator_name: string;
    base_id: number;
}

export interface CarsResp extends RawResp {
    data: Car[];
}

export interface CarResp extends RawResp {
    data: Car;
}

export interface CarRoute {
    cars_route_id: number;
    car_id: number;
    start_substation: Substation;
    end_substation: Substation;
}

export interface CarRouteResp extends RawResp {
    data: CarRoute;
}
