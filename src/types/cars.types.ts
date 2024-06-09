import {LngLat} from '@yandex/ymaps3';
import {RawResp} from './resp.types';

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
