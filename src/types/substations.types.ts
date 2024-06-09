import type {LngLat} from '../lib/ymaps';
import {RawResp} from './resp.types';

export interface Substation {
    substation_id: number;
    coordinates: LngLat;
    address: string;
    status: 'active' | 'disabled' | 'waiting';
    name: string;
    power: number;
}

export interface SubstationsResp extends RawResp {
    data: Substation[];
}
