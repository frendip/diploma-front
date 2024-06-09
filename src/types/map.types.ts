import type {LngLat} from '../lib/ymaps';
import {RawResp} from './resp.types';

export interface RouterData {
    points: LngLat[];
    duration: number;
    distance: number;
}

export interface RouterResp extends RawResp {
    data: RouterData;
}
