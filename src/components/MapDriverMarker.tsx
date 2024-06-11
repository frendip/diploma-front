import React from 'react';
import {LngLat, YMapMarker} from '../lib/ymaps';

interface MapDriverMarkerProps {
    coordinates: LngLat;
}

function MapDriverMarker({coordinates}: MapDriverMarkerProps) {
    return (
        <YMapMarker coordinates={coordinates}>
            <div className="relative h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-[5px] border-active bg-white" />
        </YMapMarker>
    );
}

export default MapDriverMarker;
