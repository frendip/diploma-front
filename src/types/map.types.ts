import type {LngLat} from '../lib/ymaps';

interface RawResp {
    success: boolean;
    message: string;
}

export interface RouterData {
    points: LngLat[];
    duration: number;
    distance: number;
}

export interface RouterResp extends RawResp {
    route: RouterData;
}
