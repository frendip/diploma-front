import type {YMapMarkerProps} from '../lib/ymaps';
import {YMapMarker} from '../lib/ymaps';
import {ReactComponent as SubstationBlue} from '../assets/substation-marker-blue.svg';
import {ReactComponent as SubstationRed} from '../assets/substation-marker-red.svg';
import {ReactComponent as SubstationYellow} from '../assets/substation-marker-yellow.svg';
import {ReactComponent as SubstationGreen} from '../assets/substation-marker-green.svg';
import React, {useMemo} from 'react';

interface MapSubstationMarkerProps extends YMapMarkerProps {
    color: keyof typeof substationColorOption;
}

const substationColorOption = {
    red: SubstationRed,
    blue: SubstationBlue,
    yellow: SubstationYellow,
    green: SubstationGreen
};

function MapSubstationMarker({color, ...markerProps}: MapSubstationMarkerProps) {
    const SubstationIcon = useMemo(() => substationColorOption[color], [color]);

    return (
        <YMapMarker {...markerProps}>
            <div className={`relative -translate-x-2/4 -translate-y-full`}>
                <SubstationIcon />
            </div>
        </YMapMarker>
    );
}

export default MapSubstationMarker;
