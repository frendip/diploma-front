import type {YMapMarkerProps} from '../lib/ymaps';
import {YMapMarker} from '../lib/ymaps';
import {ReactComponent as SubstationIcon} from '../assets/substation-icon.svg';
import React from 'react';

interface MapSubstationMarkerProps extends YMapMarkerProps {
    status?: 'working';
}

const statusOption = {
    working: 'border-[#5DE763]'
};

function MapSubstationMarker({status = 'working', ...markerProps}: MapSubstationMarkerProps) {
    return (
        <YMapMarker {...markerProps}>
            <div
                className={`relative flex -translate-x-2/4 -translate-y-2/4 items-center justify-center rounded-full border-4 ${statusOption[status]} bg-yellow-200 p-1`}
            >
                <SubstationIcon />
            </div>
        </YMapMarker>
    );
}

export default MapSubstationMarker;
