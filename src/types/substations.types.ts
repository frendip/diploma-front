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

export interface SubstationResp extends RawResp {
    data: Substation;
}

export interface Base extends Substation {
    generators_count: number;
}

export interface BasesResp extends RawResp {
    data: Base[];
}
